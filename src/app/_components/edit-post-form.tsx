import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useGetPostQuery} from "@/hooks/queries/get-post-details.query";
import {updatePostBodySchema, UpdatePostBodySchema, useUpdatePostMutation} from "@/lib/api/apis/update-post.api";
import {useEffect, useRef, useState} from "react";
import {mapFieldErrorToFormError} from "@/lib/utils";
import {useUploadPhotoMutation} from "@/lib/api/apis/upload-photo.api";
import {useUploadVideoMutation} from "@/lib/api/apis/upload-video.api";
import {useUploadFileMutation} from "@/lib/api/apis/upload-file.api";
import {Card, CardContent} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Textarea} from "@/components/ui/textarea";
import {Video, X, Image} from "lucide-react";

type EditDialogProps = {
    postId: string;
    onClose: () => void;
};

export function EditDialog({ postId, onClose }: EditDialogProps) {

    const { toast } = useToast();
    const post = useGetPostQuery({ id: postId }).data;

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

    // Hook to update post
    const updatePostMutation = useUpdatePostMutation({ id: postId });

    const {
        control,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors },
    } = useForm<UpdatePostBodySchema>({
        resolver: zodResolver(updatePostBodySchema),
        defaultValues: {
            ...post,
        },
    });

    console.log(errors);

    const onSubmit = (data: UpdatePostBodySchema) => {
        console.log('Form submitted with data:', post);
        updatePostMutation.mutate(data, {
            onSuccess: () => {
                toast({
                    title: "Post updated successfully",
                });
            },
            onError: (error) => {
                toast({
                    title: "Update post failed",
                    description: error.message,
                });
                switch (error.type) {
                    case "ValidationError":
                        mapFieldErrorToFormError(setError, error.errors);
                }
            },
        });
    }

    const handleMediaChange = (
        type: "Photo" | "Video" | "File",
        id: string,
        url: string,
    ) => {
        const currentMedia = watch("aggregates") || [];

        // Add new media to aggregates if empty
        if (currentMedia.length === 0) {
            const photoId = watch("photoId");
            const videoId = watch("videoId");
            if (videoId) {
                currentMedia.push({
                    type: "Video",
                    videoId,
                    content: { text: "", facets: [] },
                    audience: { type: "Public" },
                });
            }
            if (photoId) {
                currentMedia.push({
                    type: "Photo",
                    photoId,
                    content: { text: "", facets: [] },
                    audience: { type: "Public" },
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
                        audience: { type: "Public" as const },
                    },
                ]
                : []),
            ...(type === "Video"
                ? [
                    {
                        type: "Video" as const,
                        videoId: id,
                        content: { text: "", facets: [] },
                        audience: { type: "Public" as const },
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

    useEffect(() => {
        if (post.type === "MultiMedia" && post.aggregates) {
            post.aggregates.forEach((media) => {
                switch (media.type) {
                    case "Photo":
                        if (media.photo != undefined)
                            handleMediaChange("Photo", media.photo.id, media.photo.url);
                        console.log(media.photo);
                        break;
                    case "Video":
                        if (media.video != undefined)
                            handleMediaChange("Video", media.video.id, media.video.url);
                        console.log(media.video);
                        break;
                    default:
                        break;
                }
            });
        }
    }, [post]); // Depend on post to trigger effect when post changes

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

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/2">
                <Card className="w-full overflow-hidden">
                    <CardContent className="p-6">
                        <form onClick={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Phần nhập nội dung bài viết */}
                            <div className="flex items-start space-x-4">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={post.owner.avatar?.url} alt="@shadcn"/>
                                    <AvatarFallback>{post.owner.name ?? "U"}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <Controller
                                        name="content.text"
                                        control={control}
                                        render={({field}) => (
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
                                        <Image className="w-6 h-6"/>
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-blue-500"
                                        onClick={() => videoUploadButtonRef.current?.click()}
                                    >
                                        <Video className="w-6 h-6"/>
                                    </Button>
                                </div>
                            </div>

                            {/* Phần hiển thị media preview */}
                            {Object.entries(mediaUrls).length > 0 && (
                                <div className={`grid ${
                                    Object.entries(mediaUrls).length === 1 ? "grid-cols-1" : "grid-cols-2 gap-4"
                                } mt-4`}>
                                    {Object.entries(mediaUrls).map(([id, media]) => (
                                        <div key={id} className="relative flex flex-col space-y-2">
                                            <div className={`relative w-full ${
                                                Object.entries(mediaUrls).length === 1 ? "h-80" : "h-40"
                                            }`}>
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
                                                    <X className="w-4 h-4"/>
                                                </Button>
                                            </div>
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

                            {/* Submit button */}
                            <Button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Update Post
                            </Button>

                            <div className="mt-4 flex justify-end">
                                <Button onClick={onClose} variant="secondary">
                                    Close
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
