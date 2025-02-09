import { users } from "./schema";

export type User = Omit<typeof users.$inferSelect, "password">;
