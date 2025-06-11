import { useState, useEffect, type JSX } from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router";

import Authentication from "../src/components/Sections/Authentication";
import { supabase } from "./supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { Toaster } from "sonner";

import CategoryPage from "../src/components/pages/CategoryPage";
import { Navbar } from "./components/Sections/Navbar";
import { SearchResults } from "./components/pages/SearchResult";
import CartPage from "./components/pages/CartPage";
import ProductPage from "./components/pages/ProductPage";
import PageNotFound from "./components/Sections/PageNotFound";
import Success from "./components/pages/Success";
import Cancel from "./components/pages/Cancell";
import { OrderPage } from "./components/pages/OrderPage";
import Footer from "./components/Sections/Footer";
import HomePage from "./components/pages/HomePage";
import { Loader2 } from "lucide-react";
import ProductDetailPage from "./components/pages/ProductDetailPage";


function Layout(): JSX.Element {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  


  const fetchUserDetail = async () => {
    const { data } = await supabase.auth.getSession();
    setLoading(false);
    setSession(data.session);
  };

  useEffect(() => {
    fetchUserDetail();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);
  if (loading) return <p className="flex w-full h-[100vh] justify-center items-center text-gray-300 "><Loader2 className="h-10 w-10"/></p>;
  return (
    <div className="bg-[#E3E6E6] min-h-screen w-full relative">
      <Toaster richColors position="bottom-center" />

      {session ? (
        <>
          <Navbar />
          <Outlet />
          <Footer/>
        </>
      ) : (
        <Navigate to={"/login"}></Navigate>
      )}
    </div>
  );
}

function AuthLayout(): JSX.Element {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchUserDetail = async () => {
    const { data } = await supabase.auth.getSession();
    setLoading(false);

    setSession(data.session);
  };

  useEffect(() => {
    fetchUserDetail();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return <p className="flex w-full h-[100vh] justify-center items-center text-gray-300 "><Loader2 className="h-10 w-10"/></p>;
  }
  return (
    <div className="bg-[#E3E6E6] min-h-screen w-full relative">
      <Toaster richColors position="bottom-center" />

      {!session || location.hash ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to={"/"}></Navigate>
      )}
    </div>
  );
}

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
           <Route path="/" element={<HomePage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="search" element={<SearchResults id={""} />} />
          <Route path="cart" element={<CartPage />} />
           <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="ProductPage" element={<ProductPage />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
          <Route path="Order" element={<OrderPage />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Authentication />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
