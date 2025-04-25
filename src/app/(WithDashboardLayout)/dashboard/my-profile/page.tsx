"use client";

import { protectedRoutes } from "@/contants";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import PrivateRoute from "@/Routes/PrivateRoute";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Profile = () => {
  const pathName = usePathname();
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        localStorage.removeItem("accessToken");
        if (protectedRoutes.some((route) => pathName.match(route))) {
          router.push("/login");
        } else {
          router.push("/login");
          toast.success("Logged out successfully");
        }
        Swal.fire({
          title: "Successful!",
          text: "Your have been logged out.",
          icon: "success",
        });
      }
    });
  };
  return (
    <PrivateRoute>
      <div className="max-w-[100%] mx-auto w-80">
        <div className="rounded-lg border-2 border-primary bg-transparent px-4 py-8 text-center shadow-lg">
          <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              className="bi bi-person-fill text-white dark:text-rose-300"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
            </svg>
            <figcaption className="sr-only">{currentUser?.name}</figcaption>
          </figure>
          <h2 className="mt-4 text-xl font-bold text-primary dark:text-rose-400">
            {currentUser?.name}
          </h2>
          <p className="mb-4 text-gray-600">
            Role:{" "}
            <span className="font-bold text-primary">
              {currentUser?.role.toUpperCase()}
            </span>
          </p>
          <div className="flex items-center justify-center">
            <button
              onClick={handleLogout}
              className="rounded-full cursor-pointer bg-primary px-4 py-2 text-white"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Profile;
