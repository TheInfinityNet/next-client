"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { mapFieldErrorToFormError } from "@/lib/utils";
import {
  signInRequestSchema,
  SignInRequestSchema,
} from "@/lib/api/schemas/sign-in.schema";
import { useSignInMutation } from "@/hooks/mutations/sign-in.mutation";
import {socialSignInParamsSchema} from "@/lib/api/apis/social-sign-in.api";
import {useSocialSignIn} from "@/hooks/queries/get-social-url.query";
import {useState} from "react";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const signInMutation = useSignInMutation();

  const signInForm = useForm<SignInRequestSchema>({
    resolver: zodResolver(signInRequestSchema),
    defaultValues: {
      email: "the@infinity.net",
      password: "Password@123",
    },
  });

  const onSubmit = signInForm.handleSubmit((values) => {
    signInMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Sign in successful",
          description: "You have been signed in",
        });
        router.push("/");
      },
      onError: (error) => {
        toast({
          title: "Sign in failed",
          description: error.message,
        });
        switch (error.type) {
          case "ValidationError":
            mapFieldErrorToFormError(signInForm.setError, error.errors);
        }
      },
    });
  });

  const [provider, setProvider] = useState<string | null>(null);

  const { data, isLoading, isError } = useSocialSignIn(provider ?? "Google");

  const handleSocialSignIn = (provider: string) => {
    const isValidProvider = ["Google", "Facebook"].includes(provider);

    if (!isValidProvider) {
      toast({
        title: "Invalid provider",
        description: "Please choose a valid provider.",
      });
      return;
    }

    setProvider(provider);

    if (isLoading) {
      toast({
        title: "Signing in",
        description: `Attempting to sign in with ${provider}...`,
      });
    }

    if (isError) {
      toast({
        title: "Sign-in failed",
        description: "Could not sign in. Please try again later.",
      });
    }

    if (data) {
      toast({
        title: "Sign-in successful",
        description: `Redirecting to ${data.url}`,
      });
      window.location.href = data.url;
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md space-y-6">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to sign in or use one of the options
          below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...signInForm}>
          <form onSubmit={onSubmit}>
            <FormField
              control={signInForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@infinity.net" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the email address associated with your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signInForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your password must be at least 8 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-4"
              type="submit"
              disabled={signInMutation.isPending}
            >
              Sign In
            </Button>
          </form>
        </Form>
        <p className="text-sm text-center text-muted-foreground">
          Or sign in with social media
        </p>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSocialSignIn("Google")}
          >
            Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSocialSignIn("Facebook")}
          >
            Facebook
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSocialSignIn("Twitter")}
          >
            Twitter
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/forgot-password" className="text-sm hover:text-primary">
          Forgot Password?
        </Link>
        <p className="text-sm">
          {"Don't have an account? "}
          <Link href="/sign-up" className="hover:text-primary">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
