export function Hero() {
    return (
        <div className="justify-sta relative flex w-full flex-col items-center bg-white px-4 text-center md:pt-30">
            {/* Content */}
            <div className="w-full">
                <div className="mb-4 inline-block rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                    ✨ Wisata Dieng Terbaik
                </div>

                <h1 className="mb-6 text-lg leading-[1.1] font-extrabold tracking-tight text-gray-900 md:text-xl lg:text-4xl">
                    Menjelajah{' '}
                    <span className="bg-linear-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">Negeri Di Atas Awan</span>
                </h1>

                <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                    Temukan homestay nyaman, paket wisata jeep seru, dan pengalaman tak terlupakan di dataran tinggi Dieng.
                </p>

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
