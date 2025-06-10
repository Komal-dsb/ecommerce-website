import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { supabase } from "@/supabaseClient";
import { useCart } from "../Sections/CartContext";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";

type ProductCardProps = {
  id: string;
 
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function SearchResults({
  id,
}: ProductCardProps) {
  const query = useQuery();
  const searchTerm = query.get("q")?.trim() || "";
  const [results, setResults] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  

  const [session, setSession] = useState<Session | null>(null);
    const { addToCart } = useCart();

      const userId = session?.user?.id;


  
      useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    setLoading(true);

    const fetchResults = async () => {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .ilike("name", `%${searchTerm}%`);

      if (error) {
        console.error("Error fetching products:", error);
      }

      if (data) {
        setResults(data);
        if (data.length === 0) {
          const { data: suggested, error: suggestError } = await supabase
            .from("product")
            .select("*")
            .limit(8);

          if (suggestError) {
            console.error("Error fetching suggestions:", suggestError);
            setSuggestions([]);
          } else {
            setSuggestions(suggested || []);
          }
        } else {
          setSuggestions([]);
        }
      }

      setLoading(false);
    };

    fetchResults();
  }, [searchTerm]);


     useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // unsubscribe
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [id]);

  const handleAdd = async (product_id:any) => {
  
    if (!userId) {
      alert("Please login to add products to the cart.");
      return;
    }

    await addToCart(userId, id ? id : product_id);
    toast.success("Added to cart!");
  };

  return (
    <div className="p-6 max-w-8xl  mx-auto min-h-screen">
      {loading ? (
        <div className="flex text-center w-full h-[100vh] items-center justify-center">
          <Loader2 className="text-7xl" />
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <Card
              key={product.id}
              className="p-4  rounded-xl shadow hover:shadow-xl transition duration-300"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-contain mb-2 rounded-lg bg-gray-100"
              />
              <h3 className="text-lg font-semibold  ">{product.name}</h3>
              <h3 className="text-lg font-semibold text-gray-800 ">

                - {product.description}
              </h3>
              <p className=" font-bold text-md ">${product.price.toFixed(2)} <span className="px-10 text-green-500">Stock : {product.stock}</span></p>
              <Button onClick={()=>handleAdd(product.id)}>Add to Cart</Button>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <p className="text-center font-xl font-semibold mb-4">
            No products found for "
            <span className=" font-semibold">{searchTerm}</span>"
          </p>
          {suggestions.length > 0 && (
            <>
              <Separator className="my-8" />
              <h2 className="text-xl text-gray-700 font-semibold text-center mb-4">
                You might like these instead:
              </h2>
              <ScrollArea className=" px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {suggestions.map((product) => (
                    <Card
                      key={product.id}
                      className="p-4 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="aspect-[2/1] object-contain p-2 rounded-md bg-gray-100"
                      />
                      <h4 className="text-md font-medium text-gray-800 line-clamp-1">
                        {product.name}
                      </h4>
                      <h3 className="text-gray-700">{product.description}</h3>
                      <p className="text-blue-600 font-semibold mt-1">
                        ${product.price.toFixed(2)}
                        <span className="px-10 text-green-500">Stock : {product.stock}</span>
                      </p>
                      <Button onClick={()=>handleAdd(product.id)}>Add to Cart</Button>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </>
          )}
        </>
      )}
    </div>
  );
}
