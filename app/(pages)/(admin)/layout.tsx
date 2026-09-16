import { prisma } from "@/libs/prisma";
import { verifyToken } from "@/libs/verifyToken";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get("2k78KoshToken")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const userId = verifyToken(token);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }

  console.log("Authenticated user:", userId);

  return <>{children}</>;
}