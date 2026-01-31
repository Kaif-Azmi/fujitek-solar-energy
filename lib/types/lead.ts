export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}
