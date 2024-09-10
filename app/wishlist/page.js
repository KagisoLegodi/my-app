'use client';
import { useState, useEffect } from 'react';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold">Your Wishlist</h1>
      {wishlist.length ? (
        wishlist.map((product) => (
          <div key={product.id}>
            <p>{product.title}</p>
            <p>${product.price}</p>
          </div>
        ))
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </section>
  );
}
