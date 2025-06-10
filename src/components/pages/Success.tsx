import { useEffect } from "react";
import { supabase } from "@/supabaseClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";


export default function Success() {
  const navigate = useNavigate();
  useEffect(() => {
    const completeCheckout = async () => {
      try {
        // Get user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("Failed to get user:", userError);
          return;
        }

        // Get cart items from cart table
        const { data: cartItems, error: cartError } = await supabase
          .from("cart")
          .select("*")
          .eq("user_id", user.id);

        if (cartError) {
          console.error("Cart fetch error:", cartError);
          return;
        }

        if (!cartItems || cartItems.length === 0) {
          console.warn("No cart items found");
          return;
        }

        // Insert into orders
        const orders = cartItems.map((item) => ({
          user_id: user.id,
          product_id: item.product_id,
          price_each: Number(item.price),
          quantity: item.quantity,
          status: "paid",
          name: item.name,
        }));

        const { data: insertedOrders, error: insertError } = await supabase
          .from("orders")
          .insert(orders)
          .select(); 

        if (insertError) {
          console.error("Order insert error:", insertError.message);
          return;
        }

        // Update stock for inserted orders
        for (const order of insertedOrders) {
          const { data: product, error: productError } = await supabase
            .from("product")
            .select("stock")
            .eq("id", order.product_id)
            .single();

          if (productError || !product) {
            console.error(
              `Product fetch failed for ${order.product_id}`,
              productError
            );
            continue;
          }

          const updatedStock = product.stock - order.quantity;

          const { error: stockError } = await supabase
            .from("product")
            .update({ stock: updatedStock })
            .eq("id", order.product_id);

          if (stockError) {
            console.error(
              `Stock update failed for ${order.product_id}`,
              stockError
            );
          }
        }

        // Clear cart
        const { error: deleteError } = await supabase
          .from("cart")
          .delete()
          .eq("user_id", user.id);

        if (deleteError) {
          console.error("Cart delete error:", deleteError);
        }

        // // Optional: refresh UI/cart state
        window.location.reload();
      } catch (err) {
        console.error("Unexpected checkout error:", err);
      }
    };

    completeCheckout();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20">
      <Card className="border-green-600 shadow-lg">
        <CardHeader className="flex flex-col items-center pt-8">
          <CheckCircle2 className="w-12 h-12 mb-4 text-green-500" />
          <CardTitle className="text-2xl text-green-500 font-bold ">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-center text-lg text-black mt-2 px-6">
            🤩 Thank you for your purchase🎉.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center pt-6 pb-8">
          <Button
            onClick={() => navigate("/")}
           
          >
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
