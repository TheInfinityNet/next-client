import { useQuery } from "@tanstack/react-query";
import { socialSignInApi, socialSignInQuerySchema } from "@/lib/api/apis/social-sign-in.api";

export function useSocialSignIn(provider: string) {
    const parsed = socialSignInQuerySchema.safeParse({ provider });

    if (!parsed.success) {
        throw new Error(
            `Invalid provider: ${provider}. Must be "Google" or "Facebook".`
        );
    }
    const params = parsed.data;
    return useQuery({
        queryKey: ["social-sign-in", params],
        queryFn: () => socialSignInApi(params),
        retry: 1,
        enabled: !!provider,
    });
}


