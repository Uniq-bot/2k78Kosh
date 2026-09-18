import AsideBar from "@/components/Admin/AsideBar";
import { prisma } from "@/libs/prisma";
import { verifyToken } from "@/libs/verifyToken";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <div className="w-full min-h-screen flex">
      <AsideBar />
      {children}
    </div>
  );
}