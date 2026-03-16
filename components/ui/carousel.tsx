"use client";

import * as React from "react";

interface CarouselOptions {
  loop?: boolean;
  align?: "start" | "center" | "end";
}

type CarouselPlugin =
  | { init: (api: CarouselApi) => void | (() => void) }
  | ((api: CarouselApi) => void | (() => void));

interface CarouselProps extends React.ComponentPropsWithoutRef<"div"> {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin[];
}

export interface CarouselApi {
  container: HTMLDivElement | null;
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollTo: (index: number) => void;
  getItemCount: () => number;
  getCurrentIndex: () => number;
}

interface CarouselContextValue extends CarouselApi {
  snapAlign: "start" | "center" | "end";
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

export function Carousel({ children, opts, plugins, className, ...rest }: CarouselProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const snapAlign = opts?.align ?? "start";

  const getItemCount = React.useCallback(() => {
    return container?.querySelectorAll("[data-carousel-item]")?.length ?? 0;
  }, [container]);

  const scrollTo = React.useCallback(
    (index: number) => {
      const el = container;
      if (!el) return;

      const items = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-item]"));
      const target = items[index];
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      setCurrentIndex(index);
    },
    [container],
  );

  const scrollNext = React.useCallback(() => {
    const count = getItemCount();
    if (!count) return;

    const next = (currentIndex + 1) % count;
    scrollTo(next);
  }, [currentIndex, getItemCount, scrollTo]);

  const scrollPrev = React.useCallback(() => {
    const count = getItemCount();
    if (!count) return;

    const prev = (currentIndex - 1 + count) % count;
    scrollTo(prev);
  }, [currentIndex, getItemCount, scrollTo]);

  React.useEffect(() => {
    if (!plugins) return;

    const api: CarouselApi = {
      container,
      scrollNext,
      scrollPrev,
      scrollTo,
      getItemCount,
      getCurrentIndex: () => currentIndex,
    };

    const cleanups: Array<() => void> = [];

    plugins.forEach((plugin) => {
      if (typeof plugin === "function") {
        const cleanup = plugin(api);
        if (typeof cleanup === "function") cleanups.push(cleanup);
      } else if (typeof plugin.init === "function") {
        const cleanup = plugin.init(api);
        if (typeof cleanup === "function") cleanups.push(cleanup);
      }
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [plugins, scrollNext, scrollPrev, scrollTo, getItemCount, currentIndex, container]);

  const api: CarouselApi = {
    container,
    scrollNext,
    scrollPrev,
    scrollTo,
    getItemCount,
    getCurrentIndex: () => currentIndex,
  };

  return (
    <CarouselContext.Provider value={{ ...api, snapAlign }}>
      <div
        ref={(node) => {
          containerRef.current = node;
          setContainer(node);
        }}
        className={
          "relative flex w-full gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x" +
          (className ? ` ${className}` : "")
        }
        {...rest}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ children, className, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={"flex gap-6" + (className ? ` ${className}` : "")} {...rest}>
      {children}
    </div>
  );
}

export function CarouselItem({ children, className, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  const ctx = React.useContext(CarouselContext);
  const snapAlign = ctx?.snapAlign ?? "start";

  return (
    <div
      data-carousel-item
      style={{ scrollSnapAlign: snapAlign }}
      className={
        "flex-shrink-0" + (className ? ` ${className}` : "")
      }
      {...rest}
    >
      {children}
    </div>
  );
}

export function CarouselPrevious({ className, ...rest }: React.ComponentPropsWithoutRef<"button">) {
  const api = React.useContext(CarouselContext);
  return (
    <button
      type="button"
      onClick={() => api?.scrollPrev()}
      className={className}
      {...rest}
    />
  );
}

export function CarouselNext({ className, ...rest }: React.ComponentPropsWithoutRef<"button">) {
  const api = React.useContext(CarouselContext);
  return (
    <button
      type="button"
      onClick={() => api?.scrollNext()}
      className={className}
      {...rest}
    />
  );
}
