import EditUserProfileForm from "../_components/edit-user-profile-form";

type EditUserProfileFormProps = {
  params: { userId: string };
};

export default async function EditProfilePage({
  params,
}: EditUserProfileFormProps) {
  const { userId } = params;
  return <EditUserProfileForm userId={userId} />;
}
