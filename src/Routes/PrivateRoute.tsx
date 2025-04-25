"use client"

import Loading from "@/components/utils/Loading";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const token = useAppSelector(selectCurrentToken);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [token, router]);

  if (loading) {
    return <Loading />;
  }

  return children;
};

export default PrivateRoute;
