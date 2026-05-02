import { MongoClient } from "mongodb";

const mongoUri =
  process.env.MONGODB_URI ??
  process.env.AUTH_DB_URI ??
  "mongodb://127.0.0.1:27017/e-library";

const databaseName = process.env.MONGODB_DB_NAME ?? "e-library";

let client = null;
let database = null;

export function getMongoClient() {
  if (!client) {
    client = new MongoClient(mongoUri);
  }

  return client;
}

export function getDb() {
  if (!database) {
    database = getMongoClient().db(databaseName);
  }

  return database;
}

export function getCollection(name) {
  return getDb().collection(name);
}
