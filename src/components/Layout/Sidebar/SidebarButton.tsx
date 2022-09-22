import * as React from "react";

interface SidebarButtonProps {
  title: string;
  heading: boolean;
  level: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isExpanded?: boolean;
  isBreadcrumb?: boolean;
}

export function SidebarButton({
  title,
  heading,
  level,
  onClick,
  isExpanded,
  isBreadcrumb,
}: SidebarButtonProps) {
  return (
    <div>
      <button onClick={onClick}>{title}</button>
    </div>
  );
}
