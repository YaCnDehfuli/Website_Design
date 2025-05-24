import type { Metadata } from "next";
import { buildLoop, engineeringPrinciples, verificationLayers } from "@/content/engineering";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Engineering Lab",
  description: "The constraints, security posture, and verification practices behind the work.",
};

export default function EngineeringPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className="section-kicker">/engineering/lab-notes</p>
          <h1>How I build.</h1>
        </div>
        <p className="lede">
          Engineering is the practice of making trade-offs legible. These are the working rules I
          use to keep software understandable, testable, and appropriately defensive.
        </p>
      </header>

      <aside className={styles.threatModel} aria-labelledby="threat-title">
        <div className={styles.windowBar}>
          <span>THREAT_MODEL.md</span>
          <span>read-only</span>
        </div>
        <div className={styles.threatBody}>
          <div className={styles.shield} aria-hidden="true">
            <span>🛡️</span>
          </div>
          <div>
            <p className="section-kicker">default posture</p>
            <h2 id="threat-title">Useful software is not automatically trustworthy.</h2>
            <p>
              Before adding controls, identify what matters, who can reach it, how it could fail,
              and which mitigations are proportional to the actual risk.
            </p>
          </div>
        </div>
        <ul className={styles.threatChecks}>
          <li>
            <span>01</span> assets
          </li>
          <li>
            <span>02</span> actors
          </li>
          <li>
            <span>03</span> boundaries
          </li>
          <li>
            <span>04</span> failure modes
          </li>
        </ul>
      </aside>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.sectionHeading}>
          <p className="section-kicker">01 / working principles</p>
          <h2 id="principles-title">Rules with a reason</h2>
        </div>
        <div className={styles.principleGrid}>
          {engineeringPrinciples.map((principle) => (
            <article key={principle.code}>
              <div className={styles.principleMeta}>
                <span aria-hidden="true">{principle.emoji}</span>
                <code>{principle.code}</code>
              </div>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.process} aria-labelledby="process-title">
        <div className={styles.processCopy}>
          <p className="section-kicker">02 / build loop</p>
          <h2 id="process-title">From question to evidence</h2>
          <p>
            The loop is intentionally short. Each pass should leave the system easier to inspect
            than it was before.
          </p>
        </div>
        <ol className={styles.loop}>
          {buildLoop.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.verification} aria-labelledby="verification-title">
        <div className={styles.sectionHeading}>
          <p className="section-kicker">03 / verification stack</p>
          <h2 id="verification-title">Different checks catch different failures.</h2>
        </div>
        <div className={styles.pipeline}>
          {verificationLayers.map((layer, index) => (
            <div key={layer.label}>
              <span className={styles.pipelineIndex}>{String(index + 1).padStart(2, "0")}</span>
              <strong>{layer.label}</strong>
              <code>$ {layer.command}</code>
              <small>detects: {layer.purpose}</small>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          <span>NOTE:</span> A green pipeline is supporting evidence, not proof that a system is
          secure.
        </p>
      </section>
    </div>
  );
}
