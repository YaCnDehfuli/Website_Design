import Image from "next/image";
import { profile } from "@/content/profile";
import { ByteMark } from "./security-glyphs";
import styles from "./profile-portrait.module.css";

export function ProfilePortrait() {
  return (
    <figure className={styles.frame}>
      <div className={styles.topBar} aria-hidden="true">
        <span>IDENTITY // YASIN_DEHFOULI</span>
        <ByteMark width="36" height="17" />
      </div>
      <div className={styles.imageFrame}>
        <Image
          src={profile.image.src}
          alt={profile.image.alt}
          fill
          priority
          sizes="(max-width: 62rem) calc(100vw - 2rem), 34rem"
        />
        <span className={styles.cornerTop} aria-hidden="true" />
        <span className={styles.cornerBottom} aria-hidden="true" />
        <span className={styles.memoryRail} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <figcaption>
        <span>{profile.location}</span>
        <span>{profile.professionalHeadline}</span>
      </figcaption>
    </figure>
  );
}
