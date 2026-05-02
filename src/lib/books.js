export const bookCategories = ["All", "Story", "Tech", "Science"];

export const books = [
  {
    id: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A classic novel of the Jazz Age, exploring themes of wealth, class, and the elusive American Dream in 1920s Long Island.",
    category: "Story",
    available_quantity: 6,
    image_url: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    featured: true,
    displayOrder: 0,
  },
  {
    id: "to-kill-a-mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A powerful story of racial injustice and the loss of innocence in the American South, seen through the eyes of young Scout Finch.",
    category: "Story",
    available_quantity: 4,
    image_url: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    featured: true,
    displayOrder: 1,
  },
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    description:
      "A handbook of agile software craftsmanship, providing practical advice on writing better, more maintainable code.",
    category: "Tech",
    available_quantity: 8,
    image_url: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
    featured: true,
    displayOrder: 2,
  },
  {
    id: "the-pragmatic-programmer",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    description:
      "One of the most significant books on software development, offering timeless advice for becoming a better programmer.",
    category: "Tech",
    available_quantity: 7,
    image_url: "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg",
    featured: true,
    displayOrder: 3,
  },
  {
    id: "a-brief-history-of-time",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    description:
      "A landmark book in science writing, exploring the origins of the universe, black holes, and the nature of time.",
    category: "Science",
    available_quantity: 5,
    image_url: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
    featured: false,
    displayOrder: 4,
  },
  {
    id: "the-selfish-gene",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    description:
      "A revolutionary work on evolutionary biology that changed the way we think about genetics and natural selection.",
    category: "Science",
    available_quantity: 3,
    image_url: "https://covers.openlibrary.org/b/isbn/9780198788607-L.jpg",
    featured: false,
    displayOrder: 5,
  },
  {
    id: "1984",
    title: "1984",
    author: "George Orwell",
    description:
      "A chilling dystopian novel that explores themes of totalitarianism, surveillance, and the manipulation of truth.",
    category: "Story",
    available_quantity: 9,
    image_url: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    featured: false,
    displayOrder: 6,
  },
  {
    id: "the-hobbit",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "The beloved fantasy adventure of Bilbo Baggins as he journeys to reclaim a treasure guarded by the dragon Smaug.",
    category: "Story",
    available_quantity: 6,
    image_url: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
    featured: false,
    displayOrder: 7,
  },
  {
    id: "refactoring",
    title: "Refactoring",
    author: "Martin Fowler",
    description:
      "A comprehensive guide to improving the design of existing code through disciplined techniques and patterns.",
    category: "Tech",
    available_quantity: 10,
    image_url: "https://covers.openlibrary.org/b/isbn/9780134757599-L.jpg",
    featured: false,
    displayOrder: 8,
  },
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description:
      "A brief history of humankind, exploring how our species came to dominate the planet and build complex civilizations.",
    category: "Science",
    available_quantity: 5,
    image_url: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    featured: false,
    displayOrder: 9,
  },
  {
    id: "the-art-of-unit-testing",
    title: "The Art of Unit Testing",
    author: "Roy Osherove",
    description:
      "A practical guide to writing effective unit tests that ensure software quality and maintainability.",
    category: "Tech",
    available_quantity: 7,
    image_url: "https://covers.openlibrary.org/b/isbn/9781617290893-L.jpg",
    featured: false,
    displayOrder: 10,
  },
  {
    id: "cosmos",
    title: "Cosmos",
    author: "Carl Sagan",
    description:
      "A classic exploration of the universe, science, and the human search for knowledge across time and space.",
    category: "Science",
    available_quantity: 4,
    image_url: "https://covers.openlibrary.org/b/isbn/9780345331359-L.jpg",
    featured: false,
    displayOrder: 11,
  },
];

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

export function getFeaturedBooks() {
  return books.filter((book) => book.featured).slice(0, 4);
}

export function getBookById(id) {
  return books.find((book) => book.id === id) ?? null;
}

export function filterBooks({ search = "", category = "All" } = {}) {
  const normalizedSearch = search.trim().toLowerCase();

  return books.filter((book) => {
    const matchesCategory = category === "All" || book.category === category;
    const matchesSearch =
      !normalizedSearch ||
      book.title.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}
