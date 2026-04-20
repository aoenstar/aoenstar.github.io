import { ChevronRight, Droplets, HardHat, Home, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { QuoteModal } from '@/components/quote-modal';
import { SERVICES } from '@/constants/gutter-gator';
import MarketingLayout from '@/layouts/marketing-layout';

const SERVICE_ICONS: Record<string, React.ElementType> = {
    installation: HardHat,
    protection: Home,
    cleaning: Droplets,
    exterior: Sparkles,
};

export default function Services() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [selectedServiceType, setSelectedServiceType] = useState('installation');

    return (
        <MarketingLayout
            title="Our Services - Gutter Gator"
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        >
            <div className="container mx-auto px-4 py-20">
                <div className="mx-auto mb-20 max-w-4xl text-center">
                    <h1 className="text-brand-ink mb-6 text-5xl font-black tracking-tight">
                        Professional Services
                    </h1>
                    <p className="text-brand-secondary/70 text-xl">
                        You can count on Gutter Gator to not only meet, but
                        exceed all your needs and requests. Learn more about
                        the services we provide below.
                    </p>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                    {SERVICES.map((s, idx) => {
                        const Icon = SERVICE_ICONS[s.id] || HardHat;
                        return (
                            <div
                                key={s.id}
                                className="animate-in fade-in slide-in-from-bottom-4 border-stone-line group rounded-[3rem] border bg-white p-10 shadow-sm transition-all hover:shadow-xl"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="bg-stone-tag text-brand-primary group-hover:bg-brand-primary mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors group-hover:text-white">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-brand-ink mb-4 text-3xl font-bold">
                                    {s.title}
                                </h3>
                                <p className="text-brand-secondary/80 mb-8 leading-relaxed">
                                    {s.description}
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedServiceType(s.id);
                                        setIsQuoteModalOpen(true);
                                    }}
                                    className="text-brand-primary flex items-center gap-2 font-bold transition-all group-hover:gap-4"
                                >
                                    GET A CUSTOM QUOTE <ChevronRight size={18} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                defaultServiceType={selectedServiceType}
            />
        </MarketingLayout>
    );
}
