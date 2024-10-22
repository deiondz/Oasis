import { Button } from "@components/ui/button";
import { AddCircle, Filter } from "iconsax-react";

export function HallHeader() {
  return (
    <div className="w-full flex items-center justify-start gap-4">
      <Button variant="outline" className="flex items-center gap-2">
        <AddCircle size={16} color="black"/>
        <span className="lg:block hidden">Add Hall</span>
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Filter size={16} color="black"/>
        <span className="lg:block hidden">Filter</span>
      </Button>
    </div>
  );
}
