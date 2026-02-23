/* eslint-disable @typescript-eslint/no-explicit-any */

import DashboardLayout from '@/components/admin/layouts/admin-layout';

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
    );
}

Dashboard.layout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
