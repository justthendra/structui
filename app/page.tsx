import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsMarquee from "@/components/StatsMarquee";
import WhatIsWondx from "@/components/WhatIsWondx";
import AssetTypesMarquee from "@/components/AssetTypesMarquee";
import PlatformBento from "@/components/PlatformBento";
import QuoteSection from "@/components/QuoteSection";
import CommunitySection from "@/components/CommunitySection";
import EarlyAccessCTA from "@/components/EarlyAccessCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="teaser-root bg-white min-h-screen overflow-x-hidden antialiased text-[#202020]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://structui.dev/#website",
                url: "https://structui.dev",
                name: "structui",
                description:
                  "An open-source creative code marketplace and portfolio for developers to discover, copy, and publish UI components 100% free.",
                publisher: {
                  "@id": "https://structui.dev/#organization",
                },
              },
              {
                "@type": "Organization",
                "@id": "https://structui.dev/#organization",
                name: "structui",
                url: "https://structui.dev",
                logo: "https://structui.dev/icons/structui-icon.png",
                sameAs: [
                  "https://discord.gg/structui",
                  "https://github.com",
                  "https://kodikas.org",
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://structui.dev/#webpage",
                url: "https://structui.dev",
                name: "structui – Free Component Marketplace & Code Ecosystem",
                isPartOf: {
                  "@id": "https://structui.dev/#website",
                },
                description:
                  "An open-source creative code marketplace and portfolio for developers to discover, copy, and publish UI components 100% free.",
              },
            ],
          }),
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Live Community Stats Ticker */}
        <StatsMarquee />

        {/* What is structui */}
        <WhatIsWondx />

        {/* Code Categories Marquee */}
        <AssetTypesMarquee />

        {/* Platform Bento Grid */}
        <PlatformBento />

        {/* Quote Divider */}
        <QuoteSection />

        {/* Community / Discord Section */}
        <CommunitySection />

        {/* Early Access CTA */}
        <EarlyAccessCTA />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
