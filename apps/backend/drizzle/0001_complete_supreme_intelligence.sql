CREATE TYPE "public"."comparison_type" AS ENUM('gt', 'geq', 'leq', 'lt');--> statement-breakpoint
ALTER TYPE "public"."budget_type" ADD VALUE 'emergency_fund' BEFORE 'custom';--> statement-breakpoint
ALTER TYPE "public"."budget_type" ADD VALUE 'debt' BEFORE 'custom';--> statement-breakpoint
ALTER TABLE "party_users" RENAME TO "users_to_parties";--> statement-breakpoint
ALTER TABLE "quest_users" RENAME TO "users_to_quests";--> statement-breakpoint
ALTER TABLE "users_to_parties" DROP CONSTRAINT "party_users_party_id_parties_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_parties" DROP CONSTRAINT "party_users_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_quests" DROP CONSTRAINT "quest_users_quest_id_quests_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_quests" DROP CONSTRAINT "quest_users_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "quests" ADD COLUMN "target_type" "budget_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "quests" ADD COLUMN "comparison_type" "comparison_type" DEFAULT 'leq' NOT NULL;--> statement-breakpoint
ALTER TABLE "quests" ADD COLUMN "target" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users_to_parties" ADD CONSTRAINT "users_to_parties_party_id_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "public"."parties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_parties" ADD CONSTRAINT "users_to_parties_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_quests" ADD CONSTRAINT "users_to_quests_quest_id_quests_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_quests" ADD CONSTRAINT "users_to_quests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;