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
import {
  FieldValue,
  FieldValues,
  Path,
  useForm,
  UseFormSetError,
} from "react-hook-form";
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
import { useSignInMutation } from "@/hooks/apis/auth";
import { useRouter } from "next/navigation";
import {
  signInRequestSchema,
  SignInRequestSchema,
} from "@/lib/api/schemas/sign-in-request-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { mapFieldErrorToFormError } from "@/lib/utils";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const signInMutation = useSignInMutation();

  const signInForm = useForm<SignInRequestSchema>({
    resolver: zodResolver(signInRequestSchema),
    defaultValues: {
      email: "",
      password: "",
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
          <Button variant="outline" className="w-full">
            Google
          </Button>
          <Button variant="outline" className="w-full">
            Facebook
          </Button>
          <Button variant="outline" className="w-full">
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
