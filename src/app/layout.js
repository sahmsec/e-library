import { Toaster } from "sonner";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import "./globals.css";

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "E-Library",
    template: "%s | E-Library",
  },
  description:
    "A modern digital library built with Next.js, Better Auth, Tailwind CSS, DaisyUI, and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" data-theme="light">
      <body className="min-h-full bg-background text-foreground">
        <div className="page-shell flex min-h-screen flex-col">
          <Navbar />
          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
