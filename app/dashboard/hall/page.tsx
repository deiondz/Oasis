import DashboardWidth from "../defaultstyle";
import { HallManagement } from "./hallmanagement";

function Page() {
  return (
    <DashboardWidth>
      <div className="py-3 ">
        <h2 className="lg:text-3xl text-2xl font-semibold">Manage Halls</h2>
        <p className="text-sm text-muted-foreground py-2">
          Manage the halls in your building. Add, edit, and delete halls as
          needed
        </p>
      </div>
      <HallManagement />
    </DashboardWidth>
  );
}

export default Page;
