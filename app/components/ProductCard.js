import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  // Function to get a valid image source
  const getImageSrc = () => {
    if (!imageError && product.thumbnail?.startsWith('http')) return product.thumbnail;
    if (!imageError && product.images && product.images.length > 0 && product.images[0]?.startsWith('http')) return product.images[0];
    return '/placeholder-image.jpg'; // Fallback image should be in the public directory
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={getImageSrc()}
            alt={product.title}
            width={400} // Adjust width as needed
            height={300} // Adjust height as needed
            className="w-full h-40 object-contain rounded-lg mb-2"
            onError={() => setImageError(true)} // Handle image error
            unoptimized // Use if you have external URLs to bypass Image Optimization (for testing)
          />
        </div>
        <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
        <p className="text-xl font-bold text-gray-800">${product.price}</p>
        <p className="text-sm text-gray-600 mt-1">{product.category}</p>
      </Link>
    </div>
  );
}
