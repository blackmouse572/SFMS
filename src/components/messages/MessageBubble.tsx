import Card from '@components/tailus-ui/Card';
import { Caption } from '@components/tailus-ui/typography';
import { AdminAvatar } from '@components/user-nav';
import { Message } from '@lib/types';
import { cn } from '@lib/utils';

export type MessageBubbleProps = {
  message: Message;
  isMine: boolean;
  sender: {
    name: string;
    avatar?: string;
  };
  timestamp?: string;
};
export function MessageBubble(type: MessageBubbleProps) {
  const renderFile = (file: string | File) => {
    if (typeof file === 'string') {
      return (
        <Card className="p-2">
          <Caption className="line-clamp-1">
            <a href={file} target="_blank" rel="noreferrer">
              {file.split('/').pop()}
            </a>
          </Caption>
        </Card>
      );
    }
    const url = URL.createObjectURL(file);
    return (
      <Card className="p-2">
        <Caption className="line-clamp-1">
          <a href={url} target="_blank" rel="noreferrer">
            {file.name.split('/').pop()}
          </a>
        </Caption>
      </Card>
    );
  };
  return (
    <div className={`flex gap-2 ${type.isMine ? 'justify-end' : 'justify-start'}`}>
      {!type.isMine && <AdminAvatar size="sm" src={type.sender.avatar} />}
      <div className={`p-3 rounded-lg max-w-[70%] ${type.isMine ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}>
        {type.message.files && type.message.files?.map(renderFile)}
        <p className="text-sm">{type.message.text}</p>
        {type.timestamp && <Caption className={cn(type.isMine && 'text-primary-400')}>{type.timestamp}</Caption>}
      </div>
    </div>
  );
}
