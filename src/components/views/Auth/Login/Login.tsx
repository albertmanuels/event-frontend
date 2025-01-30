import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useLogin from "./Login.hook";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Login = () => {
  const {
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    isVisible,
    errors,
  } = useLogin();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          className="w-2/3 lg:w-full"
          src="/images/illustrations/login.svg"
          alt="logo"
          width={1024}
          height={1024}
        />
      </div>
      <Card>
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold text-danger-500">Login</h2>
          <p className="mb-4 mt-2 text-small">
            Don&apos;t have an account?&nbsp;
            <Link
              href="/auth/register"
              className="font-semibold text-danger-400"
            >
              Register here
            </Link>
          </p>
          {errors.root && (
            <p className="mb-2 font-medium text-danger">
              {errors.root?.message}
            </p>
          )}
          <form
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              control={control}
              name="identifier"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Email / Username"
                  type="text"
                  autoComplete="off"
                  isInvalid={errors.identifier !== undefined}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Password"
                  type={isVisible ? "text" : "password"}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => toggleVisibility()}
                    >
                      {isVisible ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Button color="danger" size="lg" type="submit">
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
