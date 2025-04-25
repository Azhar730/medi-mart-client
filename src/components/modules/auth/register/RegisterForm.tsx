/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { registerValidation } from "./registerValidation";
import Link from "next/link";
import Button from "@/components/utils/Button";
import MediForm from "../../form/MediForm";
import MediInput from "../../form/MediInput";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

const RegisterForm = () => {
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (formData: FieldValues) => {
    console.log(formData);
    const toastId = toast.loading("Creating an account");
    try {
      const res = await register(formData).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
        const loginRes = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        dispatch(
          setUser({
            user: {
              id: loginRes.data.id,
              name: loginRes.data.name,
              email: loginRes.data.email,
              role: loginRes.data.role,
            },
            token: loginRes.accessToken,
          })
        );
        localStorage.setItem("accessToken", loginRes.accessToken);
        router.push("/");
      }
    } catch (error) {
      toast.error("User is already exists", { id: toastId });
    }
  };
  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center bg-transparent">
      <div className="w-full max-w-lg space-y-8 p-2 xs:p-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-primary">
            Register Now
          </h1>
        </div>

        <div className="bg-white p-3 xs:p-6 rounded-lg shadow-lg border border-gray-300">
          <MediForm
            className=""
            onSubmit={handleSubmit}
            resolver={zodResolver(registerValidation)}
          >
            <div className="w-full">
              <MediInput
                type="text"
                name={"name"}
                label="Name"
                placeHolder="Enter your name"
              />
            </div>
            <div className="w-full">
              <MediInput
                name={"email"}
                label="Email"
                type="email"
                placeHolder="Enter your email"
              />
            </div>
            <div className="w-full">
              <MediInput
                name={"password"}
                label="Password"
                placeHolder="Enter your Password"
                type="text"
              />
            </div>
            <div className="-mt-2 md:mt-0 w-full">
              <Button text="Sign up" isFullWidth={true} />
            </div>
          </MediForm>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary ms-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
