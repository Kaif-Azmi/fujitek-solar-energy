"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/components/services/types";

type StickySectionNavProps = {
  items: NavItem[];
};

export default function StickySectionNav({ items }: StickySectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const idSet = useMemo(() => new Set(items.map((item) => item.id)), [items]);
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0] && idSet.has(visible[0].target.id)) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-110px 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [idSet, items]);

  const getOffsetTop = () => {
    const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const navHeight = isDesktop
      ? desktopNavRef.current?.getBoundingClientRect().height ?? 0
      : mobileNavRef.current?.getBoundingClientRect().height ?? 0;
    return headerHeight + navHeight + 8;
  };

  const onItemClick = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) {
      return;
    }
    const targetY = window.scrollY + section.getBoundingClientRect().top - getOffsetTop();
    window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setActiveId(id);
  };

  return (
    <>
      <div ref={desktopNavRef} className="sticky top-16 z-30 hidden border-b border-border bg-white/95 backdrop-blur md:block">
        <nav aria-label="Services section navigation" className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-3 px-6 py-3.5">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={onItemClick(item.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                activeId === item.id
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-border bg-background text-foreground hover:border-primary hover:bg-surface hover:text-primary",
              )}
              aria-current={activeId === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div ref={mobileNavRef} className="border-b border-border bg-white md:hidden">
        <nav aria-label="Services section navigation mobile" className="mx-auto max-w-6xl px-6 py-2.5">
          <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onItemClick(item.id)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  activeId === item.id
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-border bg-background text-foreground",
                )}
                aria-current={activeId === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}


