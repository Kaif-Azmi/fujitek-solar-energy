import mongoose from 'mongoose';
import type { Product } from '@/lib/types/product';

const productSchema = new mongoose.Schema<Product>(
  {
    id: { type: String, required: false },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Panel', 'Inverter', 'Battery', 'EV Charger'],
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const ProductModel = mongoose.models.Product || mongoose.model<Product>('Product', productSchema);

export default ProductModel;
