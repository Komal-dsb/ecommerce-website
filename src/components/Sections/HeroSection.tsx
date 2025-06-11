import React from "react";
import { Button } from "../ui/button";

const HeroSection: React.FC = () => {
  const handleShopNow = () => {
    console.log("Shop Now clicked");
   
  };

  return (
  <section className="relative min-h-screen bg-gray-50 overflow-hidden mb-10">
  {/* Background Image */}
  <div className=" absolute inset-0 ">
    <img
      src="/img_rectangle_2.png"
      alt="Fashion models"
      className="w-full h-full  object-cover  object-center"
    />
  </div>

  {/* Decorative Elements */}
  <div className="hidden md:block absolute top-56 right-10 lg:right-32">
    <div className="w-16 h-16 lg:w-26 lg:h-26 bg-black rounded-full"></div>
  </div>
  <div className="hidden md:block absolute top-[26rem] left-10 lg:left-96">
    <div className="w-10 h-10 lg:w-14 lg:h-14 bg-black rounded-full"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
    <div className="max-w-2xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
        FIND CLOTHES THAT MATCHES YOUR STYLE
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
        Browse through our diverse range of meticulously crafted garments,
        designed to bring out your individuality and cater to your sense of
        style.
      </p>

      <Button
        size="lg"
        onClick={handleShopNow}
        className="mb-12 text-base sm:text-lg"
      >
        Shop Now
      </Button>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-8 sm:gap-12 items-start sm:items-center">
        <div className="flex items-start sm:items-center">
          <div>
            <div className="text-2xl sm:text-4xl font-bold text-black">200+</div>
            <div className="text-sm sm:text-base text-gray-600">International Brands</div>
          </div>
          <div className="hidden sm:block w-px h-12 sm:h-16 bg-gray-300 mx-6 sm:mx-8"></div>
        </div>

        <div className="flex items-start sm:items-center">
          <div>
            <div className="text-2xl sm:text-4xl font-bold text-black">2,000+</div>
            <div className="text-sm sm:text-base text-gray-600">High-Quality Products</div>
          </div>
          <div className="hidden sm:block w-px h-12 sm:h-16 bg-gray-300 mx-6 sm:mx-8"></div>
        </div>

        <div>
          <div className="text-2xl sm:text-4xl font-bold text-black">30,000+</div>
          <div className="text-sm sm:text-base text-gray-600">Happy Customers</div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default HeroSection;
