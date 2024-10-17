import { Outlet } from 'react-router-dom';

function IndexLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default IndexLayout;
