import Link from "next/link";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section aria-label="Search">Search Input</section>
      <div>
        <Link href="/search">All</Link>
        <Link href="/search/posts">Posts</Link>
        <Link href="/search/users">Users</Link>
        <Link href="/search/groups">Groups</Link>
        <Link href="/search/fanpages">Fanpages</Link>
      </div>
      Search Filters
      {children}
    </>
  );
}
