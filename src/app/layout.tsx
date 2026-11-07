import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/theme/tailwind-directives.css";

const inter = Inter({ subsets: ["latin"] });

const title = "Kittichote Shane";
const description = "I am a software engineer, a builder, a creator.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kittichotekamalapirat.github.io"),
  title,
  description,
  icons: { icon: "/logo.svg" },
  openGraph: {
    title,
    description,
    type: "website",
    images: ["/v4.webp"],
  },
  twitter: { card: "summary_large_image", title, description },
};

// set the theme before first paint so there is no light -> dark flash
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
