import { AppLayout } from "@/components/layouts/app-layout";
import { AppLayoutSkeleton } from "@/components/layouts/app-layout-skeleton";
import { Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AppLayoutSkeleton />}>
      <AppLayout
        breadcrumbs={{
          items: [{ href: "/admin", label: "관리자" }, { label: "데이터" }],
        }}
      >
        {children}
      </AppLayout>
    </Suspense>
  );
}
