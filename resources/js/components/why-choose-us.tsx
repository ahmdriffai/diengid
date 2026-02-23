import { Clock, Heart, ShieldCheck, Wallet } from 'lucide-react';

export function WhyChooseUs() {
    const features = [
        {
            icon: Wallet,
            title: 'Harga Jujur',
            description: 'Tidak ada biaya tersembunyi. Harga yang Anda lihat adalah harga yang Anda bayar.',
        },
        {
            icon: Heart,
            title: 'Warga Lokal',
            description: 'Dikelola langsung oleh komunitas lokal Dieng yang ramah dan berpengalaman.',
        },
        {
            icon: ShieldCheck,
            title: 'Transaksi Aman',
            description: 'Sistem pembayaran terjamin aman dengan berbagai pilihan metode pembayaran.',
        },
        {
            icon: Clock,
            title: 'Bantuan 24/7',
            description: 'Tim support kami siap membantu kapanpun Anda membutuhkan bantuan.',
        },
    ];

    return (
        <section className="bg-emerald-50/50 py-16">
            <div className="container mx-auto px-4 md:px-10">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Mengapa dieng.id?</h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        Kami berkomitmen memberikan pengalaman liburan terbaik di Dieng dengan pelayanan profesional dan sepenuh hati.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
                        >
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <feature.icon size={32} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                            <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
