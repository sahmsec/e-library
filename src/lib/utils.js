export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function safeRedirectPath(input) {
  if (!input) {
    return "/";
  }

  return input.startsWith("/") && !input.startsWith("//") ? input : "/";
}

export function buildLoginRedirect(destination) {
  return `/login?redirect=${encodeURIComponent(destination)}`;
}

export function formatDate(date) {
  const value = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}
