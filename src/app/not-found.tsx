import Link from "next/link";
import styles from "./status.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <p className={styles.code}>HTTP 404 / unresolved route</p>
      <h1>Signal not found.</h1>
      <p className={styles.description}>
        This route does not exist, or the requested record is not published.
      </p>
      <Link className={styles.action} href="/">
        return_home <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
