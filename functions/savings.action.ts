"use server";

import { prisma } from "@/libs/prisma";
import { verifyToken } from "@/libs/verifyToken";
import { cookies } from "next/headers";
import path from "path";
import fs from "fs/promises";

interface SavingData {
  amount: number;
  proof: File;
}

export const addSavings = async (savingData: SavingData) => {
  const token = (await cookies()).get("2k78KoshToken")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const userId = verifyToken(token);

  let filePath = "";

  try {
    if (
      !Number.isFinite(savingData.amount) ||
      savingData.amount <= 0
    ) {
      throw new Error("Invalid savings amount");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        group: true,
      },
    });

    if (!user) {
      throw new Error("No such user found");
    }

    if (user.role === "ADMIN") {
      throw new Error(
        "Only members can add savings, Admin just manages and verifies it.",
      );
    }

    if (!user.groupId) {
      throw new Error("You must be part of a Kosh");
    }

    const storagePath = path.join(process.cwd(), "/public/proofs");

    const file = savingData.proof;

    if (!file) {
      throw new Error("Proof is needed");
    }

    await fs.mkdir(storagePath, {
      recursive: true,
    });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = `${Date.now()}-${file.name}`;

    filePath = path.join(storagePath, fileName);

    await fs.writeFile(filePath, buffer);

    const newSaving = await prisma.savingsPost.create({
      data: {
        postedId: user.id,
        amount: savingData.amount,
        proof: fileName,
        groupId: user.groupId,
      },
    });

    return newSaving;
  } catch (error) {
    if (filePath) {
      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.error(
          "Failed to remove uploaded file:",
          unlinkError,
        );
      }
    }

    console.error("Failed to add savings:", error);

    throw error;
  }
};