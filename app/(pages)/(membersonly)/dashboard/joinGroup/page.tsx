import GroupListclient from "@/components/Members/GroupListclient";
import { joinGroup } from "@/functions/group.actions";
import { prisma } from "@/libs/prisma";
import { verifyToken } from "@/libs/verifyToken";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const JoinGroup = async () => {
  const token = (await cookies()).get("2k78KoshToken")?.value;
  const userId = verifyToken(token!);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      group: true,
    },
  });
  if (user?.group) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold text-red-500">
          You are already a member of a group
        </h1>
        <Link
          href="/dashboard/viewMembers"
          className="text-blue-500 underline ml-2"
        >
          View your group
        </Link>
      </div>
    );
  }
  const groups = await prisma.group.findMany({
    include: {
      members: true,
    },
  });
  return (
    <div>
      <h1 className="text-4xl py-4 font-[Texts] font-black px-10">Join Kosh</h1>
      <GroupListclient groups={groups} token={userId!} />
    </div>
  );
};

export default JoinGroup;
