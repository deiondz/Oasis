"use client";

import { cn } from "@/lib/utils";

import { useSidebar } from "@/hooks/useSidebar";
import { navItems } from "@constants/data";
import { useAtom } from "jotai";
import Link from "next/link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Drop } from "iconsax-react";
import { H3 } from "@components/typography/h3";
import { DashboardNav } from "./dashboardnav";
type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const [isMinimized, toggle] = useAtom(useSidebar);

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative  hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? "w-72" : "w-[72px]",
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link
          href={"#"}
          target="_blank"
          className="lg:flex items-center justify-start gap-2"
        >
          <Drop size="32" variant="Broken" color="#FF8A65" />

          {!isMinimized ? (
            <h1 className={`text-2xl  font-medium`}>Oasis</h1>
          ) : (
            ""
          )}
        </Link>
      </div>
      <ChevronLeftIcon
        className={cn(
          "absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}
