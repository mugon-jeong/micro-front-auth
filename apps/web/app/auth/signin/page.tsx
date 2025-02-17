import React from "react";
import { SignIn } from "@/components/sign-in";

const Page = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignIn />
      </div>
    </div>
  );
};

export default Page;
