import { Caption } from '@components/tailus-ui/typography';
import { AdminAvatar } from '@components/user-nav';
import { cn } from '@lib/utils';

export type MessageBubbleProps = {
  message: string;
  isMine: boolean;
  sender: {
    name: string;
    avatar?: string;
  };
  timestamp?: string;
};
export function MessageBubble(type: MessageBubbleProps) {
  return (
    <div className={`flex gap-2 ${type.isMine ? 'justify-end' : 'justify-start'}`}>
      {!type.isMine && <AdminAvatar size="sm" src={type.sender.avatar} />}
      <div className={`p-3 rounded-lg max-w-[70%] ${type.isMine ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}>
        <p className="text-sm">{type.message}</p>
        {type.timestamp && <Caption className={cn(type.isMine && 'text-primary-400')}>{type.timestamp}</Caption>}
      </div>
    </div>
  );
}
