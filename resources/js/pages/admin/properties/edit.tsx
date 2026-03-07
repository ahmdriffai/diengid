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
import { toast } from 'sonner';

const propertyTypes = [
    { value: 'homestay', label: 'Homestay' },
    { value: 'villa', label: 'Villa' },
    { value: 'guesthost', label: 'Guesthost' },
];

export default function EditPropertyPage(): React.ReactNode {
    const { property, hosts } = usePage().props as any;

    const editForm = useForm({
        host_id: property.host_id ?? '',
        name: property.name ?? '',
        address: property.address ?? '',
        description: property.description ?? '',
        image_url: property.image_url ?? '',
        lat: property.lat?.toString() ?? '',
        lng: property.lng?.toString() ?? '',
        type: property.type ?? 'homestay',
    });

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault();

        editForm.put(`/admin/properties/${property.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Property updated successfully');
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat memperbarui property');
            },
        });
    }

    return (
        <div>
            <Title title="Edit Property" />
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm">Host</label>
                            <select
                                value={editForm.data.host_id}
                                onChange={(event) => editForm.setData('host_id', event.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">Pilih host</option>
                                {hosts.map((host: any) => (
                                    <option key={host.id} value={host.id}>
                                        {host.name}
                                    </option>
                                ))}
                            </select>
                            {editForm.errors.host_id && <p className="text-sm text-red-500">{editForm.errors.host_id}</p>}
                        </div>

                        <div>
                            <Input
                                placeholder="Nama Property"
                                value={editForm.data.name}
                                onChange={(event) => editForm.setData('name', event.target.value)}
                            />
                            {editForm.errors.name && <p className="text-sm text-red-500">{editForm.errors.name}</p>}
                        </div>

                        <div>
                            <Input
                                placeholder="Alamat Property"
                                value={editForm.data.address}
                                onChange={(event) => editForm.setData('address', event.target.value)}
                            />
                            {editForm.errors.address && <p className="text-sm text-red-500">{editForm.errors.address}</p>}
                        </div>

                        <div>
                            <textarea
                                placeholder="Deskripsi Property"
                                value={editForm.data.description}
                                onChange={(event) => editForm.setData('description', event.target.value)}
                                className="min-h-[110px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            />
                            {editForm.errors.description && <p className="text-sm text-red-500">{editForm.errors.description}</p>}
                        </div>

                        <div>
                            <Input
                                placeholder="Image URL (opsional)"
                                value={editForm.data.image_url}
                                onChange={(event) => editForm.setData('image_url', event.target.value)}
                            />
                            {editForm.errors.image_url && <p className="text-sm text-red-500">{editForm.errors.image_url}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Input
                                    type="number"
                                    step="any"
                                    placeholder="Latitude"
                                    value={editForm.data.lat}
                                    onChange={(event) => editForm.setData('lat', event.target.value)}
                                />
                                {editForm.errors.lat && <p className="text-sm text-red-500">{editForm.errors.lat}</p>}
                            </div>

                            <div>
                                <Input
                                    type="number"
                                    step="any"
                                    placeholder="Longitude"
                                    value={editForm.data.lng}
                                    onChange={(event) => editForm.setData('lng', event.target.value)}
                                />
                                {editForm.errors.lng && <p className="text-sm text-red-500">{editForm.errors.lng}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm">Tipe Property</label>
                            <select
                                value={editForm.data.type}
                                onChange={(event) => editForm.setData('type', event.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                {propertyTypes.map((propertyType) => (
                                    <option key={propertyType.value} value={propertyType.value}>
                                        {propertyType.label}
                                    </option>
                                ))}
                            </select>
                            {editForm.errors.type && <p className="text-sm text-red-500">{editForm.errors.type}</p>}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/admin/properties">Batal</Link>
                            </Button>
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
                </CardContent>
            </Card>
        </div>
    );
}

EditPropertyPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
