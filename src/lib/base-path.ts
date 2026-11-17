/**
 * Prefixes a public file path with the site's base folder.
 * On Lovable and at stjosephrapogi.github.io the base is "/", but a GitHub project page
 * (e.g. owner.github.io/repo-name/) is served from a sub-folder.
 */
export const withBase = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
