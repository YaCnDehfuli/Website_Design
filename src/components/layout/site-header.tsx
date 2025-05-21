import Link from "next/link";
import { profile } from "@/content/profile";
import { SiteNavigation } from "./site-navigation";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.utilityBar}>
        <div className="shell">
          <span className={styles.status}>
            <span aria-hidden="true" /> system online
          </span>
          <span className={styles.location}>local://personal-node</span>
        </div>
      </div>
      <div className={`${styles.inner} shell`}>
        <Link className={styles.brand} href="/" aria-label={`${profile.name}, home`}>
          <span className={styles.mark} aria-hidden="true">
            {profile.shortName}
            <span>_</span>
          </span>
          <span className={styles.path}>~/yasin.dev</span>
        </Link>
        <SiteNavigation />
      </div>
    </header>
  );
}
