import { reset, seed } from "drizzle-seed";
import * as schema from "./lib/db/schema";
import { db } from "./lib/db/connect";
import * as argon2 from "argon2";

async function main() {
  console.log("Resetting...");
  await reset(db, schema);

  const pwHash = await argon2.hash("password");

  console.log("Seeding...");
  await seed(db, schema).refine((f) => ({
    users: {
      columns: {
        id: f.intPrimaryKey(),
        username: f.fullName(),
        password: f.default({ defaultValue: pwHash }),
      },
    },
    parties: {
      count: 4,
      columns: {
        id: f.intPrimaryKey(),
        name: f.companyName(),
      },
    },
  }));
}

main();
