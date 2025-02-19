import React from "react";
import { auth } from "@workspace/common/auth";
import Link from "next/link";

const Page = async () => {
  const session = await auth();
  console.log("about page session", session);
  return (
    <div>
      <h1>Locale About</h1>
      <p>{session?.token?.accessToken}</p>
      <p>{session?.user?.accessToken}</p>
      <a href={"/dashboard"}>dashboard</a>
      <Link href={"/dashboard"}>dashboard</Link>
    </div>
  );
};

export default Page;
