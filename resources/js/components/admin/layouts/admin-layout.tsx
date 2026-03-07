/* eslint-disable import/order */
import { BadgeCheck, Bell, CalendarClock, CreditCard, Home, LogOut, Settings, Sparkles, TentTree } from 'lucide-react';
import type React from 'react';

type AdminNavItem = {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
        title: string;
        url: string;
    }[];
};

const defaultNavigation: AdminNavItem[] = [
    {
        title: 'Dashboard',
        url: '/admin',
        icon: Home,
    },
    {
        title: 'Tour Management',
        url: '#',
        icon: TentTree,
        items: [
            {
                title: 'Daftar Tour',
                url: '/admin/tours',
            },
            {
                title: 'Kategori Tour',
                url: '/admin/tour-categories',
            },
        ],
    },
    {
        title: 'Booking Management',
        url: '#',
        icon: CalendarClock,
        items: [
            {
                title: 'Semua Booking',
                url: '/admin/bookings',
            },
            {
                title: 'Pembayaran',
                url: '/admin/payments',
            },
        ],
    },
    {
        title: 'Jeep Management',
        url: '#',
        icon: CreditCard,
        items: [
            {
                title: 'Data Jeep',
                url: '/admin/jeeps',
            },
            {
                title: 'Driver Jeep',
                url: '/admin/jeep-drivers',
            },
        ],
    },
    {
        title: 'Property Management',
        url: '#',
        icon: BadgeCheck,
        items: [
            {
                title: 'Data Property',
                url: '/admin/properties',
            },
            {
                title: 'Host Homestay',
                url: '/admin/hosts',
            },
        ],
    },
    {
        title: 'Wisata Management',
        url: '#',
        icon: Sparkles,
        items: [
            {
                title: 'Destinasi Wisata',
                url: '/admin/wisata',
            },
            {
                title: 'Kategori Wisata',
                url: '/admin/wisata-categories',
            },
        ],
    },
    {
        title: 'Kuliner Wisata',
        url: '/admin/kuliner-wisata',
        icon: Bell,
    },
    {
        title: 'Pengaturan',
        url: '/admin/settings',
        icon: Settings,
    },
];

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: defaultNavigation,
};

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
    navigation?: AdminNavItem[];
}
export default function AdminLayout({ children, title = 'Admin Dashboard', navigation = data.navMain }: AdminLayoutProps): React.ReactNode {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <AppSidebar navItems={navigation} variant="inset" />
            <SidebarInset>
                <SiteHeader title={title} />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                <Toaster richColors position="top-center" />
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="flex items-center justify-between border-t p-4">
                    <p className="text-xs">© 2025 Developed by diengs.id</p>
                    <div className="flex gap-x-2">
                        <a href="https://apps.apple.com/gb/app/apple-store/id375380948" target="_blank">
                            <img src="./getin-as.png" className="w-20" alt="" />
                        </a>
                        <a href="https://play.google.com/store/games?hl=en" target="_blank">
                            <img src="./getin-gp.png" className="w-20" alt="" />
                        </a>
                    </div>
                </footer>
            </SidebarInset>
        </SidebarProvider>
    );
}

export const DashboardLayout = AdminLayout;

export function AppSidebar({ navItems = data.navMain, ...props }: React.ComponentProps<typeof Sidebar> & { navItems?: AdminNavItem[] }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <TentTree className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Diengs.id</span>
                                    <span className="truncate text-xs">Enterprise</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>
        </Sidebar>
    );
}

import { ChevronRight, type LucideIcon } from 'lucide-react';

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    const { url: pathname } = usePage();

    const isActive = (url: string) => pathname === url || pathname.startsWith(url + '/');

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasActiveChild = item.items?.some((sub) => isActive(sub.url));

                    return (
                        <Collapsible key={item.title} asChild defaultOpen={hasActiveChild} className="group/collapsible">
                            {item.items ? (
                                <SidebarMenuItem>
                                    <CollapsibleTrigger
                                        className={`py-5 ${hasActiveChild ? 'bg-sidebar-accent font-medium text-primary' : ''}`}
                                        asChild
                                    >
                                        <SidebarMenuButton className="text-sm" tooltip={item.title}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton
                                                        className={`${isActive(subItem.url) ? 'font-medium text-primary' : ''}`}
                                                        asChild
                                                    >
                                                        <Link className="text-sm" href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            ) : (
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        className={`py-5 ${isActive(item.url) ? 'bg-sidebar-accent font-medium text-primary' : ''}`}
                                        tooltip={item.title}
                                    >
                                        <Link href={item.url}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { SidebarGroup, SidebarGroupLabel, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarTrigger } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import type { ReactNode } from 'react';
import { ModeToggle } from '../mode-toogle';

export function SiteHeader({ title = 'Admin Dashboard' }: { title?: string }) {
    const user: { name: string; email: string; avatar: string } = {
        name: 'Ahmad',
        email: 'rifai@gmail.com',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Milo',
    };
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b py-8 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                <h1 className="text-base font-medium">{title}</h1>
                <div className="ml-auto flex items-center gap-2">
                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Avatar className="h-8 w-8 cursor-pointer rounded-sm">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-sm text-sm">CN</AvatarFallback>{' '}
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            // side={isMobile ? "bottom" : "right"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user.name}</span>
                                        <span className="truncate text-xs">{user.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Sparkles />
                                    Upgrade to Pro
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <BadgeCheck />
                                    Account
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard />
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Bell />
                                    Notifications
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <Link href="/logout">
                                <DropdownMenuItem>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
