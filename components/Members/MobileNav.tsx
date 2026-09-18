"use client";
import { Coins, CoinsIcon, PlusCircle, UserGroup } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black flex justify-around text-white p-4 text-center">
      <Link
        href="/dashboard/viewMembers"
        className={`cursor-pointer outline-none ${pathname === "/dashboard/viewMembers" ? "bg-white text-white rounded-full p-5 absolute -translate-y-10 bg-linear-200 from-black to-gray-300 transition-all" : "text-white"}`}
      >
        <UserGroup />
      </Link>
      <Link
        href="/dashboard/AddSavings"
        className={`cursor-pointer  outline-none ${pathname === "/dashboard/AddSavings" ? "bg-white text-white rounded-full p-5 absolute -translate-y-10 bg-linear-200 from-black to-gray-300 transition-all" : "text-white"}`}
      >
        <PlusCircle />
      </Link>
      <Link
        href="/dashboard/ViewSavings"
        className={`cursor-pointer  outline-none ${pathname === "/dashboard/ViewSavings" ? "bg-white text-white rounded-full p-5 absolute -translate-y-10 bg-linear-200 from-black to-gray-300 transition-all" : "text-white"}`}
      >
        <CoinsIcon />
      </Link>
    </div>
  );
};

export default MobileNav;
