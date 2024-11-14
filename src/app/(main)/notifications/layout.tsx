import { CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NotificationsLayout({
  allNotifications,
  mention,
  unread,
}: {
  allNotifications: React.ReactNode;
  mention: React.ReactNode;
  unread: React.ReactNode;
}) {
  return (
    <>
      <section aria-label="Notification section" className="mt-6 mx-2">
        <CardTitle>Notifications</CardTitle>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3 mt-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mentions">Mention</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          <TabsContent value="all">{allNotifications}</TabsContent>
          <TabsContent value="mentions">{mention}</TabsContent>
          <TabsContent value="unread">{unread}</TabsContent>
        </Tabs>
      </section>
    </>
  );
}
