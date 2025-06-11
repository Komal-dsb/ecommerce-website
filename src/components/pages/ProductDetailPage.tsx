import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();
    
      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-3">
        <div className="relative aspect-[4/2] w-full overflow-hidden rounded-xl bg-muted p-2">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain transition-transform rounded-xl duration-300 hover:scale-105"
          />
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
              Out of Stock
            </div>
          )}
        </div>

        <CardContent className="p-2">
          <h2 className="text-xl font-semibold line-clamp-1 mb-1">
            {product.name}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2 font-semibold">
            {product.description}
          </p>

          <div className="flex md:flex-col xl:flex-row lg:flex-row md:items-start items-center justify-between">
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <p
              className={`text-sm font-semibold ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `In Stock: ${product.stock}`
                : "Unavailable"}
            </p>
          </div>

        </CardContent>
        <Button className="w-[40%] mx-auto" onClick={()=> navigate('/ProductPage')}>Back to Products</Button>
      </Card>
    </div>
  );
}
