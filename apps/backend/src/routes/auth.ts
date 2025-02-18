import { Hono } from "hono";
import { z } from "zod";
import { sValidator } from "../lib/validator";
import { db } from "../lib/db/connect";
import { eq } from "drizzle-orm";
import * as t from "@/lib/db/schema";
import * as argon2 from "argon2";
import { authenticated, mintToken } from "@/lib/auth";
import { User } from "@/app";

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

      console.log("testing ");

      const isValid = await argon2.verify(user.password, password);

      if (!isValid) {
        return c.json({ error: "Invalid username or password." }, 400);
      }

      return c.json<{ token: string }>(
        { token: await mintToken(user.id) },
        200
      );
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

      return c.json<{ token: string }>({ token: await mintToken(user.id) });
    }
  )
  .get("/whoami", authenticated(), async (c) => {
    return c.json<User>(c.get("user"));
  })
  .patch(
    "/me",
    authenticated(),
    sValidator("json", z.object({ username: z.string() })),
    async (c) => {
      const { username } = c.req.valid("json");

      const user = await db.query.users.findFirst({
        where: eq(t.users.id, c.get("user").id),
        columns: { username: true },
      });

      if (!user || user.username === username) {
        return c.json(
          { error: "Username cannot be the same as current username." },
          400
        );
      }

      const conflict = await db.query.users.findFirst({
        where: eq(t.users.username, username),
      });

      if (conflict) {
        return c.json({ error: "Username already taken." }, 400);
      }

      const [updated] = await db
        .update(t.users)
        .set({ username })
        .where(eq(t.users.id, c.get("user").id))
        .returning();

      return c.json(updated);
    }
  );
