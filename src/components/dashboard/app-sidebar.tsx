"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/dashboard/team-swicher";
import { NavUser } from "@/components/dashboard/nav-user";
import { useMenus } from "@/hooks/use-menus";
import { NavLink } from "@/components/dashboard/nav-link";
import { AppLayoutSkeleton } from "@/components/layouts/app-layout-skeleton";

export function AppSidebar() {
  const { menus, loading, error } = useMenus();

  if (loading) return <AppLayoutSkeleton />;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        {menus.map((menu) => (
          <div key={menu.id}>
            <NavLink href={menu.path}>{menu.label}</NavLink>
            {menu.children?.map((submenu) => (
              <div key={submenu.id} className="ml-4">
                <NavLink href={submenu.path}>{submenu.label}</NavLink>
                {submenu.children?.map((subsubmenu) => (
                  <div key={subsubmenu.id} className="ml-4">
                    <NavLink href={subsubmenu.path}>{subsubmenu.label}</NavLink>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

const teams = ["Musinsa", "Musinsa Global", "29CM", "SLDT", "EMPTY"];

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://via.placeholder.com/150",
};
