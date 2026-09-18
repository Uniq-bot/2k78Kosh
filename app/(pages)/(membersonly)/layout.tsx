import MobileNav from "@/components/Members/MobileNav";
import Link from "next/link";
import React from "react";

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return (

<div>
  {children}
  <MobileNav />
</div>

  );
};
