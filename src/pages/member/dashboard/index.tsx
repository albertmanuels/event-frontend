import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard/Dashboard";
import React from "react";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Dashboard Member"
      type="member"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
