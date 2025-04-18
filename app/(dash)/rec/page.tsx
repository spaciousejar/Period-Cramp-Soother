'use client'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation';
import { ModeToggle } from "@/components/mode-toggle"
import { UserButton, useUser } from '@clerk/nextjs'
import { Rec } from "@/components/Recommendations"

export default function Page() {
  const pathname = usePathname();
  const { user } = useUser();

  const userData = user ? {
    name: user.fullName || "User",
    email: user.emailAddresses[0]?.emailAddress || "",
    avatar: user.imageUrl || ""
  } : undefined;

  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Wellness
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Recommendations </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2 ml-auto">
              <ModeToggle />
              <UserButton />
            </div>
          </div>
        </header>
          <div className="flex justify-center flex-1 flex-col pt-4 px-4 sm:px-6 md:px-8 lg:px-10">
              <Rec userData={userData} />
          </div>
        </SidebarInset>
      </SidebarProvider>
  )
}
