import Image from "next/image";
import Link from "next/link";

export default function ProductList({ product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={320}
        height={320}
        className="object-contain w-full h-48 mb-4"
      />
      <h2 className="text-lg font-bold truncate">{product.title}</h2>
      <p className="text-gray-700">{product.category}</p>
      <p className="text-green-600 font-semibold">
        ${product.price.toFixed(2)}
      </p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-400 mr-1">★</span>
        <span className="text-gray-600 text-sm">
          {product.rating.toFixed(1)}
        </span>
      </div>
    </Link>
  );
}
