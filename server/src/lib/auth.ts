// auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db/db.js";

const db = client.db("auth");

export const auth = betterAuth({
	database: mongodbAdapter(db),
	trustedOrigins: [process.env.ORIGIN as string],
	emailAndPassword: {
		enabled: true,
	},
	session: {
		expiresIn: 10 * 60, // 10 min
		updateAge: 1 * 60, // 1 min
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
	},
});
