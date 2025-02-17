import React from "react";
import { signInWithCredentials } from "@/actions/auth";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";

const SignInForm = () => {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signInWithCredentials(formData);
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" type="test" placeholder="username" required />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="ml-auto text-sm underline-offset-2 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default SignInForm;
