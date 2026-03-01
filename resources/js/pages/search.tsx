/* eslint-disable import/order */
import { Breadcrumb } from '@/components/breadcrumb';
import { router, usePage } from '@inertiajs/react';
import { Filter, Search, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SearchListingCard } from '@/components/search-listing-card';
import { saveSearchQuery } from '@/lib/searchHistory';
import { listings } from '../lib/data';

export default function SearchResults() {
    const { url } = usePage();
    const query = useMemo(() => {
        const search = url.includes('?') ? url.slice(url.indexOf('?')) : '';
        return new URLSearchParams(search).get('q') || '';
    }, [url]);

    const [searchQuery, setSearchQuery] = useState(query);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('relevance');

    // Update search query when URL changes and save to history
    useEffect(() => {
        setSearchQuery(query);
        if (query.trim()) {
            saveSearchQuery(query);
        }
    }, [query]);

    // Filter listings based on search query
    const filteredListings = listings.filter((listing) => {
        const searchLower = query.toLowerCase();
        const matchesSearch =
            listing.title.toLowerCase().includes(searchLower) ||
            listing.location.toLowerCase().includes(searchLower) ||
            listing.category.toLowerCase().includes(searchLower) ||
            (listing.description && listing.description.toLowerCase().includes(searchLower));

        const matchesCategory = selectedCategory ? listing.category === selectedCategory : true;

        return matchesSearch && matchesCategory;
    });

    // Sort listings
    const sortedListings = [...filteredListings].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            default:
                return 0;
        }
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/search', { q: searchQuery.trim() }, { preserveState: true, replace: true });
        }
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSortBy('relevance');
    };

    const categories = ['Homestay', 'Jeep Tour', 'Camping', 'Wisata', 'Kuliner', 'Fotografi'];

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Navbar />
            <ScrollToTop />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 md:px-10">
                    <Breadcrumb
                        items={[
                            { label: 'Home', path: '/' },
                            { label: 'Hasil Pencarian', path: `/search?q=${query}` },
                        ]}
                    />

                    {/* Search Header */}
                    <div className="mt-6 mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Hasil Pencarian</h1>
                        <p className="text-gray-600">
                            Ditemukan <span className="font-semibold text-emerald-600">{sortedListings.length}</span> hasil untuk "{query}"
                        </p>
                    </div>

                    {/* Search Bar & Filters */}
                    <div className="mb-8 space-y-4">
                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="max-w-2xl">
                            <div className="flex flex-col gap-3 rounded-full border-2 border-gray-200 bg-white p-2 shadow-lg transition-all hover:border-emerald-300 sm:flex-row">
                                <div className="flex flex-1 items-center px-4 py-2">
                                    <Search className="mr-3 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Cari homestay, jeep tour, camping..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full text-gray-900 outline-none placeholder:text-gray-400"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex transform items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-emerald-700"
                                >
                                    Cari
                                </button>
                            </div>
                        </form>

                        {/* Filters */}
                        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 md:flex-row md:items-center">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-2 font-medium text-gray-700">
                                    <Filter size={18} />
                                    <span>Filter:</span>
                                </div>

                                {/* Category Filter */}
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                                selectedCategory === category
                                                    ? 'bg-emerald-600 text-white shadow-md'
                                                    : 'border border-gray-300 bg-white text-gray-700 hover:border-emerald-400'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>

                                {(selectedCategory || sortBy !== 'relevance') && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                                    >
                                        <X size={16} />
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Sort */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">Urutkan:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="cursor-pointer rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 outline-none focus:border-emerald-400"
                                >
                                    <option value="relevance">Relevansi</option>
                                    <option value="price-low">Harga Terendah</option>
                                    <option value="price-high">Harga Tertinggi</option>
                                    <option value="rating">Rating Tertinggi</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="min-h-[400px]">
                        {sortedListings.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                    <Search className="text-gray-400" size={40} />
                                </div>
                                <h2 className="mb-2 text-2xl font-semibold text-gray-900">Tidak ada hasil ditemukan</h2>
                                <p className="mb-6 max-w-md text-gray-500">
                                    Coba gunakan kata kunci lain atau hapus filter untuk melihat lebih banyak hasil.
                                </p>
                                <button
                                    onClick={() => router.visit('/')}
                                    className="rounded-full bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
                                >
                                    Kembali ke Beranda
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {sortedListings.map((listing) => (
                                    <div key={listing.id} onClick={() => router.visit(`/listing/${listing.id}`)} className="cursor-pointer">
                                        <SearchListingCard listing={listing} searchQuery={query} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
