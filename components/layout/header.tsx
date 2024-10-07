import { cn } from "@lib/utils";
import { MobileSidebar } from "./mobile-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

export default function Header() {
  return (
    <header className="sticky bg-slate-50 border-b inset-x-0 z-20 top-0 w-full">
      <nav className="flex items-center justify-between px-6 py-4 md:justify-end">
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>
        <div className="flex items-center gap-2">
          <div className="border-4 border-white rounded-full shadow-2xl">
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/women/23.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>
    </header>
  );
}
