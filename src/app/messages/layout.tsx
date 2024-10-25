export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Messages</h1>
      {children}
    </>
  );
}
