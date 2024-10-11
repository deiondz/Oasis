import { HallGrid } from "./hallgrid";
import { HallHeader } from "./hallheader";

export function HallManagement() {
  return (
    <div className="space-y-4">
      <HallHeader />
      <HallGrid />
    </div>
  );
}
