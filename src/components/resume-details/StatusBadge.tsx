import Badge from '@components/tailus-ui/Badge';
import { ResumeStatus } from '@lib/types';
import { BadgeProps } from '@tailus/themer';

function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge size="xs" className={className} intent={ColorMap[status as keyof typeof ResumeStatus]}>
      {status}
    </Badge>
  );
}

const ColorMap: Record<keyof typeof ResumeStatus, BadgeProps['intent']> = {
  APPROVED: 'success',
  PAID: 'info',
  DELETED: 'danger',
  PENDING: 'gray',
  REJECTED: 'warning',
};

export default StatusBadge;
