import { Hono } from "hono";
import { z } from "zod";
import { sValidator } from "../lib/validator";
import { db } from "../lib/db/connect";
import { eq } from "drizzle-orm";
import * as t from "@/lib/db/schema";
import * as argon2 from "argon2";
import * as jose from "jose";
import { env } from "@/lib/env";

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
  );

function mintToken(userId: number) {
  return new jose.SignJWT()
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setSubject(userId.toString())
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(env.AUTH_SECRET));
}
