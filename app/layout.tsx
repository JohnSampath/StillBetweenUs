import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Still Between Us — Three Songs by kkml",
    description:
      "Listen to Still Between Us, Sheclipse, and Loving You Endlessly by kkml in one intimate three-song Spotify story.",
    applicationName: "Still Between Us",
    keywords: [
      "Still Between Us",
      "kkml",
      "Sheclipse",
      "Loving You Endlessly",
      "Spotify songs",
      "new music",
      "independent music",
    ],
    authors: [{ name: "kkml" }],
    creator: "kkml",
    publisher: "Still Between Us",
    alternates: { canonical: "/" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "music.playlist",
      url: "/",
      siteName: "Still Between Us",
      title: "Still Between Us — A Three-Song Story by kkml",
      description:
        "Three songs for the feelings that never really leave. Listen in order on Spotify.",
      locale: "en_US",
      images: [
        {
          url: "/og.png",
          width: 1672,
          height: 941,
          alt: "Still Between Us — A three-song story by kkml",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Still Between Us — A Three-Song Story by kkml",
      description: "Three songs for the feelings that never really leave.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
