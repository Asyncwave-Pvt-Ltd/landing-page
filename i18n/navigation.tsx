"use client";

import NextLink from "next/link";
import { useLocale } from "next-intl";
import { withLocale } from "./routing";

type Props = Omit<React.ComponentProps<typeof NextLink>, "href"> & {
  href: string;
};

/** next/link that carries the current ?lang= through to internal hrefs. */
export function Link({ href, ...rest }: Props) {
  const locale = useLocale();
  return <NextLink href={withLocale(href, locale)} {...rest} />;
}
