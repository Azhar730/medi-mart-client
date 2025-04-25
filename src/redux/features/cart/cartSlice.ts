import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IMedicine } from "@/types/medicine";

export interface CartMedicine extends IMedicine {
  orderQuantity: number;
}

interface InitialState {
  medicines: CartMedicine[];
  city: string;
  shippingAddress: string;
  phoneNumber: string;
}

const initialState: InitialState = {
  medicines: [],
  city: "",
  shippingAddress: "",
  phoneNumber: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addMedicine: (state, action) => {
      const medicineToAdd = state.medicines.find(
        (medicine) => medicine._id === action.payload._id
      );

      if (medicineToAdd) {
        medicineToAdd.orderQuantity += 1;
        return;
      }

      state.medicines.push({ ...action.payload, orderQuantity: 1 });
    },
    incrementOrderQuantity: (state, action) => {
      const medicineToIncrement = state.medicines.find(
        (medicine) => medicine._id === action.payload
      );

      if (medicineToIncrement) {
        medicineToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const medicineToIncrement = state.medicines.find(
        (medicine) => medicine._id === action.payload
      );

      if (medicineToIncrement && medicineToIncrement.orderQuantity > 1) {
        medicineToIncrement.orderQuantity -= 1;
        return;
      }
    },
    removeMedicine: (state, action) => {
      state.medicines = state.medicines.filter(
        (medicine) => medicine._id !== action.payload
      );
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    clearCart: (state) => {
      state.medicines = [];
      state.city = "";
      state.shippingAddress = "";
    },
  },
});

//* Medicines

export const orderedMedicinesSelector = (state: RootState) => {
  return state.cart.medicines;
};

export const orderSelector = (state: RootState) => {
  return {
    medicines: state.cart.medicines.map((medicine) => ({
      medicine: medicine._id,
      quantity: medicine.orderQuantity,
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
  };
};

//* Payment

export const subTotalSelector = (state: RootState) => {
  return state.cart.medicines.reduce((acc, medicine) => {
    return acc + medicine.price * medicine.orderQuantity;
  }, 0);
};

export const shippingCostSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === "Dhaka" &&
    state.cart.medicines.length > 0
  ) {
    return 60;
  } else if (
    state.cart.city &&
    state.cart.city !== "Dhaka" &&
    state.cart.medicines.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);

  return subTotal + shippingCost;
};

//* Address

export const phoneNumberSelector = (state: RootState) => {
  return state.cart.phoneNumber;
};
export const citySelector = (state: RootState) => {
  return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

export const {
  addMedicine,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeMedicine,
  updateCity,
  updateShippingAddress,
  updatePhoneNumber,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
