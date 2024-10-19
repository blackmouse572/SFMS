import Footer from '@components/Footer';
import MDX from '@components/MDX';
import { Navbar } from '@components/Navbar';
import { Outlet } from 'react-router-dom';
function ContentLayout() {
  return (
    <>
      <Navbar className="border-b" />
      <div className="min-h-screen container mx-auto">
        <MDX>
          <Outlet />
        </MDX>
      </div>
      <Footer />
    </>
  );
}

export default ContentLayout;
