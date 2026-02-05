"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * On small screens the category rail is always visible under the header; the
 * menu button expands it into a full-width list.
 */
export function MenuButton() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <button
      type="button"
      className="menu-btn"
      aria-label={open ? "Close menu" : "Menu"}
      aria-expanded={open}
      aria-controls="mobile-nav"
      onClick={() => setOpen((value) => !value)}
    >
      <Icon name={open ? "close" : "menu"} />
    </button>
  );
}
