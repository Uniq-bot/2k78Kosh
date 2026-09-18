"use client";
import { useJoinGroup } from "@/mutations/group.mutation";
import React from "react";

const GroupListclient = ({
  groups,
  token,
}: {
  groups: any[];
  token: string;
}) => {
  const { mutateAsync: joinGroup, isError, isSuccess, error } = useJoinGroup();
  const handleJoinGroup = async (groupId: string) => {
    try {
      await joinGroup(groupId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {groups.map((group) => (
        <div
          key={group.id}
          className="w-full h-20 bg-gray-200 my-2 flex justify-between items-center px-5"
        >
          <h1 className="text-lg font-bold">{group.name}</h1>
          <div>
            <button
              onClick={() => handleJoinGroup(group.id)}
              className={`bg-black ${group.members?.some((m: any) => m.id === token) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}  text-white px-3 py-1 `}
            >
              {group.members?.some((m: any) => m.id === token)
                ? "Joined"
                : "Join"}
            </button>
            {isError ? (
              <p className="text-red-500">
                {error?.message || "An error occurred"}
              </p>
            ) : null}
            {isSuccess ? (
              <p className="text-green-500">Joined successfully</p>
            ) : null}
            {group.members?.length > 0 ? (
              <p className="text-gray-500">{group.members.length} members</p>
            ) : (
              <p className="text-gray-500">No members yet</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupListclient;
