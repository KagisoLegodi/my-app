"use client";

import { useState, useEffect } from "react";
import ProductList from "../app/components/ProductList";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://next-ecommerce-api.vercel.app/products?limit=20&offset=${
            (page - 1) * 20
          }`
        );
        if (!res.ok) throw new Error("Failed to fetch products.");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.history.pushState({}, "", `?page=${page}`);
  }, [page]);

  const handlePageChange = (direction) => {
    if (direction === "next") setPage((prevPage) => prevPage + 1);
    else if (direction === "prev" && page > 1)
      setPage((prevPage) => prevPage - 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold">All Products</h1>
      <ProductList products={products} onPageChange={handlePageChange} />
    </section>
  );
}
