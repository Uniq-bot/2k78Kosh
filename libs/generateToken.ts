import jwt from "jsonwebtoken";

export async function generateToken(userId: string) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
}