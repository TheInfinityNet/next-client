'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, MoreHorizontal, Search } from "lucide-react"

const files = [
  { name: "BÀI TẬP QUÁ TRÌNH 2024.pdf", type: "PDF", lastModified: "November 6, 2024, 1:23 PM", author: "Nguyet Minh Phan" },
  { name: "BTH6.pdf", type: "PDF", lastModified: "October 30, 2024, 1:48 PM", author: "Nguyet Minh Phan" },
  { name: "BTH5.pdf", type: "PDF", lastModified: "October 23, 2024, 2:02 PM", author: "Nguyet Minh Phan" },
  { name: "BTH4.pdf", type: "PDF", lastModified: "October 18, 2024, 1:39 PM", author: "Nguyet Minh Phan" },
  { name: "B6.pdf", type: "PDF", lastModified: "October 18, 2024, 1:29 PM", author: "Nguyet Minh Phan" },
  { name: "Cai dat va su dung Android Studio.pdf", type: "PDF", lastModified: "October 10, 2024, 8:47 AM", author: "Nguyet Minh Phan" },
  { name: "BTH3.pdf", type: "PDF", lastModified: "October 9, 2024, 1:36 PM", author: "Nguyet Minh Phan" },
]

export default function FileManager() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')

  const sortedFiles = [...files].sort((a, b) => {
    return sortOrder === 'asc' 
      ? new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
      : new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  })

  const filteredFiles = sortedFiles.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Files</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Upload file</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">File name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">
              <Button 
                variant="ghost" 
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                Last modified
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              </Button>
            </TableHead>
            <TableHead className="w-[48px]"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredFiles.map((file, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <svg className="w-8 h-8 mr-2 text-red-500" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"/>
                  </svg>
                  {file.name}
                </div>
              </TableCell>
              <TableCell>{file.type}</TableCell>
              <TableCell className="text-right">
                {file.lastModified}
                <br />
                <span className="text-sm text-muted-foreground">by {file.author}</span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>See original post</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
