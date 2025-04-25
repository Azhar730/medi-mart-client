"use client";
import { motion } from "framer-motion";
import Image from "next/image";
// import Button from "../../shared/Button/Button";

const AboutHero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-800 to-gray-800 text-white overflow-hidden flex flex-col items-center justify-center">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/FzsNDbNn/white-bottle-multi-colored-pills-ampoules-with-medicines-pricking-blue-background-concept-pharmaceut.avif')",
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
            About us
          </h1>
          <p className="text-xl text-gray-300 max-w-xl">
            Welcome to MediMart💊, your trusted online pharmacy! We deliver
            authentic medicines and health products right to your doorstep. Shop
            with ease, upload prescriptions, and get fast, secure
            service—because your health matters to us!
          </p>
          {/* <Button text="Contact us" /> */}
        </motion.div>

        {/* Car Image Carousel */}
        <motion.div
          className="lg:w-1/2 w-full mt-12 lg:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              height={500}
              width={500}
              src="https://i.postimg.cc/fyrnC6HJ/lot-pills-syringe-with-injection-as-symbol-choice-antibiotics-against-vaccine-from-covid-395451-1196.avif"
              alt="Medicine"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutHero;
