import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";
import React from "react";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Category"
      description="List of all Categories, create new category, and manage existing categories"
      type="admin"
    >
      <Category />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
