import type { Metadata } from "next";
import "./globals.css";
import { AppClientProviders } from "./providers";

export const metadata: Metadata = {
  title: "Ranked Scores",
  description: "See all-time ranked scores against other players",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppClientProviders>
          {children}
        </AppClientProviders>
      </body>
    </html>
  );
}
