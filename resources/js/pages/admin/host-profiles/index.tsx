/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardLayout from '@/components/admin/layouts/admin-layout';
import Title from '@/components/admin/title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router, useForm, usePage } from '@inertiajs/react';
import { Pencil, PlusSquare, Search, Trash2 } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function HostProfilePage(): React.ReactNode {
    const { hostProfiles, filters } = usePage().props as any;

    const [key, setKey] = useState(filters.key ?? '');
    const [size, setSize] = useState(filters.size ?? '10');
    const [editingHostProfile, setEditingHostProfile] = useState<any | null>(null);

    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        profile_picture_url: '',
        address: '',
        bank_account_name: '',
        bank_account_number: '',
        ktp_number: '',
        bio: '',
    });

    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        profile_picture_url: '',
        address: '',
        bank_account_name: '',
        bank_account_number: '',
        ktp_number: '',
        bio: '',
    });

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        router.get('/admin/host-profiles', { key, size, page: 1 }, { preserveState: true, replace: true });
    }

    function handleChangeSize(value: string) {
        setSize(value);

        router.get('/admin/host-profiles', { key, size: value, page: 1 }, { preserveState: true, replace: true });
    }

    function handlePageChange(url: string | null) {
        if (!url) {
            return;
        }

        router.visit(url, { preserveState: true });
    }

    function handleCreateSubmit(event: React.FormEvent) {
        event.preventDefault();

        createForm.post('/admin/host-profiles', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Host profile created successfully');
                createForm.reset();
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat membuat host profile');
            },
        });
    }

    function handleOpenEditDialog(hostProfile: any) {
        setEditingHostProfile(hostProfile);
        editForm.setData({
            name: hostProfile.user?.name ?? '',
            email: hostProfile.user?.email ?? '',
            password: '',
            password_confirmation: '',
            phone_number: hostProfile.phone_number ?? '',
            profile_picture_url: hostProfile.profile_picture_url ?? '',
            address: hostProfile.address ?? '',
            bank_account_name: hostProfile.bank_account_name ?? '',
            bank_account_number: hostProfile.bank_account_number ?? '',
            ktp_number: hostProfile.ktp_number ?? '',
            bio: hostProfile.bio ?? '',
        });
    }

    function handleEditSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!editingHostProfile) {
            return;
        }

        editForm.put(`/admin/host-profiles/${editingHostProfile.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Host profile updated successfully');
                setEditingHostProfile(null);
                editForm.reset('password', 'password_confirmation');
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat memperbarui host profile');
            },
        });
    }

    function handleDelete(hostProfileId: string) {
        if (!window.confirm('Hapus host profile ini?')) {
            return;
        }

        router.delete(`/admin/host-profiles/${hostProfileId}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Host profile deleted successfully');
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat menghapus host profile');
            },
        });
    }

    return (
        <div>
            <Title title="Data Host Profile" />

            <Card className="mb-5">
                <CardContent>
                    <div className="mb-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusSquare className="mr-2 h-4 w-4" />
                                    Tambah Host Profile
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-h-[85vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Tambah Host Profile</DialogTitle>
                                    <DialogDescription>Silakan lengkapi data user dan host profile baru.</DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleCreateSubmit} className="mt-4 space-y-4">
                                    <div>
                                        <Input placeholder="Nama User" value={createForm.data.name} onChange={(event) => createForm.setData('name', event.target.value)} />
                                        {createForm.errors.name && <p className="text-sm text-red-500">{createForm.errors.name}</p>}
                                    </div>

                                    <div>
                                        <Input
                                            type="email"
                                            placeholder="Email User"
                                            value={createForm.data.email}
                                            onChange={(event) => createForm.setData('email', event.target.value)}
                                        />
                                        {createForm.errors.email && <p className="text-sm text-red-500">{createForm.errors.email}</p>}
                                    </div>

                                    <div>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            value={createForm.data.password}
                                            onChange={(event) => createForm.setData('password', event.target.value)}
                                        />
                                        {createForm.errors.password && <p className="text-sm text-red-500">{createForm.errors.password}</p>}
                                    </div>

                                    <div>
                                        <Input
                                            type="password"
                                            placeholder="Konfirmasi Password"
                                            value={createForm.data.password_confirmation}
                                            onChange={(event) => createForm.setData('password_confirmation', event.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            placeholder="Nomor Telepon"
                                            value={createForm.data.phone_number}
                                            onChange={(event) => createForm.setData('phone_number', event.target.value)}
                                        />
                                        {createForm.errors.phone_number && <p className="text-sm text-red-500">{createForm.errors.phone_number}</p>}
                                    </div>

                                    <div>
                                        <Input
                                            type="url"
                                            placeholder="URL Foto Profil"
                                            value={createForm.data.profile_picture_url}
                                            onChange={(event) => createForm.setData('profile_picture_url', event.target.value)}
                                        />
                                        {createForm.errors.profile_picture_url && <p className="text-sm text-red-500">{createForm.errors.profile_picture_url}</p>}
                                    </div>

                                    <div>
                                        <Input
                                            placeholder="Alamat"
                                            value={createForm.data.address}
                                            onChange={(event) => createForm.setData('address', event.target.value)}
                                        />
                                        {createForm.errors.address && <p className="text-sm text-red-500">{createForm.errors.address}</p>}
                                    </div>

                                    <div>
                                        <Input
                                            placeholder="Nama Rekening"
                                            value={createForm.data.bank_account_name}
                                            onChange={(event) => createForm.setData('bank_account_name', event.target.value)}
                                        />
                                        {createForm.errors.bank_account_name && <p className="text-sm text-red-500">{createForm.errors.bank_account_name}</p>}
                                    </div>

                                    <div>
                                        <Input
                                            placeholder="Nomor Rekening"
                                            value={createForm.data.bank_account_number}
                                            onChange={(event) => createForm.setData('bank_account_number', event.target.value)}
                                        />
                                        {createForm.errors.bank_account_number && <p className="text-sm text-red-500">{createForm.errors.bank_account_number}</p>}
                                    </div>

                                    <div>
                                        <Input
                                            placeholder="Nomor KTP"
                                            value={createForm.data.ktp_number}
                                            onChange={(event) => createForm.setData('ktp_number', event.target.value)}
                                        />
                                        {createForm.errors.ktp_number && <p className="text-sm text-red-500">{createForm.errors.ktp_number}</p>}
                                    </div>

                                    <div>
                                        <textarea
                                            placeholder="Bio"
                                            value={createForm.data.bio}
                                            onChange={(event) => createForm.setData('bio', event.target.value)}
                                            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                        />
                                        {createForm.errors.bio && <p className="text-sm text-red-500">{createForm.errors.bio}</p>}
                                    </div>

                                    <div className="flex justify-end">
                                        {createForm.processing ? (
                                            <Button disabled>
                                                <Spinner />
                                                Loading...
                                            </Button>
                                        ) : (
                                            <Button type="submit">Simpan</Button>
                                        )}
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Input placeholder="Cari user / phone / alamat / bank..." value={key} onChange={(event) => setKey(event.target.value)} />

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
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Nomor Telepon</TableHead>
                                <TableHead>Alamat</TableHead>
                                <TableHead>Nama Rekening</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {hostProfiles.data.length > 0 ? (
                                hostProfiles.data.map((hostProfile: any) => (
                                    <TableRow key={hostProfile.id}>
                                        <TableCell>{hostProfile.user?.name ?? '-'}</TableCell>
                                        <TableCell>{hostProfile.user?.email ?? '-'}</TableCell>
                                        <TableCell>{hostProfile.phone_number ?? '-'}</TableCell>
                                        <TableCell>{hostProfile.address ?? '-'}</TableCell>
                                        <TableCell>{hostProfile.bank_account_name ?? '-'}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button type="button" variant="outline" size="icon" onClick={() => handleOpenEditDialog(hostProfile)}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>

                                                    <DialogContent className="max-h-[85vh] overflow-y-auto">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Host Profile</DialogTitle>
                                                            <DialogDescription>Perbarui data user dan host profile.</DialogDescription>
                                                        </DialogHeader>

                                                        <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
                                                            <div>
                                                                <Input
                                                                    placeholder="Nama User"
                                                                    value={editForm.data.name}
                                                                    onChange={(event) => editForm.setData('name', event.target.value)}
                                                                />
                                                                {editForm.errors.name && <p className="text-sm text-red-500">{editForm.errors.name}</p>}
                                                            </div>

                                                            <div>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="Email User"
                                                                    value={editForm.data.email}
                                                                    onChange={(event) => editForm.setData('email', event.target.value)}
                                                                />
                                                                {editForm.errors.email && <p className="text-sm text-red-500">{editForm.errors.email}</p>}
                                                            </div>

                                                            <div>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="Password baru (opsional)"
                                                                    value={editForm.data.password}
                                                                    onChange={(event) => editForm.setData('password', event.target.value)}
                                                                />
                                                                {editForm.errors.password && <p className="text-sm text-red-500">{editForm.errors.password}</p>}
                                                            </div>

                                                            <div>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="Konfirmasi Password baru"
                                                                    value={editForm.data.password_confirmation}
                                                                    onChange={(event) => editForm.setData('password_confirmation', event.target.value)}
                                                                />
                                                            </div>

                                                            <div>
                                                                <Input
                                                                    placeholder="Nomor Telepon"
                                                                    value={editForm.data.phone_number}
                                                                    onChange={(event) => editForm.setData('phone_number', event.target.value)}
                                                                />
                                                                {editForm.errors.phone_number && <p className="text-sm text-red-500">{editForm.errors.phone_number}</p>}
                                                            </div>

                                                            <div>
                                                                <Input
                                                                    type="url"
                                                                    placeholder="URL Foto Profil"
                                                                    value={editForm.data.profile_picture_url}
                                                                    onChange={(event) => editForm.setData('profile_picture_url', event.target.value)}
                                                                />
                                                                {editForm.errors.profile_picture_url && <p className="text-sm text-red-500">{editForm.errors.profile_picture_url}</p>}
                                                            </div>

                                                            <div>
                                                                <Input
                                                                    placeholder="Alamat"
                                                                    value={editForm.data.address}
                                                                    onChange={(event) => editForm.setData('address', event.target.value)}
                                                                />
                                                                {editForm.errors.address && <p className="text-sm text-red-500">{editForm.errors.address}</p>}
                                                            </div>

                                                            <div>
                                                                <Input
                                                                    placeholder="Nama Rekening"
                                                                    value={editForm.data.bank_account_name}
                                                                    onChange={(event) => editForm.setData('bank_account_name', event.target.value)}
                                                                />
                                                                {editForm.errors.bank_account_name && <p className="text-sm text-red-500">{editForm.errors.bank_account_name}</p>}
                                                            </div>

                                                            <div>
                                                                <Input
                                                                    placeholder="Nomor Rekening"
                                                                    value={editForm.data.bank_account_number}
                                                                    onChange={(event) => editForm.setData('bank_account_number', event.target.value)}
                                                                />
                                                                {editForm.errors.bank_account_number && <p className="text-sm text-red-500">{editForm.errors.bank_account_number}</p>}
                                                            </div>

                                                            <div>
                                                                <Input
                                                                    placeholder="Nomor KTP"
                                                                    value={editForm.data.ktp_number}
                                                                    onChange={(event) => editForm.setData('ktp_number', event.target.value)}
                                                                />
                                                                {editForm.errors.ktp_number && <p className="text-sm text-red-500">{editForm.errors.ktp_number}</p>}
                                                            </div>

                                                            <div>
                                                                <textarea
                                                                    placeholder="Bio"
                                                                    value={editForm.data.bio}
                                                                    onChange={(event) => editForm.setData('bio', event.target.value)}
                                                                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                                                />
                                                                {editForm.errors.bio && <p className="text-sm text-red-500">{editForm.errors.bio}</p>}
                                                            </div>

                                                            <div className="flex justify-end">
                                                                {editForm.processing ? (
                                                                    <Button disabled>
                                                                        <Spinner />
                                                                        Loading...
                                                                    </Button>
                                                                ) : (
                                                                    <Button type="submit">Update</Button>
                                                                )}
                                                            </div>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>

                                                <Button type="button" variant="destructive" size="icon" onClick={() => handleDelete(hostProfile.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">
                                        Data host profile belum ada.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className="mt-4 flex gap-2">
                        {hostProfiles.links?.map((link: any, index: number) => (
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

HostProfilePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
