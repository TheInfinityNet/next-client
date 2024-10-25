import Link from "next/link";

export default function GroupsPage() {
  return (
    <>
      <h1>Groups</h1>
      <p>Here are your groups.</p>

      <Link href="/groups/1">Group 1</Link>
    </>
  );
}
