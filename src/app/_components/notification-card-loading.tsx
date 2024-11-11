import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


export function NotificationCardLoading() {
    return (
        <div className="grid gap-2">
              <Card className="flex flex-row">
                <CardHeader className="w-fit">
                  <div className="relative">
                    <Skeleton className="size-14 rounded-full"></Skeleton>
                    <Skeleton className="absolute -bottom-2 -right-2 size-8 p-2 rounded-full"></Skeleton>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pl-2 w-full px-0 space-y-2">
                  <Skeleton className="h-4 w-72"></Skeleton>
                  <Skeleton className="h-4 w-16"></Skeleton>
                </CardContent>
              </Card>
            </div>
    );
}