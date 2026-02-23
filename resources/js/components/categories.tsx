import { categories } from '@/lib/data';

interface CategoriesProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export function Categories({ selectedCategory, onSelectCategory }: CategoriesProps) {
    return (
        <div className="bg-white pb-4 shadow-sm md:pt-24">
            <div className="container mx-auto px-4 md:px-10">
                <div className="no-scrollbar flex items-center gap-8 overflow-x-auto pb-2">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className={`group flex min-w-16 cursor-pointer flex-col items-center gap-2 transition-all duration-200 ${
                                selectedCategory === cat.label
                                    ? 'border-b-2 border-black pb-2 text-black'
                                    : 'border-b-2 border-transparent pb-2 text-gray-500 hover:border-gray-300 hover:text-gray-800'
                            }`}
                            onClick={() => onSelectCategory(cat.label)}
                        >
                            <cat.icon
                                size={24}
                                strokeWidth={selectedCategory === cat.label ? 2 : 1.5}
                                className="transition-transform group-hover:scale-110"
                            />
                            <span className="text-xs font-medium whitespace-nowrap">{cat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
