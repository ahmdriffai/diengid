import { MapPin, Star } from 'lucide-react';

interface Listing {
    id: number;
    title: string;
    category: string;
    location: string;
    price: number;
    rating?: number;
    image: string;
    description?: string;
}

interface SearchListingCardProps {
    listing: Listing;
    searchQuery: string;
}

export function SearchListingCard({ listing, searchQuery }: SearchListingCardProps) {
    const highlightText = (text: string) => {
        if (!searchQuery.trim()) return text;

        const regex = new RegExp(`(${searchQuery})`, 'gi');
        const parts = text.split(regex);

        return (
            <>
                {parts.map((part, index) =>
                    regex.test(part) ? (
                        <mark key={index} className="rounded bg-emerald-200 px-0.5 text-emerald-900">
                            {part}
                        </mark>
                    ) : (
                        <span key={index}>{part}</span>
                    ),
                )}
            </>
        );
    };

    return (
        <div className="group cursor-pointer">
            <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-md">
                    {listing.category}
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="line-clamp-1 font-semibold text-gray-900 transition-colors group-hover:text-emerald-600">
                        {highlightText(listing.title)}
                    </h3>
                    {listing.rating && (
                        <div className="ml-2 flex flex-shrink-0 items-center gap-1">
                            <Star className="fill-yellow-400 text-yellow-400" size={14} />
                            <span className="text-sm font-medium">{listing.rating}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">{highlightText(listing.location)}</span>
                </div>

                {listing.description && <p className="line-clamp-2 text-sm text-gray-500">{highlightText(listing.description)}</p>}

                <div className="pt-1">
                    <span className="font-bold text-gray-900">Rp {listing.price.toLocaleString('id-ID')}</span>
                    <span className="text-sm text-gray-500"> / malam</span>
                </div>
            </div>
        </div>
    );
}
