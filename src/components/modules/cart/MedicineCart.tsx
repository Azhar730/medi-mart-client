"use client"
import { orderedMedicinesSelector } from '@/redux/features/cart/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { IMedicine } from '@/types/medicine';
import Image from 'next/image';
import React from 'react';
import CartProductCard from './MedicineCartCard';

const MedicineCart = () => {
    const medicines = useAppSelector(orderedMedicinesSelector);
    return (
        <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-8 h-full row-span-3 p-x-10 space-y-5">
      {medicines.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-2">
            Looks like your cart is on vacation—bring it back to work by adding
            some items!
          </p>
          <div className="flex justify-center items-center ">
            <Image height={500} width={500} src="https://i.postimg.cc/wMw9zpRq/empty-cart.webp" alt="empty cart" />
          </div>
        </div>
      )}
      {medicines?.map((medicine: IMedicine) => (
        <CartProductCard key={medicine._id} medicine={medicine} />
      ))}
    </div>
    );
};

export default MedicineCart;