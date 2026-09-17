import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/libs/verifyToken";

export default async function Home() {
  const token = (await cookies()).get("2k78KoshToken")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  try {
    verifyToken(token);
    redirect("/dashboard");
  } catch {
    redirect("/login");
  }
}