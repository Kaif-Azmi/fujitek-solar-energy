"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { BlogDetailItem } from "@/lib/blog";
import { cn } from "@/lib/utils";

type BlogContentProps = {
  post: BlogDetailItem;
};

const HEADING_SCROLL_OFFSET = 116;
const MOBILE_PROGRESS_TOP = 56;

export default function BlogContent({ post }: BlogContentProps) {
  const articleRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const articleMetricsRef = useRef({ top: 0, height: 0 });
  const tocIds = useMemo(() => post.toc.map((item) => item.id), [post.toc]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>(tocIds[0] ?? "");
  const [readingProgress, setReadingProgress] = useState(0);
  const [isTocOpen, setIsTocOpen] = useState(false);

  const updateReadingProgress = useCallback(() => {
    const { top, height } = articleMetricsRef.current;
    if (!height) return;
    const articleStart = top - HEADING_SCROLL_OFFSET;
    const articleEnd = articleStart + Math.max(height, 1);
    const current = window.scrollY + HEADING_SCROLL_OFFSET;
    const rawProgress = ((current - articleStart) / Math.max(articleEnd - articleStart, 1)) * 100;
    const nextProgress = Math.min(100, Math.max(0, rawProgress));

    setReadingProgress((previous) => (Math.abs(previous - nextProgress) < 0.5 ? previous : nextProgress));
  }, []);

  useEffect(() => {
    const nextActive = tocIds[0] ?? "";
    setActiveHeadingId((previous) => (previous === nextActive ? previous : nextActive));
  }, [tocIds]);

  useEffect(() => {
    if (tocIds.length === 0) return;

    const headings = tocIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          const nextActiveId = visible[0].target.id;
          setActiveHeadingId((previous) => (previous === nextActiveId ? previous : nextActiveId));
        }
      },
      {
        rootMargin: `-${HEADING_SCROLL_OFFSET}px 0px -65% 0px`,
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [tocIds]);

  const updateArticleMetrics = useCallback(() => {
    const articleElement = articleRef.current;
    if (!articleElement) return;
    const rect = articleElement.getBoundingClientRect();
    articleMetricsRef.current = {
      top: rect.top + window.scrollY,
      height: rect.height,
    };
    updateReadingProgress();
  }, [updateReadingProgress]);

  useEffect(() => {
    const articleElement = articleRef.current;
    if (!articleElement) return;

    const updateMetrics = () => updateArticleMetrics();
    updateMetrics();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            updateMetrics();
          })
        : null;

    if (resizeObserver) {
      resizeObserver.observe(articleElement);
    }

    window.addEventListener("resize", updateMetrics);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateMetrics);
    };
  }, [updateArticleMetrics]);

  useEffect(() => {
    const onFrame = () => {
      frameRef.current = null;
      updateReadingProgress();
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(onFrame);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [updateReadingProgress]);

  const handleTocNavigate = useCallback((event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();

    const element = document.getElementById(id);
    if (!element) return;

    const target = Math.max(0, element.getBoundingClientRect().top + window.scrollY - HEADING_SCROLL_OFFSET);
    window.scrollTo({ top: target, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);

    setActiveHeadingId(id);
    setIsTocOpen(false);
  }, []);

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border border-border bg-background p-4">
          <button
            type="button"
            onClick={() => setIsTocOpen((value) => !value)}
            className="flex w-full items-center justify-between text-sm font-semibold uppercase tracking-[0.12em] text-primary lg:hidden"
            aria-expanded={isTocOpen}
            aria-controls="blog-toc-nav"
          >
            Table of Contents
            <span
              aria-hidden
              className={cn("text-xs font-semibold transition-transform", isTocOpen ? "rotate-180" : "")}
            >
              v
            </span>
          </button>
          <h2 className="hidden text-sm font-semibold uppercase tracking-[0.12em] text-primary lg:block">
            Table of Contents
          </h2>
          <nav
            id="blog-toc-nav"
            aria-label="Blog table of contents"
            className={cn("mt-3", isTocOpen ? "block" : "hidden lg:block")}
          >
            <ol className="space-y-2">
              {post.toc.length > 0 ? (
                post.toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => handleTocNavigate(event, item.id)}
                      aria-current={activeHeadingId === item.id ? "location" : undefined}
                      className={cn(
                        "inline-flex border-l-2 text-sm leading-6 transition-colors",
                        activeHeadingId === item.id
                          ? "border-primary pl-3 font-semibold text-primary"
                          : "border-transparent pl-3 text-secondary hover:text-primary",
                        item.level === 2 ? "ml-2" : "",
                        item.level === 3 ? "ml-4" : "",
                      )}
                    >
                      {item.text}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-sm text-secondary">No headings available.</li>
              )}
            </ol>
          </nav>
        </div>
      </aside>

      <article className="space-y-10">
        <div
          className="pointer-events-none fixed bottom-6 right-2 z-40 w-1 overflow-hidden rounded-full bg-primary/10 lg:hidden"
          style={{ top: MOBILE_PROGRESS_TOP + 8 }}
        >
          <div className="absolute inset-x-0 bottom-0 bg-primary transition-[height] duration-200" style={{ height: `${readingProgress}%` }} />
        </div>

        <div className="sticky top-20 z-20 hidden rounded-full border border-border bg-background/90 p-1 backdrop-blur lg:block">
          <div className="h-1.5 rounded-full bg-primary/10">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-200"
              style={{ width: `${readingProgress}%` }}
              role="presentation"
            />
          </div>
        </div>

        <section ref={articleRef} className="blog-rich-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        <section className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold text-foreground">Internal Resources</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/services" className="text-sm text-primary underline-offset-4 hover:underline">
                Explore solar installation and maintenance services
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-sm text-primary underline-offset-4 hover:underline">
                Browse solar panels, inverters, batteries, and EV solutions
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-primary underline-offset-4 hover:underline">
                Contact Fujitek Solar Energy for project consultation
              </Link>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">Need Help Planning Your Solar Project?</h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-secondary">
            Discuss your technical scope, component strategy, and execution timeline with the Fujitek engineering team.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="explore">
              <Link href="/contact">Get Solar Quote</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Our Experts</Link>
            </Button>
          </div>
        </section>
      </article>
    </div>
  );
}
