import { useParams } from "react-router";
import useProducts from "../Sections/hooks/userProduct";
import { ProductCard } from "../Sections/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";






function CategoryPage() {
  const { id } = useParams<{ id?: string }>();
  const categoryId = id ?? " ";

  const { products, loading } = useProducts(categoryId);

 

  return (
    <div className="p-6 max-w-7xl mx-auto">
     

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6 p-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))
        ) : !products ? (
          <p className="text-center items-center justify-center text-4xl text-blue-700">
            Product not found
          </p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              image_url={product.image_url}
              category={product.category?.name ?? "Uncategorized"}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
