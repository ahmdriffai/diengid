import { router } from '@inertiajs/react';
import { Search, TrendingUp } from 'lucide-react';
import { animate } from 'motion';
import React, { useEffect, useMemo, useState } from 'react';

export function Hero() {
    const [searchQuery, setSearchQuery] = useState('');
    const [placeholder, setPlaceholder] = useState('');

    const searchSuggestions = useMemo(
        () => [
            'Homestay Sikunir',
            'Homestay Dekat Telaga Warna',
            'Paket Wisata Jeep Sunrise',
            'Paket Wisata Dieng 2H1M',
            'Open Trip Dieng Plateau',
            'Camping Ground Dieng',
            'Sewa Jeep Dieng',
            'Tiket Kawah Sikidang',
            'Tour Candi Arjuna',
            'Glamping Dieng',
        ],
        [],
    );

    useEffect(() => {
        const placeholderSamples = [
            'Cari homestay nyaman di Dieng...',
            'Cari paket wisata jeep sunrise...',
            'Cari open trip dan camping...',
            'Cari tiket destinasi populer...',
        ];

        let isActive = true;
        let currentAnimation: { stop: () => void } | null = null;

        const runAnimation = async () => {
            let sampleIndex = 0;

            while (isActive) {
                const currentText = placeholderSamples[sampleIndex];

                await new Promise<void>((resolve) => {
                    currentAnimation = animate(0, currentText.length, {
                        duration: Math.max(1.1, currentText.length * 0.06),
                        ease: 'linear',
                        onUpdate: (latest) => {
                            if (!isActive) {
                                return;
                            }

                            setPlaceholder(currentText.slice(0, Math.round(latest)));
                        },
                        onComplete: resolve,
                    });
                });

                if (!isActive) {
                    return;
                }

                await new Promise<void>((resolve) => {
                    currentAnimation = animate(0, 1, {
                        duration: 0.9,
                        ease: 'linear',
                        onComplete: resolve,
                    });
                });

                if (!isActive) {
                    return;
                }

                await new Promise<void>((resolve) => {
                    currentAnimation = animate(currentText.length, 0, {
                        duration: Math.max(0.8, currentText.length * 0.035),
                        ease: 'linear',
                        onUpdate: (latest) => {
                            if (!isActive) {
                                return;
                            }

                            setPlaceholder(currentText.slice(0, Math.round(latest)));
                        },
                        onComplete: resolve,
                    });
                });

                sampleIndex = (sampleIndex + 1) % placeholderSamples.length;
            }
        };

        runAnimation();

        return () => {
            isActive = false;
            currentAnimation?.stop();
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.visit(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const popularSearches = ['Homestay Sikunir', 'Jeep Sunrise', 'Glamping', 'Kawah Sikidang'];

    const handlePopularSearch = (query: string) => {
        router.visit(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <div className="relative flex w-full flex-col items-center justify-center bg-white px-4 pt-32 pb-5 text-center md:pt-40 md:pb-5">
            {/* Content */}
            <div className="mx-auto max-w-4xl">
                <div className="mb-4 inline-block rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                    ✨ Wisata Dieng Terbaik
                </div>

                <h1 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                    Menjelajah{' '}
                    <span className="bg-linear-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">Negeri Di Atas Awan</span>
                </h1>

                <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                    Temukan homestay nyaman, paket wisata jeep seru, dan pengalaman tak terlupakan di dataran tinggi Dieng.
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mx-auto mb-4 max-w-2xl">
                    <div className="flex flex-col gap-3 rounded-full border-2 border-gray-200 bg-white p-2 shadow-xl transition-all hover:border-emerald-300 sm:flex-row">
                        <div className="flex flex-1 items-center px-4 py-2">
                            <Search className="mr-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                list="hero-search-suggestions"
                                placeholder={placeholder || 'Cari homestay, jeep tour, camping...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-gray-900 outline-none placeholder:text-gray-400"
                            />
                            <datalist id="hero-search-suggestions">
                                {searchSuggestions.map((suggestion) => (
                                    <option key={suggestion} value={suggestion} />
                                ))}
                            </datalist>
                        </div>
                        <button
                            type="submit"
                            className="flex transform items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-emerald-700"
                        >
                            Cari
                        </button>
                    </div>
                </form>

                {/* Popular Searches */}
                <div className="mb-10 flex flex-wrap items-center justify-center gap-2 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                        <TrendingUp size={16} />
                        Populer:
                    </span>
                    {popularSearches.map((search) => (
                        <button
                            key={search}
                            onClick={() => handlePopularSearch(search)}
                            className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-gray-700 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                            {search}
                        </button>
                    ))}
                </div>

                {/* <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                    <button className="flex transform items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:scale-105 hover:bg-emerald-700">
                        Pesan Sekarang
                        <ArrowRight size={20} />
                    </button>
                    <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-lg font-bold text-gray-900 transition-all hover:bg-gray-50">
                        Lihat Paket Wisata
                    </button>
                </div> */}
            </div>
        </div>
    );
}
