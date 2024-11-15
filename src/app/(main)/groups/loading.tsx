import { Avatar } from "@/components/ui/avatar";
import { Fragment } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Fragment>
      <section aria-label="Profile cover image">
        <AspectRatio ratio={3 / 1}>
          <Skeleton className="w-full h-full" />
        </AspectRatio>
      </section>

      <section
        aria-label="Profile information"
        className="-mt-20 md:-mt-12 mx-2"
      >
        <div className="flex md:items-end z-0 flex-col md:flex-row items-center">
          <Avatar className="size-40">
            <Skeleton className="w-full h-full" />
          </Avatar>

          <div className="md:ml-4 mt-4 flex justify-between w-full gap-4 flex-col md:flex-row">
            <div
              className="flex items-center md:items-start flex-col space-y-1"
              aria-labelledby="user-info"
            >
              <Skeleton className="w-full h-8 md:mt-10 max-w-60" />
              <Skeleton className="font-medium h-6 w-full max-w-40" />
              <Skeleton className="font-medium h-6 w-full max-w-20" />
              <div className="flex mr-2" aria-label="Friend avatars">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-10 w-8">
                    <Avatar className="size-10">
                      <Skeleton className="w-full h-full" />
                    </Avatar>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end items-end mt-auto">
              <Skeleton className="h-10 px-4 py-2 w-fit min-w-32 flex-grow sm:flex-none" />
              <Skeleton className="h-10 px-4 py-2 w-fit min-w-32 flex-grow sm:flex-none" />
              <Skeleton className="h-10 px-4 py-2 min-w-12 w-full sm:w-fit" />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
