import PageHead from "@/components/commons/PageHead";
import React, { Fragment } from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const AuthLayout = (props: AuthLayoutProps) => {
  const { children, title } = props;

  return (
    <Fragment>
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </Fragment>
  );
};

export default AuthLayout;
