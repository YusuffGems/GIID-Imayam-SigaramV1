import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
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
     HOME HERO HEADER
  ========================================= */
  const overHero = !scrolled && pathname === "/";

  return (
    <header
      className={cn(
        /* Base */
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",

        /* Scrolled / normal */
        scrolled
          ? "surface-glass py-2 shadow-soft"
          : "bg-transparent py-4",

        /* Home hero */
        overHero &&
          "bg-gradient-to-b from-ink/70 to-transparent text-background [&_a:hover]:text-background",
      )}
    >
      {/* =========================================
          MAIN HEADER CONTAINER
      ========================================= */}

      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 sm:px-8">

        {/* =======================================
            LOGO
        ======================================== */}

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

          <span className="hidden font-display text-sm leading-tight tracking-wide sm:block">
            GIID
            <br />
            Imayam Sigaram
          </span>
        </Link>

        {/* =======================================
            DESKTOP NAVIGATION
            XL AND ABOVE ONLY
        ======================================== */}

        <nav
          aria-label="Primary"
          className="mx-auto hidden items-center gap-7 xl:flex"
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
                  ? "text-background/70"
                  : "text-muted-foreground",
              }}
              className="
                text-[0.72rem]
                font-medium
                tracking-[0.16em]
                uppercase
                transition-colors
                hover:text-foreground
              "
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* =======================================
            RIGHT ACTIONS
        ======================================== */}

        <div className="ml-auto flex items-center gap-2">

          {/* =====================================
              SEARCH
          ====================================== */}

          <Tip label="Search">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full",

                overHero
                  ? "text-background hover:bg-background/10"
                  : "text-foreground hover:bg-accent/40",
              )}
            >
              <Link
                to="/products"
                aria-label="Search"
              >
                <Search
                  aria-hidden="true"
                  className="size-4"
                />
              </Link>
            </Button>
          </Tip>

          {/* =====================================
              WHATSAPP
              DESKTOP / TABLET
          ====================================== */}

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

          {/* =====================================
              THEME TOGGLE
          ====================================== */}

          <Tip label="Change theme">
            <div
              className={cn(
                "rounded-full",

                overHero &&
                  "[&_button]:border-white/30 [&_button]:bg-black/20 [&_button]:text-white",
              )}
            >
              <ThemeToggle />
            </div>
          </Tip>

          {/* =====================================
              SHOP PRODUCTS
              DESKTOP ONLY
              
              LIGHT:
              Black background + white text

              DARK:
              White background + black text
          ====================================== */}

          <Button
            asChild
            size="pill"
            className="
              hidden
              rounded-full
              bg-foreground
              text-background
              hover:bg-foreground/90
              dark:bg-background
              dark:text-foreground
              dark:hover:bg-background/90
              xl:inline-flex
            "
          >
            <Link to="/products">
              Shop Products
            </Link>
          </Button>

          {/* =====================================
              MOBILE / TABLET MENU
              BELOW XL ONLY
          ====================================== */}

          <Tip label={open ? "Close" : "Menu"}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full xl:hidden",

                overHero
                  ? "text-background hover:bg-background/10"
                  : "text-foreground hover:bg-accent/40",
              )}
              aria-label={open ? "Close" : "Menu"}
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
          BELOW XL ONLY
      ========================================= */}

      {open ? (
        <div className="px-4 xl:hidden">
          <nav
            aria-label="Mobile"
            className="
              surface-glass
              mt-3
              animate-rise
              rounded-3xl
              p-5
              shadow-lift
            "
          >

            {/* =====================================
                MOBILE NAVIGATION
            ====================================== */}

            <ul className="grid gap-1">
              {mobileNavLinks.map((l) => (
                <li key={l.label + l.to}>
                  <Link
                    to={l.to}
                    className="
                      block
                      rounded-xl
                      px-3
                      py-2.5
                      font-display
                      text-lg
                      text-foreground
                      transition-colors
                      hover:bg-accent/25
                    "
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
              className="
                mt-4
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-border
                bg-background/60
                px-4
                py-3
              "
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
              className="
                mt-4
                w-full
                rounded-full
                bg-foreground
                text-background
                hover:bg-foreground/90
                dark:bg-background
                dark:text-foreground
                dark:hover:bg-background/90
              "
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