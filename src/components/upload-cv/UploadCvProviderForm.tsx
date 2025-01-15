import Button from '@components/tailus-ui/Button';
import Card from '@components/tailus-ui/Card';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@components/tailus-ui/form';
import { Caption, Text, Title } from '@components/tailus-ui/typography';
import { UploadCVSchema } from '@components/upload-cv/UploadCVDialog';
import { useUploadCVProvider } from '@components/upload-cv/useUploadCVProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { SchoolarShip } from '@lib/types';
import { cn } from '@lib/utils';
import { IconCloudUpload, IconFileTypePdf, IconSend, IconX } from '@tabler/icons-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
type UploadCVDialogProps = {
  scholarship: SchoolarShip;
  providerId: string;
} & React.ComponentProps<'form'>;
function UploadCVProviderForm({ scholarship, className, providerId, ...props }: UploadCVDialogProps) {
  const { mutateAsync: upLoadResume, data: uploadData, isPending } = useUploadCVProvider({ providerId });
  const form = useForm<UploadCVSchema>({
    resolver: zodResolver(UploadCVSchema),
  });
  const onSubmit = async (data: UploadCVSchema) => {
    toast.promise(upLoadResume(data), {
      description: 'Gửi CV',
      loading: 'Đang gửi CV...',
      success: 'Gửi CV thành công',
      error: 'Gửi CV thất bại',
    });
  };
  return (
    <Form {...form}>
      <form
        {...props}
        className={cn('space-y-4', className)}
        onSubmit={form.handleSubmit(onSubmit, (e) => {
          Object.values(e).forEach((error) => {
            toast.error(error.message);
          });
        })}
      >
        <fieldset disabled={isPending}>
          <div>
            <Title>Hồ sơ của bạn đã sẵn sàng?</Title>
            <Caption>
              Bạn muốn xem xét hồ sơ của mình có phù hợp với học bổng này không? Hãy gửi Hồ sơ của bạn cho chúng tôi để nhận tư vấn từ chuyên gia
            </Caption>
          </div>
          <input type="hidden" {...form.register('scholarship')} value={scholarship._id} />
          <FormField
            control={form.control}
            name="urlCv"
            defaultValue={[] as any}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor={field.name}>CV của bạn</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {field.value.name ? (
                    <Card variant="outlined" className="flex gap-3 items-center w-full relative">
                      <div className="rounded-full bg-soft-bg aspect-square w-14 flex items-center justify-center">
                        <IconFileTypePdf className="size-6 opacity-35" />
                      </div>
                      <Text>{field.value.name}</Text>
                      <Button.Root
                        size={'xs'}
                        className="absolute top-0 right-0"
                        intent="gray"
                        variant="ghost"
                        onClick={() => field.onChange(undefined)}
                      >
                        <Button.Icon type="only">
                          <IconX />
                        </Button.Icon>
                      </Button.Root>
                    </Card>
                  ) : (
                    <label
                      htmlFor="cv"
                      className="w-full h-40 rounded-btn border flex items-center justify-center text-xs text-caption flex-col mx-auto"
                    >
                      <IconCloudUpload className="size-5" />
                      <span>Chọn file (pdf, doc,docx)</span>
                    </label>
                  )}
                </div>
                <input
                  hidden
                  id="cv"
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      field.onChange(e.target.files[0]);
                    }
                  }}
                />

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="ml-auto flex mt-2">
            <Button.Root disabled={isPending}>
              <Button.Icon type="leading">
                <IconSend className="size-3" />
              </Button.Icon>
              <Button.Label>
                <Button.Label>Gửi CV</Button.Label>
              </Button.Label>
            </Button.Root>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}

export default UploadCVProviderForm;
