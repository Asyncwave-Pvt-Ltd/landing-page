"use client";

import { useState, useEffect, useCallback } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
type BreakpointQueryObj = Partial<Record<Breakpoint, boolean>> & {
  width?: number;
  height?: number;
};
type BreakpointQuery = BreakpointQueryObj | string;
type Direction = "below" | "above";
type BreakpointOptions = {
  direction?: Direction;
};

const DEFAULT_BREAKPOINTS: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useBreakpoint(
  query: BreakpointQuery,
  options: BreakpointOptions = {},
) {
  const { direction = "below" } = options; // 'below' means true when viewport is <= breakpoint, 'above' means >=

  const matchQuery = useCallback(
    (query: BreakpointQueryObj, direction?: Direction) => {
      if (typeof window === "undefined") return false;
      const hasBreakpointNames = Object.keys(query).some((key) =>
        Object.keys(DEFAULT_BREAKPOINTS).includes(key),
      );
      if (hasBreakpointNames) {
        const width = window.innerWidth;
        let result = false;

        // Get all breakpoints from the query object, sorted by pixel value
        const breakpointEntries = Object.entries(DEFAULT_BREAKPOINTS)
          .filter(([key]) => query.hasOwnProperty(key))
          .map<[Breakpoint, number, boolean]>(([key, value]) => [
            key as Breakpoint,
            value,
            !!query[key as Breakpoint],
          ])
          .sort((a, b) => a[1] - b[1]); // Sort by pixel value

        if (breakpointEntries.length === 0) return false;

        if (direction === "below") {
          // Check breakpoints from smallest to largest
          // Find the first breakpoint where width <= breakpoint value
          for (const [, bpValue, bpResult] of breakpointEntries) {
            if (width <= bpValue) {
              result = bpResult === true;
              return result;
            }
          }
          // If width is larger than all specified breakpoints, return false
          return false;
        } else {
          // Check breakpoints from largest to smallest
          // Find the first breakpoint where width >= breakpoint value
          for (let i = breakpointEntries.length - 1; i >= 0; i--) {
            const [, bpValue, bpResult] = breakpointEntries[i];
            if (width >= bpValue) {
              result = bpResult === true;
              return result;
            }
          }
          // If width is smaller than all specified breakpoints, return false
          return false;
        }
      } else if (query.width !== undefined || query.height !== undefined) {
        let widthMatch = true;
        let heightMatch = true;

        if (query.width !== undefined) {
          if (direction === "below") {
            widthMatch = window.innerWidth <= query.width;
          } else {
            widthMatch = window.innerWidth >= query.width;
          }
        } else if (query.height !== undefined) {
          if (direction === "below") {
            heightMatch = window.innerHeight <= query.height;
          } else {
            heightMatch = window.innerHeight >= query.height;
          }
        }

        return widthMatch && heightMatch;
      }
    },
    [],
  );

  const [matches, setMatches] = useState(
    typeof query === "string"
      ? window.matchMedia(query)
      : matchQuery(query, direction),
  );

  useEffect(() => {
    // SSR safety check
    if (typeof window === "undefined") return;

    if (typeof query === "string") {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
      };

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    } else if (typeof query === "object" && query !== null) {
      const handleResize = () => {
        setMatches(matchQuery(query, direction));
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }

    return () => {};
  }, [query, direction, matchQuery]);

  return matches;
}
