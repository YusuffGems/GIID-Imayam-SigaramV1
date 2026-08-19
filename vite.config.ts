import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

/**
 * Self-owned Vite config. Replaces @lovable.dev/vite-tanstack-config, which
 * previously bundled these same plugins behind a wrapper.
 *
 * Plugin order matters: paths and Tailwind first, then TanStack Start (which
 * generates the route tree), then nitro (server build), then React last.
 */
export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // Use src/server.ts as the server entry (our SSR error wrapper).
      server: { entry: "server" },
    }),
    nitro({
      // Deployment target. Change to "cloudflare-module" for Cloudflare,
      // or "node-server" to run it yourself.
      preset: "vercel",
    }),
    viteReact(),
  ],

  environments: {
    ssr: {
      build: {
        rollupOptions: {
          output: {
            // Keep the whole SSR build in ONE chunk. The default split put
            // TanStack's server code in two chunks that import each other, so
            // one evaluated before the other had defined createCsrfMiddleware
            // -> "createCsrfMiddleware is not a function" (HTTP 500 on Vercel).
            manualChunks: () => "server",
          },
        },
      },
    },
  },

  server: { port: 8080 },
});
