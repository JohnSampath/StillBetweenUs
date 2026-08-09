"use client";

import { useEffect, useState } from "react";

const consentKey = "stillbetweenus_spotify_embeds";
const consentEvent = "stillbetweenus:spotify-consent";

type ConsentChoice = "allowed" | "links-only" | null;

function readConsent(): ConsentChoice {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(consentKey);
  return value === "allowed" || value === "links-only" ? value : null;
}

function useSpotifyConsent() {
  const [choice, setChoice] = useState<ConsentChoice>(null);

  useEffect(() => {
    const update = () => setChoice(readConsent());
    update();
    window.addEventListener(consentEvent, update);
    return () => window.removeEventListener(consentEvent, update);
  }, []);

  return choice;
}

function saveConsent(choice: Exclude<ConsentChoice, null>) {
  window.localStorage.setItem(consentKey, choice);
  window.dispatchEvent(new Event(consentEvent));
}

export function SpotifyPrivacyNotice() {
  const choice = useSpotifyConsent();

  return (
    <aside className="privacy-notice" id="privacy" aria-labelledby="privacy-title">
      <div>
        <p className="privacy-kicker">Privacy &amp; cookies</p>
        <h3 id="privacy-title">You choose when Spotify loads.</h3>
        <p>
          Official Spotify players are third-party embeds. If you load them, Spotify and
          its providers may use cookies or similar technologies and process usage data.
          You can keep the players off and use the direct Spotify links instead.
        </p>
        <p className="privacy-links">
          <a href="https://developer.spotify.com/documentation/embeds/terms" target="_blank" rel="noopener noreferrer">Spotify Widget Terms ↗</a>
          <a href="https://www.spotify.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Spotify Privacy Policy ↗</a>
          <span>Manage third-party cookies in your browser settings.</span>
        </p>
      </div>
      <div className="privacy-actions" aria-live="polite">
        <button type="button" className="button button-primary" onClick={() => saveConsent("allowed")}>
          {choice === "allowed" ? "Players loaded" : "Load Spotify players"}
        </button>
        <button type="button" className="privacy-secondary" onClick={() => saveConsent("links-only")}>
          {choice === "links-only" ? "Using links only" : "Keep players off"}
        </button>
      </div>
    </aside>
  );
}

type SpotifyEmbedProps = {
  kind: "track" | "artist";
  id: string;
  title: string;
  height: number;
};

export function SpotifyEmbed({ kind, id, title, height }: SpotifyEmbedProps) {
  const choice = useSpotifyConsent();

  if (choice !== "allowed") {
    return (
      <div className={`spotify-placeholder spotify-placeholder-${kind}`} style={{ minHeight: height }}>
        <span aria-hidden="true">♪</span>
        <p>Spotify player is off until you choose “Load Spotify players.”</p>
      </div>
    );
  }

  return (
    <iframe
      className={`spotify-player spotify-player-${kind}`}
      src={`https://open.spotify.com/embed/${kind}/${id}?utm_source=stillbetweenus`}
      width="100%"
      height={height}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title={title}
    />
  );
}
