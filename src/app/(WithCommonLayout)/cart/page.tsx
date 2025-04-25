import Address from "@/components/modules/cart/Address";
import MedicineCart from "@/components/modules/cart/MedicineCart";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import PrivateRoute from "@/Routes/PrivateRoute";
import React from "react";

const CartPage = () => {
  return (
    <PrivateRoute>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 my-5 mt-30">
        <div className="col-span-1 md:col-span-2 lg:col-span-8">
          <MedicineCart />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <Address />
          <PaymentDetails />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default CartPage;
