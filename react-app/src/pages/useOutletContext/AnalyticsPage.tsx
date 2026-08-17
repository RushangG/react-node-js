import { useDashboardLayoutContext } from "./DashboardLayout";

export default function AnalyticsPage() {
    const { user, sidebarOpen, setSidebarOpen } = useDashboardLayoutContext();

    return (<>
        <h1>Analytics Page</h1>
        <p>User: {user.name}</p>
        <p>Is Admin: {user.isAdmin ? "Yes" : "No"}</p>
        <p>Sidebar status: {sidebarOpen ? "Open" : "Closed"}</p>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            Toggle Sidebar
        </button>
    </>);
}