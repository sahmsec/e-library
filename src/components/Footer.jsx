import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", initial: "F" },
  { href: "https://instagram.com", label: "Instagram", initial: "I" },
  { href: "https://github.com", label: "GitHub", initial: "G" },
];

export default function Footer() {
  return (
    <footer className="border-t border-library-ink/10 bg-library-ink text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-white/55">
              Contact Us
            </p>
            <h2 className="font-display mt-3 text-4xl font-semibold">
              A calmer way to borrow, read, and return to stories.
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-white/70">
            E-Library turns the warmth of a traditional reading room into a
            secure digital platform for curious minds, late-night readers, and
            lifelong learners.
          </p>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ href, label, initial }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-library-copper hover:text-white"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-library-sand">
                  {initial}
                </span>
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 size-5 text-library-sand" />
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                Email
              </p>
              <a href="mailto:hello@elibrary-demo.com" className="text-white">
                hello@elibrary-demo.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-1 size-5 text-library-sand" />
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                Phone
              </p>
              <a href="tel:+8801700000000" className="text-white">
                +880 1700 000 000
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-1 size-5 text-library-sand" />
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                Visit
              </p>
              <p className="text-white/85">
                24 Reading Lane, Dhaka Knowledge District
              </p>
            </div>
          </div>

          <Link
            href="/books"
            className="mt-2 inline-flex w-fit items-center rounded-full bg-library-copper px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a4572d]"
          >
            Browse the full catalog
          </Link>
        </div>
      </div>
    </footer>
  );
}
