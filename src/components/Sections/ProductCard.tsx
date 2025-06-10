import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "../Sections/CartContext";

import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
};

export function ProductCard({
  id,
  name,
  description,
  price,
  image_url,
  category,
  stock,
}: ProductCardProps) {
  const [session, setSession] = useState<Session | null>(null);
  const { addToCart } = useCart();

  const userId = session?.user?.id;

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

  const handleAdd = async () => {
    if (!userId) {
      alert("Please login to add products to the cart.");
      return;
    }

    await addToCart(userId, id);
    toast.success("Added to cart!");
  };

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-3">
      <div className="relative aspect-[5/3] w-full overflow-hidden rounded-xl bg-muted p-2">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-contain transition-transform rounded-xl duration-300 hover:scale-105"
          loading="lazy"
        />
        {stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
            Out of Stock
          </div>
        )}
      </div>

      <CardContent className="p-2">
        <h2 className="text-xl font-semibold line-clamp-1 mb-1">{name}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2  font-semibold">
          {description}
        </p>

        <div className="flex md:flex-col xl:flex-row lg:flex-row md:items-start items-center justify-between">
          <p className="text-lg font-bold ">${price.toFixed(2)}</p>
          <p
            className={`text-sm font-semibold ${
              stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stock > 0 ? `In Stock: ${stock}` : "Unavailable"}
          </p>
        </div>

        <p className="text-sm text-muted-foreground font-semibold my-2">
          Category: <span className="font-medium">{category}</span>
        </p>

        <div className="text-center">
          <Button
            disabled={stock === 0}
            className={`w-full ${
              stock === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleAdd}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
