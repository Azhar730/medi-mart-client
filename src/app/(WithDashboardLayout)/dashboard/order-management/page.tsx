import OrderManagement from "@/components/modules/orders/OrderManagement";
import AdminRoute from "@/Routes/ProtectedRoute";

const OrderManagementPage = () => {
  return (
    <div>
      <AdminRoute>
        <OrderManagement />
      </AdminRoute>
    </div>
  );
};

export default OrderManagementPage;
