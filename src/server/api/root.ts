import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/userRouter";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  userRouter: userRouter,
});

export type AppRouter = typeof appRouter;
