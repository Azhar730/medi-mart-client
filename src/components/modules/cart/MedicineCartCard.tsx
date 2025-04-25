import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
    CartMedicine,
  decrementOrderQuantity,
  incrementOrderQuantity,
  removeMedicine,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

export default function CartProductCard({ medicine }: { medicine: CartMedicine }) {
  const dispatch = useAppDispatch();

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementOrderQuantity(id));
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeMedicine(id));
  };

  return (
    <div className="bg-gray-300 rounded-lg flex p-5 gap-5">
      <div className="h-full w-32 rounded-md overflow-hidden">
        <Image
          src={medicine?.image || "https://i.postimg.cc/wMw9zpRq/empty-cart.webp"}
          height={200}
          width={200}
          alt="medicine"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="text-xl font-semibold">{medicine?.name}</h1>
        <div className="flex gap-5 my-2">
          
          <p>
            <span className="text-gray-500">Stock Availability:</span>{" "}
            <span className="font-semibold">{medicine?.quantity}</span>
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between">
          <h2>
            Price:
            {currencyFormatter(medicine.price)}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-semibold">Quantity</p>
            <Button
              onClick={() => handleDecrementQuantity(medicine._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Minus />
            </Button>
            <p className="font-semibold text-xl p-2">
              {medicine?.orderQuantity}
            </p>
            <Button
              onClick={() => handleIncrementQuantity(medicine._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Plus />
            </Button>
            <Button
              onClick={() => handleRemoveProduct(medicine._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Trash className="text-red-500/50" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}