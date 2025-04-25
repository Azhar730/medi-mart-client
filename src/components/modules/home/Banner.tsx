"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/utils/Button";

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  // const parallaxOffset = useParallax(0.5);

  const carImages = [
    "https://i.postimg.cc/sXYcf7Fm/medicine-8287535-1280.jpg",
    "https://i.postimg.cc/nczvg6L0/assortment-pharmaceutical-medicine-capsules-pills-tablet-128406-532.jpg",
    "https://i.postimg.cc/JnMXqFg3/capsules-medicines-white-bottle-storing-medicines-blue-background-407474-657.avif",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carImages.length]);

  return (
    <div className="relative h-1/2 bg-gradient-to-b from-gray-800 to-gray-800 text-white overflow-hidden flex flex-col items-center justify-center">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/xTJfBGF6/c-HJpdm-F0-ZS9sci9pb-WFn-ZXMvd2-Vic2l0-ZS8y-MDI0-LTEx-L3-Jhd3-Bpe-GVs-X29m-Zmlj-ZV8z-MF9h-Yn-N0cm-Fjd-F9ncm-Fka-WVud-F93a-Gl0.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // transform: `translateY(${parallaxOffset}px)`,
        }}
      />
      <div className="absolute inset-0 bg-black opacity-80" />

      {/* Content Container */}
      <div className="relative z-10 w-[90%] md:w-[88%] mx-auto pt-32 pb-12 flex flex-col lg:flex-row items-center justify-between">
        {/* Text Content */}
        <motion.div
          className="lg:w-1/2 w-full space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
            Order Your <span className="text-blue-400">Medicine</span>
          </h1>
          <p className="text-base text-gray-300 max-w-xl">
            MediMart💊 is your one-stop online pharmacy for safe, reliable, and
            fast medicine delivery. From prescription drugs to essential health
            products, we make healthcare accessible at your fingertips. Enjoy a
            seamless shopping experience with user-friendly navigation, secure
            checkout, and real-time order tracking.
          </p>
          <Button
            text="Explore Our Medicine"
            handleClick={() => router.push("/all-medicines")}
          />
          {/* <button className="px-5 bg-gray-800 border border-primary text-primary h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-primary before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 hover:text-[#fff] hover:border-none">
            Explore Our Collection
          </button> */}
        </motion.div>

        {/* Car Image Carousel */}
        <motion.div
          className="lg:w-1/2 w-full mt-12 lg:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            {carImages.map((src, index) => (
              <motion.img
                key={src}
                src={src}
                alt={`Luxury car ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
