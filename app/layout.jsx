import { AuthProvider } from "./Providers";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./globals.css";

export const metadata = {
  title: "Hotel produse",
  description: "Aplicatie de management produse",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
