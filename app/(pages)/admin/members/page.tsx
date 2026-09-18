import { prisma } from "@/libs/prisma";
import { verifyToken } from "@/libs/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Members = async () => {
  const token = (await cookies()).get("2k78KoshToken")?.value;

  if (!token) {
    redirect("/auth/login");
  }
  const userId = verifyToken(token!);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    redirect("/auth/login");
  }

  if (user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const group = await prisma.group.findFirst({
    where: {
      adminId: user.id,
    },
    include: {
      members: {
        include: {
          posts: true,
        },
      },
    },
  });

  if (!group) {
    throw new Error("Group not found for the admin");
  }
  console.log(group);

  return (
   <div className="w-full h-screen p-2">
     <table className="w-full border-collapse h-fit border p-1 border-black">
      <thead className="bg-black text-white">
        <tr className="text-center">
          <td className="py-2">
            <h1 className="text-xl font-bold text-center font-[Texts]">S.N.</h1>
          </td>
          <td className="py-2">
            <h1 className="text-xl font-bold text-center font-[Texts]">Name</h1>
          </td>
          <td>
            <h1 className="text-xl font-bold text-center font-[Texts]">
              Email
            </h1>
          </td>
          <td>
            <h1 className="text-xl font-bold text-center font-[Texts]">
              Savings
            </h1>
          </td>
        </tr>
      </thead>
      <tbody className="font-[Numbers] text-center text-sm border-b border-gray-300">
        {group.members.map((member, index) => {
          const totalSavings = member.posts.reduce((total, post) => {
            if (post.status !== "VERIFIED") {
              return total;
            }

            return total + post.amount;
          }, 0);

          return (
            <tr key={member.id} className="border-b w-full h-fit border-gray-300">
              <td className="text-center py-2">{index + 1}</td>

              <td className="text-center py-2">{member.name}</td>

              <td className="text-center py-2">{member.email}</td>

              <td className="text-center py-2">
                Rs. {totalSavings.toLocaleString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
   </div>
  );
};

export default Members;
