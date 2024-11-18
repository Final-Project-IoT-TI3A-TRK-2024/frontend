"use client"

import * as React from "react"
import {
    Banknote, ChartNetwork,
    Coins,
    Command, Database,
    GlobeIcon,
    HandCoins,
    PieChart, Scroll,
    Settings2,
    Users
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const sidebarMenus = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
  ],
  project: [
    {
      name: "Dataset",
      url: "#",
      icon: Database,
    },
    {
      name: "Models",
      url: "#",
      icon: ChartNetwork,
    },
    {
      name: "Prediction Logs",
      url: "#",
      icon: Scroll,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">IoT Teraweh</span>
                  <span className="truncate text-xs">Atmint</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={sidebarMenus.project} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarMenus.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
