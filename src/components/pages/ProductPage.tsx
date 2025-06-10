import useProducts from "../Sections/hooks/userProduct";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "../Sections/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";

function ProductPage() {
  const {
    products,
    loading,
    setStartRange,
    setEndRange,
    startRange,
    endRange,
    count,
  } = useProducts();

  return (
    <div className="p-6  mx-auto">
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 pb-20 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full rounded-2xl" />
          ))
        ) : !products ? (
          <p className="text-center items-center justify-center text-4xl text-blue-700">
            No products found
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              className="mx-10"
              disabled={startRange == 0 && endRange == 7}
              onClick={() => {
                setStartRange(startRange - 8), setEndRange(endRange - 8);
              }}
            >
              Previous
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              disabled={startRange > 68 && endRange > Number(count)}
              onClick={() => {
                setStartRange(startRange + 8), setEndRange(endRange + 8);
              }}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ProductPage;
