import * as React from "react";

import Link from "next/link";

interface SidebarLinkProps {
  href: string;
  selected?: boolean;
  title: string;
  level: number;
  wip: boolean | undefined;
  icon?: React.ReactNode;
  heading?: boolean;
  isExpanded?: boolean;
  isBreadcrumb?: boolean;
  hideArrow?: boolean;
  isPending: boolean;
}

export function SidebarLink({
  href,
  selected = false,
  title,
  wip,
  level,
  heading = false,
  isExpanded,
  isBreadcrumb,
  hideArrow,
  isPending,
}: SidebarLinkProps) {
  const ref = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (selected && ref && ref.current) {
      // @ts-ignore
      if (typeof ref.current.scrollIntoViewIfNeeded === "function") {
        // @ts-ignore
        ref.current.scrollIntoViewIfNeeded();
      }
    }
  }, [ref, selected]);

  let target = "";
  if (href.startsWith("https://")) {
    target = "_blank";
  }
  return (
    <Link href={href}>
      <a
        ref={ref}
        title={title}
        target={target}
        aria-current={selected ? "page" : undefined}
      >
        {/* This here needs to be refactored ofc */}
        <span>{title}</span>
      </a>
    </Link>
  );
}
