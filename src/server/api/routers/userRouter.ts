import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { getUserByName, updateUserImage } from "../dbFunctions/user";

export const userRouter = createTRPCRouter({
  getUserByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const user = await getUserByName(input.name);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }),

  updateUserImage: protectedProcedure
    .input(z.object({ id: z.string(), image: z.string() }))
    .mutation(async ({ input }) => {
      const user = await updateUserImage(input.id, input.image);
      if (!user) {
        throw new Error("Failed to update user image");
      }
      return user;
    }),
});
