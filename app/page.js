"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductList from "./components/ProductList";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const itemsPerPage = 20;
  const page = parseInt(searchParams.get("page") || "1", 10);

  const fetchProducts = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const startId = (page - 1) * itemsPerPage;
      const res = await fetch(
        `https://next-ecommerce-api.vercel.app/products?_start=${startId}&_limit=${itemsPerPage}`
      );
      if (!res.ok) throw new Error("Failed to load products");

      const data = await res.json();
      setProducts(data);
      setHasMore(data.length === itemsPerPage);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handlePageChange = (direction) => {
    const newPage = direction === "next" ? page + 1 : Math.max(1, page - 1);
    router.replace(`/?page=${newPage}`);
  };

  return (
    <section className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">All Products</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductList key={product.id} product={product} />
          ))}
        </div>
      ) : (
        !loading && <p>No products available.</p>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={!hasMore}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </section>
  );
}
