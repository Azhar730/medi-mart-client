import AddMedicineForm from "@/components/modules/medicine/AddMedicineForm";
import AdminRoute from "@/Routes/ProtectedRoute";
import React from "react";

const AddMedicinePage = () => {
  return (
    <div>
      <AdminRoute>
        <AddMedicineForm />
      </AdminRoute>
    </div>
  );
};

export default AddMedicinePage;
