import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 w-full lg:ml-64 relative">
        <div className="mx-5 mb-5 mt-20 min-h-[81vh] ">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
