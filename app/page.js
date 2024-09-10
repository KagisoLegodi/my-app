"use client";

import { useState, useEffect, useCallback } from "react";
import ProductList from "../app/components/ProductList";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true); // Start loading before fetch
    setError(null); // Reset errors before fetching

    try {
      const res = await fetch(
        `https://next-ecommerce-api.vercel.app/products?limit=20&offset=${
          (page - 1) * 20
        }`
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setError("Failed to fetch products.");
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  }, [page]);

  // Fetch products when the page changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update the URL with the current page
  useEffect(() => {
    window.history.replaceState({}, "", `?page=${page}`);
  }, [page]);

  // Handle page change events
  const handlePageChange = (direction) => {
    if (direction === "next") {
      setPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    } else {
      console.warn("Invalid direction or at the first page.");
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold">All Products</h1>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ProductList products={products} onPageChange={handlePageChange} />
    </section>
  );
}
