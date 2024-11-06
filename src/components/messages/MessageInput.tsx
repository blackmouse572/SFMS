import Badge from '@components/tailus-ui/Badge';
import Button from '@components/tailus-ui/Button';
import Card from '@components/tailus-ui/Card';
import { Form, FormField, InputForm } from '@components/tailus-ui/form';
import { InputProps } from '@components/tailus-ui/Input';
import { Caption } from '@components/tailus-ui/typography';
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from '@components/upload-cv/UploadCVDialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils';
import { IconFile, IconPaperclip, IconSend, IconX } from '@tabler/icons-react';
import { button } from '@tailus/themer';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const ChatSchema = z.object({
  text: z.string().min(3),
  files: z
    .array(z.instanceof(File), {
      required_error: 'Vui lòng chọn file',
    })
    .refine((file) => {
      const files = Array.from(file);
      return !files.some((file) => file.size > MAX_UPLOAD_SIZE);
    }, 'File quá lớn, vui lòng chọn file nhỏ hơn 5MB')
    .refine((file) => {
      const files = Array.from(file);
      return files.every((file) => ACCEPTED_FILE_TYPES.includes(file.type));
    }, 'File không hợp lệ, vui lòng chọn file pdf, jpg, png, jpeg'),
});
type MessageInputProps = {
  sendMessage: (text: string, files: File[]) => void;
} & InputProps;
function MessageInput({ sendMessage, className, disabled, ...rest }: MessageInputProps) {
  const form = useForm<z.infer<typeof ChatSchema>>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {
      text: '',
    },
    disabled: disabled,
  });
  const files = form.watch('files');

  return (
    <Form {...form}>
      <form
        className={cn('px-3 py-1.5 flex gap-2 bottom-0 bg-white shadow-md border-t relative', className)}
        onSubmit={form.handleSubmit(
          (data) => {
            sendMessage(data.text, data.files);
            form.reset();
          },
          (err) => {
            Object.values(err).forEach((error) => {
              toast.error(error.message);
            });
          }
        )}
      >
        {files?.length > 0 && (
          <Card className="absolute -top-20 origin-bottom flex overflow-x-auto p-2 w-[80%] gap-2">
            {Array.from(files).map((file, index) => (
              <Card variant="soft" key={index} className="flex items-center gap-2 p-2">
                <div className="flex items-center gap-2 flex-1">
                  <IconFile className="flex-shrink-0 text-caption" />
                  <Caption className="line-clamp-1">{file.name}</Caption>
                </div>
                <Button.Root
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    form.setValue(
                      'files',
                      files.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <Button.Icon type="only">
                    <IconX />
                  </Button.Icon>
                </Button.Root>
              </Card>
            ))}
          </Card>
        )}
        <FormField
          name="files"
          control={form.control}
          render={({ field }) => {
            return (
              <>
                <label htmlFor="file-upload" className={button['ghost']({ intent: 'gray', iconOnlyButtonSize: 'sm', className: 'relative' })}>
                  <Button.Icon type="only">
                    <IconPaperclip />
                  </Button.Icon>
                  {files?.length > 0 && (
                    <Badge className="absolute -bottom-1 -right-1" size="xs">
                      <span className="text-xs">{files?.length}</span>
                    </Badge>
                  )}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  {...field}
                  value={undefined}
                  onChange={(e) => {
                    if (!e.target.files) return;
                    const files = Array.from(e.target.files);
                    field.onChange(files);
                  }}
                />
              </>
            );
          }}
        />
        <InputForm minLength={3} name="text" control={form.control} placeholder="Type a message..." className="flex-1" {...rest} />
        <Button.Root size="sm" variant="solid" type="submit">
          <Button.Icon type="only">
            <IconSend />
          </Button.Icon>
        </Button.Root>
      </form>
    </Form>
  );
}

export default MessageInput;
