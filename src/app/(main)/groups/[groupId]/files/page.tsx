'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, MoreHorizontal, Search, FileIcon } from "lucide-react"

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
    <div className="p-6 mx-6">
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
                  <FileIcon className="w-8 h-8 text-red-500" />
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
