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
      <AppLayout
        breadcrumbs={{
          items: [
            { href: "/dashboard", label: "대시보드" },
            { label: "데이터" },
          ],
        }}
      >
        {children}
      </AppLayout>
    </Suspense>
  );
}
