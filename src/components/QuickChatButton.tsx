import { useOpen } from '@components/messages/useOpenProvider';
import Button, { ButtonProps } from '@components/tailus-ui/Button';
import { SchoolarShip } from '@lib/types';
import { useFormContext } from 'react-hook-form';

function QuickChatButton(
  props: ButtonProps & {
    scholarship: SchoolarShip;
  }
) {
  const { setIsOpen } = useOpen();
  const form = useFormContext();
  return (
    <Button.Root
      {...props}
      onClick={() => {
        setIsOpen(true);
        form.setValue('text', `Xin chào, tôi muốn tìm hiểu về ${props.scholarship.name}`);
      }}
    ></Button.Root>
  );
}

export default QuickChatButton;
