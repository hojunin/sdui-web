import { AppShell } from '@/components/layouts/app-shell';

export default function Dashboard() {
  return (
    <AppShell
      breadcrumbs={{
        items: [
          { href: '#', label: 'Building Your Application' },
          { label: 'Data Fetching' },
        ],
      }}
    >
      <div className="grid gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </AppShell>
  );
}
