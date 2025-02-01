import { AppLayout } from '@/components/layouts/app-layout';
import { Suspense } from 'react';
import { AppLayoutSkeleton } from '@/components/layouts/app-layout-skeleton';

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
            { href: '#', label: 'Building Your Application' },
            { label: 'Data Fetching' },
          ],
        }}
      >
        {children}
      </AppLayout>
    </Suspense>
  );
}
