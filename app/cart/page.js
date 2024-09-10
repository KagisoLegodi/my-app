'use client';
import { useState, useEffect } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold">Your Cart</h1>
      {cart.length ? (
        cart.map((item) => (
          <div key={item.id}>
            <p>{item.title}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${item.quantity * item.price}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </section>
  );
}
