import { unstable_noStore as noStore } from "next/cache";

import { getCollection } from "@/lib/mongodb";

function getBooksCollection() {
  return getCollection("books");
}

function serializeBook(document) {
  if (!document) {
    return null;
  }

  const { _id, ...book } = document;
  return book;
}

function escapeSearchTerm(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildBookQuery({
  search = "",
  category = "All",
} = {}) {
  const query = {};
  const normalizedSearch = search.trim();

  if (category !== "All") {
    query.category = category;
  }

  if (normalizedSearch) {
    query.title = {
      $regex: escapeSearchTerm(normalizedSearch),
      $options: "i",
    };
  }

  return query;
}

export const bookCategories = ["All", "Story", "Tech", "Science"];

export async function getAllBooks() {
  noStore();

  const books = await getBooksCollection()
    .find({})
    .sort({
      displayOrder: 1,
      title: 1,
    })
    .toArray();

  return books.map(serializeBook);
}

export async function getFeaturedBooks() {
  noStore();

  const books = await getBooksCollection()
    .find({
      featured: true,
    })
    .sort({
      displayOrder: 1,
      title: 1,
    })
    .limit(4)
    .toArray();

  return books.map(serializeBook);
}

export async function getBookById(id) {
  noStore();

  const book = await getBooksCollection().findOne({
    id,
  });

  return serializeBook(book);
}

export async function filterBooks({
  search = "",
  category = "All",
} = {}) {
  noStore();

  const books = await getBooksCollection()
    .find(
      buildBookQuery({
        search,
        category,
      }),
    )
    .sort({
      displayOrder: 1,
      title: 1,
    })
    .toArray();

  return books.map(serializeBook);
}

export const marqueeItems = [
  "New Arrivals: Midnight Archive",
  "Special Discount on Memberships This Week",
  "Featured Shelf: Science Books That Read Like Adventure",
  "Borrow digitally and keep your reading streak alive",
];

export const readerHighlights = [
  {
    title: "Shelf-Smart Discovery",
    description:
      "Search by title, filter by category, and jump from curiosity to checkout without friction.",
  },
  {
    title: "Private Reading Space",
    description:
      "Protected book details, personalized profile info, and session-based borrowing flows keep every account secure.",
  },
];

export const memberStories = [
  {
    quote:
      "It feels like stepping into a modern reading room instead of opening a generic catalog.",
    name: "Iram",
    role: "Weekend reader",
  },
  {
    quote:
      "The category filters are quick, the interface is calm, and borrowing a title feels genuinely satisfying.",
    name: "Mahin",
    role: "Frontend student",
  },
  {
    quote:
      "I found a science pick, saved it, and updated my profile in less than two minutes. That’s rare.",
    name: "Nafis",
    role: "Curious member",
  },
];
