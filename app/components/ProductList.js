import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard"; // Ensure this file exists

export default function ProductList({ products, onPageChange }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg"
          onClick={() => onPageChange("prev")}
          aria-label="Previous page"
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg"
          onClick={() => onPageChange("next")}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Assuming 'id' is a string. Adjust if it's a number.
      // Add other product prop types if needed
    })
  ),
  onPageChange: PropTypes.func.isRequired,
};
