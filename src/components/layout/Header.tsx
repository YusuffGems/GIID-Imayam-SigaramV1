import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import {
  Menu,
  MessageCircle,
  Search,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tip } from "@/components/shared/Tip";
import { mobileNavLinks, navLinks, site } from "@/data/site";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  /* =========================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ========================================= */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* =========================================
     HERO HEADER
  ========================================= */
  const overHero = !scrolled && pathname === "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",

        /* Normal header */
        scrolled
          ? "surface-glass py-2 shadow-soft"
          : "bg-transparent py-4",

        /* Hero header */
        overHero &&
          "bg-gradient-to-b from-ink/70 to-transparent text-background",
      )}
    >
      {/* =========================================
          HEADER CONTAINER
      ========================================= */}

      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 sm:px-8">

        {/* =========================================
            LOGO
        ========================================= */}

        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-3"
          aria-label="Home"
        >
          <img
            src={site.logoUrl}
            alt={`${site.name} logo`}
            className={cn(
              "w-auto transition-all duration-300",
              scrolled ? "h-9" : "h-11",
            )}
          />

          <span
            className={cn(
              "hidden font-display text-sm leading-tight tracking-wide sm:block",
              overHero
                ? "text-background"
                : "text-foreground",
            )}
          >
            GIID
            <br />
            Imayam Sigaram
          </span>
        </Link>

        {/* =========================================
            DESKTOP NAVIGATION
            LG AND ABOVE
        ========================================= */}

        <nav
          aria-label="Primary"
          className="mx-auto hidden items-center gap-7 lg:flex"
        >
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{
                exact: l.to === "/",
              }}
              activeProps={{
                className: overHero
                  ? "text-background"
                  : "text-foreground",
              }}
              inactiveProps={{
                className: overHero
                  ? "text-background/75"
                  : "text-muted-foreground",
              }}
              className={cn(
                "text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors",
                overHero
                  ? "hover:text-background"
                  : "hover:text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* =========================================
            RIGHT ACTIONS
        ========================================= */}

        <div className="ml-auto flex items-center gap-2">

          {/* =======================================
              SEARCH
          ======================================== */}

          <Tip label="Search">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full",

                overHero
                  ? "text-background hover:bg-background/10 hover:text-background"
                  : "text-foreground hover:bg-accent/40 hover:text-foreground",
              )}
            >
              <Link
                to="/products"
                aria-label="Search products"
              >
                <Search
                  aria-hidden="true"
                  className="size-4"
                />
              </Link>
            </Button>
          </Tip>

          {/* =======================================
              WHATSAPP
          ======================================== */}

          <Tip label="WhatsApp">
            <a
              href={generalWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={cn(
                "hidden size-9 place-items-center rounded-full sm:grid",

                overHero
                  ? "text-background hover:bg-background/10"
                  : "text-foreground hover:bg-accent/40",
              )}
            >
              <MessageCircle
                className="size-4"
                aria-hidden="true"
              />
            </a>
          </Tip>

          {/* =======================================
              THEME TOGGLE
          ======================================== */}

          <Tip label="Change theme">
            <div
              className={cn(
                "rounded-full",

                overHero &&
                  "[&_button]:border-white/30 [&_button]:bg-black/20 [&_button]:text-white [&_button:hover]:bg-black/30",
              )}
            >
              <ThemeToggle />
            </div>
          </Tip>

          {/* =======================================
              SHOP PRODUCTS
              
              LIGHT:
              Dark button + white text

              DARK:
              White button + dark text
          ======================================== */}

          <Button
  asChild
  size="pill"
  className={cn(
    "group hidden rounded-full lg:inline-flex",

    /* Light mode */
    "bg-foreground text-background",
    "hover:bg-foreground/90",

    /* Dark mode */
    "dark:bg-background",
    "dark:text-foreground",
    "dark:hover:bg-background/90",

    /* Hero */
    overHero &&
      "bg-background text-foreground hover:bg-background/90",

    /* Animation */
    "transition-all duration-300",
  )}
>
  <Link
    to="/products"
    className="flex items-center gap-2"
  >
    <span>Shop Products</span>

    {/* Animated Buy Icon */}
    <span className="relative flex h-5 w-5 items-center justify-center">
      <ShoppingBag
        className="
          h-4 w-4
          transition-transform
          duration-300
          group-hover:-translate-y-0.5
          group-hover:rotate-[-6deg]
        "
        strokeWidth={1.8}
      />

      {/* Small notification dot */}
      <span
        className="
          absolute
          right-0
          top-0
          h-1.5
          w-1.5
          rounded-full
          bg-current
          opacity-0
          scale-0
          transition-all
          duration-300
          group-hover:scale-100
          group-hover:opacity-100
        "
      />
    </span>
  </Link>
</Button>

          {/* =======================================
              MOBILE / TABLET MENU
              
              ONLY BELOW LG
          ======================================== */}

          <Tip label={open ? "Close" : "Menu"}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full lg:hidden",

                overHero
                  ? "text-background hover:bg-background/10 hover:text-background"
                  : "text-foreground hover:bg-accent/40 hover:text-foreground",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X
                  aria-hidden="true"
                  className="size-5"
                />
              ) : (
                <Menu
                  aria-hidden="true"
                  className="size-5"
                />
              )}
            </Button>
          </Tip>
        </div>
      </div>

      {/* =========================================
          MOBILE / TABLET MENU
          BELOW LG ONLY
      ========================================= */}

      {open ? (
        <div className="px-4 lg:hidden">
          <nav
            aria-label="Mobile"
            className="surface-glass mt-3 animate-rise rounded-3xl p-5 shadow-lift"
          >

            {/* =====================================
                MOBILE NAVIGATION
            ====================================== */}

            <ul className="grid gap-1">
              {mobileNavLinks.map((l) => (
                <li key={l.label + l.to}>
                  <Link
                    to={l.to}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 font-display text-lg transition-colors",
                      "text-foreground",
                      "hover:bg-accent/25",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* =====================================
                MOBILE THEME
            ====================================== */}

            <div
              className={cn(
                "mt-4 flex items-center justify-between",
                "rounded-2xl border border-border",
                "bg-background/60 px-4 py-3",
              )}
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  Appearance
                </p>

                <p className="text-xs text-muted-foreground">
                  Switch between light and dark mode
                </p>
              </div>

              <ThemeToggle />
            </div>

            {/* =====================================
                MOBILE SHOP PRODUCTS
            ====================================== */}

            <Button
              asChild
              size="pill"
              className={cn(
                "mt-4 w-full rounded-full",

                "bg-foreground text-background",
                "hover:bg-foreground/90",

                "dark:bg-background",
                "dark:text-foreground",
                "dark:hover:bg-background/90",
              )}
            >
              <Link to="/products">
                Shop Products
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}