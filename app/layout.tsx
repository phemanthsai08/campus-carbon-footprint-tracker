import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Carbon Footprint Tracker 🌱",
  description:
    "Track, understand, and reduce your campus carbon footprint. Log transport, energy, food & waste — make your campus greener.",
  keywords: [
    "carbon footprint",
    "campus sustainability",
    "climate action",
    "eco tracker",
    "student",
  ],
  openGraph: {
    title: "Campus Carbon Footprint Tracker",
    description: "Measure & reduce your impact on campus 🌍",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="leaf-bg">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
