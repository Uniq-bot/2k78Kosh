import { createGroup, joinGroup } from "@/functions/group.actions"
import { useMutation } from "@tanstack/react-query"


export const useGroup=()=>{

    return useMutation({
        mutationFn: async (groupName: string)=>{

            await createGroup(groupName);

        },
        onSuccess: ()=>{
            console.log("Group created successfully")
        },
        onError:(error)=>{
            console.log(error)
        }
    })
}

export const useJoinGroup=()=>{

    return useMutation({
        mutationFn: async (groupId: string)=>{

            await joinGroup(groupId);

        },
        onSuccess: ()=>{
            console.log("Joined group successfully")
        },
        onError:(error)=>{
            console.log(error)
        }
    })
}