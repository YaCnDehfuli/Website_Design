import { SecurityGlyph } from "@/components/visuals/security-glyphs";
import styles from "./loading-state.module.css";

type LoadingStateProps = Readonly<{
  label: string;
}>;

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <div className={styles.state} role="status" aria-live="polite" aria-atomic="true">
      <div className={styles.marker}>
        <SecurityGlyph name="evidence-record" width="28" height="28" />
        <p>PUBLIC_RECORDS</p>
      </div>
      <p className={styles.label}>{label}</p>
      <div className={styles.bar} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
