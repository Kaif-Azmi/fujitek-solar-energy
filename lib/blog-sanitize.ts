export type BlogTocItem = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "hr",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "h1",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
  "code",
  "pre",
]);

const URL_SAFE_PROTOCOL = /^(https?:\/\/|\/|#|mailto:|tel:)/i;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripDisallowedBlocks(value: string) {
  return value
    .replace(
      /<(script|style|iframe|object|embed|form|input|textarea|button|select|option|noscript)[^>]*>[\s\S]*?<\/\1>/gi,
      "",
    )
    .replace(/<(script|style|iframe|object|embed|form|input|textarea|button|select|option|noscript)[^>]*\/?>/gi, "");
}

function sanitizeAnchorAttributes(rawAttributes: string) {
  const attributes: string[] = [];
  let href: string | null = null;
  let target: "_blank" | "_self" | null = null;
  let rel = "";

  const attrRegex = /([a-zA-Z0-9:_-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;
  let match: RegExpExecArray | null = null;

  while ((match = attrRegex.exec(rawAttributes)) !== null) {
    const name = match[1].toLowerCase();
    const value = (match[3] ?? match[4] ?? match[5] ?? "").trim();

    if (!value) continue;
    if (name.startsWith("on")) continue;

    if (name === "href") {
      if (URL_SAFE_PROTOCOL.test(value)) href = value;
      continue;
    }

    if (name === "target") {
      if (value === "_blank" || value === "_self") target = value;
      continue;
    }

    if (name === "rel") {
      rel = value;
    }
  }

  if (href) {
    attributes.push(`href="${escapeHtml(href)}"`);
  }

  if (target) {
    attributes.push(`target="${target}"`);
    if (target === "_blank") {
      const relValues = new Set(rel.split(/\s+/).filter(Boolean).map((item) => item.toLowerCase()));
      relValues.add("noopener");
      relValues.add("noreferrer");
      rel = Array.from(relValues).join(" ");
    }
  }

  if (rel) {
    attributes.push(`rel="${escapeHtml(rel)}"`);
  }

  return attributes.length > 0 ? ` ${attributes.join(" ")}` : "";
}

export function sanitizeBlogHtml(input: string) {
  const value = String(input || "").replace(/\u0000/g, "");
  const withoutBlocked = stripDisallowedBlocks(value).replace(/<!--[\s\S]*?-->/g, "");

  return withoutBlocked.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (full, tagName: string, rawAttributes: string) => {
    const tag = tagName.toLowerCase();
    const isClosingTag = full.startsWith("</");

    if (!ALLOWED_TAGS.has(tag)) return "";
    if (isClosingTag) return `</${tag}>`;
    if (tag === "br" || tag === "hr") return `<${tag}>`;
    if (tag === "a") return `<a${sanitizeAnchorAttributes(rawAttributes)}>`;
    return `<${tag}>`;
  });
}

export function stripHtml(value: string) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugify(value: string) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function calculateReadTime(contentHtml: string) {
  const words = stripHtml(contentHtml).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function ensureUniqueHeadingId(baseId: string, seen: Map<string, number>) {
  if (!seen.has(baseId)) {
    seen.set(baseId, 1);
    return baseId;
  }

  const count = (seen.get(baseId) || 1) + 1;
  seen.set(baseId, count);
  return `${baseId}-${count}`;
}

export function injectHeadingIds(contentHtml: string) {
  const toc: BlogTocItem[] = [];
  const seenIds = new Map<string, number>();

  const html = contentHtml.replace(
    /<h([123])(?:\s+[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (_full, levelRaw: string, headingHtml: string) => {
      const level = Number(levelRaw) as 1 | 2 | 3;
      const text = stripHtml(headingHtml);
      const baseId = slugify(text) || "section";
      const id = ensureUniqueHeadingId(baseId, seenIds);
      toc.push({ id, text, level });
      return `<h${level} id="${id}">${headingHtml}</h${level}>`;
    },
  );

  return { html, toc };
}

export function normalizeTags(input: unknown) {
  if (Array.isArray(input)) {
    return Array.from(
      new Set(
        input
          .map((item) => String(item || "").trim().toLowerCase())
          .filter(Boolean),
      ),
    );
  }

  if (typeof input === "string") {
    return Array.from(
      new Set(
        input
          .split(",")
          .map((item) => item.trim().toLowerCase())
          .filter(Boolean),
      ),
    );
  }

  return [];
}
