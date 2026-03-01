/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
import { BookingModal } from '@/components/booking-modal';
import { Categories } from '@/components/categories';
import { Hero } from '@/components/hero';
import { ListingCard } from '@/components/listing-card';
import { WhyChooseUs } from '@/components/why-choose-us';
import { listings } from '@/lib/data';
import { router } from '@inertiajs/react';
import { Map } from 'lucide-react';
import { useState } from 'react';
import Layout from './layouts';

export default function Welcome() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Homestay');
    const [selectedListing, setSelectedListing] = useState<any>(null);

    const filteredListings = selectedCategory
        ? listings.filter((listing) => listing.category === selectedCategory || (selectedCategory === 'Wisata' && listing.category === 'Wisata'))
        : listings;

    return (
        <Layout>
            <Hero />
            {/* <PromoSection /> */}

            <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            <div className="container mx-auto mt-6 min-h-125 px-4 pb-20 md:px-10">
                {filteredListings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-2 text-2xl font-semibold">Belum ada listing untuk kategori ini</div>
                        <p className="text-gray-500">Coba pilih kategori lain seperti Homestay atau Jeep Tour.</p>
                        <button
                            onClick={() => setSelectedCategory('Homestay')}
                            className="mt-6 rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white transition-colors hover:bg-emerald-700"
                        >
                            Lihat Semua Homestay
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredListings.map((listing) => (
                            <div key={listing.id} onClick={() => router.visit(`/homestays/id`)}>
                                <ListingCard listing={listing} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <BookingModal listing={selectedListing} isOpen={!!selectedListing} onClose={() => setSelectedListing(null)} />

            <div className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2 md:hidden">
                <button className="flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105">
                    <Map size={16} />
                    Peta
                </button>
            </div>
            <WhyChooseUs />
        </Layout>
    );
}
