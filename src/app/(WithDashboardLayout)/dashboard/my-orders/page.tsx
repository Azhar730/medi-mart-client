import MyOrders from "@/components/modules/orders/MyOrders";
import PrivateRoute from "@/Routes/PrivateRoute";

const MyOrdersPage = () => {
  return (
    <div>
      <PrivateRoute>
        <MyOrders />
      </PrivateRoute>
    </div>
  );
};

export default MyOrdersPage;
