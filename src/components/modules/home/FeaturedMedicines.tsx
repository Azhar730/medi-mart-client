"use client"
import SectionHead from "@/components/shared/SectionHead";
import Loading from "@/components/utils/Loading";
import { useGetAllMedicineQuery } from "@/redux/features/medicine/medicineApi";
import { IMedicine } from "@/types/medicine";
import MedicineCard from "../medicine/MedicineCard";
import Link from "next/link";
import Button from "@/components/utils/Button";

const FeaturedMedicines = () => {
  const queryParams = [{ name: "limit", value: 8 }];
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllMedicineQuery(queryParams);
  console.log(response);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Something went wrong !
      </h3>
    );
  }
  const medicines = response?.data;
  return (
    <section className="my-8 md:my-16 bg-gray-100">
      <div className="w-[90%] md:w-[88%] mx-auto">
        <SectionHead
          heading="Featured Medicine"
          description="Check out your medicine and order it now"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {medicines.map((medicine: IMedicine, index: number) => (
            <MedicineCard key={index} medicine={medicine} />
          ))}
        </div>
        <div className="text-center mt-5 flex justify-end">
          <Link href="/all-medicines">
            <Button text="View All Medicine" />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default FeaturedMedicines;
