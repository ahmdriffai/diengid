/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardLayout from '@/components/admin/layouts/admin-layout';
import Title from '@/components/admin/title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Link, useForm, usePage } from '@inertiajs/react';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

const propertyTypes = [
    { value: 'homestay', label: 'Homestay' },
    { value: 'villa', label: 'Villa' },
    { value: 'guesthost', label: 'Guesthost' },
];

export default function CreatePropertyPage(): React.ReactNode {
    const { hosts } = usePage().props as any;
    const [isHostExisting, setIsHostExisting] = useState<boolean>(false);

    const createForm = useForm({
        host_id: '',
        user_name: '',
        user_email: '',
        user_password: '',
        user_password_confirmation: '',
        host_phone_number: '',
        host_profile_picture_url: '',
        host_address: '',
        host_bank_account_name: '',
        host_bank_account_number: '',
        host_ktp_number: '',
        host_bio: '',
        name: '',
        address: '',
        description: '',
        image_url: '',
        lat: '',
        lng: '',
        type: 'homestay',
    });

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault();

        createForm.post('/admin/properties', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Property created successfully');
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat membuat property');
            },
        });
    }

    return (
        <div>
            <Title title="Tambah Property" />
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex gap-3">
                                    <div className="relative flex w-6 shrink-0 justify-center">
                                        <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                                        <span className="absolute top-5 bottom-0 w-px bg-border" />
                                    </div>
                                    <div className="w-full space-y-3">
                                        <h4 className="text-sm font-semibold"> Pilih Host Existing (Opsional)</h4>
                                        <select
                                            value={createForm.data.host_id}
                                            onChange={(event) => {
                                                createForm.setData('host_id', event.target.value);
                                                if (event.target.value) {
                                                    setIsHostExisting(true);
                                                } else {
                                                    setIsHostExisting(false);
                                                }
                                            }}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="">Buat host baru dari form ini</option>
                                            {hosts.map((host: any) => (
                                                <option key={host.id} value={host.id}>
                                                    {host.name}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-xs text-muted-foreground">
                                            Jika host dipilih, section user dan host profile boleh dikosongkan.
                                        </p>
                                        {createForm.errors.host_id && <p className="text-sm text-red-500">{createForm.errors.host_id}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {!isHostExisting && (
                            <>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex gap-3">
                                            <div className="relative flex w-6 shrink-0 justify-center">
                                                <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                                                <span className="absolute top-5 bottom-0 w-px bg-border" />
                                            </div>
                                            <div className="w-full space-y-3">
                                                <h4 className="text-sm font-semibold">Data User</h4>
                                                <Input
                                                    placeholder="Nama User"
                                                    value={createForm.data.user_name}
                                                    onChange={(event) => createForm.setData('user_name', event.target.value)}
                                                />
                                                {createForm.errors.user_name && <p className="text-sm text-red-500">{createForm.errors.user_name}</p>}
                                                <Input
                                                    type="email"
                                                    placeholder="Email User"
                                                    value={createForm.data.user_email}
                                                    onChange={(event) => createForm.setData('user_email', event.target.value)}
                                                />
                                                {createForm.errors.user_email && (
                                                    <p className="text-sm text-red-500">{createForm.errors.user_email}</p>
                                                )}
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div>
                                                        <Input
                                                            type="password"
                                                            placeholder="Password User"
                                                            value={createForm.data.user_password}
                                                            onChange={(event) => createForm.setData('user_password', event.target.value)}
                                                        />
                                                        {createForm.errors.user_password && (
                                                            <p className="text-sm text-red-500">{createForm.errors.user_password}</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Input
                                                            type="password"
                                                            placeholder="Konfirmasi Password User"
                                                            value={createForm.data.user_password_confirmation}
                                                            onChange={(event) => createForm.setData('user_password_confirmation', event.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex gap-3">
                                            <div className="relative flex w-6 shrink-0 justify-center">
                                                <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                                                <span className="absolute top-5 bottom-0 w-px bg-border" />
                                            </div>
                                            <div className="w-full space-y-3">
                                                <h4 className="text-sm font-semibold">Data Host Profile</h4>
                                                <Input
                                                    placeholder="Nomor Telepon (opsional)"
                                                    value={createForm.data.host_phone_number}
                                                    onChange={(event) => createForm.setData('host_phone_number', event.target.value)}
                                                />
                                                {createForm.errors.host_phone_number && (
                                                    <p className="text-sm text-red-500">{createForm.errors.host_phone_number}</p>
                                                )}
                                                <Input
                                                    placeholder="Profile Picture URL (opsional)"
                                                    value={createForm.data.host_profile_picture_url}
                                                    onChange={(event) => createForm.setData('host_profile_picture_url', event.target.value)}
                                                />
                                                {createForm.errors.host_profile_picture_url && (
                                                    <p className="text-sm text-red-500">{createForm.errors.host_profile_picture_url}</p>
                                                )}
                                                <Input
                                                    placeholder="Alamat Host (opsional)"
                                                    value={createForm.data.host_address}
                                                    onChange={(event) => createForm.setData('host_address', event.target.value)}
                                                />
                                                {createForm.errors.host_address && (
                                                    <p className="text-sm text-red-500">{createForm.errors.host_address}</p>
                                                )}
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <Input
                                                        placeholder="Nama Rekening (opsional)"
                                                        value={createForm.data.host_bank_account_name}
                                                        onChange={(event) => createForm.setData('host_bank_account_name', event.target.value)}
                                                    />
                                                    <Input
                                                        placeholder="Nomor Rekening (opsional)"
                                                        value={createForm.data.host_bank_account_number}
                                                        onChange={(event) => createForm.setData('host_bank_account_number', event.target.value)}
                                                    />
                                                </div>
                                                {createForm.errors.host_bank_account_name && (
                                                    <p className="text-sm text-red-500">{createForm.errors.host_bank_account_name}</p>
                                                )}
                                                {createForm.errors.host_bank_account_number && (
                                                    <p className="text-sm text-red-500">{createForm.errors.host_bank_account_number}</p>
                                                )}
                                                <Input
                                                    placeholder="No KTP (opsional)"
                                                    value={createForm.data.host_ktp_number}
                                                    onChange={(event) => createForm.setData('host_ktp_number', event.target.value)}
                                                />
                                                {createForm.errors.host_ktp_number && (
                                                    <p className="text-sm text-red-500">{createForm.errors.host_ktp_number}</p>
                                                )}
                                                <textarea
                                                    placeholder="Bio Host (opsional)"
                                                    value={createForm.data.host_bio}
                                                    onChange={(event) => createForm.setData('host_bio', event.target.value)}
                                                    className="min-h-[90px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                                />
                                                {createForm.errors.host_bio && <p className="text-sm text-red-500">{createForm.errors.host_bio}</p>}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex gap-3">
                                    <div className="relative flex w-6 shrink-0 justify-center">
                                        <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                                    </div>
                                    <div className="w-full space-y-3">
                                        <h4 className="text-sm font-semibold">Data Property</h4>
                                        <div>
                                            <Input
                                                placeholder="Nama Property"
                                                value={createForm.data.name}
                                                onChange={(event) => createForm.setData('name', event.target.value)}
                                            />
                                            {createForm.errors.name && <p className="text-sm text-red-500">{createForm.errors.name}</p>}
                                        </div>

                                        <div>
                                            <Input
                                                placeholder="Alamat Property"
                                                value={createForm.data.address}
                                                onChange={(event) => createForm.setData('address', event.target.value)}
                                            />
                                            {createForm.errors.address && <p className="text-sm text-red-500">{createForm.errors.address}</p>}
                                        </div>

                                        <div>
                                            <textarea
                                                placeholder="Deskripsi Property"
                                                value={createForm.data.description}
                                                onChange={(event) => createForm.setData('description', event.target.value)}
                                                className="min-h-[110px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                            />
                                            {createForm.errors.description && <p className="text-sm text-red-500">{createForm.errors.description}</p>}
                                        </div>

                                        <div>
                                            <Input
                                                placeholder="Image URL (opsional)"
                                                value={createForm.data.image_url}
                                                onChange={(event) => createForm.setData('image_url', event.target.value)}
                                            />
                                            {createForm.errors.image_url && <p className="text-sm text-red-500">{createForm.errors.image_url}</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <Input
                                                    type="number"
                                                    step="any"
                                                    placeholder="Latitude"
                                                    value={createForm.data.lat}
                                                    onChange={(event) => createForm.setData('lat', event.target.value)}
                                                />
                                                {createForm.errors.lat && <p className="text-sm text-red-500">{createForm.errors.lat}</p>}
                                            </div>

                                            <div>
                                                <Input
                                                    type="number"
                                                    step="any"
                                                    placeholder="Longitude"
                                                    value={createForm.data.lng}
                                                    onChange={(event) => createForm.setData('lng', event.target.value)}
                                                />
                                                {createForm.errors.lng && <p className="text-sm text-red-500">{createForm.errors.lng}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm">Tipe Property</label>
                                            <select
                                                value={createForm.data.type}
                                                onChange={(event) => createForm.setData('type', event.target.value)}
                                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            >
                                                {propertyTypes.map((propertyType) => (
                                                    <option key={propertyType.value} value={propertyType.value}>
                                                        {propertyType.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {createForm.errors.type && <p className="text-sm text-red-500">{createForm.errors.type}</p>}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/admin/properties">Batal</Link>
                            </Button>
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
                </CardContent>
            </Card>
        </div>
    );
}

CreatePropertyPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
