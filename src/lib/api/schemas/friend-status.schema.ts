import { z } from "zod";

export const friendStatusSchema = z.enum([
  "NotConnected",
  "RequestSent",
  "RequestReceived",
  "Connected",
]);

export type FriendStatusSchema = z.infer<typeof friendStatusSchema>;
