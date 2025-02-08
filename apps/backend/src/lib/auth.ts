import { createMiddleware } from "hono/factory";
import { User } from "./db/models";
import { HTTPException } from "hono/http-exception";
import { jwtVerify } from "jose";
import { env } from "./env";
import * as jose from "jose";
import { db } from "./db/connect";
import { eq } from "drizzle-orm";
import * as t from "@/lib/db/schema";

const ENCODED_SECRET = new TextEncoder().encode(env.AUTH_SECRET);

export interface AuthenticatedEnv {
  Variables: {
    user: Omit<User, "password">;
  };
}

const BEARER_PREFIX = "Bearer ";

export const authenticated = () =>
  createMiddleware<AuthenticatedEnv>(async (c, next) => {
    const authorization = c.req.header("Authorization");

    if (!authorization?.startsWith(BEARER_PREFIX)) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const token = authorization.slice(BEARER_PREFIX.length);

    if (!token) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const { payload } = await jwtVerify(token, ENCODED_SECRET);

    if (!payload || !payload.sub) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const userId = parseInt(payload.sub);

    if (!userId || isNaN(userId)) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const user = await db.query.users.findFirst({
      where: eq(t.users.id, userId),
      columns: { password: false },
    });

    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    c.set("user", user);

    return await next();
  });

export function mintToken(userId: number) {
  return new jose.SignJWT()
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setSubject(userId.toString())
    .setExpirationTime("24h")
    .sign(ENCODED_SECRET);
}
