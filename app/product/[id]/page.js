"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

async function getProduct(productId) {
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products/${productId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

const ProductDetailPage = ({ params }) => {
  const { id: productId } = params;

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId);
        setProduct(productData);
        setMainImage(productData.thumbnail); // Set the initial main image
      } catch (err) {
        setError("Failed to fetch product data.");
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }
  if (!product) {
    return <p className="text-gray-500 text-center mt-4">Product not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 ">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Products
      </Link>

      {/* Main Product Image */}
      <div className="mb-6">
        <Image
          src={mainImage}
          alt={product.title}
          width={320}
          height={320}
          className="object-contain rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
          priority
        />
        <h1 className="text-2xl font-semibold mt-2">{product.title}</h1>
      </div>

      {/* Product Images Gallery */}
      {product.images && product.images.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-wrap gap-4">
            {product.images.map((img, index) => (
              <div
                key={index}
                className="w-24 h-24 cursor-pointer"
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`Product image ${index + 1}`}
                  width={96}
                  height={96}
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Details */}
      <div className="space-y-4 mt-6">
        <p className="text-lg leading-relaxed">{product.description}</p>
        <p className="text-lg">
          <span className="font-semibold bg-slate-400 p-2 text-white">
            {product.category}
          </span>
        </p>
        <p className="text-lg text-green-500">${product.price.toFixed(2)}</p>
        <p className="text-lg text-red-500">
          <span className="font-semibold">Discount:</span>{" "}
          {product.discountPercentage}%
        </p>

        <p className="text-lg">
          <span className="font-semibold bg-slate-400 p-2 text-white">
            Stock:
          </span>{" "}
          {product.stock} items available
        </p>
        <p className="text-lg">
          <span className="font-semibold bg-slate-400 p-2 text-white">
            SKU:
          </span>{" "}
          {product.sku}
        </p>
        <p className="text-lg">
          <span className="font-semibold bg-slate-400 p-2 text-white">
            Tags:
          </span>{" "}
          {product.tags.join(", ")}
        </p>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <p className="text-lg">
          <span className="font-semibold bg-slate-400 text-yellow-500">
            {product.rating}
          </span>{" "}
        </p>
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <ul className="space-y-4">
            {product.reviews.map((review, index) => (
              <li key={index} className="border-b pb-4">
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
                <p className="mt-2">{review.comment}</p>
                <p className="text-yellow-500 mt-1">
                  Rating: {review.rating}/5
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
