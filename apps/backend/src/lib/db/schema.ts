import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  budgets: many(budgets),
  usersToParties: many(usersToParties),
  usersToQuests: many(usersToQuests),
}));

export const budgetType = pgEnum("budget_type", [
  "bills_fixed",
  "bills_variable",
  "food",
  "transportation",
  "entertainment",
  "savings",
  "emergency_fund",
  "debt",
  "custom",
]);

export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  type: budgetType("type").notNull(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  spent: integer("spent").notNull(),
  goal: integer("goal").notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const budgetsRelations = relations(budgets, ({ one, many }) => ({
  transactions: many(transactions),
}));

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  memo: text("memo").notNull(),
  date: date("date").notNull(),
  budgetId: integer("budget_id").references(() => budgets.id),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  budget: one(budgets, {
    fields: [transactions.budgetId],
    references: [budgets.id],
  }),
}));

export const parties = pgTable("parties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const partiesRelations = relations(parties, ({ one, many }) => ({
  users: one(users, {
    fields: [parties.id],
    references: [users.id],
  }),
  usersToParties: many(usersToParties),
}));

export const questType = pgEnum("quest_type", ["weekly", "monthly"]);

export const comparisonType = pgEnum("comparison_type", [
  "gt",
  "geq",
  "leq",
  "lt",
]);

export const quests = pgTable("quests", {
  id: serial("id").primaryKey(),
  type: questType("type").notNull().default("monthly"),
  name: text("name").notNull(),
  description: text("description").notNull(),
  targetType: budgetType("target_type").notNull(),
  comparisonType: comparisonType("comparison_type").notNull().default("leq"),
  target: integer("target").notNull(),
  reward: integer("reward").notNull(),
  partyId: integer("party_id").references(() => parties.id),
});

export const questsRelations = relations(quests, ({ one, many }) => ({
  party: one(parties, {
    fields: [quests.partyId],
    references: [parties.id],
  }),
  usersToQuests: many(usersToQuests),
}));

// Join Tables
export const usersToParties = pgTable("users_to_parties", {
  partyId: integer("party_id")
    .notNull()
    .references(() => parties.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const usersToPartiesRelations = relations(usersToParties, ({ one }) => ({
  party: one(parties, {
    fields: [usersToParties.partyId],
    references: [parties.id],
  }),
  user: one(users, {
    fields: [usersToParties.userId],
    references: [users.id],
  }),
}));

export const usersToQuests = pgTable("users_to_quests", {
  questId: integer("quest_id")
    .notNull()
    .references(() => quests.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const usersToQuestsRelations = relations(usersToQuests, ({ one }) => ({
  quest: one(quests, {
    fields: [usersToQuests.questId],
    references: [quests.id],
  }),
  user: one(users, {
    fields: [usersToQuests.userId],
    references: [users.id],
  }),
}));
