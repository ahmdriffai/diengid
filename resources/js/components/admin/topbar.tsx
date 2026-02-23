/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePage } from '@inertiajs/react';
import { Bell, User } from 'lucide-react';
import { Button } from '../ui/button';

export default function Topbar() {
    const { props } = usePage() as any;

    const user = props.auth?.user;

    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="text-lg font-semibold">Admin Dashboard</div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>

                <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    {user?.name}
                </div>
            </div>
        </header>
    );
}
