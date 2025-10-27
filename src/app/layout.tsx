import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Implifire AI Social Agent",
  description: "Upload → AI writes → Auto-posts to 6 platforms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
