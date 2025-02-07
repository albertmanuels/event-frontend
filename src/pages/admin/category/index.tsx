import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";
import React from "react";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout title="Category" description="Category Admin" type="admin">
      <Category />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
