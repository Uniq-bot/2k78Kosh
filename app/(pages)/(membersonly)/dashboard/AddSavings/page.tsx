"use client";
import { useAddSavings } from "@/mutations/saving.mutations";
import { Image } from "lucide-react";
import React, { useState } from "react";

const AddSavings = () => {
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState(500);

  const { mutateAsync: addSavings, isPending, isError } = useAddSavings();

  const handleAddSavings = async (e: any) => {
    e.preventDefault();
    if (!file) return;
    const data = {
      amount: amount,
      proof: file,
    };
    try {
      await addSavings(data);
    } catch (error) {}
  };
  console.log(file);
  return (
    <div className="w-full min-h-screen  p-5">
      {/* header */}
      <div className="w-full  ">
        <h1 className="text-4xl py-4 font-[Texts] font-black">
          Swagatam Muji!
        </h1>
      </div>
      <div className="w-full flex p-2 gap-2 justify-between">
        <div className="w-1/2 border-r-5 bg-linear-100 to-gray-300 h-40 p-2  flex flex-col ">
          <h1 className="flex items-start text-left font-[Texts] text-xl">
            {" "}
            Kati halis
          </h1>
          <h2 className="h-full font-[Numbers] text-2xl font-black text-center w-full flex items-center justify-center">
            Rs. 20,000
          </h2>
        </div>
        <div className="w-1/2 border-r-5 h-40 p-2  bg-linear-100 to-gray-300  flex flex-col">
          <h1 className="flex items-start text-left font-[Texts] text-xl">
            {" "}
            Kati halni
          </h1>
          <h2 className="h-full font-[Numbers] text-2xl font-black text-center w-full flex items-center justify-center">
            Rs. 500
          </h2>
        </div>
      </div>
      <div className="w-full h-100 flex flex-col  ">
        <h1 className="w-full text-center text-3xl font-bold font-[Texts]">
          Paisa haal muji
        </h1>
        <form className="w-full flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <label className="font-[Labels] font-semibold text-xl">
              500 nai halni ho aaja
            </label>
            <div className="flex items-baseline px-2 py-1 border-2 border-black">
              <p>Rs.</p>
              <input type="number" className="  " value={amount} disabled />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-[Labels] font-semibold text-xl">
              K suboot xa?
            </label>
            <div className="w-full h-50 border-2 relative flex items-center flex-col justify-center">
              <input
                type="file"
                accept="image/*"
                className="w-full h-full  opacity-0 absolute"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              <Image />
              <p>Proof Select Gaar!!</p>
            </div>
          </div>
          <button
            onClick={(e) => handleAddSavings(e)}
            className="w-full bg-black py-3 text-white font-[Texts]"
          >
            {isPending ? "jandai xa ......" : "Verification ko lagi patha"}
            
          </button>
          {isError? "Errorr": ""}
        </form>
      </div>
    </div>
  );
};

export default AddSavings;
