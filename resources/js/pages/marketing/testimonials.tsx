import { useState } from 'react';

import { QuoteModal } from '@/components/quote-modal';
import { Button } from '@/components/ui/button';
import MarketingLayout from '@/layouts/marketing-layout';

export default function Testimonials() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    return (
        <MarketingLayout
            title="Testimonials - Gutter Gator"
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        >
            <div className="container mx-auto px-4 py-20 lg:px-20">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h1 className="text-brand-ink mb-4 text-5xl font-black uppercase tracking-tighter">
                        Customer Reviews
                    </h1>
                    <p className="text-brand-secondary/70 text-xl">
                        See what our customers are saying about Gutter Gator
                    </p>
                </div>

                {/* Google Reviews Widget */}
                <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lg">
                    <iframe
                        src="https://www-guttergatorsc-com.filesusr.com/html/93286f_8dfa51186081f4f5d2189e3e7fe8995c.html"
                        title="Google Reviews"
                        className="h-[600px] w-full border-0 md:h-[800px]"
                        loading="lazy"
                    />
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-brand-secondary/70 mb-6 text-lg">
                        Ready to experience our 5-star service?
                    </p>
                    <Button
                        onClick={() => setIsQuoteModalOpen(true)}
                        className="bg-brand-primary hover:bg-brand-primary/90 rounded-full px-10 py-5 text-lg font-black text-white shadow-xl"
                    >
                        REQUEST A FREE QUOTE
                    </Button>
                </div>
            </div>

            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
            />
        </MarketingLayout>
    );
}
