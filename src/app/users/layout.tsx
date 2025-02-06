import { AppLayout } from "@/components/layouts/app-layout";
import { AppLayoutSkeleton } from "@/components/layouts/app-layout-skeleton";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AppLayoutSkeleton />}>
      <AppLayout>{children}</AppLayout>
    </Suspense>
  );
}
