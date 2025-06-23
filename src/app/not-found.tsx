import Link from "next/link";
import { SecurityGlyph } from "@/components/visuals/security-glyphs";
import styles from "./status.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <SecurityGlyph className={styles.statusGlyph} name="missing-route" width="52" height="52" />
      <p className={styles.code}>ENOENT / 404</p>
      <h1>Page not found.</h1>
      <p className={styles.description}>This address does not match a published page or record.</p>
      <Link className={styles.action} href="/">
        Return home <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
