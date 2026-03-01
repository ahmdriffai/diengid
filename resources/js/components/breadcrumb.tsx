import { router } from '@inertiajs/react';
import { ChevronRight, Home } from 'lucide-react';
import React from 'react';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => router.visit('/')} className="flex items-center gap-1 transition-colors hover:text-emerald-600">
                <Home size={16} />
                <span>Beranda</span>
            </button>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight size={16} className="text-gray-400" />
                    {item.path ? (
                        <button onClick={() => router.visit(item.path!)} className="transition-colors hover:text-emerald-600">
                            {item.label}
                        </button>
                    ) : (
                        <span className="font-medium text-gray-900">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}
