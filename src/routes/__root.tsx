import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen } from "@/components/layout/SplashScreen";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GIID Imayam Sigaram — Handcrafted Leather" },
      {
        name: "description",
        content:
          "Premium handmade leather bags, wallets and gifts crafted by trained differently abled artisans. Order directly on WhatsApp — no account needed.",
      },
      { name: "author", content: "GIID Imayam Sigaram" },
      { property: "og:title", content: "GIID Imayam Sigaram — Handcrafted Leather" },
      {
        property: "og:description",
        content:
          "Premium handmade leather bags, wallets and gifts crafted by trained differently abled artisans. Order directly on WhatsApp — no account needed.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "GIID Imayam Sigaram" },
      { property: "og:locale", content: "en_IN" },
      { name: "google-site-verification", content: "vmPjUSCrHmCnN-fQzxR9IYXyD73wvdy9jZx1274FxuI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "GIID Imayam Sigaram — Handcrafted Leather" },
      {
        name: "twitter:description",
        content:
          "Premium handmade leather bags, wallets and gifts crafted by trained differently abled artisans. Order directly on WhatsApp — no account needed.",
      },
      {
        property: "og:image",
        content:
          `${SITE_URL}/og-image.jpg`,
      },
      {
        name: "twitter:image",
        content:
          `${SITE_URL}/og-image.jpg`,
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "GIID Imayam Sigaram",
          url: SITE_URL,
          description:
            "A social-impact leather workshop where trained differently abled artisans handcraft bags, wallets and gifts.",
          email: "works.moganapriya@gmail.com",
          telephone: "+91 99620 21547",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Government Institute for Intellectually Differently Abled",
            addressLocality: "Chennai",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "GIID Imayam Sigaram",
          url: SITE_URL,
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={150}>
        <SplashScreen  duration={700} />
        <Header />
        <main className="min-h-screen">
          {/* Required: nested routes render here. */}
          <Outlet />
        </main>
        <Footer />
        <FloatingActions />
        <Toaster position="top-center" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
