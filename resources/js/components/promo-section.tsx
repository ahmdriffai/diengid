import { ArrowRight, Tag } from 'lucide-react';

export function PromoSection() {
    const promos = [
        {
            title: 'Diskon Early Bird',
            discount: '20%',
            desc: 'Untuk pemesanan 30 hari sebelum kedatangan.',
            image: 'https://images.unsplash.com/photo-1724667523239-b2011d2756da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWVuZyUyMHBsYXRlYXUlMjBzdW5yaXNlJTIwc2NlbmljfGVufDF8fHx8MTc3MDk3NTYyMnww&ixlib=rb-4.1.0&q=80&w=1080',
            color: 'from-blue-600 to-blue-400',
        },
        {
            title: 'Paket Bundling Hemat',
            discount: '15%',
            desc: 'Hemat lebih banyak dengan ambil paket Homestay + Jeep.',
            image: 'https://images.unsplash.com/photo-1544115485-66f4d0906441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWVwJTIwYWR2ZW50dXJlJTIwZGllbmclMjBmdW58ZW58MXx8fHwxNzcwOTc1NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
            color: 'from-orange-600 to-orange-400',
        },
        {
            title: 'Promo Rombongan',
            discount: '10%',
            desc: 'Spesial harga untuk rombongan minimal 10 orang.',
            image: 'https://images.unsplash.com/photo-1645165052641-c4081bc9eb48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwdGVudCUyMGNvenklMjBkaWVuZ3xlbnwxfHx8fDE3NzA5NzU2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
            color: 'from-emerald-600 to-emerald-400',
        },
    ];

    return (
        <section className="bg-white py-2">
            <div className="container mx-auto px-4 md:px-10">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wider text-rose-500 uppercase">
                            <Tag size={16} />
                            Promo Spesial
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Penawaran Terbatas</h2>
                    </div>
                    <a href="#" className="hidden items-center gap-2 font-bold text-emerald-600 transition-colors hover:text-emerald-700 md:flex">
                        Lihat Semua Promo <ArrowRight size={18} />
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {promos.map((promo, index) => (
                        <div key={index} className="group relative h-[300px] cursor-pointer overflow-hidden rounded-2xl shadow-md">
                            {/* Background Image */}
                            <img
                                src={promo.image}
                                alt={promo.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-t ${promo.color} opacity-80 transition-opacity group-hover:opacity-90`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                                <div className="self-start rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                                    Hingga {promo.discount}
                                </div>

                                <div className="translate-y-2 transform transition-transform duration-300 group-hover:translate-y-0">
                                    <div className="absolute -top-10 left-0 mb-1 text-4xl font-black opacity-20">{promo.discount}</div>
                                    <h3 className="relative z-10 mb-2 text-2xl font-bold">{promo.title}</h3>
                                    <p className="mb-4 max-w-[90%] text-sm leading-relaxed text-white/90">{promo.desc}</p>
                                    <div className="flex translate-y-4 transform items-center gap-2 text-sm font-bold opacity-0 transition-opacity duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        Ambil Promo <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <button className="w-full rounded-full bg-gray-100 px-6 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-200">
                        Lihat Semua Promo
                    </button>
                </div>
            </div>
        </section>
    );
}
