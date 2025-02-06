import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface ActivationProps {
  status: "success" | "failed";
}
const Activation = (props: ActivationProps) => {
  const { status } = props;
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={`/images/illustrations/${status === "success" ? "success" : "pending"}.svg`}
          alt="success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-danger-500">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-xl font-bold text-default-500">
          {status === "success"
            ? "Thank you for register account in Event!"
            : "Confirmation code is invalid"}
        </p>
        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="danger"
          onPress={() => router.push("/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default Activation;
