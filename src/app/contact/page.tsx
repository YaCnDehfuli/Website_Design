import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { ContactForm } from "@/features/contact/contact-form";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.name} about software, security, AI, or shared technical interests.`,
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className="section-kicker">/contact/init</p>
        <h1>
          Open a <span>channel.</span>
        </h1>
        <p className="lede">
          Have a question, a thoughtful critique, or an interesting system to discuss? Send the
          useful context and let&apos;s start there.
        </p>
      </header>

      <section className={styles.connection} aria-labelledby="connection-title">
        <div className={styles.terminal}>
          <div className={styles.terminalBar}>
            <span className={styles.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>secure-ish-shell</span>
            <span>80×24</span>
          </div>
          <div className={styles.terminalBody}>
            <p>
              <span>$</span> connect --to yasin
            </p>
            <div className={styles.output}>
              <p>
                <span>✓</span> identity: {profile.name}
              </p>
              <p>
                <span>✓</span> channel: contact form
              </p>
              <p>
                <span>✓</span> status: ready to receive
              </p>
            </div>
            <p className={styles.prompt}>
              <span>$</span> compose_message <i aria-hidden="true" />
            </p>
          </div>
          <div className={styles.terminalActions}>
            <a className={styles.emailAction} href="#message-title">
              <span aria-hidden="true">↓</span> open_message_buffer
            </a>
            <a
              className={styles.githubAction}
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">↗</span> inspect_github
            </a>
            <a
              className={styles.githubAction}
              href={profile.linkedInUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">↗</span> open_linkedin
            </a>
          </div>
        </div>

        <aside className={styles.routingGuide}>
          <div>
            <p className="section-kicker">packet guide</p>
            <h2 id="connection-title">A useful first message</h2>
          </div>
          <ul>
            <li>
              <span aria-hidden="true">01</span>
              <p>
                <strong>Context</strong>
                What are you working on or thinking about?
              </p>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <p>
                <strong>Question</strong>
                What would you like to explore together?
              </p>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <p>
                <strong>Constraints</strong>
                Is there a deadline, boundary, or useful link?
              </p>
            </li>
          </ul>
        </aside>
      </section>

      <ContactForm />

      <section className={styles.channels} aria-labelledby="channels-title">
        <div>
          <p className="section-kicker">01 / available routes</p>
          <h2 id="channels-title">Choose the right protocol</h2>
        </div>
        <dl>
          <div>
            <dt>▶ Form</dt>
            <dd>
              <a href="#message-title">Message buffer</a>
              <span>primary route · stored securely for response</span>
            </dd>
          </div>
          <div>
            <dt>⌘ GitHub</dt>
            <dd>
              <a href={profile.githubUrl}>@YaCnDehfuli</a>
              <span>source · issues · technical context</span>
            </dd>
          </div>
          <div>
            <dt>in LinkedIn</dt>
            <dd>
              <a href={profile.linkedInUrl}>Yasin Dehfouli</a>
              <span>professional profile · research context</span>
            </dd>
          </div>
        </dl>
      </section>

      <aside className={styles.serviceStatus} aria-label="Contact form status">
        <span className={styles.statusLight} aria-hidden="true" />
        <p>
          <code>contact_form.service</code>
          <small>database persistence active · no public email exposed</small>
        </p>
        <span>ONLINE</span>
      </aside>
    </div>
  );
}
