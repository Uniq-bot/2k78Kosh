"use client";
import {
  Check,
  LayoutDashboard,
  LucideIcon,
  PlusCircle,
  Settings,
  UserGroup,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const AsideBar = () => {
  const navLinks = [
    {
      nav: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      nav: "Create Kosh",
      href: "/admin/create-group",
      icon: PlusCircle,
    },
    {
      nav: "Members",
      href: "/admin/members",
      icon: UserGroup,
    },
    {
      nav: "Verify Savings",
      href: "/admin/verify-savings",
      icon: Check,
    },
    {
      nav: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const pathname = usePathname();

  return (
    <div className="w-80 h-screen sticky top-0 flex flex-col gap-5 bg-black">
      <div className="w-full bg-black text-white p-5">
        <h1 className="font-[Texts] font-black  text-3xl">2k78 Kosh Admin</h1>
      </div>

      <div className="flex flex-col gap-5 ">
        {navLinks.map((navlink, index) => {
          const Icon = navlink.icon;
          const isActive = pathname === navlink.href;
          return (
            <Link
              key={navlink.href}
              href={navlink.href}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              className={`w-full flex items-center gap-2 text-white p-3 hover:border-l-5  ${isActive ? "border-white border-l-5" : "border-gray-400/50"} transition-all`}
            >
              <Icon size={24} />

              <p
                className={`
          font-[Labels] text-xl transition-all
          ${
            isHovered === index || isActive
              ? "translate-x-2 font-[Texts] font-black"
              : "translate-x-0"
          }
        `}
              >
                {navlink.nav}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AsideBar;
