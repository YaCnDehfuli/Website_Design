import type { Metadata } from "next";
import Link from "next/link";
import { SecurityOrbit } from "@/components/visuals/security-orbit";
import { profile } from "@/content/profile";
import { ProjectList } from "@/features/projects/project-list";
import { getFeaturedProjects } from "@/features/projects/queries";
import { PublicationList } from "@/features/publications/publication-list";
import { getRecentPublications } from "@/features/publications/queries";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featuredProjects, recentPublications] = await Promise.all([
    getFeaturedProjects(3),
    getRecentPublications(2),
  ]);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className="section-kicker">root access / granted</p>
          <h1 id="hero-title">
            Hello, I&apos;m <span>Yasin.</span>
          </h1>
          <p className={styles.role}>{profile.professionalHeadline}</p>
          <p className="lede">{profile.introduction}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/projects">
              <span aria-hidden="true">●</span> explore_projects
            </Link>
            <a
              className={styles.secondaryAction}
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">↗</span> GitHub
            </a>
            <a
              className={styles.secondaryAction}
              href={profile.linkedInUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">↗</span> LinkedIn
            </a>
            <a className={styles.secondaryAction} href="/documents/Yasin_Dehfouli_CV.pdf" download>
              <span aria-hidden="true">↓</span> CV
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

      <section className={styles.work} aria-labelledby="work-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className="section-kicker">02 / selected operations</p>
            <h2 id="work-title">Featured work</h2>
          </div>
          <p>
            Research and software built around volatile-memory evidence, explainable detection, and
            repeatable analysis.
          </p>
        </div>
        <ProjectList projects={featuredProjects} />
        <Link className={styles.sectionLink} href="/projects">
          inspect_all_projects <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className={styles.research} aria-labelledby="research-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className="section-kicker">03 / research archive</p>
            <h2 id="research-title">Recent publications</h2>
          </div>
          <p>
            Peer-reviewed work on memory-forensics systems, malware detection, and the evidence
            needed to evaluate them.
          </p>
        </div>
        <PublicationList publications={recentPublications} />
        <Link className={styles.sectionLink} href="/publications">
          browse_publication_archive <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className={styles.index} aria-labelledby="index-title">
        <div className={styles.indexIntro}>
          <p className="section-kicker">04 / public index</p>
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

      <section className={styles.contactCta} aria-labelledby="contact-title">
        <div>
          <p className="section-kicker">05 / establish contact</p>
          <h2 id="contact-title">Have a security problem worth investigating?</h2>
          <p>
            I&apos;m interested in rigorous work across memory forensics, detection engineering,
            applied AI, and research software.
          </p>
        </div>
        <Link href="/contact">
          open_secure_channel <span aria-hidden="true">↗</span>
        </Link>
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
