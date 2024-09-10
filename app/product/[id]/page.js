"use client";

// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductDetailPage({ params }) {
  const { id: productId } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://next-ecommerce-api.vercel.app/products/${productId}`
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const getImageSrc = () => {
    if (!product) return null;
    if (!imageError && product.image?.startsWith("http")) return product.image;
    if (
      !imageError &&
      product.images?.length > 0 &&
      product.images[0]?.startsWith("http")
    )
      return product.images[0];
    return null;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:max-w-6xl xl:max-w-7xl">
      <div className="mx-auto w-2/5 flex-none">
        {imageError ? (
          <p>Image failed to load.</p>
        ) : (
          <Image
            src={getImageSrc() || "/fallback-image.jpg"} // Provide a fallback image
            alt={product?.title || "Product image"}
            width={500}
            height={500}
            className="w-[90%] h-[90%] object-contain"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="mx-auto w-[90%] space-y-2">
        <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold">
          {product?.title}
        </h1>
        {product?.rating && (
          <div className="flex gap-2 items-center">
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <div>{product.rating.rate}</div>
            <div>Reviews: {product.rating.count}</div>
          </div>
        )}
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          {product?.category}
        </span>
        <h3 className="text-xl md:text-2xl lg:text-2xl font-bold">
          ${product?.price}
        </h3>
        <button className="bg-cyan-700 hover:bg-cyan-900 w-[90%] md:w-[14rem] lg:w-[14rem] text-white font-bold py-2 px-4 rounded">
          Add To Cart
        </button>
        <h2 className="text-lg font-bold">Description</h2>
        <p>{product?.description}</p>
      </div>
    </div>
  );
}
