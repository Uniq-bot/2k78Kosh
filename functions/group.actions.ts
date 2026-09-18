"use server";

import { prisma } from "@/libs/prisma";
import { verifyToken } from "@/libs/verifyToken";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function createGroup(groupname: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("2k78KoshToken")?.value;

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const userId = decoded.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "ADMIN") {
      throw new Error("Users can't create groups");
    }

    const existingGroup = await prisma.group.findUnique({
      where: {
        adminId: user.id,
      },
    });

    if (existingGroup) {
      throw new Error("Admin can only create one group");
    }
    const group = await prisma.group.create({
      data: {
        name: groupname,
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



export const joinGroup = async (id: string) =>{

  const token = (await cookies()).get("2k78KoshToken")?.value;
  const userId= verifyToken(token!);

  const user= await prisma.user.findUnique({
    where:{
      id: userId
    },
    select:{
      group:true
    }
  })

  if(!user) throw new Error("User not found");

  if(user.group) throw new Error("User already in a group");

  const group= await prisma.group.findUnique({
    where:{
      id:id
    }
  })

  if(!group) throw new Error("Group not found");

  const updatedUser= await prisma.user.update({
    where:{
      id:userId
    },
    data:{
      group:{
        connect:{
          id:group.id
        }
      }
    }
  })

  return updatedUser;

}