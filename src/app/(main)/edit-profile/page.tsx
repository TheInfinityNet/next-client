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
  editUserProfileSchema,
  EditUserProfileSchema,
} from "@/lib/api/schemas/edit-user-profile.schema";
import { useEditProfileMutation } from "@/hooks/mutations/edit-profile.mutation";
import {
  validationErrorResponseSchema,
  ValidationErrorResponseSchema,
} from "@/lib/api/schemas/error.schema";

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const editProfileMutation = useEditProfileMutation();

  const editProfileForm = useForm<EditUserProfileSchema>({
    resolver: zodResolver(editUserProfileSchema),
    defaultValues: {
      id: "",
      accountId: "",
      email: "",
      username: "",
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
      birthdate: "",
      gender: "",
      status: "Active",
    },
  });

  const onSubmit = editProfileForm.handleSubmit((values) => {
    editProfileMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
        router.push("/profile");
      },
      onError: (error) => {
        toast({
          title: "Update failed",
          description: error.message,
        });

        const parsedError = validationErrorResponseSchema.safeParse(error);
        if (parsedError.success) {
          mapFieldErrorToFormError(
            editProfileForm.setError,
            parsedError.data.errors
          );
        } else {
          console.error("Unexpected error:", error);
        }
      },
    });
  });

  return (
    <Card className="mx-auto w-full max-w-md space-y-6">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your profile information below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...editProfileForm}>
          <form onSubmit={onSubmit}>
            <FormField
              control={editProfileForm.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input placeholder="ID" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Account ID" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
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
              control={editProfileForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Middle Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
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
              control={editProfileForm.control}
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
              control={editProfileForm.control}
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
              control={editProfileForm.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Status" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-4"
              type="submit"
              disabled={editProfileMutation.isPending}
            >
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
