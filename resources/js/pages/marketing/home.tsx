import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    ClipboardCheck,
    HardHat,
    MapPin,
    ShieldCheck,
    Star,
} from 'lucide-react';
import { useState } from 'react';

import { QuoteModal } from '@/components/quote-modal';
import { Button } from '@/components/ui/button';
import { LOCATIONS } from '@/constants/gutter-gator';
import MarketingLayout from '@/layouts/marketing-layout';
import { services, testimonials } from '@/routes';

const FEATURED_REVIEWS = [
    {
        author_name: 'Margaret M. Gore',
        rating: 5,
        text: 'On time and very knowledgeable. Installers knew their job and worked well together. I am very pleased with the looks of the system.',
        link: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT21sYWRVVjJkVlV5ZEZScVJXNWZaR0pEVm1GU01FRRAB!2m1!1s0x0:0x4cea66e30dcec812!3m1!1s2@1:CAIQACodChtycF9oOmladUV2dVUydFRqRW5fZGJDVmFSMEE%7C%7C',
    },
    {
        author_name: 'Jim Downs',
        rating: 5,
        text: 'Fast reliable courteous',
        link: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2xoVlVFdEdRM00wV21Sc1NXMUZRMWhRWHkxVFEwRRAB!2m1!1s0x0:0x4cea66e30dcec812!3m1!1s2@1:CAIQACodChtycF9oOlhVUEtGQ3M0WmRsSW1FQ1hQXy1TQ0E%7C%7C',
    },
    {
        author_name: 'Carolyn Barnes',
        rating: 5,
        text: 'Good company to deal with',
        link: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2xOc1NFTnJRMnBwTFZKTll6TTBlVUp0YlRWWU9GRRAB!2m1!1s0x0:0x4cea66e30dcec812!3m1!1s2@1:CAIQACodChtycF9oOlNsSENrQ2ppLVJNYzM0eUJtbTVYOFE%7C%7C',
    },
];

