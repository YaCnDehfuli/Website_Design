import type { Metadata } from "next";
import { education, experience } from "@/content/career";
import { profile } from "@/content/profile";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}, experience, education, and technical interests.`,
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className="section-kicker">/about/whoami</p>
        <h1>
          Human behind
          <br /> the terminal.
        </h1>
        <p className="lede">
          Curiosity is the root process. Everything else—code, experiments, and documentation—is how
          I inspect what it discovers.
        </p>
      </header>

      <section className={styles.profile} aria-labelledby="profile-title">
        <aside className={styles.identityCard}>
          <div className={styles.cardBar}>
            <span>IDENTITY.record</span>
            <span>verified locally</span>
          </div>
          <div className={styles.avatar} aria-hidden="true">
            <span>YD</span>
            <i />
            <i />
            <i />
          </div>
          <dl>
            <div>
              <dt>name</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt>domain</dt>
              <dd>{profile.role}</dd>
            </div>
            <div>
              <dt>state</dt>
              <dd className={styles.online}>● learning</dd>
            </div>
          </dl>
        </aside>

        <div className={styles.biography}>
          <p className="section-kicker">00 / profile</p>
          <h2 id="profile-title">A little context</h2>
          {profile.biography.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className={styles.values}>
            <span>🧭 evidence over certainty</span>
            <span>🔍 questions over assumptions</span>
            <span>🧰 simple tools, used well</span>
          </div>
        </div>
      </section>

      <section className={styles.interests} aria-labelledby="interests-title">
        <div className={styles.sectionLabel}>
          <p className="section-kicker">01 / active threads</p>
          <h2 id="interests-title">Technical interests</h2>
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

      <section className={styles.history} aria-labelledby="history-title">
        <div className={styles.sectionLabel}>
          <p className="section-kicker">02 / history</p>
          <h2 id="history-title">Experience & education</h2>
        </div>
        <div className={styles.historyColumns}>
          <HistoryList
            title="experience.log"
            entries={experience}
            emptyLabel="experience"
            getTitle={(entry) => entry.role}
          />
          <HistoryList
            title="education.log"
            entries={education}
            emptyLabel="education"
            getTitle={(entry) => entry.credential}
          />
        </div>
      </section>
    </div>
  );
}

type HistoryListProps<Entry> = Readonly<{
  title: string;
  entries: readonly Entry[];
  emptyLabel: string;
  getTitle: (entry: Entry) => string;
}>;

function HistoryList<Entry>({ title, entries, emptyLabel, getTitle }: HistoryListProps<Entry>) {
  return (
    <div className={styles.historyList}>
      <p className={styles.fileName}>{title}</p>
      {entries.length === 0 ? (
        <div className={styles.emptyState}>
          <span aria-hidden="true">[ ]</span>
          <p>
            Verified {emptyLabel} entries are being prepared.
            <small>No placeholder credentials inserted.</small>
          </p>
        </div>
      ) : (
        <ol>
          {entries.map((entry) => (
            <li key={getTitle(entry)}>{getTitle(entry)}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
