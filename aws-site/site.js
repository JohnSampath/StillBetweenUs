const shareText = "Still Between Us — a three-song story by kkml";
const status = document.querySelector("[data-share-status]");

function openShare(channel) {
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

document.querySelectorAll("[data-share]").forEach((button) => {
  button.addEventListener("click", async () => {
    const channel = button.dataset.share;
    if (channel === "copy") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        status.textContent = "Link copied";
      } catch {
        status.textContent = "Copy the address from your browser";
      }
      return;
    }
    openShare(channel);
  });
});

const spotifyConsentKey = "stillbetweenus_spotify_embeds";

function spotifyChoice() {
  const value = window.localStorage.getItem(spotifyConsentKey);
  return value === "allowed" || value === "links-only" ? value : null;
}

function renderSpotifyChoice() {
  const choice = spotifyChoice();
  document.querySelectorAll("[data-spotify-consent]").forEach((button) => {
    const selected = button.dataset.spotifyConsent === choice;
    button.setAttribute("aria-pressed", String(selected));
    if (button.dataset.spotifyConsent === "allowed") {
      button.textContent = choice === "allowed" ? "Players loaded" : "Load Spotify players";
    } else {
      button.textContent = choice === "links-only" ? "Using links only" : "Keep players off";
    }
  });

  document.querySelectorAll("[data-spotify-embed]").forEach((container) => {
    const iframe = container.querySelector("iframe");
    if (choice === "allowed" && !iframe) {
      const player = document.createElement("iframe");
      player.className = "spotify-player";
      player.src = container.dataset.src;
      player.width = "100%";
      player.height = container.dataset.height;
      player.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      player.loading = "lazy";
      player.title = container.dataset.title;
      container.replaceChildren(player);
      container.classList.remove("spotify-placeholder");
    } else if (choice !== "allowed" && iframe) {
      container.classList.add("spotify-placeholder");
      const icon = document.createElement("span");
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "♪";
      const message = document.createElement("p");
      message.textContent = "Spotify player is off until you choose ‘Load Spotify players.’";
      container.replaceChildren(icon, message);
    }
  });
}

document.querySelectorAll("[data-spotify-consent]").forEach((button) => {
  button.addEventListener("click", () => {
    window.localStorage.setItem(spotifyConsentKey, button.dataset.spotifyConsent);
    renderSpotifyChoice();
  });
});

renderSpotifyChoice();
