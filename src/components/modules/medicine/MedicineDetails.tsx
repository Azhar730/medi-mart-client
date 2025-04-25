"use client";

import Loading from "@/components/utils/Loading";
import { addMedicine } from "@/redux/features/cart/cartSlice";
import { useGetSingleMedicineQuery } from "@/redux/features/medicine/medicineApi";
import { useAppDispatch } from "@/redux/hooks";
import { IMedicine } from "@/types/medicine";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const MedicineDetails = ({ medicineId }: { medicineId: string }) => {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetSingleMedicineQuery(medicineId);
  const dispatch = useAppDispatch();
  const handleAddMedicine = (medicine: IMedicine) => {
    dispatch(addMedicine(medicine));
    toast.success("Medicine added to cart");
  };

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error state
  if (isError || !response) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Something went wrong !
      </h3>
    );
  }

  // Car data from the response
  const medicine = response?.data;

  if (!medicine) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Medicine not found!
      </h3>
    );
  }

  return (
    <div className="max-w-5xl mt-32 md:mt-48 mb-16 md:mb-24 w-[90%] md:w-[88%] mx-auto flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div>
          <Image
            width={500}
            height={400}
            src={
              medicine?.image ||
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            } // Assuming `car.image` contains the image URL
            alt={`${medicine.brand} ${medicine.model}`}
            className="w-full h-64 md:h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center gap-4">
          <h3 className="text-primary text-2xl md:text-3xl font-bold">
            {medicine.brand} {medicine.model}
          </h3>
          <p>{medicine.description}</p>
          <div className="flex flex-col text-sm gap-1">
            <p>
              <span className="font-semibold">Name:</span> {medicine.name}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {medicine.category}
            </p>
            <p>
              <span className="font-semibold">Required Prescription:</span>{" "}
              {medicine.requiredPrescription}
            </p>
            <p>
              <span className="font-semibold">Manufacturer:</span>{" "}
              {medicine.manufacturer}
            </p>
            <p>
              <span className="font-semibold">Price:</span> $
              {medicine.price.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {medicine.description}
            </p>
            <p>
              <span className="font-semibold">Expired Date:</span>{" "}
              {new Date(medicine?.expiryDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Stock:</span> {medicine.quantity}
            </p>
          </div>
          <div className="flex items-center gap-x-10 mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-x-2 hover:bg-blue-600 cursor-pointer transition duration-300 ease-in-out"
              onClick={() => handleAddMedicine(medicine)}
              disabled={medicine?.quantity === 0}
            >
              <span>
                <ShoppingCart />
              </span>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
