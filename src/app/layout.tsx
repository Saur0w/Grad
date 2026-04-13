import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Gradient",
  description: "~@sauroww(X) @saur0w(GitHub)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Header />
      {children}
      </body>
    </html>
  );
}
