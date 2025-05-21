"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNavigation } from "@/content/navigation";
import styles from "./site-navigation.module.css";

export function SiteNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navigation} aria-label="Primary navigation">
      <button
        className={styles.toggle}
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span aria-hidden="true">{isOpen ? "[×]" : "[+]"}</span> menu
      </button>
      <ul id="primary-navigation" className={styles.list} data-open={isOpen}>
        {primaryNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                className={styles.link}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.index}</span> {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
