import UserManagement from "@/components/modules/user/UserManagement";
import AdminRoute from "@/Routes/ProtectedRoute";
import React from "react";

const UserManagementPage = () => {
  return (
    <div>
      <AdminRoute>
        <UserManagement />
      </AdminRoute>
    </div>
  );
};

export default UserManagementPage;
