import mongoose from 'mongoose';
import type { Product } from '@/lib/types/product';

const productSchema = new mongoose.Schema<Product>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    specs: { type: Map, of: String, default: new Map() },
    isActive: { type: Boolean, default: true },
    createdAt: { type: String, required: true },
  },
  { timestamps: false }
);

const ProductModel = mongoose.models.Product || mongoose.model<Product>('Product', productSchema);

export default ProductModel;
