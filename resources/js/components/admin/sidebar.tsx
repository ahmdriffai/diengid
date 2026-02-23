/* eslint-disable import/order */
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Settings, Users } from 'lucide-react';

const menus = [
    {
        title: 'Dashboard',
        href: 'admin',
        icon: LayoutDashboard,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
    },
];

export default function Sidebar() {
    const { url } = usePage();

    return (
        <aside className="hidden w-64 flex-col border-r bg-background md:flex">
            <div className="p-6 text-lg font-bold">Admin Panel</div>

            <nav className="flex-1 space-y-2 px-4">
                {menus.map((menu) => {
                    const Icon = menu.icon;
                    const isActive = url.startsWith(menu.href);

                    return (
                        <Link
                            key={menu.title}
                            href={menu.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                                isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {menu.title}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
