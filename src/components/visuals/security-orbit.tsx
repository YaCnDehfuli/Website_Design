import styles from "./security-orbit.module.css";

export function SecurityOrbit() {
  return (
    <figure className={styles.frame} aria-labelledby="security-orbit-title">
      <figcaption id="security-orbit-title" className="sr-only">
        A security node monitoring a small network of connected systems
      </figcaption>
      <div className={styles.topBar} aria-hidden="true">
        <span>NET_GUARDIAN.exe</span>
        <span>● LIVE</span>
      </div>
      <svg viewBox="0 0 560 520" role="presentation" aria-hidden="true">
        <defs>
          <linearGradient id="orbit-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#63f2d0" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="orbit-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className={styles.grid}>
          <path d="M40 80H520M40 160H520M40 240H520M40 320H520M40 400H520" />
          <path d="M80 40V480M160 40V480M240 40V480M320 40V480M400 40V480M480 40V480" />
        </g>

        <g className={styles.connections}>
          <path d="M280 260L132 142L450 118L462 356L116 380Z" />
          <path d="M280 260L450 118M280 260L462 356M280 260L116 380M280 260L132 142" />
        </g>

        <g className={styles.orbits}>
          <ellipse cx="280" cy="260" rx="190" ry="116" />
          <ellipse cx="280" cy="260" rx="188" ry="116" transform="rotate(62 280 260)" />
          <ellipse cx="280" cy="260" rx="188" ry="116" transform="rotate(-62 280 260)" />
        </g>

        <g className={styles.node} transform="translate(132 142)">
          <circle r="18" />
          <circle r="5" />
          <text x="-28" y="-29">
            AI_01
          </text>
        </g>
        <g className={styles.node} transform="translate(450 118)">
          <circle r="18" />
          <circle r="5" />
          <text x="-24" y="-29">
            DB_02
          </text>
        </g>
        <g className={styles.node} transform="translate(462 356)">
          <circle r="18" />
          <circle r="5" />
          <text x="-32" y="38">
            API_03
          </text>
        </g>
        <g className={styles.node} transform="translate(116 380)">
          <circle r="18" />
          <circle r="5" />
          <text x="-25" y="38">
            UX_04
          </text>
        </g>

        <g className={styles.core} filter="url(#orbit-glow)">
          <path d="M280 186L342 222V294L280 330L218 294V222Z" />
          <path d="M256 253V242C256 228 267 217 280 217C293 217 304 228 304 242V253" />
          <rect x="247" y="251" width="66" height="50" rx="8" />
          <circle cx="280" cy="273" r="6" />
          <path d="M280 279V288" />
        </g>

        <g className={styles.packet}>
          <circle r="5">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M132 142L280 260L462 356" />
          </circle>
        </g>
      </svg>
      <div className={styles.readout} aria-hidden="true">
        <span>04 nodes</span>
        <span>00 threats</span>
        <span>encrypted</span>
      </div>
    </figure>
  );
}
