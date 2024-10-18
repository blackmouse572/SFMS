import Button from '@components/tailus-ui/Button';
import DropdownMenu from '@components/tailus-ui/DropdownMenu';
import { Caption, Title } from '@components/tailus-ui/typography';
import { useAuth } from '@lib/auth';
import { User } from '@lib/types';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { IconHelpCircle, IconLogout2, IconMessageCircleQuestion, IconSettings2, IconUser, IconWallpaper } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AdminAvatar } from './AdminAvatar';

type UserDropdownProps = {
  user: User;
} & DropdownMenuProps;
export const UserDropdown = ({ user, ...props }: UserDropdownProps) => {
  const logout = useAuth((s) => s.logout);
  const go = useNavigate();
  const handleLogout = () => {
    logout();
    toast.success('Đăng xuất thành công', {
      description: (
        <Button.Root onClick={() => go('/login')} variant="outlined" size="xs" intent="gray">
          <Button.Label>Đăng nhập</Button.Label>
        </Button.Root>
      ),
    });
  };
  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger className="rounded-[--avatar-radius] hover:ring ring-[--ui-soft-bg] data-[state=open]:ring">
        <AdminAvatar />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          mixed
          align="end"
          sideOffset={6}
          intent="gray"
          variant="soft"
          className="z-50 dark:[--caption-text-color:theme(colors.gray.400)]"
        >
          <div className="grid gap-3 [grid-template-columns:auto_1fr] p-3">
            <AdminAvatar />
            <div>
              <Title className="text-sm" as="span" weight="medium">
                {user.name}
              </Title>
              <Caption>{user.email}</Caption>

              <div className="mt-4 grid grid-cols-2 gap-3" data-rounded="large">
                {user.role.name === 'ADMIN' ||
                  (user.role.name === 'SUPER_ADMIN' && (
                    <Button.Root className="bg-gray-50" variant="outlined" size="xs" intent="gray" href="/dashboard">
                      <Button.Icon size="xs" type="leading">
                        <IconSettings2 />
                      </Button.Icon>
                      <Button.Label>Quản lý</Button.Label>
                    </Button.Root>
                  ))}
                <Button.Root onClick={handleLogout} className="bg-gray-50" variant="outlined" size="xs" intent="gray">
                  <Button.Icon size="xs" type="leading">
                    <IconLogout2 />
                  </Button.Icon>
                  <Button.Label>Đăng xuất</Button.Label>
                </Button.Root>
              </div>
            </div>
          </div>
          <DropdownMenu.Separator />
          <Link to="/profile">
            <DropdownMenu.Item>
              <DropdownMenu.Icon>
                <IconUser />
              </DropdownMenu.Icon>
              Tài khoản
            </DropdownMenu.Item>
          </Link>
          <Link to="/blog">
            <DropdownMenu.Item>
              <DropdownMenu.Icon>
                <IconWallpaper />
              </DropdownMenu.Icon>
              Bài viết
            </DropdownMenu.Item>
          </Link>
          <Link to="/settings">
            <DropdownMenu.Item>
              <DropdownMenu.Icon>
                <IconSettings2 />
              </DropdownMenu.Icon>
              Cài đặt
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <DropdownMenu.Icon>
              <IconHelpCircle />
            </DropdownMenu.Icon>
            Hỗ trợ
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <DropdownMenu.Icon>
              <IconMessageCircleQuestion />
            </DropdownMenu.Icon>
            Phản hồi
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
