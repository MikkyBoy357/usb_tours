import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/icons/social";
import { Container } from "@/components/site/container";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-ink-950 text-sand-100">
      <Container>
        <div className="grid gap-12 py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label={`${siteConfig.name} — home`}>
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={520}
                height={278}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-sand-200/80">
              {siteConfig.description}
            </p>
            <div className="mt-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Stay close
              </p>
              <NewsletterForm variant="dark" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
            {Object.entries(siteConfig.footerNav).map(([heading, items]) => (
              <div key={heading}>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-sand-300/80">
                  {heading}
                </p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-sand-100/85 transition-colors hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-sand-200/70">
            © {new Date().getFullYear()} {siteConfig.name}. Crafted in Cotonou.
          </p>
          <div className="flex items-center gap-4 text-sand-200">
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-accent"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-accent"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={siteConfig.links.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="transition-colors hover:text-accent"
            >
              <TikTokIcon className="size-4" />
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              aria-label="Email"
              className="transition-colors hover:text-accent"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
