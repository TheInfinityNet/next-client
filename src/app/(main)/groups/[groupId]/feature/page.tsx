'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FileIcon, Lock, Eye, ThumbsUpIcon, MessageCircleIcon, ShareIcon, SmileIcon, Smile, Camera, Sticker, ImagePlay, Drama } from "lucide-react"
// import { Progress } from "@/components/ui/progress"

export default function Component() {
    return (
        <div className="flex gap-4 mx-12">
            {/* Cột trái - Bài đăng */}
            <div className="flex-1">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-2 mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-1/456620114_10162147216418470_1234372403684650738_n.jpg?stp=cp0_dst-jpg_s40x40&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGFUQD5zgwFCNiAgrtsBX4uYb3ru9iasyZhveu72JqzJuESYFUYMHxrCVQQU304MflYzoQZ2tC83lFbG4_lFHxx&_nc_ohc=80YPNx_athIQ7kNvgFopQ35&_nc_zt=24&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=AeSVUTaf-wI_fNI6Z85GE8c&oh=00_AYBYr-ZwFCbkOPHWsypAamY5FyfZtbdnGBWvKuwoXHzmdw&oe=673680CA" />
                                        <AvatarFallback>NM</AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold">Nguyet Minh Phan</span>
                                    <span className="text-sm bg-sky-100 text-sky-700 p-2 rounded">Admin</span>
                                    <span className="text-sm text-muted-foreground">• September 25</span>
                                </div>
                                <p className="mt-2">
                                    Do có bận việc, nên các bạn lớp sáng thứ 5, sáng mai 26/9 sẽ nghỉ học nhé.
                                    Lịch bù có dự kiến trong các buổi sau, các em check vào tất cả các buổi mình có thể học được để có báo bù nha.
                                </p>

                                <div className="space-y-4 mt-4">
                                    <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-lg">
                                        <Checkbox id="buoi1" />
                                        <label htmlFor="buoi1" className="flex-1">Bù chiều thứ 2</label>
                                        {/* <Progress value={27} className="w-32" /> */}
                                        <span className="text-sm">27%</span>
                                    </div>

                                    <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-lg">
                                        <Checkbox id="buoi2" />
                                        <label htmlFor="buoi2" className="flex-1">Bù sáng thứ 3</label>
                                        {/* <Progress value={46} className="w-32" /> */}
                                        <span className="text-sm">46%</span>
                                    </div>

                                    <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-lg">
                                        <Checkbox id="buoi3" />
                                        <label htmlFor="buoi3" className="flex-1">Bù sáng thứ 7</label>
                                        {/* <Progress value={27} className="w-32" /> */}
                                        <span className="text-sm">27%</span>
                                    </div>
                                </div>

                                <div className="flex w-full justify-between">
                                    <div className="flex gap-x-2">
                                        <div className="flex">
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button
                                                        variant={"ghost"}
                                                        className="size-6 bg-yellow-500 border-background border-2 border-solid rounded-full p-0 h-fit"
                                                    >

                                                    </Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent>
                                                    <ul>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>and 733 more…</li>
                                                    </ul>
                                                </HoverCardContent>
                                            </HoverCard>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button
                                                        variant={"ghost"}
                                                        className="size-6 bg-yellow-500 border-background border-2 border-solid rounded-full -ml-2 p-0 h-fit"
                                                    >

                                                    </Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent>
                                                    <ul>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>and 733 more…</li>
                                                    </ul>
                                                </HoverCardContent>
                                            </HoverCard>

                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button
                                                        variant={"ghost"}
                                                        className="size-6 bg-yellow-500 border-background border-2 border-solid rounded-full -ml-2 p-0 h-fit"
                                                    >
                                                        <SmileIcon />
                                                    </Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent>
                                                    <ul>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>Nguyen Minh Tuan</li>
                                                        <li>and 733 more…</li>
                                                    </ul>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Button variant={"link"} className="p-0 h-fit">
                                                    999
                                                </Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent>
                                                <ul>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>and 733 more…</li>
                                                </ul>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </div>
                                    <div className="space-x-2">
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Button variant={"link"} className="p-0 h-fit">
                                                    18 comments
                                                </Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent>
                                                <ul>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>and 733 more…</li>
                                                </ul>
                                            </HoverCardContent>
                                        </HoverCard>
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Button variant={"link"} className="p-0 h-fit">
                                                    300 Shares
                                                </Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent>
                                                <ul>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>Nguyen Minh Tuan</li>
                                                    <li>and 733 more…</li>
                                                </ul>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </div>
                                </div>

                                <div className="flex w-full gap-x-2 border-y-muted-foreground border-y py-1">
                                    <Button className="w-full" variant={"ghost"}>
                                        <ThumbsUpIcon />
                                        Like
                                    </Button>
                                    <Button className="w-full" variant={"ghost"}>
                                        <MessageCircleIcon />
                                        Comment
                                    </Button>
                                    <Button className="w-full" variant={"ghost"}>
                                        <ShareIcon />
                                        Share
                                    </Button>
                                </div>

                                <div className="w-full flex gap-x-1 mt-3">
                                    <div>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex-1 relative">
                                        <Input type="text" placeholder="Comment as Nguyen Minh Tuan" className="rounded-full" />
                                        <div className="absolute top-0 right-0 flex items-center justify-end gap-x-1 h-full mx-2">
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button variant={"ghost"} className="size-6 rounded-full my-auto">
                                                        <Sticker />
                                                    </Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="rounded-xl shadow-md w-fit">
                                                    <div className="text-sm text-muted-foreground">
                                                        comment with avatar sticker
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button variant={"ghost"} className="size-6 rounded-full my-auto">
                                                        <Smile />
                                                    </Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="rounded-xl shadow-md w-fit">
                                                    <div className="text-sm text-muted-foreground">
                                                        comment with emote
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button variant={"ghost"} className="size-6 rounded-full my-auto">
                                                        <Camera />
                                                    </Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="rounded-xl shadow-md w-fit">
                                                    <div className="text-sm text-muted-foreground">
                                                        comment with photo or video
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>

                                                    <Button variant={"ghost"} className="size-6 rounded-full my-auto">
                                                        <ImagePlay />
                                                    </Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="rounded-xl shadow-md w-fit">
                                                    <div className="text-sm text-muted-foreground">
                                                        comment with gif file
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button variant={"ghost"} className="size-6 rounded-full my-auto">
                                                        <Drama />
                                                    </Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="rounded-xl shadow-md w-fit">
                                                    <div className="text-sm text-muted-foreground">
                                                        comment with sticker
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Cột phải - Thông tin */}
            <div className="w-80 space-y-4">
                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-semibold">About</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            <div>
                                <div className="font-semibold">Private</div>
                                <div className="text-sm text-muted-foreground">
                                    Only members can see who's in the group and what they post.
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <div>
                                <div className="font-semibold">Visible</div>
                                <div className="text-sm text-muted-foreground">
                                    Anyone can find this group.
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Recent files</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { name: "BÀI TẬP QUÁ TRÌNH 2024.pdf", date: "Wed", type: "PDF" },
                            { name: "BTH6.pdf", date: "Oct 30", type: "PDF" },
                            { name: "BTH5.pdf", date: "Oct 23", type: "PDF" }
                        ].map((file, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <FileIcon className="w-8 h-8 text-red-500" />
                                <div className="flex-1">
                                    <div className="font-medium">{file.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        Uploaded on {file.date} • {file.type}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button variant="secondary" className="w-full">See all</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}