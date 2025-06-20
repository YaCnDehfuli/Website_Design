import { ByteMark } from "@/components/visuals/security-glyphs";
import { profile } from "@/content/profile";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} shell`}>
        <p>
          <ByteMark width="34" height="16" /> {profile.name}
        </p>
        <p className={styles.command}>
          <span>EOF</span> · evidence &gt; assertion
        </p>
        <p className={styles.state}>no third-party analytics scripts</p>
      </div>
    </footer>
  );
}
