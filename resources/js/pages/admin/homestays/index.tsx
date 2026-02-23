/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardLayout from '@/components/admin/layouts/admin-layout';
import Title from '@/components/admin/title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import CreateHomestay from './create';

export default function Homestay(): React.ReactNode {
    const { homestays, filters } = usePage().props as any;
    const [key, setKey] = useState(filters.key ?? '');
    const [size, setSize] = useState(filters.size ?? '10');

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.get('/admin/homestays', { key, size, page: 1 }, { preserveState: true, replace: true });
    }

    function handleChangeSize(value: string) {
        setSize(value);
        router.get('/admin/homestays', { key, size: value, page: 1 }, { preserveState: true, replace: true });
    }

    function handlePageChange(url: string | null) {
        if (!url) return;
        router.visit(url, { preserveState: true });
    }

    return (
        <div>
            <Title title="Data Homestay" />

            <Card className="mb-5">
                <CardContent>
                    <div className="mb-4">
                        <CreateHomestay />
                    </div>

                    <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Input placeholder="Cari nama / owner / alamat..." value={key} onChange={(e) => setKey(e.target.value)} />

                        <Select value={size} onValueChange={handleChangeSize}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih jumlah data" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Rows</SelectLabel>
                                    <SelectItem value="1">1</SelectItem>
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
                                <TableHead>Owner</TableHead>
                                <TableHead>No. WhatsApp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {homestays.data.length > 0 ? (
                                homestays.data.map((homestay: any) => (
                                    <TableRow key={homestay.id}>
                                        <TableCell>{homestay.name}</TableCell>
                                        <TableCell>{homestay.address}</TableCell>
                                        <TableCell>{homestay.owner}</TableCell>
                                        <TableCell>{homestay.whatsapp_number}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                                        Data homestay belum ada.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* contoh pagination simple kalau dari Laravel paginator */}
                    <div className="mt-4 flex gap-2">
                        {homestays.links?.map((link: any, i: number) => (
                            <Button
                                key={i}
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

Homestay.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
