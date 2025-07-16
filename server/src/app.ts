import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { auth } from "./lib/auth.js";

const PORT = process.env.PORT || 8000;

const app: Application = express();

dotenv.config();

app.use(
	cors({
		origin: process.env.ORIGIN,
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.json("Hello World");
});

app.get("/api/me", async (req: Request, res: Response) => {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});
	res.json(session);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
