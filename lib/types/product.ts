export interface Product {
  id: string;
  name: string;
  category: "Panel" | "Inverter" | "Battery" | "EV Charger";
  price: number;
  imageUrl: string;
  publicId: string;
  status: "active" | "inactive";
  createdAt: string | Date;
}
