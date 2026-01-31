export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: Record<string, string>;
  isActive: boolean;
  createdAt: string;
}
