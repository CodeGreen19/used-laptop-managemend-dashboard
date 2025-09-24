"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginButton() {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      await authClient.signIn.social(
        {
          provider: "google",
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
          },
        }
      );
    },
  });

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate()}
      variant={"outline"}
      className="py-6 rounded-4xl px-8"
    >
      <Image alt="google" src="/google.svg" height={30} width={30} />
      Sign In
    </Button>
  );
}
