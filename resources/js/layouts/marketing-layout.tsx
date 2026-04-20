import { Head, Link, usePage } from '@inertiajs/react';
import {
    Menu,
    Phone,
    ShieldCheck,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { LOCATIONS, CONTACT } from '@/constants/gutter-gator';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { home, services, commercial, gallery, contact, account, dashboard } from '@/routes';

const NavLinks = [
    { href: services, label: 'Services' },
    { href: commercial, label: 'Commercial' },
    { href: gallery, label: 'Gallery' },
    { href: contact, label: 'Contact' },
    { href: account, label: 'Client Portal' },
] as const;

interface MarketingLayoutProps {
    children: React.ReactNode;
    title?: string;
    onOpenQuoteModal?: () => void;
}

export default function MarketingLayout({
    children,
    title = 'Gutter Gator',
    onOpenQuoteModal,
}: MarketingLayoutProps) {
    const { auth } = usePage<{ auth: { user: unknown } }>().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle global quote modal trigger
    useEffect(() => {
        const handleOpen = () => onOpenQuoteModal?.();
        window.addEventListener('open-quote-modal', handleOpen);
        return () => window.removeEventListener('open-quote-modal', handleOpen);
    }, [onOpenQuoteModal]);

    return (
        <>
            <Head title={title} />

            <div className="bg-brand-paper text-brand-ink min-h-screen font-sans selection:bg-brand-accent selection:text-brand-ink">
                {/* Navigation */}
                <nav className="bg-white/80 fixed top-0 right-0 left-0 z-50 border-b border-stone-line backdrop-blur-md">
                    <div className="container mx-auto flex items-center justify-between px-4 lg:px-20 gap-3">
                        {/* Logo */}
                        <Link href={home()} className="group w-4/5 max-w-88 max-h-88 flex items-center gap-4">
                            <div className="relative">
                                <div className="">
                                    <img
                                        src="/logo.png"
                                        alt="Gutter Gator"
                                        className="max-w-full max-h-88"
                                    />
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden items-center w-1/5 md:w-4/5 gap-10 lg:flex">
                            {NavLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href()}
                                    className="w-full h-full text-brand-secondary hover:text-brand-primary text-xs font-bold uppercase tracking-widest transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {auth.user && (
                                <Link
                                    href={dashboard()}
                                    className="w-full h-full text-brand-secondary hover:text-brand-primary text-xs font-bold uppercase tracking-widest transition-colors"
                                >
                                    Dashboard
                                </Link>
                            )}
                            <Button
                                onClick={onOpenQuoteModal}
                                className="bg-brand-primary hover:bg-brand-primary/90 rounded-full border-b-4 border-brand-secondary px-8 py-3 text-xs font-black tracking-[0.2em] uppercase text-white shadow-xl transition-all hover:translate-y-0.5 active:translate-y-1 active:border-b-0"
                            >
                                Get Quote
                            </Button>
                        </div>

                        {/* Mobile Menu */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="bg-stone-tag text-brand-secondary rounded-xl"
                                >
                                    <Menu size={24} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="bg-brand-paper flex w-full flex-col px-8 py-4 overflow-scroll"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <img src="/logo.png" alt="Gutter Gator" className="w-4/5" />
                                </div>
                                <div className="text-brand-ink flex flex-col gap-8 text-4xl font-black italic tracking-tighter">
                                    <Link
                                        href={home()}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="hover:text-brand-primary"
                                    >
                                        HOME
                                    </Link>
                                    {NavLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href()}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="hover:text-brand-primary"
                                        >
                                            {link.label.toUpperCase()}
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-auto space-y-4">
                                    <Button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            onOpenQuoteModal?.();
                                        }}
                                        className="bg-brand-primary w-full rounded-4xl py-6 text-2xl font-black text-white shadow-2xl"
                                    >
                                        REQUEST QUOTE
                                    </Button>
                                    <a
                                        href={`tel:${CONTACT.phoneRaw}`}
                                        className="text-brand-secondary flex items-center justify-center gap-3 py-4 text-xl font-bold"
                                    >
                                        <Phone size={24} /> {CONTACT.phone}
                                    </a>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="min-h-screen pt-28 lg:pt-0">{children}</main>

                {/* Footer */}
                <footer className="bg-brand-ink mt-20 pt-4 pb-32 md:py-16 md:pt-16 lg:pt-15 lg:pb-32 text-white">
                    <div className="container mx-auto grid gap-10 md:gap-20 px-4 md:grid-cols-4 lg:px-20">
                        <div className="">
                            <p className="text-brand-paper/40 font-medium leading-relaxed">
                                Myrtle Beach & Charleston Areas. Dedicated to providing
                                the highest quality Gutter Installation, Gutter Protection
                                and Exterior Cleaning services.
                            </p>
                        </div>

                        <div>
                            <h5 className="text-brand-accent mb-8 text-xs font-black uppercase tracking-[0.2em]">
                                Service Areas
                            </h5>
                            <ul className="text-brand-paper/60 space-y-3 text-sm font-medium">
                                {LOCATIONS.map((l) => (
                                    <li
                                        key={l}
                                        className="hover:text-brand-primary cursor-default underline decoration-transparent transition-colors hover:decoration-brand-primary"
                                    >
                                        {l}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-brand-accent mb-8 text-xs font-black uppercase tracking-[0.2em]">
                                Navigation
                            </h5>
                            <ul className="text-brand-paper/60 space-y-3 text-sm font-medium uppercase tracking-widest">
                                <li>
                                    <Link href={services()}>Our Services</Link>
                                </li>
                                <li>
                                    <Link href={commercial()}>Commercial Work</Link>
                                </li>
                                <li>
                                    <Link href={contact()}>Get in Touch</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h5 className="text-brand-accent mb-4 text-xs font-black uppercase tracking-[0.2em]">
                                Contact Us
                            </h5>
                            <div>
                                <p className="mb-1 text-xl font-black">{CONTACT.phone}</p>
                                <a href={`mailto:${CONTACT.email}`} className="text-brand-paper/60 text-sm font-medium hover:text-brand-primary">
                                    {CONTACT.email}
                                </a>
                                <p className="text-brand-paper/40 mt-2 text-sm font-medium">
                                    {CONTACT.address}
                                </p>
                            </div>
                            <button
                                onClick={onOpenQuoteModal}
                                className="text-brand-paper hover:bg-white bg-brand-primary rounded-3xl whitespace-nowrap hover:text-brand-ink font-bold px-4 py-2 text-[10px] tracking-[0.3em] uppercase transition-all"
                            >
                                Get Free Quote
                            </button>
                        </div>
                    </div>

                    <div className="text-brand-paper/30 container mx-auto mt-32 flex flex-col items-center justify-between gap-4 border-t border-white/5 px-4 pt-10 text-[10px] font-black uppercase tracking-widest md:flex-row lg:px-20">
                        <span>© {new Date().getFullYear()} Gutter Gator. Built for the Carolinas.</span>
                        <div className="flex gap-8">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
