import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./libs/verifyToken";
import { prisma } from "./libs/prisma";

export async function proxy(Request: NextRequest) {
  const token = (await cookies()).get("2k78KoshToken")?.value;

  if (!token) return NextResponse.redirect(new URL("/auth/login", Request.url));
  const userId = verifyToken(token);

  if (Request.nextUrl.pathname === "/") {
    const token = (await cookies()).get("2k78KoshToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", Request.url));
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user)
        return NextResponse.redirect(new URL("/auth/login", Request.url));

      if (user.role === "ADMIN")
        return NextResponse.redirect(new URL("/admin/dashboard", Request.url));

      if (user.role === "USER")
        return NextResponse.redirect(
          new URL("/dashboard/AddSavings", Request.url),
        );

      return NextResponse.redirect(new URL("/auth/login", Request.url));
    } catch {
      return NextResponse.redirect(new URL("/auth/login", Request.url));
    }
  }

  if (Request.nextUrl.pathname.startsWith("/admin")) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user?.role !== "ADMIN") {
        console.log("cant authenticate as Admin");
        return NextResponse.redirect(new URL("/auth/login", Request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.log("Session expired");
      return NextResponse.redirect(new URL("/auth/login", Request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/admin/:path*"],
};
