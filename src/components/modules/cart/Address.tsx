"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cities } from "@/constant/cities";
import {
  updateCity,
  updatePhoneNumber,
  updateShippingAddress,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

const Address = () => {
  const dispatch = useAppDispatch();

  const handleCitySelect = (city: string) => {
    dispatch(updateCity(city));
  };

  const handleShippingAddress = (address: string) => {
    dispatch(updateShippingAddress(address));
  };
  const handlePhoneNumber = (phoneNumber: string) => {
    dispatch(updatePhoneNumber(phoneNumber));
  };

  return (
    <div className="bg-gray-200 border-white brightness-105 col-span-4  p-5 ">
      <div className="flex flex-col justify-between h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Address</h1>
          <p className="text-gray-500">Enter your address.</p>
        </div>
        <div className="mt-5">
          <label className="text-gray-500">Phone Number</label>
          <Input
            className="border-blue-500 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => handlePhoneNumber(e.target.value)}
          />
          <label className="text-gray-500">City</label>
          <Select onValueChange={(city) => handleCitySelect(city)}>
            <SelectTrigger className="mb-5 w-full border-blue-500 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <label className="text-gray-500">Shipping Address</label>
          <Textarea
            className="border-blue-500 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => handleShippingAddress(e.target.value)}
            rows={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
