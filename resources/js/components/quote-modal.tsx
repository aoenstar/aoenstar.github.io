import { router } from '@inertiajs/react';
import {
    Camera,
    ChevronRight,
    ClipboardCheck,
    MapPin,
    Upload,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SERVICES } from '@/constants/gutter-gator';
import { cn } from '@/lib/utils';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultServiceType?: string;
}

export function QuoteModal({ isOpen, onClose, defaultServiceType }: QuoteModalProps) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        serviceTypes: defaultServiceType ? [defaultServiceType] : [] as string[],
        description: '',
        address: '',
        lat: 0,
        lng: 0,
    });

    // Sync serviceTypes when modal opens with a different default
    useEffect(() => {
        if (isOpen) {
            setFormData((prev) => ({
                ...prev,
                serviceTypes: defaultServiceType ? [defaultServiceType] : [],
            }));
        }
    }, [isOpen, defaultServiceType]);

    const toggleService = (serviceId: string) => {
        setFormData((prev) => ({
            ...prev,
            serviceTypes: prev.serviceTypes.includes(serviceId)
                ? prev.serviceTypes.filter((id) => id !== serviceId)
                : [...prev.serviceTypes, serviceId],
        }));
    };

    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setFormData((prev) => ({
                    ...prev,
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                }));
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'serviceTypes' && Array.isArray(value)) {
                value.forEach((v) => data.append('serviceTypes[]', v));
            } else {
                data.append(key, String(value));
            }
        });
        files.forEach((f) => data.append('media[]', f));

        try {
            // Use Inertia router for form submission
            router.post('/api/quotes', data, {
                forceFormData: true,
                onSuccess: () => {
                    alert("Success! We've received your quote request.");
                    handleClose();
                },
                onError: () => {
                    alert('Submission failed. Please try again.');
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        } catch {
            alert('Submission failed. Please try again.');
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        onClose();
        setStep(1);
        setFormData({
            email: '',
            name: '',
            phone: '',
            serviceTypes: defaultServiceType ? [defaultServiceType] : [],
            description: '',
            address: '',
            lat: 0,
            lng: 0,
        });
        setFiles([]);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-brand-paper max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[3rem] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.15)] md:p-12">
                <DialogHeader className="mb-10 text-center">
                    <div className="bg-brand-primary mx-auto mb-6 flex h-16 w-16 rotate-3 items-center justify-center rounded-[1.5rem] text-white shadow-lg">
                        <ClipboardCheck size={32} />
                    </div>
                    <DialogTitle className="text-brand-ink text-3xl font-black uppercase tracking-tight">
                        Request a Quote
                    </DialogTitle>
                    <DialogDescription className="text-brand-secondary/60 font-medium">
                        Capture your project details in seconds.
                    </DialogDescription>
                    <div className="mt-4 flex justify-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <span
                            className={cn(
                                'rounded px-2 py-1 transition-colors',
                                step >= 1
                                    ? 'bg-brand-primary text-white'
                                    : 'text-gray-300'
                            )}
                        >
                            01 Contact
                        </span>
                        <span
                            className={cn(
                                'rounded px-2 py-1 transition-colors',
                                step >= 2
                                    ? 'bg-brand-primary text-white'
                                    : 'text-gray-300'
                            )}
                        >
                            02 Service
                        </span>
                        <span
                            className={cn(
                                'rounded px-2 py-1 transition-colors',
                                step >= 3
                                    ? 'bg-brand-primary text-white'
                                    : 'text-gray-300'
                            )}
                        >
                            03 Property
                        </span>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Contact Info */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                            <Input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="border-stone-line w-full rounded-3xl border-2 px-6 py-5 font-medium"
                            />
                            <Input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="border-stone-line w-full rounded-3xl border-2 px-6 py-5 font-medium"
                            />
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                    })
                                }
                                className="border-stone-line w-full rounded-3xl border-2 px-6 py-5 font-medium"
                            />
                            <Button
                                type="button"
                                onClick={() => setStep(2)}
                                className="bg-brand-primary hover:shadow-brand-primary/20 flex w-full items-center justify-center gap-2 rounded-full py-5 font-black text-white shadow-xl"
                            >
                                NEXT STEP <ChevronRight size={20} />
                            </Button>
                        </div>
                    )}

                    {/* Step 2: Service Selection */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                            <div>
                                <label className="text-brand-secondary/60 mb-3 block text-[10px] font-black uppercase tracking-[0.2em]">
                                    Choose Services (select all that apply)
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {SERVICES.map((s) => (
                                        <button
                                            key={s.id}
                                            type="button"
                                            onClick={() => toggleService(s.id)}
                                            className={cn(
                                                'rounded-2xl border-2 p-4 text-left text-sm font-bold transition-all',
                                                formData.serviceTypes.includes(s.id)
                                                    ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                                                    : 'border-stone-line text-brand-secondary/60 bg-white'
                                            )}
                                        >
                                            {s.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-brand-secondary/60 mb-3 block text-[10px] font-black uppercase tracking-[0.2em]">
                                    Project Details
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    className="border-stone-line focus:border-brand-primary w-full resize-none rounded-3xl border-2 bg-white px-6 py-4 outline-none transition-colors"
                                    placeholder="Tell us about the issue or required installation..."
                                ></textarea>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    variant="secondary"
                                    className="bg-stone-tag flex-1 rounded-full py-5 text-xs font-black uppercase tracking-widest"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="bg-brand-primary hover:shadow-brand-primary/20 flex flex-[2] items-center justify-center gap-2 rounded-full py-5 font-black text-white shadow-xl"
                                >
                                    NEXT STEP <ChevronRight size={20} />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Property/Location */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                            <div className="glass-card rounded-[2.5rem] p-6">
                                <label className="text-brand-primary mb-4 block text-center text-[10px] font-black uppercase tracking-[0.2em]">
                                    Location Tagging
                                </label>
                                <button
                                    type="button"
                                    onClick={handleGetCurrentLocation}
                                    className="border-stone-line hover:border-brand-primary group flex w-full items-center gap-3 rounded-3xl border-2 bg-white p-5 shadow-sm transition-all"
                                >
                                    <MapPin className="text-brand-primary transition-transform group-hover:scale-110" />
                                    <div className="text-left">
                                        <span className="text-brand-ink block text-xs font-black uppercase">
                                            GPS Coordinates
                                        </span>
                                        <span className="text-brand-secondary text-[10px] font-medium">
                                            {formData.lat
                                                ? `${formData.lat.toFixed(4)}, ${formData.lng.toFixed(4)}`
                                                : 'Tap to pin current location'}
                                        </span>
                                    </div>
                                </button>
                                <Input
                                    type="text"
                                    placeholder="Or manually enter address"
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            address: e.target.value,
                                        })
                                    }
                                    className="border-stone-line mt-4 rounded-[1rem] px-6 py-4 text-sm font-medium"
                                />
                            </div>

                            <div className="bg-brand-accent/5 border-brand-accent/30 group relative cursor-pointer overflow-hidden rounded-[2.5rem] border-2 border-dashed p-8 text-center">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="absolute inset-0 z-10 cursor-pointer opacity-0"
                                />
                                <div className="space-y-2">
                                    <Upload
                                        className={cn(
                                            'mx-auto transition-colors',
                                            files.length > 0
                                                ? 'text-brand-primary'
                                                : 'text-brand-accent'
                                        )}
                                        size={32}
                                    />
                                    {files.length > 0 ? (
                                        <p className="text-brand-primary text-sm font-black uppercase">
                                            {files.length} Files Selected
                                        </p>
                                    ) : (
                                        <>
                                            <p className="text-brand-ink text-sm font-black uppercase">
                                                Upload Documentation
                                            </p>
                                            <p className="text-brand-secondary px-4 text-[10px] font-medium">
                                                Photos or Videos help us provide
                                                a more accurate remote quote.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <p className="text-brand-secondary px-8 text-center text-[10px] font-medium italic">
                                By submitting, your request will be linked to
                                your email for future account access and invoice
                                history.
                            </p>
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    variant="secondary"
                                    className="bg-stone-tag flex-1 rounded-full py-5 text-xs font-black uppercase tracking-widest"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-brand-primary hover:shadow-brand-primary/20 flex flex-[2] items-center justify-center gap-2 rounded-full py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl"
                                >
                                    {isSubmitting
                                        ? 'SUBMITTING...'
                                        : 'SEND REQUEST'}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
