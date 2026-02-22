import { MongoClient } from "mongodb";

const globalWithMongo = globalThis as typeof globalThis & {
	_mongoClient?: MongoClient;
};

const uri = process.env.MONGO_URI as string;

if (!globalWithMongo._mongoClient) {
	globalWithMongo._mongoClient = new MongoClient(uri);
}

const client: MongoClient = globalWithMongo._mongoClient;

export { client };
