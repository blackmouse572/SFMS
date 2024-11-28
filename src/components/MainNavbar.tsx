import AdvisorContactDialog from '@components/AdvisorContactDialog';
import SubscribeDialog from '@components/subscriber/SubscribeDialog';
import Button from '@components/tailus-ui/Button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@components/tailus-ui/NavigationMenu';
import { Text } from '@components/tailus-ui/typography';
import { useIsAuthenticated } from '@lib/auth';
import axios from '@lib/axios';
import { IResponse } from '@lib/types';
import { cn } from '@lib/utils';
import { Root as NavigationMenuPrimitiveRoot } from '@radix-ui/react-navigation-menu';
import { IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { Link } from 'react-router-dom';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Học bổng',
    href: '/tu-van-du-hoc',
    description: 'Chương trình học bổng và lựa chọn phù hợp',
  },
  {
    title: 'Du học',
    href: '/tu-van-du-hoc',
    description: 'Chương trình du học các nước',
  },
  {
    title: 'Điều kiện du học',
    href: '/tu-van-du-hoc',
    description: 'Điều kiện được phép đi du học',
  },
  {
    title: 'FAQ',
    href: '/tu-van-du-hoc',
    description: 'Những câu hỏi thường gặp trong học bổng',
  },
];

function useGetListLocation() {
  return useQuery({
    queryKey: ['listLocation'],
    queryFn: async () => {
      return axios.get<IResponse<Record<string, string[]>>>('/scholarship/list-location').then((res) => res.data.data);
    },
  });
}

function useGetListStudy() {
  return useQuery({
    queryKey: ['listStudy'],
    queryFn: async () => {
      return axios.get<IResponse<Record<string, string[]>>>('/study/list-location').then((res) => res.data.data);
    },
  });
}

export function Navbar({ className, ...props }: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitiveRoot>) {
  const { isLoading, data } = useGetListLocation();
  const { isLoading: isLoadingStudy, data: dataStudy } = useGetListStudy();
  const isAuth = useIsAuthenticated();
  return (
    <NavigationMenu {...props} className={cn('flex justify-between w-full max-w-none [&>.viewport]:left-48', className)}>
      <NavigationMenuList>
        <img className="size-16" src="/images/logo.jpg" alt="Logo" />
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Trang chủ</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Du học</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 lg:w-[80vw] w-[50vw] w lg:grid-cols-[.75fr_1fr_1fr_1fr]">
              {isLoadingStudy && (
                <li>
                  <Text>Loading...</Text>
                </li>
              )}
              {dataStudy &&
                Object.entries(dataStudy ?? {}).map(([continent, countries]) => (
                  <div key={continent}>
                    <Text weight={'bold'}>{continent}</Text>
                    {countries.map((country) => (
                      <ListItem key={country} title={country} href={`/du-hoc?location=${country}`} />
                    ))}
                  </div>
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Học bổng</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[50vw] lg:grid-cols-[.75fr_1fr_1fr]">
              {isLoading && (
                <li>
                  <Text>Loading...</Text>
                </li>
              )}
              {data &&
                Object.entries(data ?? {}).map(([continent, countries]) => (
                  <div key={continent}>
                    <Text weight={'bold'}>{continent}</Text>
                    {countries.map((country) => (
                      <ListItem key={country} title={country} href={`/hoc-bong?location=${country}`} />
                    ))}
                  </div>
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/kiem-tra">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Làm bài kiểm tra</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>{isAuth && <SubscribeDialog />}</NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <Button.Root variant="outlined" size="sm" intent="gray" href="/hoc-bong">
          <Button.Icon type="leading">
            <IconSearch />
          </Button.Icon>
          <Button.Label>Tìm kiếm Học bổng</Button.Label>
        </Button.Root>
        <AdvisorContactDialog />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-btn p-3 leading-none no-underline outline-none transition-colors hover:bg-[--ui-soft-bg] hover:text-display focus:bg-[--ui-soft-bg] focus:text-display h-full',
            className
          )}
          to={props.href ?? ''}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-caption">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
