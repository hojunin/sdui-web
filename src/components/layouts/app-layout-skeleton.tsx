import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export function AppLayoutSkeleton() {
  return (
    <>
      <aside className="fixed inset-y-0 z-30 hidden w-64 animate-pulse border-r bg-background lg:block">
        <div className="flex h-16 items-center gap-2 px-4">
          <div className="h-8 w-8 rounded-md bg-muted" />
          <div className="h-5 flex-1 rounded-md bg-muted" />
        </div>
        <div className="flex flex-col gap-4 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 rounded-md bg-muted" />
          ))}
        </div>
      </aside>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="h-5 w-32 rounded-md bg-muted" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="h-[calc(100vh-5rem)] animate-pulse rounded-xl bg-muted" />
        </div>
      </SidebarInset>
    </>
  );
}
