/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardLayout from '@/components/admin/layouts/admin-layout';
import Title from '@/components/admin/title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, router, usePage } from '@inertiajs/react';
import { Pencil, PlusSquare, Search, Trash2 } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PropertyPage(): React.ReactNode {
    const { properties, filters, hosts } = usePage().props as any;

    const [key, setKey] = useState(filters.key ?? '');
    const [size, setSize] = useState(filters.size ?? '10');
    const [hostFilter, setHostFilter] = useState(filters.host_id ?? 'all');

    function handleSearch(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        router.get(
            '/admin/properties',
            {
                key,
                size,
                host_id: hostFilter === 'all' ? undefined : hostFilter,
                page: 1,
            },
            { preserveState: true, replace: true },
        );
    }

    function handleChangeSize(value: string): void {
        setSize(value);

        router.get(
            '/admin/properties',
            {
                key,
                size: value,
                host_id: hostFilter === 'all' ? undefined : hostFilter,
                page: 1,
            },
            { preserveState: true, replace: true },
        );
    }

    function handleChangeHostFilter(value: string): void {
        setHostFilter(value);

        router.get(
            '/admin/properties',
            {
                key,
                size,
                host_id: value === 'all' ? undefined : value,
                page: 1,
            },
            { preserveState: true, replace: true },
        );
    }

    function handlePageChange(url: string | null): void {
        if (!url) {
            return;
        }

        router.visit(url, { preserveState: true });
    }

    function handleDelete(propertyId: string): void {
        if (!window.confirm('Hapus property ini?')) {
            return;
        }

        router.delete(`/admin/properties/${propertyId}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Property deleted successfully');
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat menghapus property');
            },
        });
    }

    return (
        <div>
            <Title title="Data Property" />
            <Card className="mb-5">
                <CardContent>
                    <div className="mb-4">
                        <Button asChild>
                            <Link href="/admin/properties/create">
                                <PlusSquare className="mr-2 h-4 w-4" />
                                Tambah Property
                            </Link>
                        </Button>
                    </div>

                    <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-5">
                        <Input placeholder="Cari nama / alamat..." value={key} onChange={(event) => setKey(event.target.value)} />

                        <select
                            value={hostFilter}
                            onChange={(event) => handleChangeHostFilter(event.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="all">Semua Host</option>
                            {hosts.map((host: any) => (
                                <option key={host.id} value={host.id}>
                                    {host.name}
                                </option>
                            ))}
                        </select>

                        <Select value={size} onValueChange={handleChangeSize}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih jumlah data" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Rows</SelectLabel>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button type="submit" className="gap-2">
                            <Search className="h-4 w-4" />
                            Cari
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Alamat</TableHead>
                                <TableHead>Host</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {properties.data.length > 0 ? (
                                properties.data.map((property: any) => (
                                    <TableRow key={property.id}>
                                        <TableCell>{property.name}</TableCell>
                                        <TableCell>{property.address}</TableCell>
                                        <TableCell>{property.host_profile?.user?.name ?? '-'}</TableCell>
                                        <TableCell className="capitalize">{property.type}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button type="button" variant="outline" size="icon" asChild>
                                                    <Link href={`/admin/properties/${property.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                <Button type="button" variant="destructive" size="icon" onClick={() => handleDelete(property.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                                        Data property belum ada.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className="mt-4 flex gap-2">
                        {properties.links?.map((link: any, index: number) => (
                            <Button
                                key={index}
                                type="button"
                                variant={link.active ? 'default' : 'outline'}
                                disabled={!link.url}
                                onClick={() => handlePageChange(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

PropertyPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
