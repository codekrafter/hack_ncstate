CREATE TYPE "public"."budget_type" AS ENUM('bills_fixed', 'bills_variable', 'food', 'transportation', 'entertainment', 'savings', 'emergency_fund', 'debt', 'custom');--> statement-breakpoint
CREATE TYPE "public"."comparison_type" AS ENUM('gt', 'geq', 'leq', 'lt');--> statement-breakpoint
CREATE TYPE "public"."quest_type" AS ENUM('weekly', 'monthly');--> statement-breakpoint
CREATE TABLE "budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "budget_type" NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"spent" integer NOT NULL,
	"goal" integer NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "parties" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quests" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "quest_type" DEFAULT 'monthly' NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"target_type" "budget_type" NOT NULL,
	"comparison_type" "comparison_type" DEFAULT 'leq' NOT NULL,
	"target" integer NOT NULL,
	"reward" integer NOT NULL,
	"party_id" integer
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"memo" text NOT NULL,
	"date" date NOT NULL,
	"budget_id" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_to_parties" (
	"party_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_to_quests" (
	"quest_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quests" ADD CONSTRAINT "quests_party_id_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "public"."parties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_budget_id_budgets_id_fk" FOREIGN KEY ("budget_id") REFERENCES "public"."budgets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_parties" ADD CONSTRAINT "users_to_parties_party_id_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "public"."parties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_parties" ADD CONSTRAINT "users_to_parties_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_quests" ADD CONSTRAINT "users_to_quests_quest_id_quests_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_quests" ADD CONSTRAINT "users_to_quests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;