"use client";

import { useState } from "react";

const shareText = "Still Between Us — a three-song story by kkml";

export function ShareBar() {
  const [status, setStatus] = useState("");

  function shareTo(channel: "whatsapp" | "facebook" | "x" | "telegram") {
    const pageUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(shareText);
    const urls = {
      whatsapp: `https://wa.me/?text=${text}%20${pageUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${pageUrl}`,
      telegram: `https://t.me/share/url?url=${pageUrl}&text=${text}`,
    };
    window.open(urls[channel], "_blank", "noopener,noreferrer,width=720,height=620");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("Link copied");
    } catch {
      setStatus("Copy the address from your browser");
    }
  }

  return (
    <div>
      <div className="share-bar" aria-label="Share Still Between Us">
        <button type="button" onClick={() => shareTo("whatsapp")}>WhatsApp <span>↗</span></button>
        <button type="button" onClick={() => shareTo("facebook")}>Facebook <span>↗</span></button>
        <button type="button" onClick={() => shareTo("x")}>X <span>↗</span></button>
        <button type="button" onClick={() => shareTo("telegram")}>Telegram <span>↗</span></button>
        <button type="button" onClick={copyLink}>Copy link <span>＋</span></button>
      </div>
      <p className="share-status" aria-live="polite">{status}</p>
    </div>
  );
}
