/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import MediForm from "../form/MediForm";
import { medicineValidation } from "./medicineValidation";
import MediInput from "../form/MediInput";
import MediSelect from "../form/MediSelect";
import MediImageUpload from "../form/MediImageUpload";
import MediTextArea from "../form/MediTextArea";
import Button from "@/components/utils/Button";
import {
  categories,
  manufacturers,
  requiredPrescriptionOptions,
} from "@/constant/medicine";
import MediDatePicker from "../form/MediDatePicker";
import { useAddMedicineMutation } from "@/redux/features/medicine/medicineApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SectionHead from "@/components/shared/SectionHead";


const AddMedicine = () => {
  const [addMedicine] =useAddMedicineMutation();
  const [showProfile, setShowProfile] = useState(true);
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    const toastId = toast.loading("Creating Medicine...");

    const formDataToSend = new FormData();
    if (formData.image) {
      formDataToSend.append("file", formData.image);
      delete formData.image;
    }
    formDataToSend.append("data", JSON.stringify({ ...formData }));

    try {
      const res = await addMedicine(formDataToSend).unwrap();
      if (res.success) {
        router.push("/dashboard/medicine-management");
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const categoryOptions = categories?.map((category) => ({
    label: category,
    value: category,
  }));
  const manufacturerOptions = manufacturers?.map((manufacturer) => ({
    label: manufacturer,
    value: manufacturer,
  }));
  const prescriptionOptions = requiredPrescriptionOptions?.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <div className="bg-gray-200 px-12 py-6">
      <SectionHead
      heading="Add Medicine"
      description=""
      />
      <MediForm
        onSubmit={handleSubmit}
        resolver={zodResolver(medicineValidation)}
        className="flex flex-col gap-5 my-5"
      >
        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MediInput
              placeHolder="Medicine Name"
              name={"name"}
              label="Name"
              type="text"
            />
            <MediInput
              placeHolder="Medicine Price"
              name={"price"}
              label="Price"
              type="number"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MediSelect
              placeHolder="Select Yes or No"
              options={prescriptionOptions}
              name={"requiredPrescription"}
              label="Is Prescription Required?"
            />
            <MediInput
              placeHolder="Medicine Quantity"
              name={"quantity"}
              label="Quantity"
              type="number"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MediSelect
              placeHolder="Select Category"
              options={categoryOptions}
              name={"category"}
              label="Select Category"
            />
            <MediSelect
              placeHolder="Select Manufacturer"
              options={manufacturerOptions}
              name={"manufacturer"}
              label="Select Manufacturer"
            />
          </div>
          <div className="flex flex-col gap-4">
            <MediDatePicker
              name="expiryDate"
              label="Expiry Date"
              picker="date"
            />
            <MediImageUpload
              setShowProfile={setShowProfile}
              showProfile={showProfile}
              name="image"
              label="Upload Image"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2"></div>
          <MediTextArea name={"description"} label="Description" />
        </div>

        <div className="flex justify-start gap-4">
          <Button isFullWidth={true} text="Add Medicine" type="submit" />
        </div>
      </MediForm>
    </div>
  );
};

export default AddMedicine;
