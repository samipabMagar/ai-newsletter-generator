"use client";
import { useState } from "react";

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

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
        </div>

        <form className="mt-8 grid gap-5">
          <label
            className="grid gap-2 text-sm font-semibold text-foreground"
            htmlFor="email"
          >
            Email address
            <input
              type="email"
              name="email"
              required
              id="email"
              placeholder="you@example.com"
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
              name="password"
              required
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
