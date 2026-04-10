'use client';

import Container from "@/components/Container";
import Section from "@/components/Section";
import { Analytics } from "@vercel/analytics/react";

const NeedsPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FFF8E1] to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-10">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Campus Delivery <span className="text-[#F5C33B]">Made Simple</span>
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                From groceries to essentials, we deliver everything you need right to your doorstep on campus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#services" className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg inline-block text-center">
                  Explore Services
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5C33B]/30 to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div className="text-6xl">📦🛒🧺</div>
                <p className="absolute bottom-4 right-4 bg-[#F5C33B] text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg z-20">
                  Fast Delivery!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          <Section
            id="services"
            title="Our Delivery Services"
            description="Choose the service that fits your needs"
          >
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Outside Delivery Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-[#F5C33B]">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Outside Delivery</h3>
                    <span className="bg-[#FFF8E1] dark:bg-gray-700 text-[#F5C33B] px-3 py-1 rounded-full text-sm font-medium">₹350 Fixed Rate</span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Need something from outside campus? We'll pick it up and deliver it directly to you, saving you time and hassle.
                  </p>
                  
                  <div className="mb-6 space-y-4">
                    {/* Move the "Anything Except Food" and "Same-Day Delivery" sections here */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FFF8E1] dark:bg-gray-700 flex items-center justify-center mt-1">
                        <span className="text-[#F5C33B] text-lg font-bold">📦</span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Anything Except Food</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          We deliver groceries, packages, and any other items except food.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FFF8E1] dark:bg-gray-700 flex items-center justify-center mt-1">
                        <span className="text-[#F5C33B] text-lg font-bold">⏱️</span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Same-Day Delivery</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Place your order early and receive your items the same day.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">How It Works</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                      {/* Outside delivery steps */}
                      <div className="bg-[#FFF8E1] dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xl mb-1">1️⃣</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Gather friends</p>
                      </div>
                      <div className="bg-[#FFF8E1] dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xl mb-1">2️⃣</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Place orders</p>
                      </div>
                      <div className="bg-[#FFF8E1] dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xl mb-1">3️⃣</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">We deliver</p>
                      </div>
                      <div className="bg-[#FFF8E1] dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xl mb-1">4️⃣</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Pay on delivery</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-3 px-6 rounded-full transition duration-300">
                    Request Outside Delivery
                  </button>
                </div>
              </div>

              {/* In-Campus Delivery Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-[#F5C33B]">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Food Street & Rock Plaza</h3>
                    <span className="bg-[#FFF8E1] dark:bg-gray-700 text-[#F5C33B] px-3 py-1 rounded-full text-sm font-medium">₹350 Fixed Rate</span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Need something within campus? We'll pick it up and deliver it directly to you, saving you time and hassle.
                  </p>
                  
                  <div className="mb-6 space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FFF8E1] dark:bg-gray-700 flex items-center justify-center mt-1">
                        <span className="text-[#F5C33B] text-lg font-bold">🍔</span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Food Street & Rock Plaza</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          We deliver from all campus food locations to your doorstep.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FFF8E1] dark:bg-gray-700 flex items-center justify-center mt-1">
                        <span className="text-[#F5C33B] text-lg font-bold">👥</span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Group Orders Welcome</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Perfect for study groups or friends who want to eat together.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">How It Works</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                      <div className="bg-[#FFF8E1] dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xl mb-1">1️⃣</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Gather friends</p>
                      </div>
                      <div className="bg-[#FFF8E1] dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xl mb-1">2️⃣</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Place orders</p>
                      </div>
                      <div className="bg-[#FFF8E1] dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xl mb-1">3️⃣</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">We deliver</p>
                      </div>
                      <div className="bg-[#FFF8E1] dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xl mb-1">4️⃣</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Pay on delivery</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-3 px-6 rounded-full transition duration-300">
                    Request Campus Delivery
                  </button>
                </div>
              </div>
            </div>
          </Section>
        </div>
        <Analytics />
      </Container>
    </>
  );
};

export default NeedsPage;