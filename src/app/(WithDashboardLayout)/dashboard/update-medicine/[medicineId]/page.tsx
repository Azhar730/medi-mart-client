import UpdateMedicineForm from "@/components/modules/medicine/UpdateMedicineForm";
import AdminRoute from "@/Routes/ProtectedRoute";

const UpdateMedicinePage = async ({
  params,
}: {
  params: Promise<{ medicineId: string }>;
}) => {
  const { medicineId } = await params;
  return (
    <div>
      <AdminRoute>
        <UpdateMedicineForm medicineId={medicineId} />
      </AdminRoute>
    </div>
  );
};

export default UpdateMedicinePage;
