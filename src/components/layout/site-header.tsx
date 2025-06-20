import Link from "next/link";
import { ByteMark, SecurityGlyph } from "@/components/visuals/security-glyphs";
import { profile } from "@/content/profile";
import { SiteNavigation } from "./site-navigation";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.utilityBar}>
        <div className="shell">
          <span className={styles.status}>
            <SecurityGlyph name="trust-boundary" width="16" height="16" /> public surface
          </span>
          <span className={styles.location}>{profile.location} · client analytics / none</span>
        </div>
      </div>
      <div className={`${styles.inner} shell`}>
        <Link className={styles.brand} href="/" aria-label={`${profile.name}, home`}>
          <span className={styles.mark} title="ASCII bytes for YD" aria-hidden="true">
            <ByteMark width="43" height="20" />
          </span>
          <span className={styles.path}>~/yasin.dev</span>
        </Link>
        <SiteNavigation />
      </div>
    </header>
  );
}
