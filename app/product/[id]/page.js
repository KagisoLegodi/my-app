'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

const ProductDetailPage = ({ params }) => {
  const { id: productId } = params;

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://next-ecommerce-api.vercel.app/products/${productId}`
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const productData = await res.json();
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {/* Main Product Image */}
      <div className="mb-6">
        <Image
          src={mainImage}
          alt={product.title}
          width={320}
          height={320}
          className="object-contain rounded-lg shadow-lg"
          priority // Add the priority prop
        />
      </div>

      {/* Product Images Gallery */}
      {product.images && product.images.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-wrap gap-6">
            {product.images.map((img, index) => (
              <div
                key={index}
                className="grid sm:w-1/2 lg:w-1/3 cursor-pointer"
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`Product image ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-contain rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Details */}
      <div className="space-y-4">
        <p className="text-lg leading-relaxed">
          <span className="font-semibold bg-slate-400  ">{product.title}:</span>
          {product.description}
        </p>
        <p className="text-lg leading-relaxed">
          <span className="font-semibold bg-slate-400   ">Category:</span> {product.category}
        </p>
        <p className="text-lg leading-relaxed">
          <span className="font-semibold bg-slate-400  ">Price:</span> $
          {product.price.toFixed(2)}
        </p>
        <p className="text-lg leading-relaxed">
          <span className="font-semibold bg-slate-400  ">Discount:</span>{" "}
          {product.discountPercentage}%
        </p>
        <p className="text-lg leading-relaxed">
          <span className="font-semibold bg-slate-400  ">Rating:</span> {product.rating}
        </p>
        <p className="text-lg leading-relaxed">
          <span className="font-semibold bg-slate-400  ">Stock:</span> {product.stock} items
          available
        </p>
        <p className="text-lg leading-relaxed">
          <span className="font-semibold bg-slate-400   ">SKU:</span> {product.sku}
        </p>
        <p className="text-lg leading-relaxed">
          <span className="font-semibold bg-slate-400  ">Tags:</span> {product.tags.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
