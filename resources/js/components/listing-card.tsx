import { Heart, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface ListingCardProps {
    listing: {
        id: number;
        title: string;
        category: string;
        location: string;
        price: number;
        rating: number;
        image: string;
        description: string;
    };
}

export function ListingCard({ listing }: ListingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group flex cursor-pointer flex-col gap-2"
        >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200">
                <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                    <button className="rounded-full bg-transparent p-2 text-white transition-colors hover:bg-white/10">
                        <Heart size={24} className="fill-black/20 stroke-white transition-colors hover:fill-emerald-500 hover:stroke-emerald-500" />
                    </button>
                </div>
                <div className="absolute top-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs font-bold shadow-sm backdrop-blur-sm">
                    {listing.category}
                </div>
            </div>

            <div className="mt-1 flex items-start justify-between">
                <h3 className="truncate pr-2 font-semibold text-gray-900">{listing.location}</h3>
                <div className="flex items-center gap-1">
                    <Star size={14} className="fill-black text-black" />
                    <span className="text-sm text-gray-900">{listing.rating}</span>
                </div>
            </div>

            <div className="truncate text-sm text-gray-500">{listing.title}</div>
            <div className="truncate text-sm text-gray-500">{listing.description}</div>

            <div className="mt-1 flex items-baseline gap-1">
                <span className="font-semibold text-gray-900">Rp {listing.price.toLocaleString('id-ID')}</span>
                <span className="text-sm text-gray-900">
                    {listing.category === 'Homestay' ? ' malam' : ''}
                    {listing.category === 'Jeep Tour' ? ' trip' : ''}
                </span>
            </div>
        </motion.div>
    );
}
