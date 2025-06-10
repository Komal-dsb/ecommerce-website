import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = () => {
    console.log("Subscribing email:", email);
    // Implement newsletter subscription
    setEmail("");
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="bg-black text-white py-16 mt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-4">
                STAY UPTO DATE ABOUT OUR LATEST OFFERS
              </h2>
            </div>

            <div className="lg:w-1/2 max-w-md w-full space-y-4">
              <div className="relative w-full">
            
                <img
                  src="/img_frame_2.svg"
                  alt="Email"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none"
                />

             
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full pl-12 pr-4 py-2 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button
                variant="secondary"
                className="w-full bg-white text-black hover:bg-gray-100"
                onClick={handleSubscribe}
              >
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="text-3xl font-bold text-black mb-4 block">
                SHOP.CO
              </Link>
              <p className="text-gray-600 mb-6">
                We have clothes that suits your style and which you are proud to
                wear. From women to men.
              </p>

              {/* Social Media */}
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="p-2 bg-white rounded-full hover:bg-gray-50"
                >
                  <img
                    src="/img_1.svg"
                    alt="Twitter"
                    className="w-7 h-7"
                  />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full hover:bg-gray-50"
                >
                  <img
                    src="/img_2.svg"
                    alt="Facebook"
                    className="w-7 h-7"
                  />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full hover:bg-gray-50"
                >
                  <img
                    src="/img_3.svg"
                    alt="Instagram"
                    className="w-7 h-7"
                  />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full hover:bg-gray-50"
                >
                  <img
                    src="/img_4.svg"
                    alt="GitHub"
                    className="w-7 h-7"
                  />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-medium text-black mb-4 uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link to="/about" className="hover:text-black">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="hover:text-black">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/works" className="hover:text-black">
                    Works
                  </Link>
                </li>
                <li>
                  <Link to="/career" className="hover:text-black">
                    Career
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h3 className="font-medium text-black mb-4 uppercase tracking-wider">
                Help
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link to="/support" className="hover:text-black">
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link to="/delivery" className="hover:text-black">
                    Delivery Details
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-black">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-black">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* FAQ Links */}
            <div>
              <h3 className="font-medium text-black mb-4 uppercase tracking-wider">
                FAQ
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link to="/account" className="hover:text-black">
                    Account
                  </Link>
                </li>
                <li>
                  <Link to="/deliveries" className="hover:text-black">
                    Manage Deliveries
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="hover:text-black">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/payments" className="hover:text-black">
                    Payments
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-medium text-black mb-4 uppercase tracking-wider">
                Resources
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link to="/ebooks" className="hover:text-black">
                    Free eBooks
                  </Link>
                </li>
                <li>
                  <Link to="/tutorial" className="hover:text-black">
                    Development Tutorial
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-black">
                    How to - Blog
                  </Link>
                </li>
                <li>
                  <Link to="/youtube" className="hover:text-black">
                    Youtube Playlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-300 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                Shop.co © 2000-2023, All Rights Reserved
              </p>

              {/* Payment Methods */}
              <div className="flex space-x-2">
                <div className="bg-white border border-gray-200 rounded p-2">
                  <img src="/img_visa.svg" alt="Visa" className="h-4" />
                </div>
                <div className="bg-white border border-gray-200 rounded p-2">
                  <img
                    src="/img_mastercard.svg"
                    alt="Mastercard"
                    className="h-4"
                  />
                </div>
                <div className="bg-white border border-gray-200 rounded p-2">
                  <img
                    src="/img_paypal.svg"
                    alt="PayPal"
                    className="h-4"
                  />
                </div>
                <div className="bg-white border border-gray-200 rounded p-2">
                  <img
                    src="/img_pay.svg"
                    alt="Apple Pay"
                    className="h-4"
                  />
                </div>
                <div className="bg-white border border-gray-200 rounded p-2">
                  <img
                    src="/img_g_pay.svg"
                    alt="Google Pay"
                    className="h-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
