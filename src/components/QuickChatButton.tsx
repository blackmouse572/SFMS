import { useOpen } from '@components/messages/useOpenProvider';
import Button, { ButtonProps } from '@components/tailus-ui/Button';
import { useIsAuthenticated } from '@lib/auth';
import { SchoolarShip } from '@lib/types';
import { useFormContext } from 'react-hook-form';

function QuickChatButton(
  props: ButtonProps & {
    scholarship: SchoolarShip;
  }
) {
  const { setIsOpen } = useOpen();
  const form = useFormContext();
  const isAuthenticated = useIsAuthenticated();
  return (
    <Button.Root
      {...props}
      href={isAuthenticated ? undefined : '/login'}
      onClick={() => {
        if (!isAuthenticated) {
          return;
        }
        setIsOpen(true);
        form.setValue('text', `Xin chào, tôi muốn tìm hiểu về ${props.scholarship.name}`);
      }}
    ></Button.Root>
  );
}

export default QuickChatButton;
