/* eslint-disable @next/next/no-img-element */
// components/ProductCard.js
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded-lg">
      <Link href={`/product/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-64 object-contain mb-4"
          />
          <h2 className="text-xl font-bold">{product.title}</h2>
          <p className="text-gray-500">${product.price}</p>
          <p className="text-gray-500">{product.category}</p>
      </Link>
    </div>
  );
}
