import {
  ReactNode,
  useState,
} from "react";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout = ({
  children,
  title,
  subtitle,
}: AdminLayoutProps) => {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f8fa]">
      {/* Mobile overlay */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* Main */}

      <div className="min-h-screen lg:pl-[270px]">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="px-5 py-7 sm:px-7 lg:px-9 lg:py-9">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;