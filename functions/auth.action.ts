"use server";

import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function loginaction(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  const cookieStore = await cookies();

  cookieStore.set("2k78KoshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}