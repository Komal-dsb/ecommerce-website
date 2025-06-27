// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from "react-router";
import { CartProvider } from "./components/Sections/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
     <HelmetProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
    </HelmetProvider>
  // </StrictMode>
);
