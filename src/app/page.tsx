import type { Metadata } from "next";
import Link from "next/link";
import { SecurityOrbit } from "@/components/visuals/security-orbit";
import { profile } from "@/content/profile";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className="section-kicker">root access / granted</p>
          <h1 id="hero-title">
            Hello, I&apos;m <span>Yasin.</span>
          </h1>
          <p className={styles.role}>{profile.role}</p>
          <p className="lede">{profile.introduction}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/projects">
              <span aria-hidden="true">●</span> explore_projects
            </Link>
            <a
              className={styles.secondaryAction}
              href="https://github.com/YaCnDehfuli"
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">↗</span> GitHub
            </a>
          </div>
          <dl className={styles.heroStatus} aria-label="Site status">
            <div>
              <dt>mode</dt>
              <dd>learning in public</dd>
            </div>
            <div>
              <dt>signal</dt>
              <dd>CS · AI · security</dd>
            </div>
          </dl>
        </div>
        <SecurityOrbit />
      </section>

      <section className={styles.focus} aria-labelledby="focus-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className="section-kicker">01 / operating domains</p>
            <h2 id="focus-title">What I&apos;m exploring</h2>
          </div>
          <p>
            No percentage bars or buzzword clouds—just the technical areas that keep generating
            better questions.
          </p>
        </div>
        <div className={styles.focusGrid}>
          {profile.focusAreas.map((area, index) => (
            <article className={styles.focusCard} data-signal={area.signal} key={area.title}>
              <div className={styles.focusMeta}>
                <span className={styles.emoji} aria-hidden="true">
                  {area.emoji}
                </span>
                <span>module_{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.index} aria-labelledby="index-title">
        <div className={styles.indexIntro}>
          <p className="section-kicker">02 / public index</p>
          <h2 id="index-title">Trace the work, not just the outcome.</h2>
          <p className="lede">
            Projects show the implementation. Writing records the reasoning. The engineering lab
            explains the standards connecting both.
          </p>
        </div>
        <div className={styles.indexLinks}>
          <Link href="/projects">
            <span className={styles.indexNumber}>01</span>
            <span>
              <strong>Projects</strong>
              <small>build logs · decisions · source</small>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/publications">
            <span className={styles.indexNumber}>02</span>
            <span>
              <strong>Publications</strong>
              <small>notes · explanations · research</small>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/engineering">
            <span className={styles.indexNumber}>03</span>
            <span>
              <strong>Engineering lab</strong>
              <small>principles · constraints · verification</small>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <aside className={styles.protocol} aria-label="Current working protocol">
        <div className={styles.protocolTitle}>
          <span aria-hidden="true">⌁</span>
          <p>
            CURRENT_PROTOCOL <small>v1.0</small>
          </p>
        </div>
        <ol>
          <li>
            <span>01</span> understand the system
          </li>
          <li>
            <span>02</span> model the threats
          </li>
          <li>
            <span>03</span> build the smallest proof
          </li>
          <li>
            <span>04</span> verify, document, repeat
          </li>
        </ol>
      </aside>
    </div>
  );
}
