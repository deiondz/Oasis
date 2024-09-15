import Sidebar from "@/components/layout/sidebar";
import Header from "@components/layout/header";
import MaxWidthContainer from "@components/layout/maxwidthcontainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard ",
  description: "Dashboard page",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-h-screen overflow-hidden">
      <Sidebar />
      <main className="w-full flex-1  overflow-y-auto">
        <Header />
        <MaxWidthContainer>{children}</MaxWidthContainer>
      </main>
    </div>
  );
}
