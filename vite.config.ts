// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// The GitHub Pages workflow builds with GITHUB_PAGES=true. There, pages are written as
// about.html (not about/index.html) so GitHub serves /about without a trailing-slash redirect.
const githubPages = process.env.GITHUB_PAGES === "true";

// Keep in sync with sitePages in src/lib/seo.ts.
const pages = [
  "/",
  "/about",
  "/academics",
  "/student-life",
  "/admissions",
  "/alumni",
  "/gallery",
  "/contact",
];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Pre-build every page as static HTML: needed for GitHub Pages and good for search engines.
    prerender: { enabled: true, crawlLinks: false, autoSubfolderIndex: !githubPages },
    pages: pages.map((path) => ({ path })),
  },
});
