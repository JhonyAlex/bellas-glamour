// Tipos compartidos para modelos y perfiles

export interface ModelPhoto {
  id: string;
  url: string;
  title?: string | null;
  isProfilePhoto: boolean;
}

export interface ModelUser {
  id: string;
  name: string | null;
  image: string | null;
}

export interface Model {
  id: string;
  slug?: string | null;
  artisticName: string | null;
  bio: string | null;
  height: number | null;
  weight: number | null;
  eyeColor: string | null;
  hairColor: string | null;
  skinTone?: string | null;
  measurements: string | null;
  shoeSize?: number | null;
  hobbies?: string | null;
  languages?: string | null;
  skills?: string | null;
  location: string | null;
  nationality?: string | null;
  experience?: string | null;
  specialties?: string | null;
  availability?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  tiktok?: string | null;
  phoneNumber?: string | null;
  whatsappAvailable?: boolean;
  featured: boolean;
  views: number;
  user: ModelUser;
  photos: ModelPhoto[];
}

export interface SiteSettings {
  id: string;
  heroTagline: string | null;
  heroCtaText: string | null;
  aboutTitle: string | null;
  aboutText1: string | null;
  aboutText2: string | null;
  aboutImageUrl: string | null;
  stat1Value: string | null;
  stat1Label: string | null;
  stat2Value: string | null;
  stat2Label: string | null;
  stat3Value: string | null;
  stat3Label: string | null;
  servicesTitle: string | null;
  servicesSubtitle: string | null;
  service1Title: string | null;
  service1Desc: string | null;
  service1Icon: string | null;
  service2Title: string | null;
  service2Desc: string | null;
  service2Icon: string | null;
  service3Title: string | null;
  service3Desc: string | null;
  service3Icon: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  contactLocation: string | null;
  membershipTitle: string | null;
  membershipText: string | null;
}
