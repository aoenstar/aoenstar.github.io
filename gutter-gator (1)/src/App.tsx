import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, MapPin, Camera, Video, ChevronRight, HardHat, ShieldCheck, ClipboardCheck, ArrowRight, Upload } from 'lucide-react';
import { cn } from './lib/utils';
import { LOCATIONS, SERVICES } from './constants';

import logo from './logo.png';

const API_URL = '';

// Page Components
const Home = () => {
  return (
    <div className="min-h-screen bg-brand-paper">
      {/* Split Hero Layout */}
      <section className="grid lg:grid-cols-12 min-h-[90vh]">
        {/* Left Content */}
        <div className="lg:col-span-5 p-8 lg:p-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="text-brand-accent font-bold text-xs tracking-[0.2em] uppercase block">Premier Gutter Services</span>
            <h1 className="text-5xl lg:text-8xl font-black leading-[0.9] text-brand-ink uppercase tracking-tighter">
              Fierce Protection <br/>
              <span className="text-brand-primary">Built for the Coast.</span>
            </h1>
            <p className="text-brand-secondary/80 text-lg leading-relaxed max-w-md">
              South Carolina's choice for precision gutter installation, repair, and professional cleaning. 
              Real-world results with aggressive protection.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-quote-modal'))}
                className="bg-brand-primary text-white px-8 py-4 rounded-full font-black text-lg shadow-xl hover:shadow-brand-primary/20 transition-all hover:scale-105 flex items-center gap-3"
              >
                REQUEST A QUOTE <ArrowRight size={20} />
              </button>
              <Link 
                to="/services"
                className="px-8 py-4 rounded-full font-bold text-lg border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white transition-all"
              >
                Learn More
              </Link>
            </div>
            
            <div className="pt-12">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-brand-accent">Serving the Carolinas</h3>
              <div className="flex flex-wrap gap-2">
                {LOCATIONS.map(loc => (
                  <span key={loc} className="location-tag">{loc}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Imagery */}
        <div className="lg:col-span-7 bg-stone-muted relative overflow-hidden hidden lg:block">
           <div className="absolute inset-0 bg-brand-secondary/10 mix-blend-multiply pointer-events-none z-10"></div>
           <img 
            src="https://picsum.photos/seed/gutter-coastal/1200/900" 
            alt="Coastal Home" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
           />
           {/* Floating Info Card */}
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="absolute bottom-12 left-12 glass-card p-6 rounded-[2rem] max-w-xs z-20"
           >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <span className="font-bold text-sm text-brand-ink">Fully Insured & Certified</span>
              </div>
              <p className="text-xs text-brand-secondary">We guarantee all our installations for the lifetime of your home.</p>
           </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-20 border-y border-stone-line">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 text-center">
           <div className="space-y-4">
              <HardHat size={32} className="mx-auto text-brand-primary" />
              <h4 className="font-bold uppercase tracking-tighter text-xl text-brand-ink">Pro Teams</h4>
              <p className="text-sm text-gray-500">Experienced staff with over 15 years in the field.</p>
           </div>
           <div className="space-y-4">
              <ClipboardCheck size={32} className="mx-auto text-brand-primary" />
              <h4 className="font-bold uppercase tracking-tighter text-xl text-brand-ink">Free Quotes</h4>
              <p className="text-sm text-gray-500">Digital estimates sent within 24 hours.</p>
           </div>
           <div className="space-y-4">
              <ShieldCheck size={32} className="mx-auto text-brand-primary" />
              <h4 className="font-bold uppercase tracking-tighter text-xl text-brand-ink">Guaranteed</h4>
              <p className="text-sm text-gray-500">If your gutters leak, we fix it—no questions asked.</p>
           </div>
           <div className="space-y-4">
              <MapPin size={32} className="mx-auto text-brand-primary" />
              <h4 className="font-bold uppercase tracking-tighter text-xl text-brand-ink">Local Focus</h4>
              <p className="text-sm text-gray-500">Locally owned and operated in Myrtle Beach.</p>
           </div>
        </div>
      </section>
    </div>
  );
};

// Services Page
const AccountPage = () => {
  const [email, setEmail] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = async () => {
    if (!email) return;
    setIsLoading(true);
    try {
      const qRes = await fetch(`${API_URL}/api/quotes/${email}`);
      const iRes = await fetch(`${API_URL}/api/invoices/${email}`);
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
    <div className="container mx-auto px-4 py-20 px-8 lg:px-20 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-brand-ink">Client Portal</h1>
        <p className="text-brand-secondary/70 text-lg">Enter your email to view your project history and unpaid invoices.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-line">
            <label className="block text-xs font-black uppercase mb-3 tracking-widest text-brand-secondary/60">Access Project Data</label>
            <input 
              type="email" 
              placeholder="Enter your email..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-brand-paper border-2 border-transparent focus:border-brand-primary rounded-2xl outline-none mb-4 transition-colors text-brand-ink"
            />
            <button 
              onClick={fetchHistory}
              className="w-full bg-brand-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg hover:shadow-brand-primary/20 transition-all"
            >
              Search Records
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-12">
          {isLoading ? (
             <p className="text-center py-10 font-bold uppercase tracking-widest animate-pulse">Loading Records...</p>
          ) : (
            <>
              <div>
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                  <ClipboardCheck className="text-brand-primary" /> Recent Quote Requests
                </h3>
                {history.length === 0 ? (
                  <div className="p-10 border-2 border-dashed border-stone-line rounded-[2rem] text-center text-brand-secondary/40">
                    No matching requests found for this email.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((h) => (
                      <div key={h.id} className="bg-white p-6 rounded-3xl border border-stone-line flex justify-between items-center shadow-sm">
                        <div>
                          <p className="text-[10px] font-black text-brand-accent uppercase mb-1">{h.status}</p>
                          <h4 className="font-bold text-brand-ink uppercase">{h.serviceType}</h4>
                          <p className="text-xs text-brand-secondary/60">{new Date(h.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-brand-secondary">{h.address || 'GPS Coordinates Provided'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                  <Phone className="text-brand-primary" /> Active Invoices
                </h3>
                {invoices.length === 0 ? (
                  <div className="p-10 border-2 border-dashed border-stone-line rounded-[2rem] text-center text-brand-secondary/40">
                    No active invoices found.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {invoices.map((inv) => (
                      <div key={inv.id} className="bg-white p-6 rounded-3xl border border-stone-line flex justify-between items-center shadow-sm border-l-4 border-brand-primary">
                        <div>
                          <p className="text-[10px] font-black text-brand-primary uppercase mb-1">{inv.status}</p>
                          <h4 className="font-bold text-brand-ink uppercase">${inv.amount.toFixed(2)}</h4>
                          <p className="text-xs text-brand-secondary/60">{inv.description}</p>
                        </div>
                        {inv.fileUrl && (
                          <a 
                            href={inv.fileUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-6 py-3 bg-brand-ink text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-secondary transition-colors"
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
  );
};

const AdminPage = () => {
  const [formData, setFormData] = useState({ email: '', amount: '', description: '' });
  const [file, setFile] = useState<File | null>(null);

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
      const res = await fetch(`${API_URL}/api/admin/invoices`, {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        alert("Invoice uploaded successfully!");
        setFormData({ email: '', amount: '', description: '' });
        setFile(null);
      } else {
        alert("Upload failed. Verify the backend connection.");
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 px-8 lg:px-20 max-w-4xl">
      <h1 className="text-5xl font-black mb-8 uppercase tracking-tighter text-brand-ink">Staff Dashboard</h1>
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-line">
        <h2 className="text-2xl font-black mb-8 border-b border-stone-line pb-4 flex items-center gap-3 text-brand-ink">
          <Upload className="text-brand-primary" /> Upload Customer Invoice
        </h2>
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
             <div>
                <label className="block text-[10px] font-black uppercase text-brand-secondary mb-2">Customer Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-6 py-4 border-2 border-stone-line rounded-2xl outline-none focus:border-brand-primary text-brand-ink" 
                  placeholder="name@email.com"
                  required
                />
             </div>
             <div>
                <label className="block text-[10px] font-black uppercase text-brand-secondary mb-2">Total Amount</label>
                <input 
                  type="number" 
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-6 py-4 border-2 border-stone-line rounded-2xl outline-none focus:border-brand-primary text-brand-ink" 
                  placeholder="0.00"
                  required
                />
             </div>
          </div>
          <div>
             <label className="block text-[10px] font-black uppercase text-brand-secondary mb-2">Description</label>
             <input 
                type="text" 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-6 py-4 border-2 border-stone-line rounded-2xl outline-none focus:border-brand-primary text-brand-ink" 
                placeholder="e.g., Gutter Cleaning - Mar 2026"
                required
             />
          </div>
          <div className="p-10 border-2 border-dashed border-stone-line rounded-[2rem] text-center cursor-pointer hover:border-brand-primary transition-colors relative">
            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
            <Camera className="mx-auto text-brand-secondary mb-2" size={32} />
            <p className="text-sm font-bold uppercase text-brand-secondary">
              {file ? file.name : 'Select Invoice PDF (Optional)'}
            </p>
          </div>
          <button type="submit" className="w-full bg-brand-ink text-white py-5 rounded-full font-black uppercase tracking-[0.2em] shadow-lg hover:bg-brand-primary transition-all">
            {file ? 'Upload & Send' : 'Create Invoice Record'}
          </button>
        </form>
      </div>
    </div>
  );
};

const ServicesPage = () => (
  <div className="container mx-auto px-4 py-20">
    <div className="max-w-4xl mb-20 text-center mx-auto">
      <h1 className="text-5xl font-black mb-6 text-brand-ink tracking-tight">Our Professional Services</h1>
      <p className="text-xl text-brand-secondary/70">From residential gutter cleaning to massive commercial drainage systems, we handle it all with precision.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-10">
      {SERVICES.map((s, idx) => (
        <motion.div 
          key={s.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-line hover:shadow-xl transition-all group"
        >
          <div className="w-16 h-16 bg-stone-tag rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-white transition-colors">
            {s.id === 'residential' || s.id === 'cleaning' ? <Droplets size={32} /> : <HardHat size={32} />}
          </div>
          <h3 className="text-3xl font-bold mb-4 text-brand-ink">{s.title}</h3>
          <p className="text-brand-secondary/80 mb-8 leading-relaxed">{s.description}</p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-quote-modal'))}
            className="text-brand-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
          >
            GET A CUSTOM QUOTE <ChevronRight size={18} />
          </button>
        </motion.div>
      ))}
    </div>
  </div>
);

const Droplets = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M7 16.3c2.2 0 4-1.8 4-4 0-3.3-4-6-4-6s-4 2.7-4 6c0 2.2 1.8 4 4 4Z"/>
    <path d="M17 16c2.2 0 4-1.8 4-4 0-3.3-4-6-4-6s-4 2.7-4 6c0 2.2 1.8 4 4 4Z"/>
  </svg>
);

const CommercialPage = () => (
  <div className="bg-brand-paper min-h-screen">
    <div className="container mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-brand-accent font-bold uppercase tracking-widest text-xs mb-4 block">Industrial Scaling</span>
          <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">Commercial Gutter Systems</h1>
          <p className="text-xl text-brand-secondary/80 mb-12 leading-relaxed">
            Protect your commercial assets with heavy-duty 6" and 7" K-style or box gutters. We specialize in industrial-grade systems for warehouses, retail spaces, and HOA complexes.
          </p>
          <div className="space-y-6 mb-12">
            {[
              "Heavy-gauge Aluminum & Copper options",
              "Precision fabrication for massive roofs",
              "Fully licensed and worker's comp insured",
              "Annual maintenance contracts available"
            ].map(item => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center">
                  <ShieldCheck size={14} />
                </div>
                <span className="font-bold text-brand-ink">{item}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-quote-modal'))}
            className="bg-brand-ink text-white px-10 py-5 rounded-full font-black text-lg shadow-2xl hover:bg-brand-secondary transition-all"
          >
            REQUEST A COMMERCIAL AUDIT
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://picsum.photos/seed/comm-1/600/800" className="rounded-[3rem] shadow-lg mt-12" referrerPolicy="no-referrer" />
          <img src="https://picsum.photos/seed/comm-2/600/800" className="rounded-[3rem] shadow-lg" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  </div>
);

// Quote Modal Component
const QuoteModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    serviceType: 'residential',
    description: '',
    address: '',
    lat: 0,
    lng: 0
  });

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setFormData(prev => ({ ...prev, lat: pos.coords.latitude, lng: pos.coords.longitude }));
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
    Object.entries(formData).forEach(([key, value]) => data.append(key, String(value)));
    files.forEach(f => data.append('media', f));

    try {
      const res = await fetch(`${API_URL}/api/quotes`, {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        alert("Success! We've received your quote request.");
        onClose();
        setStep(1);
        setFormData({ email: '', name: '', phone: '', serviceType: 'residential', description: '', address: '', lat: 0, lng: 0 });
        setFiles([]);
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/40 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative bg-brand-paper w-full max-w-xl rounded-[3rem] p-8 md:p-12 overflow-y-auto max-h-[90vh] shadow-[0_32px_64px_rgba(0,0,0,0.15)]"
          >
            <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-stone-tag text-brand-secondary rounded-full hover:bg-brand-accent/20 transition-colors">
              <X size={20} />
            </button>
            <div className="mb-10 text-center">
              <div className="w-16 h-16 bg-brand-primary text-white rounded-[1.5rem] flex items-center justify-center mb-6 mx-auto shadow-lg rotate-3">
                <ClipboardCheck size={32} />
              </div>
              <h2 className="text-3xl font-black mb-2 text-brand-ink uppercase tracking-tight">Request a Quote</h2>
              <p className="text-brand-secondary/60 font-medium">Capture your project details in seconds.</p>
              <div className="flex justify-center gap-2 mt-4 text-[10px] font-black tracking-widest uppercase">
                <span className={cn("px-2 py-1 rounded transition-colors", step >= 1 ? "bg-brand-primary text-white" : "text-gray-300")}>01 Service</span>
                <span className={cn("px-2 py-1 rounded transition-colors", step >= 2 ? "bg-brand-primary text-white" : "text-gray-300")}>02 Property</span>
                <span className={cn("px-2 py-1 rounded transition-colors", step >= 3 ? "bg-brand-primary text-white" : "text-gray-300")}>03 Contact</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black mb-3 uppercase tracking-[0.2em] text-brand-secondary/60">Choose Service</label>
                      <div className="grid grid-cols-2 gap-3">
                        {SERVICES.map(s => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setFormData({...formData, serviceType: s.id})}
                            className={cn(
                              "p-4 rounded-2xl border-2 text-left transition-all font-bold text-sm",
                              formData.serviceType === s.id ? "border-brand-primary bg-brand-primary/5 text-brand-primary" : "border-stone-line bg-white text-brand-secondary/60"
                            )}
                          >
                            {s.title}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black mb-3 uppercase tracking-[0.2em] text-brand-secondary/60">Project Details</label>
                      <textarea 
                        rows={4} 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-6 py-4 bg-white border-2 border-stone-line rounded-3xl outline-none focus:border-brand-primary transition-colors resize-none" 
                        placeholder="Tell us about the issue or required installation..."
                      ></textarea>
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="w-full bg-brand-primary text-white py-5 rounded-full font-black shadow-xl hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2">
                       NEXT STEP <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="space-y-6">
                     <div className="glass-card p-6 rounded-[2.5rem]">
                        <label className="block text-[10px] font-black mb-4 uppercase tracking-[0.2em] text-brand-primary text-center">Location Tagging</label>
                        <button 
                          type="button" 
                          onClick={handleGetCurrentLocation}
                          className="flex items-center gap-3 w-full bg-white p-5 rounded-3xl shadow-sm border-2 border-stone-line hover:border-brand-primary transition-all group"
                        >
                          <MapPin className="text-brand-primary group-hover:scale-110 transition-transform" />
                          <div className="text-left">
                            <span className="text-xs font-black uppercase text-brand-ink block">GPS Coordinates</span>
                            <span className="text-[10px] text-brand-secondary font-medium">
                              {formData.lat ? `${formData.lat.toFixed(4)}, ${formData.lng.toFixed(4)}` : 'Tap to pin current location'}
                            </span>
                          </div>
                        </button>
                        <input 
                          type="text" 
                          placeholder="Or manually enter address" 
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="mt-4 w-full px-6 py-4 bg-white border-2 border-stone-line rounded-[1rem] outline-none text-sm font-medium" 
                        />
                     </div>
                     
                     <div className="p-8 border-2 border-dashed border-brand-accent/30 rounded-[2.5rem] bg-brand-accent/5 text-center relative group cursor-pointer overflow-hidden">
                        <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <div className="space-y-2">
                           <Upload className={cn("mx-auto transition-colors", files.length > 0 ? "text-brand-primary" : "text-brand-accent")} size={32} />
                           {files.length > 0 ? (
                             <p className="text-sm font-black text-brand-primary uppercase">{files.length} Files Selected</p>
                           ) : (
                             <>
                               <p className="text-sm font-black text-brand-ink uppercase">Upload Documentation</p>
                               <p className="text-[10px] text-brand-secondary font-medium px-4">Photos or Videos help us provide a more accurate remote quote.</p>
                             </>
                           )}
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <button type="button" onClick={() => setStep(1)} className="flex-1 bg-stone-tag py-5 rounded-full font-black text-xs uppercase tracking-widest">Back</button>
                        <button type="button" onClick={() => setStep(3)} className="flex-[2] bg-brand-secondary text-white py-5 rounded-full font-black shadow-xl hover:shadow-brand-secondary/20 transition-all uppercase text-sm tracking-widest">Last Step</button>
                     </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="space-y-6">
                       <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-5 bg-white border-2 border-stone-line rounded-3xl outline-none font-medium" 
                       />
                       <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-5 bg-white border-2 border-stone-line rounded-3xl outline-none font-medium" 
                       />
                       <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-6 py-5 bg-white border-2 border-stone-line rounded-3xl outline-none font-medium" 
                       />
                       <p className="text-[10px] text-brand-secondary text-center px-8 font-medium italic">
                         By submitting, your request will be linked to your email for future account access and invoice history.
                       </p>
                       <div className="flex gap-4">
                          <button type="button" onClick={() => setStep(2)} className="flex-1 bg-stone-tag py-5 rounded-full font-black text-xs uppercase tracking-widest">Back</button>
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-[2] bg-brand-primary text-white py-5 rounded-full font-black shadow-xl hover:shadow-brand-primary/20 transition-all uppercase text-sm tracking-widest flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? 'SUBMITTING...' : 'SEND REQUEST'}
                          </button>
                       </div>
                    </div>
                 </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Main Layout
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleOpen = () => setIsQuoteModalOpen(true);
    window.addEventListener('open-quote-modal', handleOpen);
    return () => window.removeEventListener('open-quote-modal', handleOpen);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-brand-paper font-sans text-brand-ink selection:bg-brand-accent selection:text-brand-ink">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-line">
        <div className="container mx-auto px-4 lg:px-20 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-14 h-14 bg-brand-ink border-2 border-white rounded-[1rem] shadow-2xl flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform overflow-hidden">
                <img 
                  src={logo} 
                  alt="Gutter Gator" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-accent rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-brand-ink rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl lg:text-4xl font-black tracking-tighter leading-none text-brand-ink uppercase">GUTTER</span>
              <span className="text-xl lg:text-2xl font-black tracking-[0.2em] leading-none text-brand-ink/40 uppercase -mt-1 text-center">GATOR</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
             <Link to="/services" className="font-bold text-xs uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors">Services</Link>
             <Link to="/commercial" className="font-bold text-xs uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors">Commercial</Link>
             <Link to="/contact" className="font-bold text-xs uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors">Contact</Link>
             <Link to="/account" className="font-bold text-xs uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors">Client Portal</Link>
             <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-brand-primary text-white border-b-4 border-brand-secondary px-8 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-brand-primary/20 transition-all hover:translate-y-0.5 active:translate-y-1 active:border-b-0"
             >
               Get Quote
             </button>
          </div>

          <button className="lg:hidden p-3 bg-stone-tag rounded-xl text-brand-secondary" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-brand-paper p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-3xl font-black italic text-brand-secondary">GUTTER GATOR</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-white rounded-full shadow-lg"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-black italic tracking-tighter text-brand-ink">
              <Link to="/" className="hover:text-brand-primary">HOME</Link>
              <Link to="/services" className="hover:text-brand-primary">SERVICES</Link>
              <Link to="/commercial" className="hover:text-brand-primary">COMMERCIAL</Link>
              <Link to="/contact" className="hover:text-brand-primary">CONTACT</Link>
              <Link to="/account" className="hover:text-brand-primary">CLIENT PORTAL</Link>
            </div>
            <div className="mt-auto space-y-4">
              <button 
                onClick={() => { setIsMenuOpen(false); setIsQuoteModalOpen(true); }}
                className="w-full bg-brand-primary text-white py-6 rounded-[2rem] font-black text-2xl shadow-2xl"
              >
                REQUEST QUOTE
              </button>
              <a href="tel:8435550123" className="flex items-center justify-center gap-3 py-4 text-brand-secondary font-bold text-xl">
                <Phone size={24} /> (843) 555-0123
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 min-h-screen">
        {children}
      </main>

      <footer className="bg-brand-ink text-white py-32 mt-20">
        <div className="container mx-auto px-4 lg:px-20 grid md:grid-cols-4 gap-20">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border-2 border-brand-ink rounded-lg flex items-center justify-center overflow-hidden p-1">
                <img src={logo} alt="Gutter Gator" className="w-full h-full object-contain" />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase">GUTTER GATOR</span>
            </div>
            <p className="text-brand-paper/40 font-medium leading-relaxed max-w-xs">
              Coastal South Carolina's premier gutter protection specialists. Fierce protection, professional results.
            </p>
          </div>
          <div>
            <h5 className="font-black text-brand-accent uppercase tracking-[0.2em] mb-8 text-xs">Service Areas</h5>
            <ul className="text-brand-paper/60 text-sm space-y-3 font-medium">
              {LOCATIONS.slice(0, 7).map(l => <li key={l} className="hover:text-brand-primary transition-colors cursor-default underline decoration-transparent hover:decoration-brand-primary">{l}</li>)}
              <li className="font-black text-brand-primary">See All 14 Locations</li>
            </ul>
          </div>
          <div>
             <h5 className="font-black text-brand-accent uppercase tracking-[0.2em] mb-8 text-xs">Navigation</h5>
             <ul className="text-brand-paper/60 text-sm space-y-3 font-medium uppercase tracking-widest">
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/commercial">Commercial Work</Link></li>
                <li><Link to="/contact">Get in Touch</Link></li>
             </ul>
          </div>
          <div className="space-y-8">
            <h5 className="font-black text-brand-accent uppercase tracking-[0.2em] mb-4 text-xs">Contact Headquarters</h5>
            <div>
              <p className="text-xl font-black mb-1">(843) 555-0123</p>
              <p className="text-brand-paper/40 text-sm italic font-medium">Monday — Friday, 8am - 6pm</p>
            </div>
            <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full bg-transparent border-2 border-brand-paper/20 py-4 rounded-2xl hover:bg-white hover:text-brand-ink transition-all uppercase text-[10px] font-black tracking-[0.3em]"
            >
              Get Free Quote
            </button>
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-20 mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-paper/30 text-[10px] uppercase font-black tracking-widest">
          <span>© {new Date().getFullYear()} Gutter Gator. Built for the Carolinas.</span>
          <div className="flex gap-8">
             <a href="#">Privacy Policy</a>
             <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/commercial" element={<CommercialPage />} />
          <Route path="/contact" element={<div className="container mx-auto px-4 py-20 px-8 lg:px-20"><h1 className="text-5xl font-black mb-8">Contact Us</h1>{/* Same contact logic or simpler form */}</div>} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
