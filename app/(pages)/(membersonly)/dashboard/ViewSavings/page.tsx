import { prisma } from "@/libs/prisma";
import { verifyToken } from "@/libs/verifyToken";
import { cookies } from "next/headers";
import React from "react";

const ViewSavings = async () => {
  const token = (await cookies()).get("2k78KoshToken")?.value;
  const userId = verifyToken(token!);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) throw new Error("User not found");

  if (user.role === "ADMIN") return;
  const group = await prisma.group.findFirst({
    where: {
      members: {
        some: {
          id: user.id,
        },
      },
    },
  });

  if (group === null) throw new Error("User is not a member of any group");
  const userSavings = await prisma.savingsPost.findMany({
    where: {
      postedId: user.id,
      groupId: group.id,
    },
  });

  return (
    <div className="p-2">
      <h1 className="text-2xl py-4  font-[Texts] font-black p-">
        Track your Savings in {group.name}
      </h1>
      <table className="w-full border-collapse border p-1 border-black">
        <thead className="bg-black text-white">
          <tr className="text-center">
            <td className="py-2">
              <h1 className="text-md font-bold font-[Texts]">S.N.</h1>
            </td>
            <td className="py-2">
              <h1 className="text-md font-bold font-[Texts]">Amount</h1>
            </td>
            <td className="py-2">
              <h1 className="text-md font-bold font-[Texts]">Status</h1>
            </td>
            <td className="py-2">
              <h1 className="text-md font-bold font-[Texts]">Proof</h1>
            </td>
            <td className="py-2">
              <h1 className="text-md font-bold font-[Texts]">Date</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          {userSavings.map((saving, index) => {
            return (
              <tr className="font-[Numbers] text-center text-sm border-b border-black" key={saving.id}>
                <td className="py-2">{index + 1}</td>
                <td  className="py-2">{saving.amount}</td>
                <td  className="py-2">{saving.status}</td>
                <td  className="py-2">
                  <a href={`http://localhost:3000/proofs/${saving.proof}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View Proof
                  </a>
                </td>
                <td  className="py-2">{saving.createdAt.toDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSavings;
