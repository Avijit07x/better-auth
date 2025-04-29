import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;
const client: MongoClient = new MongoClient(uri);

export { client };
