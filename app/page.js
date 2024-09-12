// pages/index.js
"use client";

import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 20;

  const fetchProducts = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://next-ecommerce-api.vercel.app/products?limit=${itemsPerPage}&offset=${
          (page - 1) * itemsPerPage
        }`
      );
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      setProducts(data);
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
    if (direction === "next") setPage((prevPage) => prevPage + 1);
    if (direction === "prev" && page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <section>
      <h1 className="text-3xl font-bold my-4">All Products</h1>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p>No products available.</p>
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
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </section>
  );
}
