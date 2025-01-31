import PageHead from "@/components/commons/PageHead";
import React, { Fragment } from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const AuthLayout = (props: AuthLayoutProps) => {
  const { children, title } = props;

  return (
    <div className="flex-cols flex min-h-screen min-w-full items-center justify-center gap-10 py-10 lg:py-0">
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
