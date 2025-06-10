import { supabase } from "@/supabaseClient";
import { useState, useEffect } from "react";

type product = {
  id: string;
  name: string;
  image_url: string;
  price: number;
  stock: number;
  description: string;
  category: category;
}[];

type category = {
  id: string;
  name: string;
};

function useProducts(category_id?: string): {
  products: product | null;
  loading: boolean;
  setStartRange: (value: number) => void;
  setEndRange: (value: number) => void;
  startRange: number;
  endRange: number;
  count: number | null;
} {
  const [products, setProducts] = useState<product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [startRange, setStartRange] = useState<number>(0);
  const [endRange, setEndRange] = useState<number>(7);
  const[count,setCount] = useState<number | null>(0)

  

  const fetchProductsDetail = async () => {
    setLoading(true);
    const query = category_id
      ? supabase
          .from("product")
          .select(
            `*,  
      category: category_id(*)
      `,
            { count: "exact"  }
          )
          .eq("category_id", category_id)
      : supabase
          .from("product")
          .select(
            `*, 
        category: category_id(*)
        `,
            { count: "exact" }
          )
          .range(startRange, endRange);
    let { data: product, error, count } = await query;
    console.log(startRange, endRange, count, "Rangeeeeeeeee");
   
   
   
    setCount(count)

    if (error) {
      console.log(error.message);
    }

    if (product) {
      setProducts(product);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductsDetail();
  }, [category_id, startRange, endRange]);

  return {
      products,
    loading,
    startRange,
    endRange,
    setStartRange,
    setEndRange,
    count
  
  };
}

export default useProducts;