export default function Home() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(0);

    const nextReview = () => {
        setCurrentReview((prev) => (prev + 1) % FEATURED_REVIEWS.length);
    };

    const prevReview = () => {
        setCurrentReview((prev) => (prev - 1 + FEATURED_REVIEWS.length) % FEATURED_REVIEWS.length);
    };

    return (
        <MarketingLayout
            title="Gutter Gator - Premier Gutter Services"
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        >
            {/* Split Hero Layout */}
            <section className="flex min-h-[90vh] flex-col lg:flex-row">
                {/* Left Content */}
                <div className="flex min-w-130 shrink-0 flex-col justify-center p-8 lg:p-20">
                    <div className="space-y-6">
                        <span className="text-brand-accent block text-xs font-bold uppercase tracking-[0.2em]">
                            Local Business
                        </span>
                        <h1 className="text-brand-ink text-5xl leading-[0.9] font-black uppercase tracking-tighter lg:text-8xl">
                            Exceptional <br />
                            <span className="text-brand-primary">
                                Service.
                            </span>
                        </h1>
                        <p className="text-brand-secondary/80 max-w-md text-lg leading-relaxed">
                            Gutter Gator is dedicated to providing the highest
                            quality service to the areas surrounding Myrtle Beach
                            and Charleston. We are committed to excellent Gutter
                            Installation, Gutter Protection and Exterior Cleaning.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button
                                onClick={() => setIsQuoteModalOpen(true)}
                                className="bg-brand-primary hover:shadow-brand-primary/20 flex items-center gap-3 rounded-full px-8 py-4 text-lg font-black text-white shadow-xl transition-all hover:scale-105"
                            >
                                REQUEST A QUOTE <ArrowRight size={20} />
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="text-brand-secondary hover:bg-brand-secondary rounded-full border-2 border-brand-secondary px-8 py-4 text-lg font-bold transition-all hover:text-white"
                            >
                                <Link href={services()}>Learn More</Link>
                            </Button>
                        </div>

                        <div className="pt-12 max-w-140">
                            <h3 className="text-brand-accent mb-4 text-xs font-bold uppercase tracking-widest">
                                Serving the Carolinas
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
                </div>

                {/* Right Imagery */}
                <div className="bg-stone-muted relative hidden flex-1 overflow-hidden lg:block">
                    <div className="bg-brand-secondary/10 pointer-events-none absolute inset-0 z-10 mix-blend-multiply"></div>
                    <img
                        src="/uploads/images/gg-on-the-move.avif"
                        alt="Coastal Home"
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                    {/* Floating Info Card */}
                    <div className="glass-card animate-in fade-in slide-in-from-bottom-8 absolute bottom-12 left-12 z-20 max-w-xs rounded-[2rem] p-6 delay-500">
                        <div className="mb-3 flex items-center gap-4">
                            <div className="bg-brand-primary flex h-10 w-10 items-center justify-center rounded-full text-white">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-brand-ink text-sm font-bold">
                                Fully Insured & Certified
                            </span>
                        </div>
                        <p className="text-brand-secondary text-xs">
                            We guarantee all our installations for the lifetime
                            of your home.
                        </p>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="border-stone-line border-y bg-white py-20">
                <div className="container mx-auto grid gap-12 px-4 text-center md:grid-cols-4">
                    <div className="space-y-4">
                        <HardHat size={32} className="text-brand-primary mx-auto" />
                        <h4 className="text-brand-ink text-xl font-bold uppercase tracking-tighter">
                            Pro Teams
                        </h4>
                        <p className="text-sm text-gray-500">
                            Experienced staff with over 15 years in the field.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <ClipboardCheck
                            size={32}
                            className="text-brand-primary mx-auto"
                        />
                        <h4 className="text-brand-ink text-xl font-bold uppercase tracking-tighter">
                            Free Quotes
                        </h4>
                        <p className="text-sm text-gray-500">
                            Digital estimates sent within 24 hours.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <ShieldCheck
                            size={32}
                            className="text-brand-primary mx-auto"
                        />
                        <h4 className="text-brand-ink text-xl font-bold uppercase tracking-tighter">
                            Guaranteed
                        </h4>
                        <p className="text-sm text-gray-500">
                            If your gutters leak, we fix it—no questions asked.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <MapPin size={32} className="text-brand-primary mx-auto" />
                        <h4 className="text-brand-ink text-xl font-bold uppercase tracking-tighter">
                            Local Focus
                        </h4>
                        <p className="text-sm text-gray-500">
                            Locally owned and operated in Myrtle Beach.
                        </p>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="bg-brand-paper pt-10">
                <div className="container mx-auto px-4 lg:px-20">
                    <div className="mb-6 text-center">
                        <h2 className="text-brand-ink mb-2 text-4xl font-black">
                            What Our Customers Say
                        </h2>
                        <p className="text-brand-secondary/70 text-lg">
                            Real reviews from real customers
                        </p>
                        <a href="https://www.google.com/search?hl=en&gl&q=Gutter+Gator,+120+Kelsey+Ct,+Myrtle+Beach,+SC+29588,+United+States&ludocid=5542355416808081426&lsig=AB86z5WZeBQNfscs2uj5Z0h_enJ8#lrd=0x890069c46f4cbcbd:0x4cea66e30dcec812,3" target="_blank" rel="noopener noreferrer">
                            <div className='flex flex-row justify-center items-center'>
                                <p className='text-brand-primary'>
                                    Leave us a review on Google!
                                </p>
                                <img src="/uploads/images/google-reviews.png" alt="Google Reviews" className="h-10" />
                            </div>
                        </a>
                    </div>

                    {/* Desktop: Show all 3 reviews */}
                    <div className="hidden gap-6 md:grid md:grid-cols-3">
                        {FEATURED_REVIEWS.map((review, idx) => (
                            <div
                                key={idx}
                                className="border-stone-line rounded-3xl border bg-white p-6 shadow-sm"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="bg-brand-primary/10 text-brand-primary flex h-12 w-12 items-center justify-center rounded-full font-bold">
                                        {review.author_name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-brand-ink font-bold">
                                            {review.author_name}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < review.rating ? 'currentColor' : 'none'}
                                        />
                                    ))}
                                </div>
                                <p className="text-brand-secondary/80 text-sm leading-relaxed">
                                    {review.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Mobile: Carousel with one review at a time */}
                    <div className="md:hidden">
                        <div className="border-stone-line rounded-3xl border bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="bg-brand-primary/10 text-brand-primary flex h-12 w-12 items-center justify-center rounded-full font-bold">
                                    {FEATURED_REVIEWS[currentReview].author_name.charAt(0)}
                                </div>
                                <div>
                                    <a href={FEATURED_REVIEWS[currentReview].link} target="_blank" rel="noopener noreferrer">
                                        <div className="text-brand-ink font-bold">
                                            {FEATURED_REVIEWS[currentReview].author_name}
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="mb-3 flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        fill={i < FEATURED_REVIEWS[currentReview].rating ? 'currentColor' : 'none'}
                                    />
                                ))}
                            </div>
                            <a href={FEATURED_REVIEWS[currentReview].link} target="_blank" rel="noopener noreferrer">
                                <p className="text-brand-secondary/80 text-sm leading-relaxed">
                                    {FEATURED_REVIEWS[currentReview].text}
                                </p>
                            </a>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="mt-6 flex items-center justify-center gap-4">
                            <button
                                onClick={prevReview}
                                className="bg-stone-tag text-brand-secondary hover:bg-brand-primary/10 rounded-full p-3 transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="flex gap-2">
                                {FEATURED_REVIEWS.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentReview(idx)}
                                        className={`h-2 w-2 rounded-full transition-colors ${
                                            idx === currentReview
                                                ? 'bg-brand-primary'
                                                : 'bg-stone-line'
                                        }`}
                                    />
                                ))}
                            </div>
                            {currentReview < FEATURED_REVIEWS.length - 1 ? (
                                <button
                                    onClick={nextReview}
                                    className="bg-stone-tag text-brand-secondary hover:bg-brand-primary/10 rounded-full p-3 transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            ) : (
                                <Link
                                    href={testimonials()}
                                    className="bg-brand-primary rounded-full px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-primary/90"
                                >
                                    More
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Desktop: More Button */}
                    <div className="mt-10 hidden text-center md:block">
                        <Link
                            href={testimonials()}
                            className="text-brand-primary hover:text-brand-primary/80 font-bold underline underline-offset-4 transition-colors"
                        >
                            See More Reviews →
                        </Link>
                    </div>
                </div>
            </section>

            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
            />
        </MarketingLayout>
    );
}
