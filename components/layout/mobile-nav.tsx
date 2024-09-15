"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/constants/data";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { DashboardNav } from "./dashboardnav";
import { Drop } from "iconsax-react";
import Link from "next/link";

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <div className=" py-5 lg:block">
                <Link
                  href={"#"}
                  target="_blank"
                  className="flex items-center justify-start gap-2"
                >
                  <Drop size="32" variant="Broken" color="#FF8A65" />
                  <h1 className={`text-2xl  font-medium `}>Oasis</h1>
                </Link>
              </div>
              <div className="space-y-1">
                <DashboardNav
                  items={navItems}
                  isMobileNav={true}
                  setOpen={setOpen}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
