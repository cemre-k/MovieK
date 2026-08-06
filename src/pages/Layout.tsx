import Header from "@/components/Header";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <Outlet />
    </div>
  );
}

export default Layout;
