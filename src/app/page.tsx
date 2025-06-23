import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoadingState } from "@/components/feedback/loading-state";
import { ProfilePortrait } from "@/components/visuals/profile-portrait";
import { focusAreaGlyphNames, SecurityGlyph } from "@/components/visuals/security-glyphs";
import { profile } from "@/content/profile";
import { ProjectList } from "@/features/projects/project-list";
import { getFeaturedProjects } from "@/features/projects/queries";
import { PublicationList } from "@/features/publications/publication-list";
import { getRecentPublications } from "@/features/publications/queries";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <Suspense fallback={<LoadingState label="Loading selected work…" />}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const [featuredProjects, recentPublications] = await Promise.all([
    getFeaturedProjects(3),
    getRecentPublications(2),
  ]);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className="section-kicker">[59][44] / public profile</p>
          <h1 id="hero-title">
            Yasin <span>Dehfouli.</span>
          </h1>
          <p className={styles.role}>{profile.professionalHeadline}</p>
          <p className="lede">{profile.introduction}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/projects">
              Explore projects
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
          <dl className={styles.heroStatus} aria-label="Professional focus">
            <div>
              <dt>practice</dt>
              <dd>detection · defensive operations</dd>
            </div>
            <div>
              <dt>research</dt>
              <dd>memory forensics · applied ML</dd>
            </div>
          </dl>
        </div>
        <ProfilePortrait />
      </section>

      <section className={styles.focus} aria-labelledby="focus-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className="section-kicker">01 / operating domains</p>
            <h2 id="focus-title">Security engineering focus</h2>
          </div>
          <p>
            My work spans defensive security operations, memory forensics, malware analysis, and
            applied machine learning for security.
          </p>
        </div>
        <div className={styles.focusGrid}>
          {profile.focusAreas.map((area, index) => (
            <article className={styles.focusCard} data-signal={area.signal} key={area.title}>
              <div className={styles.focusMeta}>
                <SecurityGlyph
                  className={styles.focusGlyph}
                  name={focusAreaGlyphNames[index] ?? "evidence-record"}
                  width="28"
                  height="28"
                />
                <span>practice_{String(index + 1).padStart(2, "0")}</span>
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
            Selected research and software in memory forensics, malware detection, and repeatable
            forensic analysis.
          </p>
        </div>
        <ProjectList projects={featuredProjects} />
        <Link className={styles.sectionLink} href="/projects">
          View all projects <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className={styles.research} aria-labelledby="research-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className="section-kicker">03 / research archive</p>
            <h2 id="research-title">Recent publications</h2>
          </div>
          <p>
            Peer-reviewed research in volatile-memory forensics and explainable malware detection,
            including forensic datasets and evaluation methods.
          </p>
        </div>
        <PublicationList publications={recentPublications} />
        <Link className={styles.sectionLink} href="/publications">
          View all publications <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className={styles.index} aria-labelledby="index-title">
        <div className={styles.indexIntro}>
          <p className="section-kicker">04 / public index</p>
          <h2 id="index-title">How the portfolio is organized</h2>
          <p className="lede">
            Projects document implementation and evaluation. Publications record peer-reviewed
            research. Engineering describes the development and verification practices used for this
            site.
          </p>
        </div>
        <div className={styles.indexLinks}>
          <Link href="/projects">
            <span className={styles.indexNumber}>01</span>
            <span>
              <strong>Projects</strong>
              <small>implementation · results · limitations</small>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/publications">
            <span className={styles.indexNumber}>02</span>
            <span>
              <strong>Publications</strong>
              <small>papers · methods · findings</small>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/engineering">
            <span className={styles.indexNumber}>03</span>
            <span>
              <strong>Engineering</strong>
              <small>architecture · constraints · verification</small>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className={styles.contactCta} aria-labelledby="contact-title">
        <div>
          <p className="section-kicker">05 / establish contact</p>
          <h2 id="contact-title">Professional contact</h2>
          <p>
            Contact me regarding cybersecurity engineering roles, research collaboration, or
            technical work in detection, DFIR, and applied machine learning.
          </p>
        </div>
        <Link href="/contact">
          Contact <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <aside className={styles.protocol} aria-label="Engineering method">
        <div className={styles.protocolTitle}>
          <SecurityGlyph name="trust-boundary" width="28" height="28" />
          <p>
            ENGINEERING_METHOD <small>documented workflow</small>
          </p>
        </div>
        <ol>
          <li>
            <span>01</span> define the system and constraints
          </li>
          <li>
            <span>02</span> identify assets and trust boundaries
          </li>
          <li>
            <span>03</span> implement the smallest complete path
          </li>
          <li>
            <span>04</span> verify behavior and document limitations
          </li>
        </ol>
      </aside>
    </div>
  );
}
