"use server";
import { auth, signIn, signOut } from "@workspace/common/auth";

export const signInWithCredentials = async (formData: FormData) => {
  console.log("formData", formData);
  await signIn("credentials", {
    username: formData.get("username") || "", // `'null'` 문자 방지
    password: formData.get("password") || "",
    redirectTo: "/dashboard",
  });
};
