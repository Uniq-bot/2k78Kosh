"use server";

import { prisma } from "@/libs/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function createGroup(groupDetails: {
  name: string;
  description: string;
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string };
    const userId = decoded.id;

    const user= await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const group = await prisma.group.create({
      data: {
        ...groupDetails,
        adminId: user.id,
      },
    });

    return group;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}


export async function getGroups() {
  try {
    const groups = await prisma.group.findMany({
      include: {
        admin: true,
        members: true,
        savingsPosts: true,
      },
    });
    return groups;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}

