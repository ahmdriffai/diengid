import { Bell, Calendar, Menu, Search, User, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300 ${
                    isScrolled ? 'border-gray-100 bg-gray-50 py-3 shadow-sm backdrop-blur-md' : 'border-transparent bg-gray-50 py-4'
                }`}
            >
                <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
                    {/* Logo */}
                    {/* <div className="z-50 flex cursor-pointer items-center gap-2">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-xl font-bold text-white shadow-lg transition-colors`}
                        >
                            D
                        </div>
                        <span className="text-2xl font-bold tracking-tighter text-emerald-900 drop-shadow-sm">dieng.id</span>
                    </div> */}
                    <img src="/logo.png" alt="dieng.id" className="h-14 w-auto" />

                    {/* Center Navigation - Desktop */}
                    <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
                        <a href="#" className="text-sm font-semibold tracking-wide text-gray-600 transition-colors hover:text-emerald-700">
                            Beranda
                        </a>
                        <a href="#" className="text-sm font-semibold tracking-wide text-gray-600 transition-colors hover:text-emerald-700">
                            Destinasi
                        </a>
                        <a href="#" className="text-sm font-semibold tracking-wide text-gray-600 transition-colors hover:text-emerald-700">
                            Paket Tour
                        </a>
                        <a href="#" className="text-sm font-semibold tracking-wide text-gray-600 transition-colors hover:text-emerald-700">
                            Artikel
                        </a>
                    </div>

                    {/* Right Menu */}
                    <div className="flex items-center gap-3">
                        <button className="hidden h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 md:flex">
                            <Bell size={18} />
                        </button>

                        {/* Search Trigger Button */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={`flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-white shadow-md transition-all duration-300 hover:bg-emerald-700`}
                        >
                            <Search size={18} />
                            <span className="text-sm font-bold">Cari</span>
                        </button>

                        <div className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-gray-100 p-1 pl-2 transition-all hover:bg-gray-200">
                            <Menu size={20} className="ml-2 text-gray-600" />
                            <div className="rounded-full bg-emerald-600 p-2 text-white shadow-inner">
                                <User size={18} className="fill-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Expanded Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-0 right-0 left-0 z-40 rounded-b-3xl bg-gray-50 pt-28 pb-10 shadow-2xl"
                    >
                        <div className="container mx-auto px-4">
                            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-2 rounded-full bg-white p-0 shadow-sm md:grid-cols-[1fr_1fr_auto]">
                                {/* <div className="group relative cursor-pointer rounded-xl border-l-0 border-gray-100 p-3 transition-colors hover:bg-gray-50 md:border-l">
                                    <div className="ms-5 mb-1 flex items-center gap-3">
                                        <MapPin size={16} className="text-emerald-600" />
                                        <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">Lokasi</span>
                                    </div>
                                    <div className="ms-5 font-semibold text-gray-900">Mau ke mana?</div>
                                </div> */}

                                <div className="group relative cursor-pointer rounded-xl border-l-0 border-gray-100 p-3 transition-colors hover:bg-gray-50 md:border-l">
                                    <div className="ms-5 mb-1 flex items-center gap-3">
                                        <Calendar size={16} className="text-emerald-600" />
                                        <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">Tanggal</span>
                                    </div>
                                    <div className="ms-5 font-semibold text-gray-900">Pilih Tanggal</div>
                                </div>

                                <div className="group relative cursor-pointer rounded-xl border-l-0 border-gray-100 p-3 transition-colors hover:bg-gray-50 md:border-l">
                                    <div className="mb-1 flex items-center gap-3">
                                        <Users size={16} className="text-emerald-600" />
                                        <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">Tamu</span>
                                    </div>
                                    <div className="font-semibold text-gray-900">Tambahkan Tamu</div>
                                </div>

                                <button className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-3 font-bold text-white shadow-sm shadow-emerald-200 transition-all hover:bg-emerald-700">
                                    <Search size={20} />
                                </button>
                            </div>

                            {/* Quick Filters inside Search */}
                            <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-3">
                                {['Homestay Murah', 'Villa Keluarga', 'Jeep Sunrise', 'Camping Ground'].map((tag) => (
                                    <span
                                        key={tag}
                                        className="cursor-pointer rounded-full border border-emerald-700/50 bg-emerald-800 px-4 py-1 text-sm text-emerald-100 transition-colors hover:bg-emerald-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute right-1/2 bottom-4 translate-x-1/2 text-white/50 transition-colors hover:text-white md:right-10 md:bottom-10 md:translate-x-0"
                        >
                            Tutup Pencarian
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
