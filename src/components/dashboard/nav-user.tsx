"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth";

export function NavUser() {
  const user = getUser();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg">
              {user?.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.name}</span>
            <span className="truncate text-xs">{user?.email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
