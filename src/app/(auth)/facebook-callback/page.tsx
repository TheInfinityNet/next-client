"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useSocialCallbackMutation } from "@/hooks/mutations/social-callback.mutation";
import React from "react";

export default function SocialCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const socialCallbackMutation = useSocialCallbackMutation();

  React.useEffect(() => {
    const code = searchParams.get("code");

    // Validate provider and code
    if (!code) {
      toast({
        title: "Error",
        description: "Missing provider or code in URL parameters.",
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }

    // Call mutation
    socialCallbackMutation.mutate(
        { provider: "Facebook", code },
        {
          onSuccess: () => {
            toast({
              title: "Sign in successful",
              description: "You have been signed in successfully.",
            });
            router.push("/");  // Redirect after successful sign-in
          },
          onError: (error) => {
            toast({
              title: "Sign in failed",
              description: error?.message || "An unexpected error occurred.",
              variant: "destructive",  // Show an error toast
            });
            router.push("/sign-in");  // Redirect to sign-in page on error
          },
        }
    );
  }, [searchParams, socialCallbackMutation, router, toast]);

  // Optionally, you can display loading state while mutation is in progress
  const { isError } = socialCallbackMutation;

  return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <h1 className="text-lg font-bold">Signing you in...</h1>
          {isError && <p>There was an error signing in.</p>}
        </div>
      </div>
  );
}

