"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/utils/supabaseClient";

export function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    const { error } = await supabase.from("subscriptions").upsert([{ email }]);

    if (error) {
      console.error("Error subscribing:", error.message);
      setLoading(false);
      return;
    }

    // Redirect after successful submission
    router.push("/generate");
  };

  return (
    <section className="bg-gradient-to-r from-gray-900 to-black text-white py-24">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Email Template Generator
        </h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Create stunning email templates in seconds with the power of AI
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-64 bg-white/10 border-white/20 text-white placeholder-gray-400"
            required
          />
          <Button
            type="submit"
            className="bg-white text-black hover:bg-gray-200"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Get Started"}
          </Button>
        </form>
      </div>
    </section>
  );
}
