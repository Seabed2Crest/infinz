import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Script from "next/script";
import SeoSchema from "./components/SeoSchema";
import MetaPixelTracker from "./components/MetaPixelTracker";

export const metadata: Metadata = {
  title: "Infinz – Industry-Focused Learning & Professional Training",
  description:
    "Infinz provides industry-focused courses and professional training programs designed to build real-world skills and career growth.",

  other: {
    "facebook-domain-verification": "gtbpf36jgkptgouwyuc0b0m13hfxjo",
  },

  alternates: {
    canonical: "https://www.1infinz.com/",
  },

  openGraph: {
    type: "website",
    siteName: "Infinz",
    url: "https://www.1infinz.com/",
    title: "Infinz – Industry-Focused Learning & Professional Training",
    description:
      "Infinz provides industry-focused courses and professional training programs designed to build real-world skills and career growth.",
    images: ["https://www.1infinz.com/logo_colour.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Infinz – Industry-Focused Learning & Professional Training",
    description:
      "Infinz offers career-oriented courses and professional training programs to help learners gain industry-ready skills.",
    images: ["https://www.1infinz.com/assets/images/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {/* ✅ Meta Pixel Script MUST be in body */}
        <Script
          id="meta-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];
              t=b.createElement(e);t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}
              (window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '1273028101423036');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* ✅ NoScript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1273028101423036&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* ✅ Tracks PageView on every route change */}
        <MetaPixelTracker />

        {/* ✅ SEO Schema */}
        <SeoSchema />

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}