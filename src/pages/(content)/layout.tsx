import Footer from '@components/Footer';
import MDX from '@components/MDX';
import { Navbar } from '@components/MainNavbar';
import { SecondaryNavbar } from '@components/SecondaryNavbar';
import { AdminBreadcrumb, BreadcrumbProvider } from '@components/admin-breadcrumb/AdminBreadcrumb';
import { ChatPopover } from '@components/messages';
import MessagePopoverProvider from '@components/messages/MessagePopoverProvider';
import { OpenProvider } from '@components/messages/useOpenProvider';
import { useIsAuthenticated } from '@lib/auth';
import { Outlet } from 'react-router-dom';
function ContentLayout() {
  const isAuth = useIsAuthenticated();
  return (
    <BreadcrumbProvider>
      <OpenProvider>
        <SecondaryNavbar />
        <MessagePopoverProvider>
          <Navbar className="border-b" />
          <div className="min-h-screen container mx-auto pt-4">
            <MDX>
              <AdminBreadcrumb />
              <Outlet />
            </MDX>
          </div>
          {isAuth && <ChatPopover />}
        </MessagePopoverProvider>
        <Footer />
      </OpenProvider>
    </BreadcrumbProvider>
  );
}

export default ContentLayout;
