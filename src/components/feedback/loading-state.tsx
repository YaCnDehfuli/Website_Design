import styles from "./loading-state.module.css";

type LoadingStateProps = Readonly<{
  label: string;
}>;

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <div className={styles.state} role="status" aria-live="polite">
      <p>STATUS / resolving public records</p>
      <h1>{label}</h1>
      <div className={styles.bar} aria-hidden="true" />
    </div>
  );
}
