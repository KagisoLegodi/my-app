import ProductCard from './ProductCard';

export default function ProductList({ products, onPageChange }) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            onClick={() => onPageChange('prev')}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            onClick={() => onPageChange('next')}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
  