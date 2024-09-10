import './globals.css';
import Header from '../app/components/header';

export const metadata = {
  title: 'FakeStore',
  description: 'FakeStore - Best place to buy products online.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
