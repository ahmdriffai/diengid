/* eslint-disable import/order */
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useForm } from '@inertiajs/react';
import { PlusSquare } from 'lucide-react';
import type React from 'react';
import { toast } from 'sonner';

export default function CreateHomestay(): React.ReactNode {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        address: '',
        owner: '',
        description: '',
        image_url: '',
        whatsapp_number: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        post('/admin/homestays', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Homestay created successfully');
                reset();
            },
            onError: () => {
                toast.error('Terjadi kesalahan');
            },
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusSquare className="mr-2 h-4 w-4" />
                    Tambah Homestay
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Data Homestay</DialogTitle>
                    <DialogDescription>Silakan lengkapi data homestay baru.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <Input placeholder="Nama Homestay" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <Input placeholder="Alamat" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                    </div>

                    <div>
                        <Input placeholder="Nama Owner" value={data.owner} onChange={(e) => setData('owner', e.target.value)} />
                        {errors.owner && <p className="text-sm text-red-500">{errors.owner}</p>}
                    </div>

                    <div>
                        <textarea
                            placeholder="Deskripsi Homestay"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="min-h-[110px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <div>
                        <Input
                            type="url"
                            placeholder="URL Gambar (opsional)"
                            value={data.image_url}
                            onChange={(e) => setData('image_url', e.target.value)}
                        />
                        {errors.image_url && <p className="text-sm text-red-500">{errors.image_url}</p>}
                    </div>

                    <div>
                        <Input
                            placeholder="Nomor WhatsApp"
                            value={data.whatsapp_number}
                            onChange={(e) => setData('whatsapp_number', e.target.value)}
                        />
                        {errors.whatsapp_number && <p className="text-sm text-red-500">{errors.whatsapp_number}</p>}
                    </div>

                    <div className="flex justify-end">
                        {processing ? (
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
    );
}
