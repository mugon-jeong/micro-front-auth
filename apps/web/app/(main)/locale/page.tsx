import React from "react";
import About from "@/app/(main)/locale/_components/about";
import LocaleSwitcher from "@/app/(main)/locale/_components/locale-switcher";

const Page = async () => {
  return (
    <div>
      <About />
      <LocaleSwitcher />
    </div>
  );
};

export default Page;
