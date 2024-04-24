import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./globals.css";

export const metadata = {
  title: "Hotel produse",
  description: "Aplicatie de management produse",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <Header />
        <main className="container mx-auto flex-1 p-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
