export interface ProductVideo {
  src: string;
  title?: string;
  type?: string;
  poster?: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  serialNumber: string;
  slug: string;
  name: string;

  category: string;
  categories: string[];

  shortDescription: string;
  fullDescription: string;

  price: number | null;
  priceLabel: string;
  currency: string;

  featured: boolean;
  bestseller: boolean;
  newProduct: boolean;

  available: boolean;
  stockStatus: string;

  materials: string[];
  dimensions: string;
  weight: string;
  colors: string[];

  careInstructions: string;

  customizationAvailable: boolean;
  customizationDetails: string;

  images: ProductImage[];

  // Product videos
  videos: ProductVideo[];

  makerId: string;

  skillsUsed: string[];
  productionProcess: string[];

  impactStory: string;

  tags: string[];

  seoTitle: string;
  seoDescription: string;

  popularity: number;
  createdAt: string;
}

export interface Maker {
  makerId: string;
  name: string;
  photo?: string;
  role: string;
  skills: string[];
  training: string;
  experience: string;
  story: string;
  achievements: string[];
  socialImpact: string;
  craftSpecialisation: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  useCase: string;
}

export interface SiteEvent {
  id: string;
  slug: string;
  name: string;
  status: "upcoming" | "current" | "past";
  date: string;
  location: string;
  description: string;
  productsShowcased: string[];
  makerParticipation: string[];
  impactSummary: string;
}

export interface EnquiryPayload {
  name: string;
  mobile: string;
  email?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  country?: string | undefined;
  productId: string;
  serialNumber: string;
  productName: string;
  category: string;
  /** Display price at the time of enquiry, e.g. "₹460" or "Enquire for Price". */
  priceLabel: string;
  quantity: number;
  colour?: string | undefined;
  customization?: string | undefined;
  message?: string | undefined;
  pageUrl?: string | undefined;
}

export interface ContactPayload {
  name: string;
  mobile: string;
  email?: string | undefined;
  message: string;
}
