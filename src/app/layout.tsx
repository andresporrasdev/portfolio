import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Andres Porras | Full Stack Developer",
  description:
    "Full Stack Developer based in Ontario, Canada with 6+ years of experience in React, Node.js, Java, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
