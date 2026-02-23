import { Calendar, CheckCircle, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

interface BookingModalProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listing: any;
    isOpen: boolean;
    onClose: () => void;
}

export function BookingModal({ listing, isOpen, onClose }: BookingModalProps) {
    const [step, setStep] = useState(1);

    // Reset step when modal opens
    React.useEffect(() => {
        if (isOpen) setStep(1);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && listing && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 p-4">
                            <h3 className="text-lg font-bold">Pesan {listing.category}</h3>
                            <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-gray-100">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto p-6">
                            {step === 1 ? (
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <img src={listing.image} alt={listing.title} className="h-24 w-24 rounded-lg object-cover" />
                                        <div>
                                            <h4 className="text-lg font-bold">{listing.title}</h4>
                                            <p className="text-sm text-gray-500">{listing.location}</p>
                                            <div className="mt-1 flex items-center gap-1 font-semibold text-emerald-600">
                                                Rp {listing.price.toLocaleString('id-ID')}
                                                <span className="text-sm font-normal text-gray-400"> / malam</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Tanggal</label>
                                            <div className="flex items-center rounded-lg border border-gray-300 p-3">
                                                <Calendar size={18} className="mr-2 text-gray-500" />
                                                <input type="date" className="flex-1 text-sm outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Tamu</label>
                                            <div className="flex items-center rounded-lg border border-gray-300 p-3">
                                                <User size={18} className="mr-2 text-gray-500" />
                                                <select className="flex-1 bg-transparent text-sm outline-none">
                                                    <option>1 Tamu</option>
                                                    <option>2 Tamu</option>
                                                    <option>3 Tamu</option>
                                                    <option>4+ Tamu</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                                        <div className="flex justify-between text-sm">
                                            <span>Harga</span>
                                            <span>Rp {listing.price.toLocaleString('id-ID')}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Biaya Layanan</span>
                                            <span>Rp 25.000</span>
                                        </div>
                                        <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                                            <span>Total</span>
                                            <span>Rp {(listing.price + 25000).toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full rounded-lg bg-emerald-600 py-3 font-bold text-white shadow-lg shadow-emerald-200 transition-colors hover:bg-emerald-700"
                                    >
                                        Lanjutkan Pemesanan
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center space-y-4 py-8 text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Permintaan Terkirim!</h3>
                                    <p className="max-w-xs text-gray-500">Tuan rumah akan segera mengkonfirmasi ketersediaan homestay Anda.</p>
                                    <button
                                        onClick={onClose}
                                        className="mt-4 w-full rounded-lg bg-gray-900 py-3 font-bold text-white transition-colors hover:bg-black"
                                    >
                                        Kembali ke Beranda
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
