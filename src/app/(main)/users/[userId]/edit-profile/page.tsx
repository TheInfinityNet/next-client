import EditUserProfileForm from "@/components/EditUserProfileForm";

type EditUserProfileFormProps = {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
};

export default function EditProfilePage({ params }: EditUserProfileFormProps) {
  const { userId } = await params;
  return <EditUserProfileForm userId={userId} />;
}
