/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  citySelector,
  clearCart,
  grandTotalSelector,
  orderedMedicinesSelector,
  orderSelector,
  phoneNumberSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentDetails = () => {
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const phoneNumber = useAppSelector(phoneNumberSelector);
  const city = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const cartProducts = useAppSelector(orderedMedicinesSelector);
  const user = useAppSelector(selectCurrentUser);
  const [createOrder] = useCreateOrderMutation();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");
    try {
      if (!user) {
        router.push("/login");
        throw new Error("Please login first.");
      }

      if (!phoneNumber) {
        throw new Error("Phone Number is missing");
      }
      if (!city) {
        throw new Error("City is missing");
      }
      if (!shippingAddress) {
        throw new Error("Shipping address is missing");
      }

      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }

      const orderData = {
        ...order,
        user: user.id,
        shippingAddress: `${shippingAddress} - ${city}`,
        totalPrice: grandTotal,
        phoneNumber,
      };

      const toastId = toast.loading("Placing Order");
      try {
        const response = await createOrder(orderData).unwrap();
        if (response.success) {
          console.log(response);
          dispatch(clearCart());
          toast.success("Order placed successfully", { id: toastId });
          window.location.href = response.data;
        }
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
        console.error("Error submitting test answers:", error);
      }

      // if (res.success) {
      //   toast.success(res.message, { id: orderLoading });
      //   dispatch(clearCart());
      //   router.push(res.data.paymentUrl);
      // }

      // if (!res.success) {
      //   toast.error(res.message, { id: orderLoading });
      // }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };
  return (
    <div className="bg-gray-200 brightness-105 col-span-4 h-fit p-5">
      <h1 className="text-2xl text-center font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-700 ">Subtotal</p>
          <p className="font-semibold">{currencyFormatter(subTotal)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 ">Discount</p>
          <p className="font-semibold">{currencyFormatter(0)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 ">Shipment Cost</p>
          <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-700 ">Grand Total</p>
        <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
      </div>
      <Button
        onClick={handleOrder}
        className="w-full text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
};

export default PaymentDetails;
