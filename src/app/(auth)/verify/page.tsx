"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSendMailMutation } from "@/lib/api/apis/send-mail.api";
import { useVerifyEmailMutation } from "@/lib/api/apis/verify-email.api";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().optional(),
});

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const sendMailMutation = useSendMailMutation();
  const verifyEmailMutation = useVerifyEmailMutation();

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
      code: "",
    },
  });

  const handleSendVerificationEmail = () => {
    const email = form.getValues("email");

    if (!email) {
      form.setError("email", { message: "Email is required" });
      return;
    }

    sendMailMutation.mutate(
      { email },
      {
        onSuccess: (response) => {
          toast({
            title: "Verification email sent",
            description: response.message,
          });
          setCountdown(response.retryAfter);
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to send verification email. Please try again.",
            variant: "destructive",
          });
        },
      },
    );
  };

  const handleVerifyEmail = (data: { email: string; code: string }) => {
    if (!data.code) {
      form.setError("code", {
        message: "Verification code is required",
      });
      return;
    }

    verifyEmailMutation.mutate(data, {
      onSuccess: (response) => {
        toast({
          title: "Email verified",
          description: response.message,
        });
        router.push("/sign-in");
      },
      onError: () => {
        toast({
          title: "Error",
          description:
            "Failed to verify email. Please check your code and try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            Verify your email address to complete your registration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleVerifyEmail)}
              className="space-y-4"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={handleSendVerificationEmail}
                disabled={countdown > 0 || sendMailMutation.isPending}
                className="w-full"
              >
                {countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Send Verification Email"}
              </Button>
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter verification code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={!form.watch("code") || verifyEmailMutation.isPending}
                className="w-full"
              >
                Verify Email
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or request a new
            code.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
