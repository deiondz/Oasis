import React from "react";
import DashboardWidth from "../defaultstyle";

function Page() {
  return (
    <DashboardWidth>
      <div className="py-3 ">
        <h2 className="lg:text-3xl text-2xl font-semibold">Manage Users</h2>
        <p className="text-sm text-muted-foreground py-2">
          Manage the users in your institution. Add, edit, and delete users as
          needed
        </p>
      </div>
    </DashboardWidth>
  );
}

export default Page;
