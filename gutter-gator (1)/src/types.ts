export interface QuoteRequest {
  id: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  serviceType: 'residential' | 'commercial' | 'repair' | 'cleaning';
  description: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'scheduled' | 'completed';
  location: {
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  mediaUrls: string[];
  createdAt: Date;
  linkedAccountId?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'customer' | 'admin';
  createdAt: Date;
}

export interface Invoice {
  id: string;
  customerEmail: string;
  amount: number;
  description: string;
  fileUrl: string;
  createdAt: Date;
  status: 'unpaid' | 'paid';
}
