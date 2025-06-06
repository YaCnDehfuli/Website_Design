import type { Metadata } from "next";
import Image from "next/image";
import { education, experience } from "@/content/career";
import { profile } from "@/content/profile";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}, security engineering experience, research, and education.`,
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className="section-kicker">/about/whoami</p>
        <h1>
          Evidence before
          <br /> abstraction.
        </h1>
        <p className="lede">{profile.introduction}</p>
      </header>

      <section className={styles.profile} aria-labelledby="profile-title">
        <aside className={styles.identityCard}>
          <div className={styles.cardBar}>
            <span>IDENTITY.record</span>
            <span>{profile.location}</span>
          </div>
          <div className={styles.avatar}>
            <Image
              src={profile.image.src}
              alt={profile.image.alt}
              fill
              priority
              sizes="(max-width: 48rem) 14rem, 18rem"
            />
          </div>
          <dl>
            <div>
              <dt>name</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt>focus</dt>
              <dd>{profile.professionalHeadline}</dd>
            </div>
            <div>
              <dt>location</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
        </aside>

        <div className={styles.biography}>
          <p className="section-kicker">00 / profile</p>
          <h2 id="profile-title">Security engineering meets research.</h2>
          {profile.biography.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className={styles.socialLinks}>
            {profile.socialLinks.map((link) => (
              <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.interests} aria-labelledby="interests-title">
        <div className={styles.sectionLabel}>
          <p className="section-kicker">01 / active threads</p>
          <h2 id="interests-title">Technical focus</h2>
        </div>
        <div className={styles.interestList}>
          {profile.focusAreas.map((area, index) => (
            <article key={area.title}>
              <span className={styles.interestIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.interestEmoji} aria-hidden="true">
                {area.emoji}
              </span>
              <div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.history} aria-labelledby="experience-title">
        <div className={styles.sectionLabel}>
          <p className="section-kicker">02 / experience.log</p>
          <h2 id="experience-title">Experience</h2>
        </div>
        <ol className={styles.experienceList}>
          {experience.map((entry, index) => (
            <li key={`${entry.organization}-${entry.role}`}>
              <article>
                <div className={styles.timelineMarker} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className={styles.experienceBody}>
                  <div className={styles.experienceHeader}>
                    <div>
                      <h3>{entry.role}</h3>
                      <p>{entry.organization}</p>
                    </div>
                    <p className={styles.dateRange}>
                      <time>{entry.startDate}</time> — <time>{entry.endDate}</time>
                    </p>
                  </div>
                  <p className={styles.summary}>{entry.summary}</p>
                  <ul className={styles.highlights}>
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  {entry.assignments && (
                    <div className={styles.assignments}>
                      <h4>Selected teaching assignments</h4>
                      <ul>
                        {entry.assignments.map((assignment) => (
                          <li key={`${assignment.startDate}-${assignment.title}`}>
                            <p>
                              <strong>{assignment.title}</strong>
                              <span>
                                {assignment.startDate}–{assignment.endDate}
                              </span>
                            </p>
                            <small>{assignment.topics}</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.education} aria-labelledby="education-title">
        <div className={styles.sectionLabel}>
          <p className="section-kicker">03 / education.log</p>
          <h2 id="education-title">Education</h2>
        </div>
        <div className={styles.educationGrid}>
          {education.map((entry) => (
            <article key={entry.institution}>
              <p className={styles.dateRange}>
                {entry.startDate} — {entry.endDate}
              </p>
              <h3>{entry.credential}</h3>
              <p>{entry.institution}</p>
              {entry.field && <p>{entry.field}</p>}
              <dl>
                <dt>GPA</dt>
                <dd>{entry.gpa}</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
