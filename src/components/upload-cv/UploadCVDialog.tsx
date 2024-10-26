import { Skeleton } from '@components/Skeleton';
import Button from '@components/tailus-ui/Button';
import Card from '@components/tailus-ui/Card';
import Dialog from '@components/tailus-ui/Dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@components/tailus-ui/form';
import { Caption, Link, Text } from '@components/tailus-ui/typography';
import { useUploadCV } from '@components/upload-cv/useUploadCV';
import { zodResolver } from '@hookform/resolvers/zod';
import { SchoolarShip } from '@lib/types';
import { IconCloudUpload, IconFileTypePdf, IconLoader2, IconSend } from '@tabler/icons-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const UploadCVSchema = z.object({
  scholarship: z.string().min(3),
  urlCv: z
    .instanceof(File, {
      message: 'File không đúng định dạng, vui lòng chọn file pdf, doc, docx',
    })
    .refine((file) => {
      const maxSize = 1024 * 1024 * 5; // 5MB
      if (file.size > maxSize) {
        return 'File quá lớn, vui lòng chọn file nhỏ hơn 5MB';
      }

      const fileExtension = file.name.split('.').pop();
      const allowedExtensions = ['pdf', 'doc', 'docx'];
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        return 'File không đúng định dạng, vui lòng chọn file pdf, doc, docx';
      }
    }),
});
export type UploadCVSchema = z.infer<typeof UploadCVSchema>;

function UploadCVDialog({ scholarship }: { scholarship: SchoolarShip }) {
  const { mutateAsync: upLoadResume, data: uploadData, isPending } = useUploadCV();
  const [isOpen, setOpen] = useState(false);

  const form = useForm<UploadCVSchema>({
    resolver: zodResolver(UploadCVSchema),
  });

  const onSubmit = async (data: UploadCVSchema) => {
    if (uploadData) {
      const url = uploadData.payment.checkoutUrl;
      return window.open(url, '_blank');
    }
    const result = await upLoadResume(data);
    if (result) {
      const url = result.payment.checkoutUrl;
      return window.open(url, '_blank');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen} modal={true}>
      <Dialog.Trigger asChild>
        <Button.Root intent="primary" className="text-nowrap mx-auto">
          <Button.Label>
            <Button.Label>Upload CV vào trường này</Button.Label>
          </Button.Label>
        </Button.Root>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="z-[11]" />
        <Dialog.Content className="w-full md:w-[70vw] lg:w-[50vw] xl:w-[30vw] z-[11]">
          <Dialog.Title>CV của bạn đã sẵn sàng?</Dialog.Title>
          <Dialog.Description className="mt-2">
            Bạn muốn xem xét hồ sơ của mình có phù hợp với học bổng này không? Hãy gửi CV của bạn cho chúng tôi để nhận tư vấn từ chuyên gia
          </Dialog.Description>
          <Form {...form}>
            <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                        <Card variant="outlined" className="flex gap-3 items-center">
                          <div className="rounded-full bg-soft-bg aspect-square w-14 flex items-center justify-center">
                            <IconFileTypePdf className="size-6 opacity-35" />
                          </div>
                          <Text>{field.value.name}</Text>
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
                      accept=".pdf,.doc,.docx"
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
              <Caption>* Bạn cần thanh toán phí tư vấn trước khi gửi CV, chúng tôi sẽ liên hệ với bạn sau khi nhận được CV của bạn</Caption>
              {isPending && (
                <div className="space-y-2">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              )}

              {uploadData && (
                <Text size="sm">
                  Chưa thanh toán?&nbsp;
                  <Link target="_blank" href={uploadData.payment.checkoutUrl}>
                    Click vào đây
                  </Link>
                </Text>
              )}

              <Dialog.Actions>
                <Dialog.Close asChild>
                  <Button.Root variant="ghost" intent="gray" disabled={isPending}>
                    <Button.Label>Đóng</Button.Label>
                  </Button.Root>
                </Dialog.Close>
                <Button.Root disabled={isPending}>
                  {isPending ? (
                    <>
                      <Button.Icon type="leading">
                        <IconLoader2 className="size-3 animate-spin" />
                      </Button.Icon>
                      <Button.Label>Đang tạo link thanh toán...</Button.Label>
                    </>
                  ) : (
                    <>
                      <Button.Icon type="leading">
                        <IconSend className="size-3" />
                      </Button.Icon>
                      <Button.Label>
                        <Button.Label>Gửi CV</Button.Label>
                      </Button.Label>
                    </>
                  )}
                </Button.Root>
              </Dialog.Actions>
            </form>
          </Form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default UploadCVDialog;
