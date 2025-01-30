import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useRegister from "./Register.hook";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();

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
          <h2 className="text-2xl font-bold text-danger-500">Create Account</h2>
          <p className="mb-4 mt-2 text-small">
            Have an account?&nbsp;
            <Link href="/auth/login" className="font-semibold text-danger-400">
              Login here
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
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              control={control}
              name="fullName"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Fullname"
                  type="text"
                  autoComplete="off"
                  isInvalid={errors.fullName !== undefined}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Username"
                  type="text"
                  autoComplete="off"
                  isInvalid={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Email"
                  type="email"
                  autoComplete="off"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
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
                  type={visiblePassword.password ? "text" : "password"}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
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
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Password Confirmation"
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  endContent={
                    <button
                      className="focus:outline-transparent"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                  autoComplete="off"
                  isInvalid={errors.confirmPassword !== undefined}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
            <Button color="danger" size="lg" type="submit">
              {isPendingRegister ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
