import AdminRoute from "@/Routes/ProtectedRoute";
import MedicineManagement from "../../../../components/modules/medicine/MedicineManagement";

const MedicineManagementPage = () => {
  return (
    <div>
      <AdminRoute>
        <MedicineManagement />
      </AdminRoute>
    </div>
  );
};

export default MedicineManagementPage;
