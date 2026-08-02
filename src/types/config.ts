export interface Location {
  street: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  serviceRadiusMiles: number;
  zipCodes: string[];
}

export interface BusinessMeta {
  name: string;
  phone: string;
  phoneRaw: string; // for tel: links
  emergencyPhone: string;
  emergencyPhoneRaw: string;
  email: string;
  address: Location;
  licenseNumber: string;
  rating: number;
  reviewCount: number;
  establishedYear: number;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    yelp?: string;
    google?: string;
  };
  logo?: {
    icon: string;
    primaryText: string;
    secondaryText: string;
  };
}

export interface ThemeConfig {
  primaryAccent: string; // e.g., 'blue', 'amber', 'emerald'
  secondaryAccent: string;
  glassmorphism: {
    blur: string; // e.g., 'md', 'lg'
    bgOpacity: number; // e.g., 0.1
    borderOpacity: number; // e.g., 0.1
  };
}

export interface ServiceItem {
  slug: string;
  title: string;
  icon: string; // name of Lucide icon
  category: string; // e.g. 'residential', 'commercial', 'emergency'
  shortDesc: string;
  longDesc: string;
  basePrice: number;
  priceRange: string; // e.g., "$150 - $350"
  benefits: string[];
  steps: {
    title: string;
    desc: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  subServices: string[];
  image: string;
  metaTitle: string;
  metaDesc: string;
}

export interface PricingMatrix {
  baseRates: Record<string, number>; // service slug -> price
  propertyMultipliers: {
    label: string;
    value: string;
    multiplier: number;
  }[];
  urgencyFactors: {
    label: string;
    value: string;
    multiplier: number;
    fee: number;
  }[];
  addOnOptions: {
    label: string;
    value: string;
    price: number;
    desc: string;
  }[];
}

export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // split by paragraphs
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
  relatedSlugs: string[];
  metaTitle: string;
  metaDesc: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // 'Full-time' | 'Part-time' | 'Contract'
  salaryRange: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  source: 'Google' | 'Yelp' | 'Verified';
  date: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string; // service slug
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface PageContent {
  home: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    metrics: {
      label: string;
      value: string;
      desc: string;
    }[];
  };
  about: {
    story: {
      title: string;
      paragraphs: string[];
      image: string;
    };
    values: {
      title: string;
      desc: string;
      icon: string;
    }[];
    timeline: {
      year: string;
      title: string;
      desc: string;
    }[];
  };
  careersPage: {
    header: string;
    subHeader: string;
    benefitsTitle: string;
    benefits: {
      title: string;
      desc: string;
      icon: string;
    }[];
  };
}

export interface AIKnowledgeItem {
  keywords: string[];
  response: string;
}

export interface AIAssistantConfig {
  enabled: boolean;
  botName: string;
  personalityTitle: string;
  welcomeMessage: string;
  fallbackResponse: string;
  knowledgeBase: AIKnowledgeItem[];
}

export interface ClientConfig {
  meta: BusinessMeta;
  theme: ThemeConfig;
  services: ServiceItem[];
  pricing: PricingMatrix;
  faqs: FAQItem[];
  blog: BlogPost[];
  careers: JobOpening[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  pageContent: PageContent;
  aiAssistant: AIAssistantConfig;
}
