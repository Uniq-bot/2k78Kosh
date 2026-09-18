"use client";
import { useAddSavings } from "@/mutations/saving.mutations";
import { Image } from "lucide-react";
import React, { useState } from "react";

const AddSavings = () => {
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState(500);

  const {
    mutateAsync: addSavings,
    isPending,
    isError,
    isSuccess,
  } = useAddSavings();

  const handleAddSavings = async (e: any) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a proof file before submitting.");
      return;
    }
    const data = {
      amount: amount,
      proof: file,
    };
    try {
      await addSavings(data);
    } catch (error) {
    } finally {
      setFile(null);
    }
  };
  return (
    <div className="w-full min-h-screen  p-5">
      {/* header */}
      <div className="w-full  ">
        <h1 className="text-4xl py-4 font-[Texts] font-black">
          Swagatam Muji!
        </h1>
      </div>
      <div className="w-full flex items-center  justify-center">
        <div className="w-1/2 border-r-5 h-40 p-2  bg-linear-150 to-gray-300  flex flex-col">
          <h1 className="flex items-start text-left font-[Texts] text-xl">
            {" "}
            Kati halni
          </h1>
          <h2 className="h-full font-[Numbers] text-2xl font-black text-center w-full flex items-center justify-center">
            Rs. 500
          </h2>
        </div>

        <div className="w-1/2 border-r-5 h-40 p-2  bg-linear-150 to-gray-300  flex flex-col">
          <h1 className="flex items-start text-left font-[Texts] text-xl">
            {" "}
            Dhila vaye Thaap
          </h1>
          <h2 className="h-full font-[Numbers] text-2xl font-black text-center w-full flex items-center justify-center">
            Rs. 350
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
              <input
                type="number"
                className="  outline-none "
                value={amount>0?amount:""}
                onChange={(e)=>setAmount(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-[Labels] font-semibold text-xl">
              K suboot xa?
            </label>
            <div className="w-full h-50 border-2 relative flex items-center flex-col justify-center">
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="proof"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Image size={24} />
                  <p>Drag and drop or click to upload</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2">
              {file && (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-red-500 underline"
                >
                  Remove file
                </button>
              )}
            </div>
          </div>
          <button
            onClick={(e) => handleAddSavings(e)}
            className="w-full bg-black py-3 text-white font-[Texts]"
          >
            {isPending ? "jandai xa ......" : "Verification ko lagi patha"}
          </button>
          {isError ? "Errorr" : ""}
        </form>
      </div>
      {isSuccess && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h1 className="text-xl font-bold mb-2">Success!</h1>
            <p>Your savings have been added successfully.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-black text-white py-2 px-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSavings;
