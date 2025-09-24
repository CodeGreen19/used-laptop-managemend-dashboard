"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { NavMenu } from "@/module/dashboard/layout/nav-menu";
import { NavUser } from "@/module/dashboard/layout/nav-user";
import { SideBarData } from "../constants";
import NavLogo from "./nav-logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isPending, data: userData } = authClient.useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu menu={SideBarData.menu} />
      </SidebarContent>
      <SidebarFooter>
        {isPending ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          userData?.user && (
            <NavUser
              user={{
                name: userData.user.name,
                avatar: userData.user.image ?? "",
                email: userData.user.email,
              }}
            />
          )
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
