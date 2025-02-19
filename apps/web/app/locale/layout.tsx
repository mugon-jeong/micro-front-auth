import React from "react";
import AppShell from "@workspace/common/app-shell";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AppShell>{children}</AppShell>;
};

export default Layout;
