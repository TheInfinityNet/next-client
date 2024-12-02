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
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { mapFieldErrorToFormError } from "@/lib/utils";
import {
  editUserProfileBodySchema,
  EditUserProfileSchema,
} from "@/lib/api/schemas/edit-user-profile.schema";
import { useEditProfileMutation } from "@/hooks/mutations/edit-profile.mutation";
import {
  validationErrorResponseSchema,
  ValidationErrorResponseSchema,
} from "@/lib/api/schemas/error.schema";

import { useSuspenseQuery } from "@tanstack/react-query";
import { createGetUserProfileDetailsQueryOptions } from "@/hooks/queries/get-user-profile-details.query";

type EditUserProfileFormProps = {
  userId: string;
};

export default function EditUserProfileForm({
  userId,
}: EditUserProfileFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const editProfileMutation = useEditProfileMutation();
  const userProfileDetailsQuery = useSuspenseQuery(
    createGetUserProfileDetailsQueryOptions({ userId })
  );

  const editUserProfileForm = useForm<EditUserProfileSchema>({
    resolver: zodResolver(editUserProfileBodySchema),
    defaultValues: {
      ...userProfileDetailsQuery?.data,
      id: userId,
    },
  });

  const onSubmit = editUserProfileForm.handleSubmit((values) => {
    editProfileMutation.mutate(values, {
      onSuccess: (data) => {
        toast({
          title: "Profile updated",
          description: data.message,
        });
        router.push(`/users/${data.user.id}`);
      },
      onError: (error) => {
        toast({
          title: "Updated failed",
          description: error.message,
        });
        switch (error.type) {
          case "ValidationError":
            mapFieldErrorToFormError(
              editUserProfileForm.setError,
              error.errors
            );
        }
      },
    });
  });

  return (
    <Card className="w-full mx-2 space-y-6" id="edit-form">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your profile information below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...editUserProfileForm}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={editUserProfileForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editUserProfileForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editUserProfileForm.control}
              name="lastName"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                          <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
              control={editUserProfileForm.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Mobile Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editUserProfileForm.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birthdate</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Birthdate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editUserProfileForm.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder="Gender" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editUserProfileForm.control}
              name="birthdate"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Birth date</FormLabel>
                      <FormControl>
                          <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
              )}
            />
            <CardFooter className="flex justify-between">
              <Button
                className="mt-4"
                type="button"
                onClick={() => router.back()} // Assuming you want to navigate back on discard
              >
                Discard
              </Button>
              <Button
                className="mt-4"
                type="submit"
                disabled={editProfileMutation.isPending}
              >
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
