import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} shell`}>
        <p>
          <span aria-hidden="true">◆</span> Yasin Dehfouli
        </p>
        <p className={styles.command}>
          <span>$</span> build --learn --share
        </p>
        <p className={styles.state}>secure connection · no trackers</p>
      </div>
    </footer>
  );
}
