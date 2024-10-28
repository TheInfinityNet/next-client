import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSuggestionCardLoading() {
  return (
    <Card aria-label="Profile card">
      <CardHeader className="aspect-square p-0 relative">
        <Skeleton className="w-full h-full object-fill" />
      </CardHeader>
      <CardContent className="p-2">
        <Skeleton className="w-full h-6 my-1" />
        <Skeleton className="w-full my-1 h-6" />
      </CardContent>
      <CardFooter className="p-2">
        <Skeleton className="w-full h-10" />
      </CardFooter>
    </Card>
  );
}
