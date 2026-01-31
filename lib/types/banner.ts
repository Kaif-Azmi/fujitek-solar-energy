export interface Banner {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  imageUrl?: string;
  status?: string;
  isActive?: boolean;
  createdAt?: string | Date;
}
