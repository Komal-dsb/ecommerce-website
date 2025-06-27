import React, { useState } from "react";
import HeroSection from "../Sections/HeroSection";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Star, Tag } from "lucide-react";
import { useNavigate } from "react-router";


interface Brand {
  id: number;
  name: string;
  logo: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  image: string;
}

interface StyleCategory {
  id: number;
  name: string;
  image: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  verified: boolean;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Sample data
  const brands: Brand[] = [
    { id: 1, name: "Versace", logo: "/img_vector.svg" },
    { id: 2, name: "Zara", logo: "/img_zaralogo1_1.svg" },
    { id: 3, name: "Gucci", logo: "/img_guccilogo1_1.svg" },
    { id: 4, name: "Prada", logo: "/img_pradalogo1_1.svg" },
    { id: 5, name: "Calvin Klein", logo: "/img_vector_white_a700.svg" },
  ];

  const newArrivals: Product[] = [
    {
      id: 1,
      name: "T-SHIRT WITH TAPE DETAILS",
      price: 120,
      rating: 4.5,
      image: "/img_image_7.png",
    },
    {
      id: 2,
      name: "SKINNY FIT JEANS",
      price: 240,
      originalPrice: 260,
      discount: 20,
      rating: 3.5,
      image: "/img_image_8.png",
    },
    {
      id: 3,
      name: "CHECKERED SHIRT",
      price: 180,
      rating: 4.5,
      image: "/img_image_9.png",
    },
    {
      id: 4,
      name: "SLEEVE STRIPED T-SHIRT",
      price: 130,
      originalPrice: 160,
      discount: 30,
      rating: 4.5,
      image: "/img_image_10.png",
    },
  ];

  const styleCategories: StyleCategory[] = [
    { id: 1, name: "Casual", image: "/img_image_11.png" },
    { id: 2, name: "Formal", image: "/img_image_13.png" },
    { id: 3, name: "Party", image: "/img_image_12.png" },
    { id: 4, name: "Gym", image: "/img_image_14.png" },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      comment:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      verified: true,
    },
    {
      id: 2,
      name: "Alex K.",
      rating: 5,
      comment:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
      verified: true,
    },
    {
      id: 3,
      name: "James L.",
      rating: 5,
      comment:
        "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      verified: true,
    },
  ];

  const handlePreviousReview = () => {
    setCurrentReviewIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 1));
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <Card className="group cursor-pointer">
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-2 px-2">
        <h3 className="font-bold text-lg text-black">{product.name}</h3>
        <h3 className="flex text-yellow-500">
          <Star /> <Star />
          <Star />
          {product.rating}
        </h3>{" "}
        {product.rating}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-black">
            ${product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-2xl font-bold text-gray-400 line-through">
                ${product.originalPrice}
              </span>
              <Tag className="text-red-500">-{product.discount}%</Tag>
            </>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white">

    

      <HeroSection />

      {/* Brands Section */}
      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brands.map((brand) => (
              <div key={brand.id} className="flex-shrink-0">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 md:h-10 object-contain filter brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-black mb-12">
            NEW ARRIVALS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button onClick={() => navigate("ProductPage")} className="px-16">
              View All
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* Browse by Style Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-100 rounded-3xl p-16">
            <h2 className="text-5xl font-bold text-center text-black mb-12">
              BROWSE BY DRESS STYLE
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Casual - spans 1 column */}
              <Card className="relative overflow-hidden h-72 md:h-80">
                <img
                  src={styleCategories[0].image}
                  alt={styleCategories[0].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <h3 className="text-4xl font-bold text-black">
                    {styleCategories[0].name}
                  </h3>
                </div>
              </Card>

              {/* Formal - spans 2 columns */}
              <Card className="relative overflow-hidden h-72 md:h-80 md:col-span-2">
                <img
                  src={styleCategories[1].image}
                  alt={styleCategories[1].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <h3 className="text-4xl font-bold text-black">
                    {styleCategories[1].name}
                  </h3>
                </div>
              </Card>

              {/* Party - spans 2 columns */}
              <Card className="relative overflow-hidden h-72 md:h-80 md:col-span-2">
                <img
                  src={styleCategories[2].image}
                  alt={styleCategories[2].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <h3 className="text-4xl font-bold text-black">
                    {styleCategories[2].name}
                  </h3>
                </div>
              </Card>

              {/* Gym - spans 1 column */}
              <Card className="relative overflow-hidden h-72 md:h-80">
                <img
                  src={styleCategories[3].image}
                  alt={styleCategories[3].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <h3 className="text-4xl font-bold text-black">
                    {styleCategories[3].name}
                  </h3>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-5xl font-bold text-black">
              OUR HAPPY CUSTOMERS
            </h2>

            <div className="flex space-x-4">
              <button
                onClick={handlePreviousReview}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
              >
                <img
                  src="/img_arrowdownbold_2.svg"
                  alt="Previous"
                  className="w-6 h-6"
                />
              </button>
              <button
                onClick={handleNextReview}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
              >
                <img
                  src="/img_arrowdownbold_1.svg"
                  alt="Next"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card
                key={review.id}
                className={`p-6 border border-gray-200 ${
                  index === currentReviewIndex ? "ring-2 ring-black" : ""
                }`}
              >
                <div className="space-y-4">
                  <h2 className="flex text-yellow-500">
                    <Star /> <Star />
                    <Star />
                  </h2>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xl text-black">
                      {review.name}
                    </h4>
                    {review.verified && (
                      <img
                        src="/img_frame_green_a700.svg"
                        alt="Verified"
                        className="w-6 h-6"
                      />
                    )}
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
