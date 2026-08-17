import { useState } from "react";
import { useOutletContext, Outlet } from "react-router-dom";

export type DashboardLayoutContextType = {
  user: { name: string; isAdmin: boolean };
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = { name: "Vivek", isAdmin: true };

  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <nav className="bg-gray-800 text-white p-4">
          Sidebar status: {sidebarOpen ? "Open" : "Closed"}
        </nav>
        <br />

        <div className="flex-1 p-4">
          <Outlet
            context={
              {
                user,
                sidebarOpen,
                setSidebarOpen,
              } as DashboardLayoutContextType
            }
          />
        </div>
      </div>
    </>
  );
}

export function useDashboardLayoutContext() {
  return useOutletContext<DashboardLayoutContextType>();
}
