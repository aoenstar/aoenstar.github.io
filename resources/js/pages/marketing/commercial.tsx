import { Building2, CheckCircle, DollarSign, Wrench, ShieldCheck, Droplets, Wind, Trash2, Sparkles, Home } from 'lucide-react';
import { useState } from 'react';

import { QuoteModal } from '@/components/quote-modal';
import { Button } from '@/components/ui/button';
import MarketingLayout from '@/layouts/marketing-layout';

const BENEFITS = [
    {
        icon: CheckCircle,
        title: 'Comprehensive Solutions',
        description: 'End-to-end property maintenance services to assist with all your property needs.',
    },
    {
        icon: Wrench,
        title: 'Proactive Maintenance',
        description: 'Periodic proactive assessments to prevent issues before they become problems.',
    },
    {
        icon: ShieldCheck,
        title: 'Reliable & Professional',
        description: 'Dependable service that improves account retention and relationships.',
    },
    {
        icon: DollarSign,
        title: 'Cost Savings',
        description: 'Comprehensive solutions that reduce long-term maintenance costs.',
    },
];

const COMMERCIAL_SERVICES = [
    {
        icon: Droplets,
        title: 'Gutter Installation & Maintenance',
        description: 'Custom solutions, including gutter cleaning, repairs and leaf guards to prevent water damage.',
    },
    {
        icon: Wind,
        title: 'Dryer Vent Cleaning',
        description: 'Professional dryer vent cleaning to reduce fire hazards, improve efficiency, and extend appliance lifespan.',
    },
    {
        icon: Trash2,
        title: 'Valet Trash Services',
        description: 'Reliable scheduled doorstep trash pick-ups designed to improve property cleanliness and tenant convenience.',
    },
    {
        icon: Sparkles,
        title: 'Power Washing Services',
        description: 'Exterior cleaning for sidewalks, driveways, siding and other hard surfaces.',
    },
    {
        icon: Home,
        title: 'Siding & Porch Screen Repair & Replacement',
        description: 'Restore or repair weathered siding and worn porch screens, ensuring durability and enhanced curb appeal.',
    },
];

export default function Commercial() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    return (
        <MarketingLayout
            title="Commercial Services - Gutter Gator"
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        >
            <div className="bg-brand-paper min-h-screen">
                <div className="container mx-auto px-4 py-20">
                    <div className="grid items-center gap-20 lg:grid-cols-2">
                        <div>
                            <span className="text-brand-accent mb-4 block text-xs font-bold uppercase tracking-widest">
                                Property Management
                            </span>
                            <h1 className="mb-8 text-5xl leading-tight font-black lg:text-6xl">
                                Essential Partners For Your Property Management Company
                            </h1>
                            <p className="text-brand-secondary/80 mb-12 text-xl leading-relaxed">
                                We specialize in delivering comprehensive property
                                maintenance services to serve customer property needs
                                and improve account retention and relationships.
                            </p>
                            <Button
                                onClick={() => setIsQuoteModalOpen(true)}
                                className="bg-brand-ink hover:bg-brand-secondary rounded-full px-10 py-5 text-lg font-black text-white shadow-2xl transition-all"
                            >
                                CONTACT US
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Commercial Services Section */}
                <div className="border-stone-line border-y bg-white py-20">
                    <div className="container mx-auto px-4 lg:px-20">
                        <h2 className="text-brand-ink mb-4 text-4xl font-black">
                            Our Commercial Services
                        </h2>
                        <p className="text-brand-secondary/70 mb-12 max-w-2xl text-lg">
                            Comprehensive property maintenance solutions tailored for commercial and multi-family properties.
                        </p>
                        <div className="space-y-6">
                            {COMMERCIAL_SERVICES.map((service, idx) => (
                                <div
                                    key={service.title}
                                    className="group flex items-start gap-6 rounded-2xl p-6 transition-all hover:bg-brand-primary/5"
                                >
                                    <div className="bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors group-hover:text-white">
                                        <service.icon size={26} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-brand-ink mb-1 text-xl font-bold">
                                            {service.title}
                                        </h3>
                                        <p className="text-brand-secondary/70 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className="text-brand-primary/20 hidden text-6xl font-black md:block">
                                        0{idx + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12">
                            <Button
                                onClick={() => setIsQuoteModalOpen(true)}
                                className="bg-brand-primary hover:bg-brand-primary/90 rounded-full px-10 py-5 text-lg font-black text-white shadow-xl transition-all"
                            >
                                REQUEST A QUOTE
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Why Partner Section */}
                <div className="bg-brand-paper py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-brand-ink mb-6 text-center text-4xl font-black">
                            Why Partner With Us?
                        </h2>
                        <p className="text-brand-secondary/70 mx-auto mb-16 max-w-3xl text-center text-lg">
                            We provide reliable end-to-end property maintenance services
                            and function seamlessly to assist with all your property needs,
                            including periodic proactive assessments.
                        </p>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {BENEFITS.map((benefit) => (
                                <div
                                    key={benefit.title}
                                    className="border-stone-line rounded-2xl border bg-white p-8 text-center shadow-sm transition-all hover:shadow-lg"
                                >
                                    <div className="bg-brand-primary/10 text-brand-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                                        <benefit.icon size={32} />
                                    </div>
                                    <h3 className="text-brand-ink mb-3 text-xl font-bold">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-brand-secondary/70 text-sm">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
            />
        </MarketingLayout>
    );
}
