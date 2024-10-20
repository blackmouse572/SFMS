import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@components/tailus-ui/Collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@components/tailus-ui/Sidebar';
import { Text } from '@components/tailus-ui/typography';
import { AdminAvatar, UserDropdown } from '@components/user-nav';
import { useUser } from '@lib/auth';
import { User } from '@lib/types';
import { IconChevronRight, IconDatabaseShare, IconSchool, IconUsersGroup } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

type SidebarItem = {
  title: string;
  href?: string;
  apiPath?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
};

const items: SidebarItem[] = [
  {
    title: 'Trang chủ',
    href: '/admin',
    icon: <IconDatabaseShare />,
  },
  {
    title: 'Quản lý',
    href: '/admin',
    children: [
      {
        title: 'Quản lý học bổng',
        href: '/admin/scholarship',
        icon: <IconSchool />,
        apiPath: '/api/v1/scholarship',
      },
      {
        title: 'Quản lý tài khoản',
        href: '/admin/users',
        icon: <IconUsersGroup />,
        apiPath: '/api/v1/users',
      },
    ],
  },
];

function AdminSidebar() {
  const user = useUser() as User;
  const { pathname } = useLocation();
  const renderItem = (item: SidebarItem, i: number) => {
    if (item.children) {
      return (
        <Collapsible key={item.title} className="group/collapsable" defaultOpen={i === 0}>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton isActive={pathname === item.href} variant="outline">
                {item.icon}
                <span>{item.title}</span>
                <IconChevronRight className="transition-transform ml-auto group-data-[state=open]/collapsable:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="border-l ml-2">{item.children.map((item, i) => renderItem(item, i))}</ul>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton isActive={pathname === item.href} variant="outline" asChild>
          <Link to={item.href ?? '/admin'}>
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };
  return (
    <Sidebar>
      <SidebarHeader className="flex-row items-center gap-2 p-2">
        <div className="flex-1 flex gap-2 items-center">
          <img src="/images/logo.jpg" width={40} height={40} className="rounded-full size-12" />
          <Text weight={'medium'}>{import.meta.env.VITE_APP_TITLE}</Text>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{items.map((item, i) => renderItem(item, i))}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <UserDropdown
          user={user}
          trigger={
            <div className="flex items-center gap-2 p-2 justify-between">
              <AdminAvatar size="lg" />
              <div className="flex-1">
                <Text>{user.name}</Text>
                <Text size="sm">{user.email}</Text>
              </div>
              <IconChevronRight />
            </div>
          }
        />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AdminSidebar;
