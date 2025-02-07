import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";
import React from "react";

const AdminEventPage = () => {
  return (
    <DashboardLayout title="Event" description="Event Admin" type="admin">
      <Event />
    </DashboardLayout>
  );
};

export default AdminEventPage;
