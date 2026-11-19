<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- School facts (name, motto, principal, fees, mean score) live in `src/lib/school.ts`; pages read from it so one edit updates the whole site.
- Shared site chrome (header, footer, page hero, CTA band) lives in `src/components/site/` and wraps routes from `__root.tsx`.
- Site photos are real files in `src/assets/` (not CDN asset pointers) so the static GitHub Pages build is self-contained.
- GitHub Pages hosting: `.github/workflows/deploy.yml` builds with `GITHUB_PAGES=true`, which turns on prerendering of every page in `vite.config.ts`; Lovable's own publish stays server-rendered. The workflow sets `BASE_PATH` ("/" for an owner.github.io repo, "/repo-name/" otherwise) so the build works from any GitHub address; public-file links must go through `withBase()` in `src/lib/base-path.ts`. Keep the page list in `vite.config.ts`, `sitePages` in `src/lib/seo.ts` and `public/sitemap.xml` in sync when adding a page.
- SEO: each route's head comes from `pageHead()` in `src/lib/seo.ts` (canonical, Open Graph, Twitter, share image in `public/og/`); `SITE_URL` there is the single source of the live domain.
- Video: films are embedded from YouTube, never uploaded to the site. The link lives in `video.youtubeUrl` in `src/lib/school.ts`, `src/lib/video.ts` parses it, and `src/components/site/Documentary.tsx` renders the player only while a link is set.
- Forms: the site must also work as static GitHub Pages files, so forms insert straight from the browser into Lovable Cloud tables with insert-only public access (no server functions); field rules live in `src/lib/` zod schemas mirrored by database checks.
- Form email: inquiries are also emailed from the browser through the FormSubmit relay (`src/lib/inquiry-email.ts`, inbox in `school.inquiryEmail`) because the static site has no server and no school-owned domain; a submission succeeds if either the save or the email works.
