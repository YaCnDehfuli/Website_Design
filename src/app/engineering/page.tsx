import type { Metadata } from "next";
import { SecurityGlyph } from "@/components/visuals/security-glyphs";
import { buildLoop, engineeringPrinciples, verificationLayers } from "@/content/engineering";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Engineering principles, threat-modeling questions, and verification practices used in this project.",
};

export default function EngineeringPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className="section-kicker">/engineering/lab-notes</p>
          <h1>Engineering practice.</h1>
        </div>
        <p className="lede">
          The principles, threat-modeling questions, and verification practices used to keep this
          site understandable, testable, and proportionate to risk.
        </p>
      </header>

      <aside className={styles.threatModel} aria-labelledby="threat-title">
        <div className={styles.windowBar}>
          <span>THREAT_MODEL.md</span>
          <span>read-only</span>
        </div>
        <div className={styles.threatBody}>
          <figure className={styles.boundaryFigure}>
            <div className={styles.boundaryDiagram} aria-hidden="true">
              <div className={styles.externalNode}>
                <SecurityGlyph name="message-route" width="28" height="28" />
                <span>PUBLIC CLIENT</span>
              </div>
              <span className={styles.flowArrow}>→</span>
              <div className={styles.applicationZone}>
                <div className={styles.zoneLabel}>
                  <SecurityGlyph name="trust-boundary" width="22" height="22" />
                  <span>APPLICATION</span>
                </div>
                <div className={styles.zoneNodes}>
                  <span>NEXT.JS ROUTES</span>
                  <span>SERVER ACTION</span>
                  <span>ZOD VALIDATION</span>
                </div>
              </div>
              <span className={styles.flowArrow}>→</span>
              <div className={styles.dataZone}>
                <SecurityGlyph name="evidence-record" width="28" height="28" />
                <span>POSTGRESQL</span>
              </div>
            </div>
            <figcaption>
              Trust-boundary diagram for this site: public clients reach Next.js routes; contact
              input crosses server validation before database persistence.
            </figcaption>
          </figure>
          <div>
            <p className="section-kicker">default posture</p>
            <h2 id="threat-title">Threat modeling starts with assets and boundaries.</h2>
            <p>
              Identify the assets, actors, trust boundaries, and failure modes before choosing
              controls. Mitigations should be proportionate to the risks they address.
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
          <h2 id="principles-title">Engineering principles</h2>
        </div>
        <div className={styles.principleGrid}>
          {engineeringPrinciples.map((principle) => (
            <article key={principle.code}>
              <div className={styles.principleMeta}>
                <SecurityGlyph name={principle.glyph} width="28" height="28" />
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
          <h2 id="process-title">Development process</h2>
          <p>
            Each pass defines constraints, implements a complete path, verifies expected and failure
            behavior, and records the resulting decisions.
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
          <h2 id="verification-title">Verification layers</h2>
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
          <span>NOTE:</span> Passing checks support confidence in defined behavior; they do not
          establish that a system is secure.
        </p>
      </section>
    </div>
  );
}
