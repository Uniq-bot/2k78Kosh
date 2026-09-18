"use client";
import { useGroup } from "@/mutations/group.mutation";
import React, { useState } from "react";

const CreateGroupclient = ({ hasGroup }: { hasGroup: any }) => {
  const [koshname, setKoshName] = useState("");
    const {mutateAsync: createGroupFn, isPending, isError, error, isSuccess}= useGroup()
    const handleSubmit=(e: any)=>{
        e.preventDefault()

        try {
             createGroupFn(koshname)
        } catch (error) {
            console.log(error)
        }
    }

    const groupavailable= hasGroup? true : false;
  return (
    <div className="w-1/3 h-fit p-10 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gray-400">
      {groupavailable ? (
        <div className="w-full text-3xl font-[Texts] font-bold">
          <h1>You already have a Kosh</h1>
        </div>
      ) : (
        <>
        <div className="w-full text-3xl font-[Texts] font-bold">
          <h1>Create your Kosh</h1>
        </div>
         <form className="w-full flex flex-col gap-2 p-2">
          <div className="flex flex-col">
          <label className="font-[Labels] font-semibold text-xl">
            Kosh Name
          </label>
          <input
            className="flex items-baseline px-2 py-1 border-2 border-black"
            type="text"
            value={koshname}
            onChange={(e) => setKoshName(e.target.value)}
          />
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          className="w-full bg-black py-3 text-white font-[Texts]"
        >
          {isPending ? "Creating ......" : " Create"}
         
        </button>
        {
            isError? error?.message || "An error occurred:" : ""
        }
        {
            isSuccess? "Kosh created successfully" : ""
        }
      </form></>
      )}
      
    </div>
  );
};

export default CreateGroupclient;
