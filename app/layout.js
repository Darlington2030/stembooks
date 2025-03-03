import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import "./globals.css";
// import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
        <Navbar/>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
