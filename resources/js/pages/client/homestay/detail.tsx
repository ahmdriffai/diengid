/* eslint-disable import/order */
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ScrollToTop } from '@/components/scroll-to-top';
import { listings } from '@/lib/data';
import { router } from '@inertiajs/react';
import { Check, ChevronLeft, Coffee, Heart, Home, MapPin, ParkingCircle, Share2, Star, Utensils, Wifi } from 'lucide-react';
import { useState } from 'react';

export default function ListingDetail() {
    const [, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const listing = listings.find((l) => l.id === Number(1));

    if (!listing) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-bold">Listing tidak ditemukan</h1>
                    <button onClick={() => router.visit('/')} className="rounded-lg bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700">
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        );
    }

    // Mock images - in real app these would come from the listing data
    const images = [
        listing.image,
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    ];

    const amenities = [
        { icon: Wifi, label: 'WiFi Gratis' },
        { icon: Utensils, label: 'Dapur' },
        { icon: ParkingCircle, label: 'Parkir Gratis' },
        { icon: Coffee, label: 'Sarapan' },
    ];

    const highlights = [
        'Check-in mandiri dengan lockbox',
        'Lokasi strategis dekat Bukit Sikunir',
        'Cocok untuk keluarga dan grup',
        'Kebersihan terjaga dengan protokol kesehatan',
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Back Button & Actions - Mobile */}
            <div className="fixed top-20 right-0 left-0 z-40 border-b border-gray-200 bg-white/80 px-4 py-2 backdrop-blur-sm md:hidden">
                <div className="flex items-center justify-between">
                    <button onClick={() => router.visit('/')} className="rounded-full bg-white p-2 shadow-md hover:bg-gray-50">
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex gap-2">
                        <button onClick={() => setIsFavorite(!isFavorite)} className="rounded-full bg-white p-2 shadow-md hover:bg-gray-50">
                            <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
                        </button>
                        <button className="rounded-full bg-white p-2 shadow-md hover:bg-gray-50">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 md:px-10 md:pt-32">
                {/* Back Button - Desktop */}
                <button onClick={() => router.visit('/')} className="mb-6 hidden items-center gap-2 text-gray-600 hover:text-gray-900 md:flex">
                    <ChevronLeft size={20} />
                    Kembali
                </button>

                {/* Title & Actions - Desktop */}
                <div className="mb-4 hidden items-start justify-between md:flex">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold">{listing.title}</h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1">
                                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{listing.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin size={16} />
                                <span>{listing.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                        >
                            <Heart size={18} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                            <span className="text-sm font-medium">Simpan</span>
                        </button>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                            <Share2 size={18} />
                            <span className="text-sm font-medium">Bagikan</span>
                        </button>
                    </div>
                </div>

                {/* Title Mobile */}
                <div className="mb-4 md:hidden">
                    <h1 className="mb-2 text-2xl font-bold">{listing.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{listing.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{listing.location}</span>
                        </div>
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="mb-8 grid grid-cols-1 gap-2 overflow-hidden rounded-xl md:grid-cols-4">
                    <div
                        className="h-[300px] cursor-pointer overflow-hidden md:col-span-2 md:row-span-2 md:h-[500px]"
                        onClick={() => setSelectedImage(0)}
                    >
                        <img
                            src={images[0]}
                            alt={listing.title}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    {images.slice(1, 5).map((img, idx) => (
                        <div key={idx} className="hidden h-[245px] cursor-pointer overflow-hidden md:block" onClick={() => setSelectedImage(idx + 1)}>
                            <img
                                src={img}
                                alt={`View ${idx + 2}`}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Details */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Host Info */}
                        <div className="border-b border-gray-200 pb-8">
                            <div className="mb-4 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                                    <Home size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Host: Bapak Suryo</h3>
                                    <p className="text-sm text-gray-600">Bergabung sejak 2020</p>
                                </div>
                            </div>
                            <p className="text-gray-700">{listing.description}</p>
                        </div>

                        {/* Highlights */}
                        <div className="border-b border-gray-200 pb-8">
                            <h2 className="mb-4 text-xl font-bold">Yang membuat spesial</h2>
                            <div className="space-y-3">
                                {highlights.map((highlight, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <Check size={20} className="mt-0.5 flex-shrink-0 text-emerald-600" />
                                        <span className="text-gray-700">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="border-b border-gray-200 pb-8">
                            <h2 className="mb-4 text-xl font-bold">Fasilitas</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {amenities.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <amenity.icon size={24} className="text-gray-600" />
                                        <span className="text-gray-700">{amenity.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="border-b border-gray-200 pb-8">
                            <h2 className="mb-4 text-xl font-bold">Tentang tempat ini</h2>
                            <p className="leading-relaxed text-gray-700">
                                Nikmati keindahan Dieng dari {listing.title}. Terletak strategis di {listing.location}, tempat ini menawarkan
                                kenyamanan dan pemandangan yang memukau. Cocok untuk wisatawan yang ingin menikmati keindahan alam Dieng sambil tetap
                                merasakan kenyamanan seperti di rumah.
                                <br />
                                <br />
                                Homestay kami dilengkapi dengan berbagai fasilitas untuk memastikan kenyamanan Anda selama menginap. Lokasi strategis
                                memudahkan akses ke berbagai destinasi wisata terkenal di Dieng.
                            </p>
                        </div>

                        {/* Location */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold">Lokasi</h2>
                            <div className="mb-4 flex items-start gap-2">
                                <MapPin size={20} className="mt-1 text-emerald-600" />
                                <div>
                                    <p className="font-medium">{listing.location}</p>
                                    <p className="text-sm text-gray-600">Dieng Plateau, Jawa Tengah</p>
                                </div>
                            </div>
                            <div className="flex h-[300px] w-full items-center justify-center rounded-lg bg-gray-200">
                                <div className="text-center text-gray-500">
                                    <MapPin size={40} className="mx-auto mb-2" />
                                    <p>Peta lokasi</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-xl border border-gray-200 p-6 shadow-lg">
                            <div className="mb-6">
                                <div className="mb-2 flex items-baseline gap-2">
                                    <span className="text-2xl font-bold">Rp {listing.price.toLocaleString('id-ID')}</span>
                                    <span className="text-gray-600">/ malam</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{listing.rating}</span>
                                    <span className="text-gray-600">· 24 ulasan</span>
                                </div>
                            </div>

                            <button
                                onClick={() => router.visit(`/booking/${listing.id}`)}
                                className="mb-4 w-full rounded-lg bg-emerald-600 py-3 font-bold text-white transition-colors hover:bg-emerald-700"
                            >
                                Pesan Sekarang
                            </button>

                            <p className="mb-4 text-center text-sm text-gray-600">Anda belum akan dikenakan biaya</p>

                            <div className="space-y-3 border-t border-gray-200 pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Harga per malam</span>
                                    <span>Rp {listing.price.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Biaya layanan</span>
                                    <span>Rp 25.000</span>
                                </div>
                            </div>

                            <div className="mt-4 border-t border-gray-200 pt-4">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>Rp {(listing.price + 25000).toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-12 border-t border-gray-200 pt-12">
                    <h2 className="mb-6 text-2xl font-bold">Ulasan tamu</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {[1, 2, 3, 4].map((review) => (
                            <div key={review} className="rounded-lg border border-gray-200 p-6">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-600">
                                        {review === 1 ? 'A' : review === 2 ? 'B' : review === 3 ? 'D' : 'S'}
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {review === 1 ? 'Andi' : review === 2 ? 'Budi' : review === 3 ? 'Dewi' : 'Sari'}
                                        </p>
                                        <p className="text-sm text-gray-600">Februari 2026</p>
                                    </div>
                                </div>
                                <div className="mb-2 flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-700">
                                    Tempat yang sangat nyaman dan bersih. Pemandangannya luar biasa, sangat cocok untuk liburan keluarga. Host-nya
                                    juga ramah dan helpful!
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar Mobile */}
            <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-gray-200 bg-white p-4 lg:hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold">Rp {listing.price.toLocaleString('id-ID')}</span>
                            <span className="text-sm text-gray-600">/ malam</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{listing.rating}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => router.visit(`/booking/${listing.id}`)}
                        className="rounded-lg bg-emerald-600 px-8 py-3 font-bold text-white transition-colors hover:bg-emerald-700"
                    >
                        Pesan
                    </button>
                </div>
            </div>

            <Footer />
            <ScrollToTop />
        </div>
    );
}
