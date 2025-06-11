import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../Sections/CartContext";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  stock: number;
};

type CartItem = {
  id: string;
  quantity: number;
  product: Product;
};

export default function CartPage() {
  const { refreshCartCount } = useCart();
  const [userId, setUserId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stripeData, setStripeData] = useState<boolean>(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const uid = sessionData.session?.user.id;
      if (!uid) return;

      setUserId(uid);

      const { data, error } = await supabase
        .from("cart")
        .select(
          `
          id,
          quantity,
          product:product_id (
            id,
            name,
            price,
            image_url,
            stock
          )
        `
        )
        .eq("user_id", uid);

      if (error) {
        console.error("Error fetching cart items:", error.message);
        return;
      }

      const cleanItems = data.map((item) => ({
        ...item,
        product: Array.isArray(item.product) ? item.product[0] : item.product,
      }));

      setItems(cleanItems);
      setLoading(false);
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (cartId: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("id", cartId)
      .eq("user_id", userId);

    if (!error) {
      setItems((prev) => prev.filter((item) => item.id !== cartId));
      refreshCartCount();
    }
  };

  const updateQuantity = async (cartId: string, newQty: number) => {
    const item = items.find((i) => i.id === cartId);
    if (!item || !item.product) return;
    const stock = item.product.stock;

    if (newQty > stock) {
      toast.error("Stock Unavailable");
      return;
    }

    if (newQty < 1) return;

    const { error } = await supabase
      .from("cart")
      .update({ quantity: newQty })
      .match({ id: cartId });

    if (error) {
      console.error("Failed to update quantity:", error);
      alert(`Failed to update quantity: ${error.message}`);
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.id === cartId ? { ...item, quantity: newQty } : item
        )
      );

      refreshCartCount();
    }
  };

  const handleCheckout = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const access_token = session?.access_token;

      setStripeData(true);
      const res = await fetch(
        "https://jflrupvrrumyijgrrdvr.supabase.co/functions/v1/checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({ items }),
        }
      );

      setStripeData(false);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      if (!data.url) {
        throw new Error("No URL returned from checkout session");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Check console.");
    }
  };

  const total = items.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.quantity * item.product.price;
  }, 0);

  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <Loader2 className="animate-spin inline-block text-gray-300 w-20 h-20 mr-2" />
       
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto h-auto">
      <h2 className="text-4xl font-bold mb-10 text-center text-zinc-800">
        Your Cart
      </h2>
        
      {items.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {items.map((item) => {
            if (!item.product) return null;

            return (
              <Card
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-[100px_1fr_auto] gap-4 items-start sm:items-center p-4 rounded-2xl border shadow-sm hover:shadow-md transition"
              >
                {/* Product Image */}
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-xl border"
                />

                {/* Product Details and Quantity Controls */}
                <CardContent className="p-0 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-zinc-800">
                      {item.product.name}
                    </h3>
                    <p className="text-md sm:text-lg font-bold text-zinc-700 mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={item.quantity <= 1}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-lg font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>

                {/* Delete Button */}
                <Button
                  onClick={() => removeFromCart(item.id)}
                  className="self-start sm:self-center"
                >
                  <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </Card>
            );
          })}
        </div>
      )}

      {/* Subtotal and Buy Now */}

      {items.length > 0 && (
        <div className="mt-4 border-t pt-6">
          <div className="max-w-md mx-auto">
            <div className="mt-2 max-w-md mx-auto bg-white border border-zinc-200 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-zinc-800 mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-700 text-base">Subtotal</span>
                <span className="text-xl font-bold text-zinc-900">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-zinc-700 text-base">Tax</h3>
                <h3 className="text-xl font-bold text-zinc-900">$ 0.00</h3>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-zinc-700 text-base">Shipping </h3>
                <h3 className="text-xl font-bold text-zinc-900">$ 0.00</h3>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-700 text-base">Total</span>
                <span className="text-xl font-bold text-zinc-900">
                  ${total.toFixed(2)}
                </span>
              </div>

              {stripeData ? (
                <div className="flex justify-center mt-6">
                  <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
                </div>
              ) : (
                <Button
                  onClick={handleCheckout}
                  className="mt-6 w-full px-6 py-3 text-lg font-semibold bg-zinc-800 hover:bg-zinc-900 text-white rounded-md transition"
                >
                  Buy Now
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
