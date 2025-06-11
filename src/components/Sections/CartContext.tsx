import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
 
};

  export type CartItem = {
    id: string;
    quantity: number;
    product: Product;
  
  };

type CartContextType = {
  items: CartItem[];
  count: number;
  addToCart: (userId: string, productId: string) => Promise<void>;
  updateQuantity: (
    cartId: string,
    quantity: number,
    name:string,
    userId: string
  ) => Promise<void>;
  removeFromCart: (cartId: string, userId: string) => Promise<void>;
  fetchCart: (userId: string) => Promise<void>;
  refreshCartCount: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [count, setCount] = useState<number>(0);

  const fetchCart = async (userId: string) => {
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
          image_url
        )
      `
      )
      .eq("user_id", userId);

    if (!error && data) {
      const cleanItems = data.map((item) => ({
        ...item,
        product: Array.isArray(item.product) ? item.product[0] : item.product,
      }));
      setItems(cleanItems);

      // ✅ Count total quantity for badge
      const totalCount = cleanItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setCount(totalCount);
    }
  };

  const refreshCartCount = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const uid = sessionData.session?.user.id;
    if (!uid) return;

    const { data, error } = await supabase
      .from("cart")
      .select("quantity")
      .eq("user_id", uid);

    if (!error && data) {
      const totalCount = data.reduce((acc, item) => acc + item.quantity, 0);
      setCount(totalCount);
    }
  };

 const addToCart = async (userId: string, productId: string) => {
  // Step 1: Fetch live stock from database
  const { data: product, error: productError } = await supabase
    .from("product")
    .select("price, name, stock")
    .eq("id", productId)
    .single();

  if (productError || !product) {
    console.error("Failed to fetch product:", productError);
    return;
  }

  const { stock, price, name } = product;

  // Step 2: Check if item already in cart
  const { data: existing } = await supabase
    .from("cart")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  const currentQty = existing?.quantity ?? 0;

  // Step 3: Stop if it will exceed stock
  if (currentQty >= stock) {
    toast.error("Cannot add more. Stock limit reached.");
    return;
  }

  // Step 4: Add or update cart item
  if (existing) {
    await supabase
      .from("cart")
      .update({ quantity: currentQty + 1 })
      .eq("id", existing.id);
  } else {
    await supabase.from("cart").insert({
      user_id: userId,
      product_id: productId,
      quantity: 1,
      price,
      name,
    });
  }

  fetchCart(userId);
    toast.success("Added to cart!");
};

  const updateQuantity = async (
    cartId: string,
    quantity: number,
    userId: string
  ) => {
    const { error } = await supabase
      .from("cart")
      .update({ quantity })
      .eq("id", cartId);

    if (!error) fetchCart(userId);
  };

  const removeFromCart = async (cartId: string, userId: string) => {
    const { error } = await supabase.from("cart").delete().eq("id", cartId);

    if (!error) fetchCart(userId);
  };

  useEffect(() => {
    const loadCart = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user && !error) {
        fetchCart(user.id);
      }
    };

    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        addToCart,
        updateQuantity,
        removeFromCart,
        fetchCart,
        refreshCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");

  return context;
};
