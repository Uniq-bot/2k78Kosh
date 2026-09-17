"use client"


import { addSavings } from "@/functions/savings.action";
import { useMutation } from "@tanstack/react-query";


interface SavingData {
  amount: number;
  proof: File ;
}


export const useAddSavings = () =>{

    return useMutation({
        mutationFn: async (data: SavingData) => {
            await addSavings(data)
        },
        onSuccess:()=>{
            console.log("Succed")
        },
        onError:(error)=>{
            console.log(error)
        }
    })


}

