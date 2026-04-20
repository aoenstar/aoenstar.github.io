import { useState } from 'react';
import { X } from 'lucide-react';

import { QuoteModal } from '@/components/quote-modal';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import MarketingLayout from '@/layouts/marketing-layout';

interface GalleryImage {
    id: number;
    title: string;
    description: string | null;
    image_path: string;
    category: string;
    location: string | null;
    is_featured: boolean;
}

interface GalleryProps {
    images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [filter, setFilter] = useState<string>('all');

    const categories = ['all', ...new Set(images.map((img) => img.category))];

    const filteredImages =
        filter === 'all'
            ? images
            : images.filter((img) => img.category === filter);

    return (
        <MarketingLayout
            title="Project Gallery - Gutter Gator"
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        >
            <div className="container mx-auto px-4 py-20 lg:px-20">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h1 className="text-brand-ink mb-4 text-5xl font-black uppercase tracking-tighter">
                        Our Work
                    </h1>
                    <p className="text-brand-secondary/70 text-xl">
                        Browse through our completed projects across Myrtle Beach,
                        Charleston, and surrounding areas.
                    </p>
                </div>

                {/* Category Filter */}
                {categories.length > 1 && (
                    <div className="mb-10 flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`rounded-full px-6 py-2 text-sm font-bold uppercase tracking-widest transition-all ${
                                    filter === cat
                                        ? 'bg-brand-primary text-white shadow-lg'
                                        : 'bg-stone-tag text-brand-secondary hover:bg-brand-primary/10'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Gallery Grid */}
                {filteredImages.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredImages.map((image) => (
                            <div
                                key={image.id}
                                onClick={() => setSelectedImage(image)}
                                className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-xl"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={`/storage/${image.image_path}`}
                                        alt={image.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {image.is_featured && (
                                        <span className="bg-brand-primary absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold text-white">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-brand-ink mb-1 text-lg font-bold">
                                        {image.title}
                                    </h3>
                                    {image.location && (
                                        <p className="text-brand-secondary/60 text-sm">
                                            {image.location}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border-stone-line rounded-3xl border-2 border-dashed py-20 text-center">
                        <p className="text-brand-secondary/60 text-lg">
                            No projects to display yet. Check back soon!
                        </p>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-brand-secondary/70 mb-6 text-lg">
                        Ready to start your project?
                    </p>
                    <Button
                        onClick={() => setIsQuoteModalOpen(true)}
                        className="bg-brand-primary hover:bg-brand-primary/90 rounded-full px-10 py-5 text-lg font-black text-white shadow-xl"
                    >
                        REQUEST A FREE QUOTE
                    </Button>
                </div>
            </div>

            {/* Lightbox Modal */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
                    {selectedImage && (
                        <div className="relative">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/40"
                            >
                                <X size={24} />
                            </button>
                            <img
                                src={`/storage/${selectedImage.image_path}`}
                                alt={selectedImage.title}
                                className="max-h-[80vh] w-full rounded-2xl object-contain"
                            />
                            <div className="mt-4 text-center text-white">
                                <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                                {selectedImage.description && (
                                    <p className="mt-2 text-white/80">{selectedImage.description}</p>
                                )}
                                {selectedImage.location && (
                                    <p className="mt-1 text-sm text-white/60">{selectedImage.location}</p>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
            />
        </MarketingLayout>
    );
}
