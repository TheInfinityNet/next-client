import UserProfileAboutPage from "../_components/user-profile-about-page";

type Props = {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
};
export default async function Layout({ children, params }: Props) {
  const { userId } = await params;
  return (
    <UserProfileAboutPage userId={userId}>{children}</UserProfileAboutPage>
  );
}
