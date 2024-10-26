import { z } from "zod";
import { providerSchema } from "./provider.schema";
import { profileSchema } from "./profile.schema";

export const accountSchema = z.object({
  id: z.coerce.string().uuid(),
  defaultUserProfileId: z.coerce.string().uuid(),
  providers: z.array(providerSchema),
  profileIds: z.array(z.coerce.string().uuid()),
  profiles: z.array(z.lazy(() => profileSchema)),
});
