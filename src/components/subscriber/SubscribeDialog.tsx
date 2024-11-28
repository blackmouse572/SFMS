import { Skeleton } from '@components/Skeleton';
import SubcribeForm from '@components/subscriber/SubscribeForm';
import { useGetMail } from '@components/subscriber/useGetMail';
import { useGetSubscribe } from '@components/subscriber/useGetSubscribe';
import { useSubcribe } from '@components/subscriber/useSubcribe';
import Button from '@components/tailus-ui/Button';
import Dialog from '@components/tailus-ui/Dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

export const SubscribeSchema = z.object({
  major: z.array(z.string().min(3).max(255)).nonempty(),
  level: z.array(z.string().min(3).max(255)).nonempty(),
  ielts: z.coerce.number().min(0).max(9),
  GPA: z.coerce.number().min(0).max(4),
  pay: z.coerce.number().min(0),
  value: z.enum(['Học bổng toàn phần', 'Học bổng bán phần']),
  location: z.string().min(3).max(255),
});
export type SubcribeSchema = z.infer<typeof SubscribeSchema>;

function SubscribeDialog() {
  const { mutateAsync: subscribe, isPending } = useSubcribe();
  const { mutateAsync: getMail } = useGetMail();
  const { data, isLoading } = useGetSubscribe();
  const [isOpen, setOpen] = useState(false);

  const onSubmit = async (payload: SubcribeSchema) => {
    const isUpdate = !!data;
    toast.promise(
      subscribe({
        isUpdate,
        payload,
      }),
      {
        loading: 'Đang gửi...',
        success: () => {
          setOpen(false);
          return 'Gửi thành công';
        },
        error: 'Gửi thất bại',
      }
    );
  };

  const onGetMail = async () => {
    toast.promise(getMail(), {
      loading: 'Đang gửi...',
      success: () => {
        setOpen(false);
        return 'Gửi thành công';
      },
      error: 'Gửi thất bại',
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen} modal={true}>
      <Dialog.Trigger asChild>
        <Button.Root className="font-medium text-sm" variant="ghost" intent="gray" size="sm">
          <Button.Label>
            <Button.Label>Đăng ký nhận mail</Button.Label>
          </Button.Label>
        </Button.Root>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="z-[11]" />
        <Dialog.Content className="w-full md:w-[70vw] lg:w-[50vw] z-[11]">
          <Dialog.Title>Học bổng tự động</Dialog.Title>
          <Dialog.Description className="mt-2">Đăng ký nhận mail thông báo về học bổng mới phù hợp với bạn</Dialog.Description>
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </>
          ) : (
            <SubcribeForm defaultValues={data} onSubmit={onSubmit} />
          )}
          <Dialog.Actions className="flex justify-between">
            {data && (
              <Button.Root disabled={isLoading && isPending} onClick={onGetMail} type={'button'} intent="success" variant="outlined">
                <Button.Label>
                  <Button.Label>Nhận thông báo ngay</Button.Label>
                </Button.Label>
              </Button.Root>
            )}
            <div className="flex gap-4">
              <Dialog.Close asChild>
                <Button.Root variant="ghost" intent="gray" disabled={isLoading && isPending}>
                  <Button.Label>Đóng</Button.Label>
                </Button.Root>
              </Dialog.Close>
              <Button.Root disabled={isLoading && isPending} type={'submit'} form={'subscribe-form'}>
                <Button.Label>
                  <Button.Label>{data ? 'Cập nhật' : 'Đăng ký'}</Button.Label>
                </Button.Label>
              </Button.Root>
            </div>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default SubscribeDialog;
