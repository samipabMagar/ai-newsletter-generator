"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const supabase = createClient();
  const router = useRouter();

  const handleAuth = async (data: FormData) => {
    const { email, password } = data;
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          throw error;
        }
        setMessage(
          "Account created! Please check your email to verify your account.",
        );
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          throw error;
        }
        router.push("/dashboard");
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#eef4ff_0%,#ffffff_55%,#f7f8fb_100%)] px-4 py-12 text-foreground">
      <div className="w-full max-w-md rounded-3xl border border-surface-strong bg-white/90 p-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] backdrop-blur">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            {isSignUp ? "Create account" : "Sign in"}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {isSignUp
              ? "Start your personalized newsletter journey."
              : "Use your email and password to continue."}
          </p>
          {message && (
            <div
              role="status"
              aria-live="polite"
              className="mt-4 rounded-xl border border-surface-strong bg-surface px-4 py-3 text-sm text-foreground"
            >
              {message}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(handleAuth)} className="mt-8 grid gap-5">
          <label
            className="grid gap-2 text-sm font-semibold text-foreground"
            htmlFor="email"
          >
            Email address
            <input
              type="email"
              required
              id="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required!" })}
              className="h-11 rounded-xl border border-surface-strong bg-white px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/40"
            />
          </label>

          <label
            className="grid gap-2 text-sm font-semibold text-foreground"
            htmlFor="password"
          >
            Password
            <input
              type="password"
              required
              {...register("password", { required: "Password is required!" })}
              id="password"
              placeholder="••••••••"
              className="h-11 rounded-xl border border-surface-strong bg-white px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/40"
            />
          </label>

          <button
            type="submit"
            className="group inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-primary-strong cursor-pointer focus:outline-none focus:ring-4 focus:ring-ring/50"
          >
            {isSignUp ? "Create account" : "Sign in"}
            <span className="ml-2 transition group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-semibold cursor-pointer text-primary transition hover:text-primary-strong"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
