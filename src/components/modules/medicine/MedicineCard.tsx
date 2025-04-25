/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Button from "@/components/utils/Button";
import { useRouter } from "next/navigation";
import { IMedicine } from "@/types/medicine";
import { useDeleteMedicineMutation } from "@/redux/features/medicine/medicineApi";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addMedicine } from "@/redux/features/cart/cartSlice";

const MedicineCard = ({
  medicine,
  isAdmin,
}: {
  medicine: IMedicine;
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deleteMedicine] = useDeleteMedicineMutation();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting Medicine...");
    try {
      const result = await deleteMedicine(medicine?._id).unwrap();
      if (result?.success) {
        toast.success(result?.message, { id: toastId });
      } else {
        toast.error(result?.message, { id: toastId });
      }
    } catch (error: any) {
      if (error?.status === 401) {
        toast.error(error?.data?.message, { id: toastId });
        return;
      }
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleAddMedicine = (medicine: IMedicine) => {
    dispatch(addMedicine(medicine));
    toast.success("Medicine added to cart");
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <div
          className={cn(
            "absolute top-2 left-2 text-white text-xs font-semibold py-1 px-2 rounded",
            {
              "bg-green-500": medicine.inStock,
              "bg-rose-500": !medicine.inStock,
            }
          )}
        >
          {medicine?.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Image
          height={200}
          width={200}
          src={
            medicine?.image ||
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={medicine.name || "Product Image"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold mb-2">Name: {medicine?.name}</p>
        <p className="text-sm font-semibold mb-2">
          Category: {medicine?.category}
        </p>
        <p className="text-sm text-primary font-semibold mb-2">
          Price: ${medicine.price}
        </p>
        {/* View Details button */}
        <div>
          {!isAdmin && (
            <div className="flex items-center justify-between gap-3">
              <button
              className="cursor-pointer bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition-all duration-300"
                onClick={() => handleAddMedicine(medicine)}
                disabled={medicine?.quantity === 0}
              >
                <ShoppingCart />
              </button>
              <Button
                text={"View Details"}
                handleClick={() => {
                  router.push(`/medicine/${medicine?._id}`);
                }}
              />
            </div>
          )}
        </div>
        {isAdmin && (
          <div className="flex items-center justify-between gap-3">
            <Button
              text={"Edit Medicine"}
              handleClick={() => {
                router.push(`/dashboard/update-medicine/${medicine?._id}`);
              }}
            />
            <Button text={"Delete Medicine"} handleClick={handleDelete} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MedicineCard;
