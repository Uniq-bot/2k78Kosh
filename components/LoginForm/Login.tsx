"use client";

import { useLogin } from "@/mutations/auth.mutation";
import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const Login = () => {
    const navigate= useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {
    mutateAsync: login,
    isPending,
    isError,
    error,
    isSuccess
  } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   const res= await login({
      email: user.email,
      password: user.password,
    });

    if(res){
        navigate.push("/dashboard")
    }
  };

  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md  bg-white p-8  border border-zinc-200"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Login to 2k78kosh
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Welcome back! Enter your details to continue.
          </p>
        </div>

        {/* Error */}
        {isError && (
          <div className="mb-5  border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Invalid email or password"}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              required
              className="w-full  border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700"
            >
              Password
            </label>

            <button
              type="button"
              className="text-xs font-medium text-zinc-500 transition hover:text-zinc-900"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              required
              className="w-full  border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full  bg-zinc-900 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

      </form>
    </main>
  );
};

export default Login;