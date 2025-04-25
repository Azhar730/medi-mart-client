"use client";
import { useState } from "react";
import { GetProps, Input } from "antd";

import "rc-slider/assets/index.css";
import { useGetAllMedicineQuery } from "@/redux/features/medicine/medicineApi";
import Loading from "@/components/utils/Loading";
import MedicineCard from "./MedicineCard";
import { IMedicine } from "@/types/medicine";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const MedicineManagement = () => {
  const [search, setSearch] = useState("");

  const queryParams = [{ name: "searchTerm", value: search }];
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllMedicineQuery(queryParams);
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


  if (medicines?.length ===0) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Medicine Not found!
      </h3>
    );
  }
  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearch(value);
  };
  return (
    <section className="my-6 bg-gray-100">
      <div className="flex gap-4 flex-wrap justify-center items-center">
        <Search
          className="lg:basis-2/6 hover:outline-0"
          placeholder="Search by brand, car name or category"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>

      {/* product cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 mt-4">
        {medicines?.map((medicine: IMedicine, index: number) => (
          <MedicineCard key={index} medicine={medicine} isAdmin={true} />
        ))}
      </div>
    </section>
  );
};

export default MedicineManagement;
