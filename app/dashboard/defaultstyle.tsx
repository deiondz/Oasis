import React from "react";

function DashboardWidth({ children }: { children: React.ReactNode }) {
  return <div className="pb-10 py-4 space-y-4">{children}</div>;
}

export default DashboardWidth;
