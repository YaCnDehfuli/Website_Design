import { ByteMark, SecurityGlyph } from "./security-glyphs";
import styles from "./security-evidence-map.module.css";

const operations = [
  { glyph: "endpoint-identity", label: "endpoint / identity" },
  { glyph: "rule-match", label: "rule / match" },
  { glyph: "evidence-record", label: "evidence / record" },
] as const;

const research = [
  { glyph: "vad-region", label: "VAD / region" },
  { glyph: "cfg-path", label: "CFG / path" },
  { glyph: "attention-rank", label: "attention / rank" },
] as const;

export function SecurityEvidenceMap() {
  return (
    <figure className={styles.map} aria-labelledby="security-practice-map-caption" role="img">
      <div className={styles.diagram} aria-hidden="true">
        <p className={`${styles.branchLabel} ${styles.operationsLabel}`}>OPERATIONS</p>
        <p className={`${styles.branchLabel} ${styles.researchLabel}`}>RESEARCH</p>

        <svg className={styles.connectors} viewBox="0 0 434 410">
          <g className={styles.operationsPaths}>
            <path d="M217 205 94 88M217 205H68M217 205 94 322" />
          </g>
          <g className={styles.researchPaths}>
            <path d="M217 205 340 88M217 205h149M217 205 340 322" />
          </g>
          <circle cx="217" cy="205" r="78" />
          <circle cx="217" cy="205" r="101" strokeDasharray="2 10" />
        </svg>

        <div className={styles.core}>
          <ByteMark width="54" height="25" />
          <strong>YD</strong>
          <span>security engineering</span>
        </div>

        <div className={styles.operationsNodes}>
          {operations.map((item) => (
            <div className={styles.node} key={item.label}>
              <SecurityGlyph name={item.glyph} width="22" height="22" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.researchNodes}>
          {research.map((item) => (
            <div className={styles.node} key={item.label}>
              <SecurityGlyph name={item.glyph} width="22" height="22" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption id="security-practice-map-caption" className="sr-only">
        Yasin Dehfouli security practice map. One branch represents defensive security operations;
        the other represents research in memory forensics and applied machine learning. The map
        groups areas of work and does not represent proficiency scores.
      </figcaption>
    </figure>
  );
}
