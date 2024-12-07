"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useSocialCallbackMutation } from "@/hooks/mutations/social-callback.mutation";

export default function SocialCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const socialCallbackMutation = useSocialCallbackMutation();

  // Add a local state to track if mutation has been triggered
  const [isTriggered, setIsTriggered] = React.useState(false);

  React.useEffect(() => {
    if (isTriggered) return; // Prevent re-triggering the mutation

    const code = searchParams.get("code");

    // Validate code
    if (!code) {
      toast({
        title: "Error",
        description: "Missing provider or code in URL parameters.",
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }

    // Trigger mutation
    setIsTriggered(true); // Ensure the mutation is called only once
    socialCallbackMutation.mutate(
        { provider: "Google", code },
        {
          onSuccess: () => {
            toast({
              title: "Sign in successful",
              description: "You have been signed in successfully.",
            });
            router.push("/"); // Redirect after successful sign-in
          },
          onError: (error) => {
            toast({
              title: "Sign in failed",
              description: error?.message || "An unexpected error occurred.",
              variant: "destructive", // Show an error toast
            });
            router.push("/sign-in"); // Redirect to sign-in page on error
          },
        }
    );
  }, [searchParams, isTriggered, socialCallbackMutation, router, toast]);

  return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <h1 className="text-lg font-bold">Signing you in...</h1>
          {socialCallbackMutation.isError && <p>There was an error signing in.</p>}
        </div>
      </div>
  );
}
