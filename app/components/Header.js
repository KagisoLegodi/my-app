import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 p-4 text-white">
      <nav className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">
          Next E-Commerce
        </Link>
        <div className="space-x-4">
          <Link href="/wishlist">
            Wishlist
          </Link>
          <Link href="/cart">
            Cart
          </Link>
          <Link href="/login">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
