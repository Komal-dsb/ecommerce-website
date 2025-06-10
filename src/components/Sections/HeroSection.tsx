import React from "react";
import { Button } from "../ui/button";

const HeroSection: React.FC = () => {
  const handleShopNow = () => {
    console.log("Shop Now clicked");
    // Implement navigation to shop page
  };

  return (
    <section className="relative  bg-gray-50 overflow-hidden mb-10">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/img_rectangle_2.png"
          alt="Fashion models"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-56 right-32">
        <div className="w-26 h-26 bg-black rounded-full"></div>
      </div>
      <div className="absolute top-96 left-96">
        <div className="w-14 h-14 bg-black rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-bold text-black leading-tight mb-6">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <Button size="lg" onClick={handleShopNow} className="mb-12">
            Shop Now
          </Button>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex items-center">
              <div>
                <div className="text-4xl font-bold text-black">200+</div>
                <div className="text-gray-600">International Brands</div>
              </div>
              <div className="w-px h-16 bg-gray-300 mx-8"></div>
            </div>

            <div className="flex items-center">
              <div>
                <div className="text-4xl font-bold text-black">2,000+</div>
                <div className="text-gray-600">High-Quality Products</div>
              </div>
              <div className="w-px h-16 bg-gray-300 mx-8"></div>
            </div>

            <div>
              <div className="text-4xl font-bold text-black">30,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
