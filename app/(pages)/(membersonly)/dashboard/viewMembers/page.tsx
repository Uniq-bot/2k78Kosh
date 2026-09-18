import { prisma } from "@/libs/prisma";
import { verifyToken } from "@/libs/verifyToken";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ViewMembers = async () => {
  const token = (await cookies()).get("2k78KoshToken")?.value;
  const userId = verifyToken(token!);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (user?.role === "ADMIN") return;

  if (!user) return;
  const group = await prisma.group.findFirst({
    where: {
      members: {
        some: {
          id: user.id,
        },
      },
    },
    include: {
      members: true,
    },
  });

  if (group === null) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold text-red-500">
          You are not a member of any group
        </h1>
        <Link
          href="/dashboard/joinGroup"
          className="text-blue-500 underline ml-2"
        >
          Join a group
        </Link>
      </div>
    );
  }
  console.log(group);
  return (
    <div className="p-4">
      <h1 className="text-2xl py-4  font-[Texts] font-black">
        Members of {group.name}
      </h1>
    <table className="w-full border-collapse border p-1 border-black">
        <thead className="bg-black text-white">
          <tr className="text-center">
            <td className="py-2">
              <h1 className="text-xl font-bold text-center font-[Texts]">S.N.</h1>
            </td>
            <td className="py-2">
              <h1 className="text-xl font-bold text-center font-[Texts]">Name</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          {
            group.members.map((member, index) => (
              <tr key={member.id} className="border-b border-gray-300">
                <td className="text-center py-2">{index + 1}</td>
                <td className="text-center py-2">{member.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default ViewMembers;
