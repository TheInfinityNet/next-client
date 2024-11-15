"use client"

import { Fragment, ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Lock, BellRing, Pin, MoreHorizontal, Share2, UserX, TicketXIcon, UserMinus, MessageSquareCode, MessageSquareWarning, SearchIcon, Share2Icon, Group } from "lucide-react"
import Link from "next/link"
import { useQuery } from '@tanstack/react-query'
import { GroupCoverPhoto } from "@/app/_components/group-cover-photo";
import { createGetGroupProfileQueryOptions } from "@/hooks/queries/get-group-profile.query"

type GroupProfileLayoutProps = {
  children: ReactNode;
  groupId: string;
}

export function GroupProfileLayout({ children, groupId }: GroupProfileLayoutProps) {
  const { data: groupProfile, isLoading, error } = useQuery(createGetGroupProfileQueryOptions({ groupId }))

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading group profile...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen">Error loading group profile. Please try again later.</div>
  }

  if (!groupProfile) {
    return <div className="flex items-center justify-center h-screen">Group profile not found.</div>
  }

  return (
    <Fragment>
      <GroupCoverPhoto groupId={groupId} url={groupProfile.coverImage?.url} />
      <section className="mt-2 mx-2" aria-label="Profile navigation">
        <Card className="rounded-none border-0 shadow-none">
          <CardContent className="p-0">
            <div className="space-y-4 mx-8">
              <div className="px-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Button variant="link" className="text-2xl font-bold p-0">{groupProfile.name}</Button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>{groupProfile.visibility}</span>
                      <span>•</span>
                      <Button variant="link" className="text-sm p-0">{groupProfile.membersCount} thành viên</Button>
                    </div>
                  </div>
                </div>

                <Card className="border-0 shadow-none">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {groupProfile.members.slice(0, 9).map((member) => (
                        <Avatar key={member.id} className="h-8 w-8 border">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button className="bg-[#0866ff] hover:bg-[#0866ff]/90 text-white">
                        + Mời
                      </Button>
                      <Button variant="secondary">
                        <Share2 className="h-4 w-4 mr-2" />
                        Chia sẻ
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary">
                            Đã tham gia
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <Link href={`/groups/${groupId}/notifications`}>
                              <BellRing className="mr-2 h-4 w-4" />
                              Quản lý thông báo
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/groups/${groupId}/unfollow`}>
                              <UserX className="mr-2 h-4 w-4" />
                              Bỏ theo dõi nhóm
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/groups/${groupId}/leave`}>
                              <TicketXIcon className="mr-2 h-4 w-4" />
                              Rời nhóm
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="border-0 shadow-none">
                  <hr />
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <Button className="text-muted-foreground" size={"sm"} variant={"ghost"} asChild>
                        <Link href={`/groups/${groupId}/about`}>
                          About
                        </Link>
                      </Button>
                      <Button className="text-muted-foreground" size={"sm"} variant={"ghost"} asChild>
                        <Link href={`/groups/${groupId}`}>
                          Discussion
                        </Link>
                      </Button>
                      <Button className="text-muted-foreground" size={"sm"} variant={"ghost"} asChild>
                        <Link href={`/groups/${groupId}/feature`}>
                          Featured
                        </Link>
                      </Button>
                      <Button className="text-muted-foreground" size={"sm"} variant={"ghost"} asChild>
                        <Link href={`/groups/${groupId}/members`}>
                          Members
                        </Link>
                      </Button>
                      <Button className="text-muted-foreground" size={"sm"} variant={"ghost"} asChild>
                        <Link href={`/groups/${groupId}/events`}>
                          Events
                        </Link>
                      </Button>
                      <Button className="text-muted-foreground" size={"sm"} variant={"ghost"} asChild>
                        <Link href={`/groups/${groupId}/media`}>
                          Media
                        </Link>
                      </Button>
                      <Button className="text-muted-foreground" size={"sm"} variant={"ghost"} asChild>
                        <Link href={`/groups/${groupId}/files`}>
                          Files
                        </Link>
                      </Button>
                    </div>

                    <div className="flex">
                      <Button variant="ghost" size="icon">
                        <SearchIcon />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <Link href={`/groups/${groupId}/member-requests`}>
                              <UserMinus className="mr-2 h-4 w-4" />
                              Xem yêu cầu làm thành viên
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/groups/${groupId}/my-content`}>
                              <MessageSquareCode className="mr-2 h-4 w-4" />
                              Nội dung của bạn
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/groups/${groupId}/share`}>
                              <Share2Icon className="mr-2 h-4 w-4" />
                              Chia sẻ
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/groups/${groupId}/notifications`}>
                              <BellRing className="mr-2 h-4 w-4" />
                              Quản lý thông báo
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/groups/${groupId}/pin`}>
                              <Pin className="mr-2 h-4 w-4" />
                              Ghim nhóm
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/groups/${groupId}/report`}>
                              <MessageSquareWarning className="mr-2 h-4 w-4" />
                              Báo cáo nhóm
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <hr />
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {children}
    </Fragment >
  )
}
