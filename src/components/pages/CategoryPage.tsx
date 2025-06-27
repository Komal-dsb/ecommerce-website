import { useParams } from "react-router";
import useProducts from "../Sections/hooks/userProduct";
import { ProductCard } from "../Sections/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet-async";



const categoryMeta = {
  cloth: {
    title: "Clothing | Shop Trendy Clothes Online - My Ecommerce Store",
    description:
      "Explore our latest collection of clothing for every style and season. Shop trendy clothes at great prices.",
  },
  electronics: {
    title: "Electronics | Buy Latest Gadgets Online - My Ecommerce Store",
    description:
      "Find the newest electronics and gadgets. Quality products, fast shipping, and secure checkout.",
  },
  toys: {
    title: "Toys | Fun & Educational Toys Online - My Ecommerce Store",
    description:
      "Discover fun and educational toys for kids of all ages. Safe, affordable, and fast delivery.",
  },
  home: {
    title: "Home & Kitchen | Essentials & Appliances - My Ecommerce Store",
    description:
      "Shop home and kitchen essentials and appliances. Quality products, great prices, and quick delivery.",
  },
  books: {
    title: "Books | Bestsellers & New Releases - My Ecommerce Store",
    description:
      "Browse bestsellers and new releases in books. Wide selection, affordable prices, and fast shipping.",
  },
};

function CategoryPage() {
  const { id } = useParams<{ id?: string }>();
  const categoryId = id ?? " ";

  const { products, loading } = useProducts(categoryId);

 const meta =
  categoryId && (categoryMeta as Record<string, { title: string; description: string }>)[categoryId]
    ? (categoryMeta as Record<string, { title: string; description: string }>)[categoryId]
    : {
        title: "Products | My Ecommerce Store",
        description: "Browse our full range of products online at great prices.",
      };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="robots" content="index, follow" />
      </Helmet>

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
