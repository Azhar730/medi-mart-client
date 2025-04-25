/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IMedicine } from "@/types/medicine";
import { useDeleteMedicineMutation } from "@/redux/features/medicine/medicineApi";
import { toast } from "sonner";
import { Edit2, Eye, MessageCircle, ShoppingCart, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMedicine } from "@/redux/features/cart/cartSlice";
import Swal from "sweetalert2";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Modal } from "antd";
import { useState } from "react";
import MediForm from "../form/MediForm";
import MediInput from "../form/MediInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewValidation } from "./medicineValidation";
import Button from "@/components/utils/Button";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";

const MedicineCard = ({
  medicine,
  isAdmin,
}: {
  medicine: IMedicine;
  isAdmin?: boolean;
}) => {
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deleteMedicine] = useDeleteMedicineMutation();
  const [addReview] = useCreateReviewMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const showModal = () => {
    setIsModalOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: any) => {
    const medicineId = medicine?._id;
    const userId = user?.id;
    const modifiedData = {
      ...data,
      medicine: medicineId,
      user: userId,
    };

    const toastId = toast.loading("Sending Review...");

    try {
      const res = await addReview(modifiedData).unwrap();
      console.log(res);
      if (res.success) {
        setIsModalOpen(false);
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete Medicine?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
        Swal.fire({
          title: "Successful!",
          text: "Medicine have been Deleted.",
          icon: "success",
        });
      }
    });
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
                className="border border-orange-400 text-orange-500 cursor-pointer bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition-all duration-300"
                onClick={() => handleAddMedicine(medicine)}
                disabled={medicine?.quantity === 0}
              >
                <ShoppingCart />
              </button>
              {/* Review Modal */}
              <div>
                <Modal
                  footer={null}
                  loading={loading}
                  title="Review"
                  open={isModalOpen}
                  onCancel={handleCancel}
                >
                  <MediForm
                    className=""
                    onSubmit={handleSubmit}
                    resolver={zodResolver(reviewValidation)}
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <MediInput
                        placeHolder="Comment"
                        name={"comment"}
                        label="Comment"
                        type="text"
                      />
                      <MediInput
                        placeHolder="Rating"
                        name={"rating"}
                        label="Rating"
                        type="number"
                      />
                    </div>
                    <div className="flex justify-start gap-4">
                      <Button
                        isFullWidth={true}
                        text="Send Review"
                        type="submit"
                      />
                    </div>
                  </MediForm>
                </Modal>
              </div>

              <button
                onClick={showModal}
                className="border border-teal-400 text-teal-500 cursor-pointer bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition-all duration-300"
              >
                <MessageCircle />
              </button>
              <button
                onClick={() => {
                  router.push(`/medicine/${medicine?._id}`);
                }}
                className="border border-blue-400 text-blue-500 cursor-pointer bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition-all duration-300"
              >
                <Eye />
              </button>
            </div>
          )}
        </div>
        {isAdmin && (
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                router.push(`/dashboard/update-medicine/${medicine?._id}`);
              }}
              className="border p-1 text-blue-500 border-blue-400 rounded-md cursor-pointer"
            >
              <Edit2 />
            </button>
            <button
              onClick={handleDelete}
              className="border p-1 text-red-500 border-red-400 rounded-md cursor-pointer"
            >
              <Trash2 />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MedicineCard;
