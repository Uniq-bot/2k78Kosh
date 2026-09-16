"use client";

import { loginaction } from "@/functions/auth.action";
import { useMutation } from "@tanstack/react-query";

type LoginCredentials = {
  email: string;
  password: string;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return await loginaction(
        credentials.email,
        credentials.password
      );

    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};