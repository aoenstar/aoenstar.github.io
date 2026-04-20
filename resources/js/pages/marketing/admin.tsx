import { router } from '@inertiajs/react';
import { Camera, Image, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';

import { QuoteModal } from '@/components/quote-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LOCATIONS } from '@/constants/gutter-gator';
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

interface AdminProps {
    galleryImages?: GalleryImage[];
}

export default function Admin({ galleryImages = [] }: AdminProps) {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'invoices' | 'gallery'>('gallery');
    const [formData, setFormData] = useState({
        email: '',
        amount: '',
        description: '',
    });
    const [file, setFile] = useState<File | null>(null);

    // Gallery form state
    const [galleryForm, setGalleryForm] = useState({
        title: '',
        description: '',
        category: 'project',
        location: '',
        is_featured: false,
    });
    const [galleryFile, setGalleryFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('email', formData.email);
        data.append('amount', formData.amount);
        data.append('description', formData.description);
        if (file) {
            data.append('invoice', file);
        }

        try {
            const res = await fetch('/api/admin/invoices', {
                method: 'POST',
                body: data,
            });
            if (res.ok) {
                alert('Invoice uploaded successfully!');
                setFormData({ email: '', amount: '', description: '' });
                setFile(null);
            } else {
                alert('Upload failed. Verify the backend connection.');
            }
        } catch (err) {
            console.error(err);
            alert(
                'Error: ' +
                    (err instanceof Error ? err.message : String(err))
            );
        }
    };

    const handleGalleryUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!galleryFile) {
            alert('Please select an image');
            return;
        }

        setIsUploading(true);

        const data = new FormData();
        data.append('title', galleryForm.title);
        data.append('description', galleryForm.description);
        data.append('category', galleryForm.category);
        data.append('location', galleryForm.location);
        data.append('is_featured', galleryForm.is_featured ? '1' : '0');
        data.append('image', galleryFile);

        router.post('/admin/gallery', data, {
            forceFormData: true,
            onSuccess: () => {
                setGalleryForm({
                    title: '',
                    description: '',
                    category: 'project',
                    location: '',
                    is_featured: false,
                });
                setGalleryFile(null);
            },
            onFinish: () => setIsUploading(false),
        });
    };

    const handleDeleteImage = (id: number) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(`/admin/gallery/${id}`);
        }
    };

    return (
        <MarketingLayout
            title="Staff Dashboard - Gutter Gator"
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        >
            <div className="container mx-auto max-w-6xl px-4 py-20 lg:px-20">
                <h1 className="text-brand-ink mb-8 text-5xl font-black uppercase tracking-tighter">
                    Staff Dashboard
                </h1>

                {/* Tabs */}
                <div className="mb-8 flex gap-4">
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`rounded-full px-8 py-3 font-bold uppercase tracking-widest transition-all ${
                            activeTab === 'gallery'
                                ? 'bg-brand-primary text-white shadow-lg'
                                : 'bg-stone-tag text-brand-secondary hover:bg-brand-primary/10'
                        }`}
                    >
                        <Image size={18} className="mr-2 inline" />
                        Gallery
                    </button>
                    <button
                        onClick={() => setActiveTab('invoices')}
                        className={`rounded-full px-8 py-3 font-bold uppercase tracking-widest transition-all ${
                            activeTab === 'invoices'
                                ? 'bg-brand-primary text-white shadow-lg'
                                : 'bg-stone-tag text-brand-secondary hover:bg-brand-primary/10'
                        }`}
                    >
                        <Upload size={18} className="mr-2 inline" />
                        Invoices
                    </button>
                </div>

                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                    <div className="space-y-8">
                        {/* Upload Form */}
                        <div className="border-stone-line rounded-[3rem] border bg-white p-10 shadow-xl">
                            <h2 className="text-brand-ink border-stone-line mb-8 flex items-center gap-3 border-b pb-4 text-2xl font-black">
                                <Image className="text-brand-primary" /> Upload Project Image
                            </h2>
                            <form onSubmit={handleGalleryUpload} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="text-brand-secondary mb-2 block text-[10px] font-black uppercase">
                                            Title *
                                        </label>
                                        <Input
                                            type="text"
                                            value={galleryForm.title}
                                            onChange={(e) =>
                                                setGalleryForm({ ...galleryForm, title: e.target.value })
                                            }
                                            className="text-brand-ink border-stone-line focus:border-brand-primary w-full rounded-2xl border-2 px-6 py-4 outline-none"
                                            placeholder="e.g., Gutter Installation - Beach Home"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-brand-secondary mb-2 block text-[10px] font-black uppercase">
                                            Location
                                        </label>
                                        <select
                                            value={galleryForm.location}
                                            onChange={(e) =>
                                                setGalleryForm({ ...galleryForm, location: e.target.value })
                                            }
                                            className="text-brand-ink border-stone-line focus:border-brand-primary w-full rounded-2xl border-2 bg-white px-6 py-4 outline-none"
                                        >
                                            <option value="">Select location...</option>
                                            {LOCATIONS.map((loc) => (
                                                <option key={loc} value={loc}>
                                                    {loc}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="text-brand-secondary mb-2 block text-[10px] font-black uppercase">
                                            Category
                                        </label>
                                        <select
                                            value={galleryForm.category}
                                            onChange={(e) =>
                                                setGalleryForm({ ...galleryForm, category: e.target.value })
                                            }
                                            className="text-brand-ink border-stone-line focus:border-brand-primary w-full rounded-2xl border-2 bg-white px-6 py-4 outline-none"
                                        >
                                            <option value="project">Project</option>
                                            <option value="before-after">Before & After</option>
                                            <option value="gutter-installation">Gutter Installation</option>
                                            <option value="gutter-cleaning">Gutter Cleaning</option>
                                            <option value="exterior-cleaning">Exterior Cleaning</option>
                                        </select>
                                    </div>
                                    <div className="flex items-end">
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={galleryForm.is_featured}
                                                onChange={(e) =>
                                                    setGalleryForm({ ...galleryForm, is_featured: e.target.checked })
                                                }
                                                className="bg-brand-primary h-5 w-5 rounded"
                                            />
                                            <span className="text-brand-secondary font-bold">
                                                Feature on homepage
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-brand-secondary mb-2 block text-[10px] font-black uppercase">
                                        Description
                                    </label>
                                    <textarea
                                        value={galleryForm.description}
                                        onChange={(e) =>
                                            setGalleryForm({ ...galleryForm, description: e.target.value })
                                        }
                                        rows={3}
                                        className="text-brand-ink border-stone-line focus:border-brand-primary w-full resize-none rounded-2xl border-2 px-6 py-4 outline-none"
                                        placeholder="Brief description of the project..."
                                    />
                                </div>
                                <div className="border-stone-line hover:border-brand-primary relative cursor-pointer rounded-[2rem] border-2 border-dashed p-10 text-center transition-colors">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setGalleryFile(e.target.files?.[0] || null)}
                                        className="absolute inset-0 cursor-pointer opacity-0"
                                    />
                                    <Camera className="text-brand-secondary mx-auto mb-2" size={32} />
                                    <p className="text-brand-secondary text-sm font-bold uppercase">
                                        {galleryFile ? galleryFile.name : 'Select Project Image *'}
                                    </p>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isUploading}
                                    className="bg-brand-ink hover:bg-brand-primary w-full rounded-full py-5 font-black uppercase tracking-[0.2em] text-white shadow-lg transition-all disabled:opacity-50"
                                >
                                    {isUploading ? 'Uploading...' : 'Upload to Gallery'}
                                </Button>
                            </form>
                        </div>

                        {/* Existing Images */}
                        <div className="border-stone-line rounded-[3rem] border bg-white p-10 shadow-xl">
                            <h2 className="text-brand-ink border-stone-line mb-8 flex items-center gap-3 border-b pb-4 text-2xl font-black">
                                <Image className="text-brand-primary" /> Manage Gallery ({galleryImages.length})
                            </h2>
                            {galleryImages.length > 0 ? (
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {galleryImages.map((image) => (
                                        <div
                                            key={image.id}
                                            className="group relative overflow-hidden rounded-2xl"
                                        >
                                            <img
                                                src={`/storage/${image.image_path}`}
                                                alt={image.title}
                                                className="aspect-[4/3] w-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                                                <div className="flex-1">
                                                    <p className="font-bold text-white">{image.title}</p>
                                                    <p className="text-sm text-white/70">{image.location}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteImage(image.id)}
                                                    className="rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            {image.is_featured && (
                                                <span className="bg-brand-primary absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-bold text-white">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-brand-secondary/60 py-8 text-center">
                                    No images uploaded yet. Add your first project image above.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Invoices Tab */}
                {activeTab === 'invoices' && (
                    <div className="border-stone-line rounded-[3rem] border bg-white p-10 shadow-xl">
                    <h2 className="text-brand-ink border-stone-line mb-8 flex items-center gap-3 border-b pb-4 text-2xl font-black">
                        <Upload className="text-brand-primary" /> Upload
                        Customer Invoice
                    </h2>
                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="text-brand-secondary mb-2 block text-[10px] font-black uppercase">
                                    Customer Email
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
                                    placeholder="name@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-brand-secondary mb-2 block text-[10px] font-black uppercase">
                                    Total Amount
                                </label>
                                <Input
                                    type="number"
                                    value={formData.amount}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            amount: e.target.value,
                                        })
                                    }
                                    className="text-brand-ink border-stone-line focus:border-brand-primary w-full rounded-2xl border-2 px-6 py-4 outline-none"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-brand-secondary mb-2 block text-[10px] font-black uppercase">
                                Description
                            </label>
                            <Input
                                type="text"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                className="text-brand-ink border-stone-line focus:border-brand-primary w-full rounded-2xl border-2 px-6 py-4 outline-none"
                                placeholder="e.g., Gutter Cleaning - Mar 2026"
                                required
                            />
                        </div>
                        <div className="border-stone-line hover:border-brand-primary relative cursor-pointer rounded-[2rem] border-2 border-dashed p-10 text-center transition-colors">
                            <input
                                type="file"
                                onChange={(e) =>
                                    setFile(e.target.files?.[0] || null)
                                }
                                className="absolute inset-0 cursor-pointer opacity-0"
                            />
                            <Camera
                                className="text-brand-secondary mx-auto mb-2"
                                size={32}
                            />
                            <p className="text-brand-secondary text-sm font-bold uppercase">
                                {file
                                    ? file.name
                                    : 'Select Invoice PDF (Optional)'}
                            </p>
                        </div>
                        <Button
                            type="submit"
                            className="bg-brand-ink hover:bg-brand-primary w-full rounded-full py-5 font-black uppercase tracking-[0.2em] text-white shadow-lg transition-all"
                        >
                            {file
                                ? 'Upload & Send'
                                : 'Create Invoice Record'}
                        </Button>
                    </form>
                    </div>
                )}
            </div>

            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
            />
        </MarketingLayout>
    );
}
