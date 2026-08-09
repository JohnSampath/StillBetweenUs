import type { CSSProperties } from "react";
import { ShareBar } from "./share-bar";

const tracks = [
  {
    number: "01",
    title: "Still Between Us",
    id: "453aUdNFOWRqDIFmEEvziB",
    url: "https://open.spotify.com/track/453aUdNFOWRqDIFmEEvziB",
    note: "The first look back — tender, unresolved, and close enough to touch.",
  },
  {
    number: "02",
    title: "Sheclipse",
    id: "2wQkI8Rrk6S2kZwq4ZWa9N",
    url: "https://open.spotify.com/track/2wQkI8Rrk6S2kZwq4ZWa9N",
    note: "The shadow at the centre — a moment suspended between light and leaving.",
  },
  {
    number: "03",
    title: "Loving You Endlessly",
    id: "1lrNpN3xcpbmQQXbzo2J8e",
    url: "https://open.spotify.com/track/1lrNpN3xcpbmQQXbzo2J8e",
    note: "The final promise — an ending that chooses devotion over distance.",
  },
];

const regions = ["India", "United States", "United Kingdom", "UAE", "Africa", "Europe"];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MusicPlaylist",
  name: "Still Between Us",
  description:
    "A three-song listening story by kkml featuring Still Between Us, Sheclipse, and Loving You Endlessly.",
  numTracks: 3,
  creator: { "@type": "MusicGroup", name: "kkml" },
  track: tracks.map((track, index) => ({
    "@type": "MusicRecording",
    position: index + 1,
    name: track.title,
    byArtist: { "@type": "MusicGroup", name: "kkml" },
    url: track.url,
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="nav shell" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Still Between Us home">
          S<span aria-hidden="true">•</span>BU
        </a>
        <div className="nav-links">
          <a href="#listen">The songs</a>
          <a href="#story">The story</a>
          <a className="nav-cta" href="#share">Share</a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> A three-song story by kkml</p>
          <h1>Still<br />Between Us</h1>
          <p className="hero-deck">
            Three songs for the feelings that never really leave. Press play in order,
            stay for the silence between them.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#listen">
              Begin the story <span aria-hidden="true">↓</span>
            </a>
            <a
              className="text-link"
              href={tracks[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open on Spotify <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="availability"><span className="status-dot" /> Streaming worldwide on Spotify</p>
        </div>

        <div className="hero-art">
          <figure className="cover-frame">
            <img
              className="cover-image"
              src="/still-between-us-cover.png"
              alt="Still Between Us cover artwork: two figures surrounded by a glowing broken heart under moonlight"
              width="708"
              height="705"
              fetchPriority="high"
            />
            <figcaption className="cover-caption">
              <span>01—03</span>
              The complete listening story
            </figcaption>
          </figure>
          <p className="cover-note">Original artwork<br />Still Between Us</p>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>Still Between Us</span><i>✦</i><span>Sheclipse</span><i>✦</i>
          <span>Loving You Endlessly</span><i>✦</i><span>Still Between Us</span><i>✦</i>
          <span>Sheclipse</span><i>✦</i><span>Loving You Endlessly</span><i>✦</i>
        </div>
      </div>

      <section className="listen-section" id="listen">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> Listen in order</p>
              <h2>Three songs.<br />One emotional arc.</h2>
            </div>
            <p>
              Start at the beginning. Each official Spotify player keeps the music close,
              while the sequence lets the story unfold as one continuous thought.
            </p>
          </div>

          <div className="track-list">
            {tracks.map((track, index) => (
              <article
                className="track-card"
                key={track.id}
                style={{ "--delay": `${index * 120}ms` } as CSSProperties}
              >
                <header className="track-card-heading">
                  <span className="track-number">{track.number}</span>
                  <div>
                    <h3>{track.title}</h3>
                    <p>kkml</p>
                  </div>
                </header>
                <p className="track-note">{track.note}</p>
                <iframe
                  className="spotify-player"
                  src={`https://open.spotify.com/embed/track/${track.id}?utm_source=stillbetweenus`}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`Play ${track.title} by kkml on Spotify`}
                />
                <a href={track.url} target="_blank" rel="noopener noreferrer">
                  Listen on Spotify <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section shell" id="story">
        <div className="story-quote">
          <p className="eyebrow"><span /> The space between</p>
          <blockquote>“Some stories end.<br />Some stay with us.”</blockquote>
        </div>
        <div className="story-copy">
          <p className="dropcap">
            <span>S</span>till Between Us is a compact listening journey through memory,
            eclipse, and enduring love. The three tracks are presented as a sequence: a
            beginning that looks back, a centre that holds the shadow, and a final song
            that refuses to let love fade.
          </p>
          <p>
            Put on your headphones, silence the room, and give the full story a few
            uninterrupted minutes. Then send it to the person who will understand.
          </p>
          <a className="text-link" href="#listen">Return to the songs <span aria-hidden="true">↑</span></a>
        </div>
      </section>

      <section className="world-section">
        <div className="shell world-grid">
          <div>
            <p className="eyebrow light"><span /> Listen across borders</p>
            <h2>Made to travel.</h2>
            <p className="world-copy">
              Open the official Spotify players from major listening regions, then share
              the page through the channels your people already use.
            </p>
          </div>
          <div className="region-list" aria-label="Target listening regions">
            {regions.map((region, index) => (
              <div key={region}><span>{String(index + 1).padStart(2, "0")}</span>{region}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="share-section shell" id="share">
        <p className="eyebrow centered"><span /> Pass it on</p>
        <h2>Know someone<br />who needs this?</h2>
        <p className="share-deck">
          Share the three-song story on WhatsApp, Facebook, X, Telegram, or anywhere
          music finds a home.
        </p>
        <ShareBar />
      </section>

      <section className="faq-section shell" aria-labelledby="faq-title">
        <p className="eyebrow"><span /> Quick notes</p>
        <h2 id="faq-title">Before you press play</h2>
        <div className="faq-grid">
          <details open>
            <summary>Where can I listen?</summary>
            <p>
              The official Spotify players are designed for listeners across India, the
              United States, the United Kingdom, the UAE, African countries, Europe, and
              other Spotify-supported markets. Catalog availability can vary by account
              and location.
            </p>
          </details>
          <details>
            <summary>Do I need a Spotify account?</summary>
            <p>
              You can preview the tracks here. Spotify may ask you to sign in or open its
              app for full playback, depending on your device and region.
            </p>
          </details>
          <details>
            <summary>What order should I play them?</summary>
            <p>
              Begin with “Still Between Us,” continue to “Sheclipse,” and close with
              “Loving You Endlessly” for the intended three-part flow.
            </p>
          </details>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div>
            <a className="wordmark footer-mark" href="#top">S<span aria-hidden="true">•</span>BU</a>
            <p>A three-song story by kkml.</p>
          </div>
          <div className="footer-links">
            <a href="#listen">Listen</a>
            <a href="#story">Story</a>
            <a href="#share">Share</a>
            <a href={tracks[0].url} target="_blank" rel="noopener noreferrer">Spotify ↗</a>
          </div>
          <p className="fine-print">
            © {new Date().getFullYear()} Still Between Us. Spotify is a trademark of
            Spotify AB. This independent page links to official Spotify content.
          </p>
        </div>
      </footer>
    </main>
  );
}
