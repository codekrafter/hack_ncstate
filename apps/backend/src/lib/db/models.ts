import { budgets, transactions, users } from "./schema";

export type User = Omit<typeof users.$inferSelect, "password">;
export type Budget = typeof budgets.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type Party = Omit<typeof users.$inferSelect, "password">;
export type Quest = Omit<typeof users.$inferSelect, "password">;
