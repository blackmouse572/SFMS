export type ChatListProps = {
  children?: React.ReactNode;
};

export function ChatList(type: ChatListProps) {
  return <div className="flex flex-col divide-y-2 divide-gray-100">{type.children}</div>;
}
