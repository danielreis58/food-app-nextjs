import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food app NextJS",
  description: "Food app NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
