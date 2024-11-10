import Badge from '@components/tailus-ui/Badge';
import { AdvisoryStatus } from '@lib/types';
import { BadgeProps } from '@tailus/themer';

function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge size="xs" className={className} intent={ColorMap[status as keyof typeof AdvisoryStatus]}>
      {status}
    </Badge>
  );
}

const ColorMap: Record<keyof typeof AdvisoryStatus, BadgeProps['intent']> = {
  'Hoàn Thành Tư Vấn': 'success',
  'Đang Chờ Tư Vấn': 'warning',
  'Đang Tư Vấn': 'primary',
};

export default StatusBadge;
