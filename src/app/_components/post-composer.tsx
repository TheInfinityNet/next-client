"use client";

import {
  createPostBodySchema,
  CreatePostBodySchema,
  useCreatePostMutation,
} from "@/lib/api/apis/create-post.api";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,

} from "@/components/ui/command";
import { Image, Video, Users, MapPin, TagIcon, X } from "lucide-react";
import { useUploadPhotoMutation } from "@/lib/api/apis/upload-photo.api";
import { useUploadVideoMutation } from "@/lib/api/apis/upload-video.api";
import { useUploadFileMutation } from "@/lib/api/apis/upload-file.api";
import {toast} from "@/hooks/use-toast";
import {mapFieldErrorToFormError} from "@/lib/utils";
import {useCurrentProfileActions} from "@/hooks/use-current-profile-store";

export function PostComposer() {
  const photoUploadButtonRef = useRef<HTMLInputElement>(null);
  const videoUploadButtonRef = useRef<HTMLInputElement>(null);
  const uploadPhotoMutation = useUploadPhotoMutation();
  const uploadVideoMutation = useUploadVideoMutation();
  const uploadFileMutation = useUploadFileMutation();
  const [mediaUrls, setMediaUrls] = useState<
    Record<
      string,
      {
        url: string;
        type: "Photo" | "Video" | "File";
      }
    >
  >({});

  const createPostMutation = useCreatePostMutation();

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<CreatePostBodySchema>({
    resolver: zodResolver(createPostBodySchema),
    defaultValues: {
      content: { text: "", facets: [] },
      audience: {
        type: "Public",
      },
      type: "Text",
    },
  });

  console.log(errors);

  const onSubmit = (data: CreatePostBodySchema) =>
    createPostMutation.mutate(data, {
      onSuccess: () => {
        setValue("content.text", "");
        setValue("aggregates", []);
        setMediaUrls({});
        toast({
          title: "Create post succeeded"
        });
      },
      onError: (error) => {
        toast({
          title: "Create post failed",
          description: error.message,
        });
        switch (error.type) {
          case "ValidationError":
            mapFieldErrorToFormError(setError, error.errors);
        }
      },
    });

  const handleMediaChange = (
    type: "Photo" | "Video" | "File",
    id: string,
    url: string,
  ) => {
    const currentMedia = watch("aggregates") || [];

    if (currentMedia.length === 0) {
      const photoId = watch("photoId");
      const videoId = watch("videoId");
      if (videoId) {
        currentMedia.push({
          type: "Video",
          videoId,
          content: { text: "", facets: [] },
          audience: {
            type: "Public",
          },
        });
      }
      if (photoId) {
        currentMedia.push({
          type: "Photo",
          photoId,
          content: { text: "", facets: [] },
          audience: {
            type: "Public",
          },
        });
      }
    }

    setMediaUrls((prev) => ({ ...prev, [id]: { url, type } }));

    if (currentMedia.length === 0 || type === "File") {
      switch (type) {
        case "Photo":
          setValue("type", "Photo");
          setValue("photoId", id);
          break;
        case "Video":
          setValue("type", "Video");
          setValue("videoId", id);
          break;
        case "File":
          setValue("type", "File");
          setValue("fileId", id);
          break;
      }
      return;
    }

    const updatedMedia: typeof currentMedia = [
      ...currentMedia,
      ...(type === "Photo"
        ? [
            {
              type: "Photo" as const,
              photoId: id,
              content: { text: "", facets: [] },
              audience: {
                type: "Public" as const,
              },
            },
          ]
        : []),
      ...(type === "Video"
        ? [
            {
              type: "Video" as const,
              videoId: id,
              content: { text: "", facets: [] },
              audience: {
                type: "Public" as const,
              },
            },
          ]
        : []),
    ];

    if (updatedMedia.length === 1) {
      const singleMedia = updatedMedia[0];
      setValue("type", singleMedia.type);
      if (singleMedia.type === "Photo" && singleMedia.photoId) {
        setValue("photoId", singleMedia.photoId);
      } else if (singleMedia.type === "Video" && singleMedia.videoId) {
        setValue("videoId", singleMedia.videoId);
      }
      setValue("aggregates", []);
    } else if (updatedMedia.length > 1) {
      setValue("type", "MultiMedia");
      setValue("aggregates", updatedMedia);
    }
  };

  const handleRemoveMedia = (id: string) => {
    const currentMedia = watch("aggregates") || [];

    setMediaUrls((prev) => {
      const updatedUrls = { ...prev };
      delete updatedUrls[id];
      return updatedUrls;
    });

    const updatedMedia = currentMedia.filter(
      (media) =>
        (media.type === "Photo" && media.photoId !== id) ||
        (media.type === "Video" && media.videoId !== id),
    );

    if (updatedMedia.length === 0) {
      setValue("type", "Text");
      setValue("aggregates", []);
    } else if (updatedMedia.length === 1) {
      const singleMedia = updatedMedia[0];
      setValue("type", singleMedia.type);
      if (singleMedia.type === "Photo" && singleMedia.photoId) {
        setValue("photoId", singleMedia.photoId);
      } else if (singleMedia.type === "Video" && singleMedia.videoId) {
        setValue("videoId", singleMedia.videoId);
      }
      setValue("aggregates", []);
    } else {
      setValue("type", "MultiMedia");
      setValue("aggregates", updatedMedia);
    }
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (file.type.startsWith("image/")) {
        uploadPhotoMutation.mutate(
          { photo: file },
          {
            onSuccess: (data) => {
              handleMediaChange("Photo", data.id, data.url);
            },
            onError: (error) => {},
          },
        );
      } else if (file.type.startsWith("video/")) {
        uploadVideoMutation.mutate(
          { video: file },
          {
            onSuccess: (data) => {
              handleMediaChange("Video", data.id, data.url);
            },
            onError: (error) => {},
          },
        );
      } else {
        uploadFileMutation.mutate(
          { file },
          {
            onSuccess: (data) => {
              handleMediaChange("File", data.id, data.url);
            },
            onError: (error) => {},
          },
        );
      }
    });
  };

  const handleUpdateMediaCaption = (id: string, caption: string) => {
    const currentMedia = watch("aggregates") || [];

    const updatedMedia = currentMedia.map((media) => {
      if (
          (media.type === "Photo" && media.photoId === id) ||
          (media.type === "Video" && media.videoId === id)
      ) {
        return {
          ...media,
          content: {
            ...media.content,
            text: caption,
            facets: media.content?.facets || [], // Đảm bảo facets không undefined
          },
        };
      }
      return media;
    });

    setValue("aggregates", updatedMedia, { shouldDirty: true });
  };

  const handleTagFriend = (friendId: string) => {};

  const handleRemoveTag = (friendId: string) => {};

  const currentProfile = useCurrentProfileActions().getCurrentProfile();

  return (
      <Card className="w-full overflow-hidden">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Phần nhập nội dung bài viết */}
            <div className="flex items-start space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={currentProfile?.avatar?.url} alt="@shadcn" />
                <AvatarFallback>{currentProfile?.name ?? "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <Controller
                    name="content.text"
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            placeholder="What's on your mind?"
                            className="w-full min-h-[100px] text-lg border-none resize-none focus:ring-0"
                        />
                    )}
                />
              </div>
            </div>

            {/* Phần chọn media */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-semibold text-gray-500">Add to your post</div>
              <div className="flex space-x-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-green-500"
                    onClick={() => photoUploadButtonRef.current?.click()}
                >
                  <Image className="w-6 h-6" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-blue-500"
                    onClick={() => videoUploadButtonRef.current?.click()}
                >
                  <Video className="w-6 h-6" />
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-yellow-500"
                    >
                      <TagIcon className="w-6 h-6" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <Command>
                      <CommandInput placeholder="Search friends..." />
                      <CommandEmpty>No friend found.</CommandEmpty>
                      <CommandGroup></CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                >
                  <MapPin className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Phần chọn audience */}
            <div className="flex items-center justify-between">
              <Controller
                  name="audience.type"
                  control={control}
                  render={({ field }) => (
                      <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Public">Public</SelectItem>
                          <SelectItem value="Friend">Friend</SelectItem>
                          <SelectItem value="OnlyMe">Only me</SelectItem>
                          <SelectItem value="Include">Include</SelectItem>
                          <SelectItem value="Exclude">Exclude</SelectItem>
                          <SelectItem value="Custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                  )}
              />
              <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Post
              </Button>
            </div>

            {/* Phần hiển thị media preview */}
            {Object.entries(mediaUrls).length > 0 && (
                <div
                    className={`grid ${
                        Object.entries(mediaUrls).length === 1
                            ? "grid-cols-1"
                            : "grid-cols-2 gap-4"
                    } mt-4`}
                >
                  {Object.entries(mediaUrls).map(([id, media]) => (
                      <div key={id} className="relative flex flex-col space-y-2">
                        <div
                            className={`relative w-full ${
                                Object.entries(mediaUrls).length === 1 ? "h-80" : "h-40"
                            }`}
                        >
                          {media.type === "Photo" ? (
                              <img
                                  src={media.url}
                                  alt="Media"
                                  className="object-cover w-full h-full rounded-lg"
                              />
                          ) : media.type === "Video" ? (
                              <video
                                  src={media.url}
                                  className="object-cover w-full h-full rounded-lg"
                                  controls
                              />
                          ) : null}
                          <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full"
                              onClick={() => handleRemoveMedia(id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Hiển thị Textarea nếu có từ 2 media trở lên */}
                        {Object.entries(mediaUrls).length > 1 && (
                            <Textarea
                                placeholder="Add a caption..."
                                className="w-full text-sm border rounded-md resize-none"
                                rows={2}
                                value={(() => {
                                  const media = watch("aggregates")?.find(
                                      (media) =>
                                          (media.type === "Photo" && media.photoId === id) ||
                                          (media.type === "Video" && media.videoId === id)
                                  );
                                  return media?.content?.text || ""; // Giá trị mặc định
                                })()}
                                onChange={(e) => handleUpdateMediaCaption(id, e.target.value)}
                            />
                        )}
                      </div>
                  ))}
                </div>
            )}

            {/* Hidden file inputs */}
            <input
                type="file"
                id="image-upload"
                ref={photoUploadButtonRef}
                accept="image/*"
                className="hidden"
                onChange={handleMediaUpload}
            />
            <input
                type="file"
                id="video-upload"
                ref={videoUploadButtonRef}
                accept="video/*"
                className="hidden"
                onChange={handleMediaUpload}
            />
          </form>
        </CardContent>
      </Card>
  );
}
