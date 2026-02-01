import React from "react";

export interface ProductCardProps {
  title: string;
  description: string;
  price: string;
}

export default function ProductCard({
  title,
  description,
  price,
}: ProductCardProps) {
  return (
    <div className="product-card w-\[300px\] rounded-md shadow-xl overflow-hidden relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">

      {/* Decorative star */}
      <div className="absolute -left-[40%] top-0 group-hover:rotate-12 transition-all duration-300 group-hover:scale-150">
        <svg
          viewBox="0 0 24 24"
          className="fill-amber-300 rotate-\[24deg\]"
          height={200}
          width={200}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>

      {/* Background blob */}
      <div className="absolute rounded-full bg-blue-950 z-20 left-1/2 top-[44%] h-[110%] w-[110%] -translate-x-1/2 group-hover:top-[58%] transition-all duration-300" />

      {/* Title */}
      <div className="uppercase text-center leading-none z-40">
        <p className="text-black font-semibold text-xs font-serif">
          {price}
        </p>
        <p className="font-bold text-xl tracking-wider text-gray-500">
          {title}
        </p>
      </div>

      {/* Image placeholder (safe SVG retained) */}
      <div className="w-[180px] aspect-square bg-gray-100 z-40 rounded-md flex items-center justify-center">
        <span className="text-gray-400 text-sm">Product Image</span>
      </div>

      {/* Bottom content */}
      <div className="z-40 flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-white line-clamp-2 px-4">
          {description}
        </p>

        <button className="uppercase font-semibold text-xs px-4 py-1 rounded-full bg-white text-gray-800">
          Order Now
        </button>
      </div>
    </div>
  );
}
