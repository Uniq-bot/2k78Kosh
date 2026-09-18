import CreateGroupclient from '@/components/Admin/CreateGroupclient'
import { prisma } from '@/libs/prisma';
import { verifyToken } from '@/libs/verifyToken';
import { cookies } from 'next/headers';
import React from 'react'

const CreateGroup = async () => {
  const token= (await cookies()).get("2k78KoshToken")?.value;
  const userId= verifyToken(token!);
  const group= await prisma.group.findUnique({
    where:{
      adminId: userId
    }
  })
  return (
    <div className='w-full relative'>
      <CreateGroupclient hasGroup={group} />
    </div>
  )
}

export default CreateGroup