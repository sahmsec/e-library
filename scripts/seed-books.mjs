import nextEnv from "@next/env";
import { MongoClient } from "mongodb";
import seedData from "./book-seed-data.js";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const mongoUri =
  process.env.MONGODB_URI ??
  process.env.AUTH_DB_URI ??
  "mongodb://127.0.0.1:27017/e-library";

const databaseName = process.env.MONGODB_DB_NAME ?? "e-library";
const books = Array.isArray(seedData.books) ? seedData.books : [];

if (!books.length) {
  throw new Error("No books were found in scripts/book-seed-data.js.");
}

const client = new MongoClient(mongoUri);

try {
  await client.connect();

  const collection = client.db(databaseName).collection("books");
  const timestamp = new Date();

  await collection.createIndex(
    {
      id: 1,
    },
    {
      unique: true,
    },
  );

  const operations = books.map((book, index) => ({
    updateOne: {
      filter: {
        id: book.id,
      },
      update: {
        $set: {
          ...book,
          displayOrder: index,
          featured: index < 4,
          updatedAt: timestamp,
        },
        $setOnInsert: {
          createdAt: timestamp,
        },
      },
      upsert: true,
    },
  }));

  const result = await collection.bulkWrite(operations);

  console.log(
    `Seeded ${books.length} books into ${databaseName}.books (${result.upsertedCount} inserted, ${result.modifiedCount} updated).`,
  );
} finally {
  await client.close();
}
