import { auth } from "@workspace/common/auth";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

const Page = async () => {
  const session = await auth();
  const locale = await getLocale();
  if (session) redirect({ href: "/dashboard", locale });
  return redirect({ href: "/auth/signin", locale });
};

export default Page;
