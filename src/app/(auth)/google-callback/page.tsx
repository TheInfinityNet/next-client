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

  React.useEffect(() => {
    const code = searchParams.get("code");

    // Kiểm tra tham số `code` từ URL
    if (!code) {
      toast({
        title: "Error",
        description: "Missing provider or code in URL parameters.",
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }

    // Gọi mutation để xử lý callback
    socialCallbackMutation.mutate(
        { provider: "Google", code },
        {
          onSuccess: () => {
            toast({
              title: "Sign in successful",
              description: "You have been signed in successfully.",
            });
            router.push("/"); // Chuyển hướng sau khi đăng nhập thành công
          },
          onError: (error) => {
            toast({
              title: "Sign in failed",
              description: error?.message || "An unexpected error occurred.",
              variant: "destructive", // Hiển thị thông báo lỗi
            });
            router.push("/sign-in"); // Chuyển hướng về trang đăng nhập
          },
        }
    );
  }, [searchParams, router, toast, socialCallbackMutation]);

  return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <h1 className="text-lg font-bold">Signing you in...</h1>
          {socialCallbackMutation.isError && <p>There was an error signing in.</p>}
        </div>
      </div>
  );
}
