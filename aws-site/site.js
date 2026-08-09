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
