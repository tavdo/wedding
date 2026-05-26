export interface WeddingData {
  couple: {
    partner1: string;
    partner2: string;
    initials: string;
    tagline: string;
  };
  date: string;
  dateFormatted: string;
  images: {
    hero: string;
    finale: string;
    preloader: string;
  };
  venue: {
    ceremony: VenueInfo;
    reception: VenueInfo;
  };
  dressCode: string;
  schedule: ScheduleItem[];
  loveStory: LoveStoryChapter[];
  gallery: GalleryImage[];
  quote: {
    text: string;
    author: string;
  };
  social: SocialLink[];
  music: {
    title: string;
    artist: string;
    src: string;
  };
}

export interface VenueInfo {
  name: string;
  address: string;
  city: string;
  time: string;
  coordinates: { lat: number; lng: number };
  description: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface LoveStoryChapter {
  id: string;
  year: string;
  title: string;
  content: string;
  image: string;
  accent?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface RSVPFormData {
  name: string;
  email: string;
  guestCount: number;
  attending: "yes" | "no" | "maybe";
  dietaryPreferences: string;
  message: string;
}

export interface RSVPRecord extends RSVPFormData {
  id: string;
  createdAt: string;
}

export interface AdminStats {
  totalResponses: number;
  totalGuests: number;
  attendingYes: number;
  attendingNo: number;
  attendingMaybe: number;
  guestCountYes: number;
}

export interface GuestPersonalization {
  guestName?: string;
  guestId?: string;
}

export type Locale = "ka";

export interface Translations {
  nav: Record<string, string>;
  hero: Record<string, string>;
  waxSeal: Record<string, string>;
  story: Record<string, string>;
  events: Record<string, string>;
  countdown: Record<string, string>;
  gallery: Record<string, string>;
  rsvp: Record<string, string>;
  finale: Record<string, string>;
  footer: Record<string, string>;
  common: Record<string, string>;
}
