import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronsUpIcon,
  PenIcon,
  PlusIcon,
  UserPlusIcon,
  XIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Fragment } from "react";

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <section aria-labelledby="profile-section">
        <div>
          <div className="aspect-[3/1] w-full">
            <Image
              className="object-cover w-full h-full -z-10"
              src="https://github.com/shadcn.png"
              width={600}
              height={200}
              alt="Profile cover image"
            />
          </div>
          <div className="flex md:items-end z-0 flex-col md:flex-row items-center -mt-20 md:-mt-12">
            <Avatar className="size-40">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Nguyen Minh Tuan avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="md:ml-4 mt-4 flex justify-between w-full gap-4 flex-col md:flex-row">
              <div
                className="flex items-center md:items-start flex-col space-y-2"
                aria-labelledby="user-info"
              >
                <div
                  className="text-3xl md:mt-8 text-center md:text-start"
                  id="user-info"
                >
                  <span
                    style={{
                      wordBreak: "break-word",
                    }}
                    className="font-bold"
                  >
                    Nguyen Minh Tuan
                  </span>{" "}
                  <span
                    className="font-medium"
                    style={{
                      wordBreak: "break-word",
                    }}
                  >
                    (Tauran Mason)
                  </span>
                </div>
                <div className="font-bold" aria-label="Friends count">
                  60 friends
                </div>
                <div className="flex mr-2" aria-label="Friend avatars">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="h-10 w-8">
                      <Avatar className="size-10">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt={`Friend ${index + 1} avatar`}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-end items-end mt-auto">
                <Button
                  variant={"default"}
                  className="flex-grow sm:flex-none"
                  aria-label="Add to post"
                >
                  <PlusIcon /> Add to Post
                </Button>
                <Button
                  variant={"secondary"}
                  className="flex-grow sm:flex-none"
                  aria-label="Edit profile"
                >
                  <PenIcon /> Edit Profile
                </Button>
                <Button
                  variant={"secondary"}
                  className="w-full sm:w-fit"
                  aria-label="Hide friends suggestion"
                >
                  <ChevronsUpIcon />
                  <span className="sr-only">Hide friends suggestion</span>
                </Button>
              </div>
            </div>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex justify-between">
                People you may know
                <Button
                  variant={"link"}
                  asChild
                  className="p-0 h-fit font-semibold justify-end"
                >
                  <Link href="/friends/suggestions">See all</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full"
                orientation="horizontal"
              >
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-3/5 min-[480px]:basis-2/5 md:basis-[calc(100%/3.5)]"
                    >
                      <Card>
                        <CardHeader className="aspect-square p-0 relative">
                          <Avatar className="w-full h-full rounded-none object-fill">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="Nguyen Minh Tuan avatar"
                            />
                            <AvatarFallback className="rounded-none">
                              CN
                            </AvatarFallback>
                          </Avatar>

                          <Button
                            className="absolute top-0 right-0 bg-accent-foreground/10 hover:bg-accent-foreground/20 rounded-full"
                            variant={"ghost"}
                            size={"icon"}
                          >
                            <XIcon />
                          </Button>
                        </CardHeader>
                        <CardContent className="p-2">
                          <div className="font-bold my-1">Nguyen Minh Tuan</div>
                          <div className="flex my-1 h-6">
                            <Avatar className="size-6">
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="Nguyen Minh Tuan avatar"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="ml-2">6 mutual friends</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-2">
                          <Button
                            variant={"secondary"}
                            className="w-full"
                            aria-label="Add friend"
                          >
                            <UserPlusIcon />
                            Add friend
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 -translate-x-1/2" />
                <CarouselNext className="right-0 translate-x-1/2" />
              </Carousel>
            </CardContent>
          </Card>
        </div>
      </section>

      {children}
    </Fragment>
  );
}
