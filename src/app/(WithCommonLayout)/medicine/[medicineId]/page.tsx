import MedicineDetails from "@/components/modules/medicine/MedicineDetails";
import PrivateRoute from "@/Routes/PrivateRoute";

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ medicineId: string }>;
}) => {
  const { medicineId } = await params;
  return (
    <PrivateRoute>
      <div>
        <MedicineDetails medicineId={medicineId} />
      </div>
    </PrivateRoute>
  );
};

export default MedicineDetailsPage;
