import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

import { QuoteModal } from '@/components/quote-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LOCATIONS, CONTACT } from '@/constants/gutter-gator';
import MarketingLayout from '@/layouts/marketing-layout';

export default function Contact() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        alert('Message sent! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <MarketingLayout
            title="Contact Us - Gutter Gator"
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        >
            <div className="container mx-auto px-4 py-20 lg:px-20">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h1 className="text-brand-ink mb-6 text-5xl font-black uppercase tracking-tighter">
                        Contact Us
                    </h1>
                    <p className="text-brand-secondary/70 text-xl">
                        Ready to protect your property? Get in touch with our
                        team for a free consultation.
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="border-stone-line rounded-[2.5rem] border bg-white p-8 shadow-sm">
                            <h3 className="text-brand-ink mb-6 text-2xl font-black uppercase tracking-tight">
                                Get In Touch
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-brand-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-brand-ink mb-1 font-bold">
                                            Phone
                                        </h4>
                                        <a
                                            href={`tel:${CONTACT.phoneRaw}`}
                                            className="text-brand-secondary hover:text-brand-primary text-lg transition-colors"
                                        >
                                            {CONTACT.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-brand-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-brand-ink mb-1 font-bold">
                                            Email
                                        </h4>
                                        <a
                                            href={`mailto:${CONTACT.email}`}
                                            className="text-brand-secondary hover:text-brand-primary text-lg transition-colors"
                                        >
                                            {CONTACT.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-brand-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-brand-ink mb-1 font-bold">
                                            Main Office
                                        </h4>
                                        <p className="text-brand-secondary text-lg">
                                            {CONTACT.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-stone-line rounded-[2.5rem] border bg-white p-8 shadow-sm">
                            <h3 className="text-brand-accent mb-4 text-xs font-black uppercase tracking-[0.2em]">
                                Service Areas
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {LOCATIONS.map((loc) => (
                                    <span key={loc} className="location-tag">
                                        {loc}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="border-stone-line rounded-[3rem] border bg-white p-10 shadow-xl">
                        <h3 className="text-brand-ink mb-8 text-2xl font-black uppercase tracking-tight">
                            Send a Message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-brand-secondary mb-2 block text-[10px] font-black uppercase">
                                    Full Name
                                </label>
                                <Input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="text-brand-ink border-stone-line focus:border-brand-primary w-full rounded-2xl border-2 px-6 py-4 outline-none"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="text-brand-secondary mb-2 block text-[10px] font-black uppercase">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="text-brand-ink border-stone-line focus:border-brand-primary w-full rounded-2xl border-2 px-6 py-4 outline-none"
                                        placeholder="john@email.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-brand-secondary mb-2 block text-[10px] font-black uppercase">
                                        Phone
                                    </label>
                                    <Input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                        className="text-brand-ink border-stone-line focus:border-brand-primary w-full rounded-2xl border-2 px-6 py-4 outline-none"
                                        placeholder="(843) 555-0123"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-brand-secondary mb-2 block text-[10px] font-black uppercase">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            message: e.target.value,
                                        })
                                    }
                                    className="text-brand-ink border-stone-line focus:border-brand-primary w-full resize-none rounded-2xl border-2 px-6 py-4 outline-none"
                                    placeholder="Tell us about your project..."
                                    required
                                ></textarea>
                            </div>
                            <Button
                                type="submit"
                                className="bg-brand-primary hover:shadow-brand-primary/20 w-full rounded-full py-5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-lg transition-all"
                            >
                                Send Message
                            </Button>
                        </form>
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
