import type { Metadata } from "next";
import { SecurityGlyph } from "@/components/visuals/security-glyphs";
import { profile } from "@/content/profile";
import { ContactForm } from "@/features/contact/contact-form";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.name} regarding cybersecurity engineering roles, research collaboration, or technical questions.`,
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className="section-kicker">/contact/init</p>
        <h1>Contact.</h1>
        <p className="lede">
          For roles, research collaboration, or technical questions, include the relevant context,
          objective, and any time constraints.
        </p>
      </header>

      <section className={styles.connection} aria-labelledby="connection-title">
        <figure className={styles.routeMap}>
          <div className={styles.routeMapBar}>
            <span>CONTACT_FLOW</span>
            <span>FORM → SERVER ACTION</span>
          </div>
          <div className={styles.routeDiagram} aria-hidden="true">
            <div className={styles.primaryRoute}>
              <div className={styles.routeNode}>
                <SecurityGlyph name="message-route" width="30" height="30" />
                <span>MESSAGE</span>
              </div>
              <span className={styles.routeArrow}>→</span>
              <div className={styles.routeNode}>
                <SecurityGlyph name="rule-match" width="30" height="30" />
                <span>VALIDATE</span>
              </div>
              <span className={styles.routeArrow}>→</span>
              <div className={styles.routeNode}>
                <SecurityGlyph name="evidence-record" width="30" height="30" />
                <span>POSTGRESQL</span>
              </div>
              <span className={styles.routeArrow}>→</span>
              <div className={styles.routeNode}>
                <SecurityGlyph name="message-route" width="30" height="30" />
                <span>ACKNOWLEDGE</span>
              </div>
            </div>
            <div className={styles.dropRoute}>
              <span>└─</span>
              <SecurityGlyph name="honeypot-branch" width="26" height="26" />
              <span>HONEYPOT / DROP</span>
            </div>
          </div>
          <figcaption>
            Contact messages are validated on the server. Accepted messages are stored in
            PostgreSQL; automated submissions may be discarded without retaining their payload.
          </figcaption>
          <div className={styles.routeActions}>
            <a className={styles.messageAction} href="#message-title">
              Start a message
            </a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">
              View GitHub <span aria-hidden="true">↗</span>
            </a>
            <a href={profile.linkedInUrl} target="_blank" rel="noreferrer">
              View LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </figure>

        <aside className={styles.routingGuide}>
          <div>
            <p className="section-kicker">message checklist</p>
            <h2 id="connection-title">A useful first message</h2>
          </div>
          <ul>
            <li>
              <span aria-hidden="true">01</span>
              <p>
                <strong>Context</strong>
                Briefly describe the organization, system, or research topic.
              </p>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <p>
                <strong>Question</strong>
                What decision, problem, or outcome would you like to discuss?
              </p>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <p>
                <strong>Constraints</strong>
                Include any relevant timeline, access boundary, or supporting link.
              </p>
            </li>
          </ul>
        </aside>
      </section>

      <ContactForm />

      <section className={styles.channels} aria-labelledby="channels-title">
        <div>
          <p className="section-kicker">01 / available routes</p>
          <h2 id="channels-title">Contact routes</h2>
        </div>
        <dl>
          <div>
            <dt>
              <SecurityGlyph name="message-route" width="20" height="20" /> Form
            </dt>
            <dd>
              <a href="#message-title">Send a message</a>
              <span>primary contact route</span>
            </dd>
          </div>
          <div>
            <dt>
              <SecurityGlyph name="evidence-record" width="20" height="20" /> GitHub
            </dt>
            <dd>
              <a href={profile.githubUrl}>@YaCnDehfuli</a>
              <span>source · issues · technical context</span>
            </dd>
          </div>
          <div>
            <dt>
              <SecurityGlyph name="endpoint-identity" width="20" height="20" /> LinkedIn
            </dt>
            <dd>
              <a href={profile.linkedInUrl}>Yasin Dehfouli</a>
              <span>professional profile · research context</span>
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
