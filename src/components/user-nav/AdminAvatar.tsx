import Avatar from '@components/tailus-ui/Avatar';
import { type AvatarFallbackProps, type AvatarRootProps } from '@tailus/themer';

const intents: AvatarFallbackProps['intent'][] = ['primary', 'success', 'warning', 'danger', 'warning', 'info', 'gray', 'accent', 'secondary'];

export const AdminAvatar = ({
  src = 'https://api.multiavatar.com/kathrin.svg',
  size = 'xxs',
  initial = 'MI',
  indicator,
  className,
}: {
  src?: string;
  size?: AvatarRootProps['size'];
  initial?: string;
  indicator?: Pick<AvatarFallbackProps, 'intent'>;
  className?: string;
}) => {
  const randomIntent = intents[Math.floor(Math.random() * intents.length)];

  return (
    <Avatar.Root size={size ?? 'md'} className={className}>
      <Avatar.Image src={src} loading="lazy" alt="User Avatar" width={120} height={120} />
      <Avatar.Fallback
        intent={randomIntent}
        children={initial
          .split(' ')
          .map((i) => i[0])
          .join('')}
      />
      {indicator && <Avatar.Indicator intent={indicator.intent} />}
    </Avatar.Root>
  );
};
