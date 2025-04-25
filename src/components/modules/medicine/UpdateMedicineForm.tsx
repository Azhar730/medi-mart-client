/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import MediForm from "../form/MediForm";
import { updateMedicineValidation } from "./medicineValidation";
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
import {
  useGetSingleMedicineQuery,
  useUpdateMedicineMutation,
} from "@/redux/features/medicine/medicineApi";
import { toast } from "sonner";
import Loading from "@/components/utils/Loading";
import { useRouter } from "next/navigation";

const UpdateMedicineForm = ({ medicineId }: { medicineId: string }) => {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetSingleMedicineQuery(medicineId);
  const [updateMedicine] = useUpdateMedicineMutation();
  console.log(response, "response");
  const [showProfile, setShowProfile] = useState(true);
  const id = response?.data?._id;
  const router = useRouter();
  // submit update
  const handleSubmit = async (formData: any) => {
    const toastId = toast.loading("Updating Medicine...");

    const formDataToSend = new FormData();
    if (formData?.image) {
      formDataToSend.append("file", formData?.image);
      delete formData?.image;
    }
    formDataToSend.append(
      "data",
      JSON.stringify({ ...formData, inStock: formData.quantity > 0 })
    );

    try {
      const res = await updateMedicine({
        id: id,
        formData: formDataToSend,
      }).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        router.push("/dashboard/medicine-management");
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

  console.log(medicine);

  if (!medicine) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Bicycle not found!
      </h3>
    );
  }
  return (
    <div>
      <MediForm
        onSubmit={handleSubmit}
        resolver={zodResolver(updateMedicineValidation)}
        className="flex flex-col gap-5 my-5"
      >
        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MediInput
              value={medicine?.name}
              placeHolder="Medicine Name"
              name={"name"}
              label="Name"
              type="text"
            />
            <MediInput
              value={medicine?.price}
              placeHolder="Medicine Price"
              name={"price"}
              label="Price"
              type="number"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MediSelect
              defaultValue={medicine?.requiredPrescription}
              placeHolder="Select Yes or No"
              options={prescriptionOptions}
              name={"requiredPrescription"}
              label="Is Prescription Required?"
            />
            <MediInput
              value={medicine?.quantity}
              placeHolder="Medicine Quantity"
              name={"quantity"}
              label="Quantity"
              type="number"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MediSelect
              defaultValue={medicine?.category}
              placeHolder="Select Category"
              options={categoryOptions}
              name={"category"}
              label="Select Category"
            />
            <MediSelect
              defaultValue={medicine?.manufacturer}
              placeHolder="Select Manufacturer"
              options={manufacturerOptions}
              name={"manufacturer"}
              label="Select Manufacturer"
            />
          </div>
          <div className="flex flex-col gap-4">
            <MediDatePicker
              defaultValue={medicine?.expiryDate}
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
          <MediTextArea
            value={medicine?.description}
            name={"description"}
            label="Description"
          />
        </div>

        <div className="flex justify-start gap-4">
          <Button isFullWidth={true} text="Update Medicine" type="submit" />
        </div>
      </MediForm>
    </div>
  );
};

export default UpdateMedicineForm;
