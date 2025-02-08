import { Hono } from "hono";
import { z } from "zod";
import { sValidator } from "../lib/validator";
import { db } from "../lib/db/connect";
import { eq } from "drizzle-orm";
import * as t from "@/lib/db/schema";
import * as argon2 from "argon2";
import { authenticated, mintToken } from "@/lib/auth";

export default new Hono()
  .post(
    "/login",
    sValidator(
      "json",
      z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      })
    ),
    async (c) => {
      const { username, password } = c.req.valid("json");

      const user = await db.query.users.findFirst({
        where: eq(t.users.username, username),
      });

      if (!user) {
        return c.json({ error: "Invalid username or password." }, 400);
      }

      const isValid = await argon2.verify(password, user.password);

      if (!isValid) {
        return c.json({ error: "Invalid username or password." }, 400);
      }

      return c.json({ token: await mintToken(user.id) });
    }
  )
  .post(
    "/signup",
    sValidator(
      "json",
      z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      })
    ),
    async (c) => {
      const { username, password } = c.req.valid("json");

      const existingUser = await db.query.users.findFirst({
        where: eq(t.users.username, username),
      });

      if (existingUser) {
        return c.json({ error: "Username already taken." }, 400);
      }

      const [user] = await db
        .insert(t.users)
        .values({
          username,
          password: await argon2.hash(password),
        })
        .returning();

      return c.json({ token: await mintToken(user.id) });
    }
  )
  .get("/whoami", authenticated(), async (c) => {
    return c.json(c.get("user"));
  });
