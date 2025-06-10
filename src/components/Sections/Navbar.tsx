import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/supabaseClient";
import { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../Sections/CartContext";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import useCategories from "../Sections/hooks/useCategories";

export function Navbar() {
  const { count } = useCart();
  const { categories } = useCategories();
  const location = useLocation();
  const isActive = location.pathname === "/ProductPage";

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const logOut = async () => {
    await supabase.auth.signOut();
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSelectSuggestion = (productName: string) => {
    setSearchQuery(productName);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(productName)}`);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
        return;
      }

      const { data, error } = await supabase
        .from("product")
        .select("name")
        .ilike("name", `%${searchQuery}%`)
        .limit(5);

      if (!error && data) {
        setSuggestions(data.map((item) => item.name));
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  return (
    <div className="flex flex-col sticky top-0 z-50 max-w-8xl">
   

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-black cursor-pointer select-none">
            SHOP.CO
          </h1>
        </div>

        {/* Search Bar (desktop only) */}
        <div className="hidden md:flex flex-row md:w-[35%] lg:w-[50%]">
          <div className="relative w-full mx-2">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onFocus={() => setShowSuggestions(true)}
              className="w-full rounded-full border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button onClick={handleSearch} className="text-md font-bold  mx-2 ">
            Search
          </Button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-800 font-semibold">
          <Link to="/" className="hover:text-blue-800 transition">
            Home
          </Link>
          <Link to="/Order" className="hover:text-blue-800 transition">
            Order
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-1 hover:text-blue-800 transition"
          >
            <ShoppingCart className="w-8 h-8" />
            {count > 0 && (
              <Badge className="absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full bg-red-600 text-white">
                {count}
              </Badge>
            )}
          </Link>
          <Button onClick={logOut} className="text-md font-bold ">
            Log Out
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="flex flex-col md:hidden px-6 py-4 space-y-4 border-b bg-white text-gray-800 font-semibold">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-blue-800"
          >
            Home
          </Link>
          <Link
            to="/Order"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-blue-800"
          >
            Order
          </Link>
          <Link
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 hover:text-blue-800"
          >
            <ShoppingCart className="w-6 h-6" />
            Cart
            {count > 0 && (
              <Badge className="ml-1 text-xs px-2 py-0.5 rounded-full bg-red-600 text-white">
                {count}
              </Badge>
            )}
          </Link>
          <Button
            onClick={() => {
              logOut();
              setMobileMenuOpen(false);
            }}
            className="text-md font-bold"
          >
            Log Out
          </Button>
        </div>
      )}

      {/* Category Bar */}
      <div className="hidden md:flex items-center space-x-6 justify-evenly p-2 bg-white/90 text-gray-800 font-semibold">
        {!categories ? (
          <div className="flex flex-row list-none items-center justify-between w-[70%] p-2 text-gray-800 hover:text-blue-800 transition font-semibold">
            <li>Clothing</li>
            <li>Books</li>
            <li>Electronics</li>
            <li>Toys</li>
            <li>Home & Kitchen</li>
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.id}>
              <NavLink
                to={`/category/${cat.id}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-white p-2 rounded-lg bg-zinc-800 transition"
                    : "hover:text-zinc-800 transition"
                }
              >
                {cat.name}
              </NavLink>
            </div>
          ))
        )}
        <Button
          onClick={() => navigate("ProductPage")}
          className={`font-semibold ${
            isActive
              ? "bg-zinc-800 text-white hover:bg-zinc-800"
              : "bg-white/90 text-grey-800 hover:bg-white/90 "
          }`}
        >
          All
        </Button>
      </div>
    </div>
  );
}
