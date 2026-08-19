import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MessageCircle, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tip } from "@/components/shared/Tip";
import { mobileNavLinks, navLinks, site } from "@/data/site";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home hero the header sits over a dark photograph.
  const overHero = !scrolled && pathname === "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "surface-glass py-2 shadow-soft" : "bg-transparent py-4",
        overHero &&
          "bg-gradient-to-b from-ink/70 to-transparent text-background [&_a:hover]:text-background",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 sm:px-8">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3" aria-label="Home">
          <img
            src={site.logoUrl}
            alt={`${site.name} logo`}
            className={cn("w-auto transition-all", scrolled ? "h-9" : "h-11")}
          />
          <span className="hidden font-display text-sm leading-tight tracking-wide sm:block">
            GIID
            <br />
            Imayam Sigaram
          </span>
        </Link>

        <nav aria-label="Primary" className="mx-auto hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: overHero ? "text-background" : "text-foreground" }}
              inactiveProps={{
                className: overHero ? "text-background/70" : "text-muted-foreground",
              }}
              className="text-[0.72rem] font-medium tracking-[0.16em] uppercase transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Tip label="Search">
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <Link to="/products" aria-label="Search">
                <Search aria-hidden="true" />
              </Link>
            </Button>
          </Tip>
          <Tip label="WhatsApp">
            <a
              href={generalWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hidden size-9 place-items-center rounded-full text-foreground hover:bg-accent/40 sm:grid"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
            </a>
          </Tip>
          <Button
            asChild
            variant={overHero ? "quiet" : "ink"}
            size="pill"
            className="hidden lg:inline-flex"
          >
            <Link to="/products">Shop Products</Link>
          </Button>
          <Tip label={open ? "Close" : "Menu"}>
            <Button
              variant="quiet"
              size="icon"
              className="rounded-full lg:hidden"
              aria-label={open ? "Close" : "Menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </Tip>
        </div>
      </div>

      {open ? (
        <div className="px-4 lg:hidden">
          <nav
            aria-label="Mobile"
            className="surface-glass mt-3 animate-rise rounded-3xl p-5 shadow-lift"
          >
            <ul className="grid gap-1">
              {mobileNavLinks.map((l) => (
                <li key={l.label + l.to}>
                  <Link
                    to={l.to}
                    className="block rounded-xl px-3 py-2.5 font-display text-lg text-foreground transition-colors hover:bg-accent/25"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild variant="ink" size="pill" className="mt-4 w-full">
              <Link to="/products">Shop Products</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}