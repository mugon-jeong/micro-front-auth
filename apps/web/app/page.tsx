import { auth } from "@workspace/common/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");
  return redirect("/auth/signin");
};

export default Page;
