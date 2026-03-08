export interface TourDate {
  id: string;
  date: string; // ISO date
  city: string;
  venue: string;
  country: string;
  ticketUrl?: string;
  status: 'upcoming' | 'sold_out' | 'cancelled' | 'past';
  specialNote?: string;
}

export interface MerchProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  images: string[];
  description: string;
  category: 'apparel' | 'accessories' | 'music' | 'bundles';
  variants?: {
    name: string;
    options: string[];
  }[];
  inStock: boolean;
}

export interface PressFeature {
  id: string;
  publication: string;
  title: string;
  url: string;
  date: string;
  quote?: string;
  publicationLogo?: string;
  type: 'review' | 'feature' | 'interview' | 'mention';
}

export interface DSPLink {
  platform:
    | 'spotify'
    | 'apple_music'
    | 'tidal'
    | 'youtube_music'
    | 'amazon_music'
    | 'soundcloud'
    | 'bandcamp';
  url: string;
  label: string;
}

export interface DiscographyItem {
  id: string;
  title: string;
  artist: string;
  role: string;
  year: number;
  artwork: string;
  streamingUrl?: string;
  type: 'album' | 'film_tv' | 'featured';
}
