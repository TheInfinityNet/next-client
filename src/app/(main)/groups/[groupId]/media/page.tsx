import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload } from "lucide-react"

export default function Component() {
  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Media</h1>
          <div className="flex gap-3">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Create album
            </Button>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-600">
              <Upload className="h-4 w-4 mr-2" />
              Add photo/video
            </Button>
          </div>
        </div>

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="border-b border-gray-200 w-full justify-start rounded-none bg-transparent">
            <TabsTrigger
              value="photos"
              className="text-gray-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
            >
              Photos
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="text-gray-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="albums"
              className="text-gray-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
            >
              Albums
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-square relative rounded-lg overflow-hidden group hover:ring-2 hover:ring-blue-400 transition-all"
            >
              <Image
                src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/278933905_10160414487873470_1903206849978245354_n.jpg?stp=dst-jpg_s160x160&_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEVktAIBpe9ZQP_gRO5bWTChJgff8xRvaqEmB9_zFG9qjRzujqESOutAdl5a8mxz0EJvowv61I3sxByRZI7xiSK&_nc_ohc=h5Be9UnFUbQQ7kNvgG5MeaD&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=AdOyBKxaKZN9kK5W6MRpYZC&oh=00_AYB6Sk_ZWvi89xjz_j2rHiM6-bdV0PtHiwHJlb5RxLRyNg&oe=6736A4D4"
                alt={`Gallery image ${i + 1}`}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}