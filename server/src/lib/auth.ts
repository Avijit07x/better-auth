// auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db/db";

const db = client.db("auth");

export const auth = betterAuth({
	database: mongodbAdapter(db),
	emailAndPassword: {
		enabled: true,
	},
	session: {
		expiresIn: 10 * 60, // 10 min
		updateAge: 1 * 60, // 1 min
	},

	trustedOrigins: [process.env.ORIGIN as string],
});
