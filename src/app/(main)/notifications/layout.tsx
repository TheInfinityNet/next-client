import Link from "next/link";

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section aria-label="Notifications">Notifications</section>
      <section>
        <Link href="/notifications">All</Link>
        <Link href="/notifications/unread">Unread</Link>
        <Link href="/notifications/mentions">Mentions</Link>
      </section>

      {children}
    </>
  );
}
