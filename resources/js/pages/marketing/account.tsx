import { ClipboardCheck, Phone } from 'lucide-react';
import { useState } from 'react';

import { QuoteModal } from '@/components/quote-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MarketingLayout from '@/layouts/marketing-layout';

interface QuoteRecord {
    id: number;
    status: string;
    serviceType: string;
    createdAt: string;
    address?: string;
}

interface InvoiceRecord {
    id: number;
    status: string;
    amount: number;
    description: string;
    fileUrl?: string;
}

export default function Account() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [history, setHistory] = useState<QuoteRecord[]>([]);
    const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchHistory = async () => {
        if (!email) return;
        setIsLoading(true);
        try {
            const [qRes, iRes] = await Promise.all([
                fetch(`/api/quotes/${encodeURIComponent(email)}`),
                fetch(`/api/invoices/${encodeURIComponent(email)}`),
            ]);
            const quotes = await qRes.json();
            const invs = await iRes.json();
            setHistory(quotes);
            setInvoices(invs);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MarketingLayout
            title="Client Portal - Gutter Gator"
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        >
            <div className="container mx-auto max-w-6xl px-4 py-20 lg:px-20">
                <div className="mb-12">
                    <h1 className="text-brand-ink mb-4 text-5xl font-black uppercase tracking-tighter">
                        Client Portal
                    </h1>
                    <p className="text-brand-secondary/70 text-lg">
                        Enter your email to view your project history and unpaid
                        invoices.
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                        <div className="border-stone-line rounded-[2.5rem] border bg-white p-8 shadow-sm">
                            <label className="text-brand-secondary/60 mb-3 block text-xs font-black uppercase tracking-widest">
                                Access Project Data
                            </label>
                            <Input
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-brand-ink bg-brand-paper focus:border-brand-primary mb-4 w-full rounded-2xl border-2 border-transparent px-6 py-4 outline-none transition-colors"
                            />
                            <Button
                                onClick={fetchHistory}
                                className="bg-brand-primary hover:shadow-brand-primary/20 w-full rounded-xl py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all"
                            >
                                Search Records
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-12 lg:col-span-2">
                        {isLoading ? (
                            <p className="animate-pulse py-10 text-center font-bold uppercase tracking-widest">
                                Loading Records...
                            </p>
                        ) : (
                            <>
                                <div>
                                    <h3 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase tracking-tight">
                                        <ClipboardCheck className="text-brand-primary" />{' '}
                                        Recent Quote Requests
                                    </h3>
                                    {history.length === 0 ? (
                                        <div className="border-stone-line text-brand-secondary/40 rounded-[2rem] border-2 border-dashed p-10 text-center">
                                            No matching requests found for this
                                            email.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {history.map((h) => (
                                                <div
                                                    key={h.id}
                                                    className="border-stone-line flex items-center justify-between rounded-3xl border bg-white p-6 shadow-sm"
                                                >
                                                    <div>
                                                        <p className="text-brand-accent mb-1 text-[10px] font-black uppercase">
                                                            {h.status}
                                                        </p>
                                                        <h4 className="text-brand-ink font-bold uppercase">
                                                            {h.serviceType}
                                                        </h4>
                                                        <p className="text-brand-secondary/60 text-xs">
                                                            {new Date(
                                                                h.createdAt
                                                            ).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-brand-secondary text-xs font-bold">
                                                            {h.address ||
                                                                'GPS Coordinates Provided'}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase tracking-tight">
                                        <Phone className="text-brand-primary" />{' '}
                                        Active Invoices
                                    </h3>
                                    {invoices.length === 0 ? (
                                        <div className="border-stone-line text-brand-secondary/40 rounded-[2rem] border-2 border-dashed p-10 text-center">
                                            No active invoices found.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {invoices.map((inv) => (
                                                <div
                                                    key={inv.id}
                                                    className="flex items-center justify-between rounded-3xl border border-stone-line border-l-4 border-l-brand-primary bg-white p-6 shadow-sm"
                                                >
                                                    <div>
                                                        <p className="text-brand-primary mb-1 text-[10px] font-black uppercase">
                                                            {inv.status}
                                                        </p>
                                                        <h4 className="text-brand-ink font-bold uppercase">
                                                            $
                                                            {inv.amount.toFixed(
                                                                2
                                                            )}
                                                        </h4>
                                                        <p className="text-brand-secondary/60 text-xs">
                                                            {inv.description}
                                                        </p>
                                                    </div>
                                                    {inv.fileUrl && (
                                                        <a
                                                            href={inv.fileUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="bg-brand-ink hover:bg-brand-secondary rounded-full px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors"
                                                        >
                                                            View PDF
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
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
