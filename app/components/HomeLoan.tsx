"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ContactForm } from "../components/ContactForm";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   INFINZ DESIGN TOKENS
───────────────────────────────────────────── */
const G = {
  primary:        "#1565C0",
  secondary:      "#00BCD4",
  accent:         "#76C800",
  text:           "#1a1a2e",
  textLight:      "#5a6172",
  lightBg:        "#f8fafc",
  border:         "#e2e8f0",
  white:          "#ffffff",
  gradient:       "linear-gradient(135deg, #1565C0 0%, #00BCD4 50%, #76C800 100%)",
  accentGradient: "linear-gradient(90deg, #00BCD4, #76C800)",
  heroBg:         "linear-gradient(135deg, #e8f4ff 0%, #f0fbff 50%, #f5fff0 100%)",
};

/* ══════════════════════════════════════
   GLOBAL STYLES — Poppins everywhere
══════════════════════════════════════ */
function GlobalStyles() {
  useEffect(() => {
    if (document.getElementById("hl-global")) return;
    const s = document.createElement("style");
    s.id = "hl-global";
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

      .hl-page, .hl-page * {
        font-family: 'inter', system-ui, sans-serif;
        box-sizing: border-box;
      }

      .grad-text {
        background: linear-gradient(90deg, #00BCD4, #76C800);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .grad-text-full {
        background: linear-gradient(135deg, #1565C0 0%, #00BCD4 50%, #76C800 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      /* reset gradient bleed on colored backgrounds */
      .on-gradient, .on-gradient * {
        -webkit-text-fill-color: inherit !important;
        background-clip: unset !important;
        -webkit-background-clip: unset !important;
        color: inherit;
      }

      /* card hover */
      .glow-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .glow-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 24px 48px rgba(21,101,192,0.15) !important;
      }

      /* shimmer */
      @keyframes shimmer {
        0%   { transform: translateX(-100%) skewX(-15deg); }
        100% { transform: translateX(220%)  skewX(-15deg); }
      }
      .shimmer-btn { position: relative; overflow: hidden; }
      .shimmer-btn::before {
        content: '';
        position: absolute; top: 0; left: 0; width: 40%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
        animation: shimmer 2.6s ease-in-out infinite;
      }

      .word-inner { will-change: transform; display: inline-block; }

      @keyframes floatY {
        0%,100% { transform: translateY(0); }
        50%      { transform: translateY(-12px); }
      }

      .step-line {
        flex: 1; height: 2px;
        background: linear-gradient(90deg, #1565C0, #76C800);
        opacity: 0.25; align-self: center; min-width: 20px;
      }

      /* Header styles */
      .hl-header {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      }

      /* Footer styles */
      .hl-footer {
        background: #0a0a1a;
        color: #ffffff;
        text-align: center;
      }

      /* ── TABLET RESPONSIVE (769px – 1024px) ── */
      @media (min-width: 769px) and (max-width: 1024px) {

        /* Hero */
        .hl-hero { gap: 36px !important; padding: 56px 5% 64px !important; }
        .hl-hero-left { flex: 1 1 340px !important; }
        .hl-hero-form { flex: 1 1 320px !important; max-width: 420px !important; }
        .hl-bullets { grid-template-columns: 1fr 1fr !important; gap: 10px 16px !important; }

        /* Trust — 2 cols × 3 rows */
        .hl-trust-grid { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }

        /* Features — 2 cols */
        .hl-features-grid { grid-template-columns: 1fr 1fr !important; gap: 18px !important; }

        /* Documents — 1 col */
        .hl-docs-grid { grid-template-columns: 1fr !important; }

        /* EMI — stack */
        .hl-emi-grid { grid-template-columns: 1fr !important; gap: 24px !important; }

        /* Steps - 3 columns in first row, 2 columns in second row */
        .hl-steps-wrap { 
          display: grid !important; 
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 24px !important;
        }
        .hl-step-item:nth-child(4),
        .hl-step-item:nth-child(5) {
          grid-column: span 1 !important;
        }
        .hl-step-item {
          flex: unset !important; 
          min-width: unset !important; 
          max-width: unset !important; 
          width: 100% !important; 
          display: flex !important; 
          align-items: center !important; 
        }
        .hl-step-item .step-card { 
          width: 100% !important; 
          flex: unset !important; 
        }
        .step-arrow { display: none !important; }

        /* section padding */
        .hl-section { padding: 64px 5% !important; }

        /* Final CTA */
        .hl-final-cta { padding: 72px 5% !important; }

        /* Header */
        .hl-header { padding: 16px 5% !important; }
      }

      /* ── MOBILE RESPONSIVE ── */
      @media (max-width: 768px) {

        /* Hero */
        .hl-hero { flex-direction: column !important; padding: 48px 5% 56px !important; gap: 40px !important; }
        .hl-hero-left { flex: unset !important; width: 100% !important; }
        .hl-hero-form { flex: unset !important; width: 100% !important; max-width: 100% !important; }
        .hl-bullets { grid-template-columns: 1fr 1fr !important; }

        /* Trust */
        .hl-trust-grid { grid-template-columns: 1fr 1fr !important; }

        /* Features */
        .hl-features-grid { grid-template-columns: 1fr 1fr !important; }

        /* Documents */
        .hl-docs-grid { grid-template-columns: 1fr !important; }

        /* EMI */
        .hl-emi-grid { grid-template-columns: 1fr !important; }

        /* Steps */
        .hl-steps-wrap { 
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }
        .hl-step-item { 
          flex-direction: column !important; 
          width: 100% !important; 
        }
        .step-arrow { display: none !important; }

        /* section padding */
        .hl-section { padding: 180px 5% !important; }

        /* SectionHead font */
        .hl-section-head h2 { font-size: clamp(1.5rem, 6vw, 2rem) !important; }

        /* Trust heading */
        .hl-trust-head h2 { font-size: clamp(1.5rem, 6vw, 2rem) !important; }

        /* CTA buttons */
        .hl-cta-btns { flex-direction: column !important; align-items: flex-start !important; }

        /* Final CTA */
        .hl-final-cta { padding: 64px 5% !important; }

        /* Trust cards horizontal layout stays readable */
        .hl-trust-grid > div { padding: 20px 16px !important; }

        /* Header */
        .hl-header { padding: 12px 5% !important; }
        .hl-header-logo { font-size: 20px !important; }
        .hl-header-cta { padding: 8px 20px !important; font-size: 13px !important; }

        /* Footer */
        .hl-footer { padding: 20px 5% !important; font-size: 12px !important; }
      }

      @media (max-width: 480px) {
        .hl-trust-grid  { grid-template-columns: 1fr !important; }
        .hl-features-grid { grid-template-columns: 1fr !important; }
        .hl-bullets     { grid-template-columns: 1fr !important; }
        .hl-hero { padding: 40px 5% 48px !important; }
      }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
}

/* ══════════════════════════════════════
   UTILITIES
══════════════════════════════════════ */
function splitWords(text: string, extraStyle?: React.CSSProperties) {
  return text.split(" ").map((word, i) => (
    <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
      <span className="word-inner" style={extraStyle}>{word}&nbsp;</span>
    </span>
  ));
}

function MagneticBtn({
  children, href, style, className,
}: {
  children: React.ReactNode;
  href?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - left - width / 2) * 0.3, y: (e.clientY - top - height / 2) * 0.3, duration: 0.35, ease: "power2.out" });
  }, []);
  const onLeave = useCallback(() => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
  }, []);
  return (
    <a ref={ref} href={href ?? "#"} style={style} className={className}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </a>
  );
}

/* Section heading — word-clip reveal (no underline) */
function SectionHead({
  pre, highlight, post, subtitle,
}: {
  pre?: string; highlight: string; post?: string; subtitle?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll<HTMLElement>(".word-inner");
    gsap.fromTo(words,
      { y: "115%", opacity: 0 },
      { y: "0%", opacity: 1, stagger: 0.06, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" } }
    );
  }, []);

  return (
    <div ref={ref} style={{ textAlign: "center", marginBottom: 48 }}>
      <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, color: G.text, marginBottom: subtitle ? 12 : 0, lineHeight: 1.2 }}>
        {pre && <>{splitWords(pre)}{" "}</>}
        <span style={{
          background: G.accentGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {highlight}
        </span>
        {post && <>{" "}{splitWords(post)}</>}
      </h2>
      {subtitle && <p style={{ color: G.textLight, fontSize: 16, marginTop: 4 }}>{subtitle}</p>}
    </div>
  );
}

/* Generic scroll-reveal */
function useReveal(stagger = 0.13) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(Array.from(ref.current.children),
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, stagger, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 83%", toggleActions: "play none none none" } }
    );
  }, []);
  return ref;
}

/* ══════════════════════════════════════
   HEADER
══════════════════════════════════════ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const applySection = document.getElementById("apply");
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      ref={headerRef}
      className="hl-header hl-header-custom"
      style={{
        padding: "10px 5%",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "none",
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        {/* Logo */}
        <div 
          className="hl-header-logo"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img 
            src="/logo_colour.png" 
            alt="Rakshitha Finserve" 
            style={{
              height: "auto",
              width: "160px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* CTA Button */}
        <MagneticBtn 
          href="#apply"
          className="hl-header-cta shimmer-btn"
          style={{
            background: "#2563eb",
            color: "#ffffff",
            padding: "10px 28px",
            borderRadius: "40px",
            fontWeight: 600,
            fontSize: "14px",
            textDecoration: "none",
            display: "inline-block",
            boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
            transition: "all 0.3s ease",
          }}
        >
          Apply Now 
        </MagneticBtn>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="hl-footer" style={{
      padding: "24px 5%",
      background: G.white,
      color: G.text,
      textAlign: "center",
      borderTop: `1px solid ${G.border}`,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <p style={{
          margin: 0,
          fontSize: "13px",
          opacity: 0.7,
          letterSpacing: "0.3px",
        }}>
          © 2026 Rakshitha Finserve Pvt. Ltd. All rights reserved. | Bangalore
        </p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════
   1. HERO
══════════════════════════════════════ */
function HeroSection() {
  const h1Ref   = useRef<HTMLHeadingElement>(null);
  const subRef  = useRef<HTMLParagraphElement>(null);
  const bullRef = useRef<HTMLUListElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(h1Ref.current?.querySelectorAll(".word-inner") ?? [],
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.05, duration: 0.65 }, 0.1)
      .fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
      .fromTo(bullRef.current?.children ?? [],
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.09, duration: 0.4 }, "-=0.2")
      .fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.1")
      .fromTo(formRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power4.out" }, 0.2);
  }, []);

  const bullets = [
    {  value: "₹5 Crore+", label: "Loan Amount Eligibility"  },
    {  value: "7.10%",     label: "Starting Interest Rates"   },
    { value: "Up to 30",  label: "Flexible Tenure"           },
    { icon: "⚡", value: "10 Min",    label: "Within 10 Min Digital Approval"   },
  ];

  return (
    <section className="hl-section" style={{
      background: G.white,
      padding: "180px 5% 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* ── animated dot grid background ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(21,101,192,0.18) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        pointerEvents: "none", zIndex: 0,
        opacity: 0.55,
      }} />

      {/* gradient glow spots over the dots */}
      <div style={{ position: "absolute", top: -60, left: -60, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(21,101,192,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -60, right: -40, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(118,200,0,0.1) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "20%", right: "20%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,188,212,0.09) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }} className="hl-hero">

        {/* LEFT */}
        <div style={{ flex: "1 1 400px", minWidth: 300 }} className="hl-hero-left">

          <h1 ref={h1Ref} style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, color: G.text, lineHeight: 1.15, marginBottom: 18 }}>
            {splitWords("Get Your Dream Home with")}
            <br />
            <span style={{ 
              display: "inline-block",
              background: G.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Easy Home Loans
            </span>
          </h1>
          <p ref={subRef} style={{ fontSize: 16, color: G.textLight, lineHeight: 1.8, marginBottom: 32, maxWidth: 480 }}>
            Get personalized home loan offers from 50+ banks and NBFCs enjoy competitive interest rates, quick approvals, minimal paperwork, and flexible repayment options tailored to you.
          </p>

          <ul ref={bullRef} style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="hl-bullets">
            {bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}></span>
                <span className="grad-text-full" style={{ fontSize: 15, fontWeight: 700 }}>{b.value}</span>
                <span style={{ fontSize: 14, color: G.textLight }}>{b.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: Form */}
        <div ref={formRef} id="apply" style={{ flex: "1 1 360px", maxWidth: 460, margin: "0 auto" }} className="hl-hero-form">
          <ContactForm />
        </div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   2. TRUST + USPs  — unique layout
══════════════════════════════════════ */
function TrustSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const headRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // heading slides in from left with center alignment
    if (headRef.current) {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%" } }
      );
    }
    // cards fan in with alternating y direction
    if (cardsRef.current) {
      const cards = Array.from(cardsRef.current.children) as HTMLElement[];
      gsap.fromTo(cards,
        (_el: HTMLElement, i: number) => ({ opacity: 0, y: i % 2 === 0 ? 50 : -50, scale: 0.92 }),
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.65, ease: "back.out(1.4)",
          scrollTrigger: { trigger: cardsRef.current, start: "top 82%" } }
      );
    }
  }, []);

  const usps = [
    { icon: "🏦", title: "50+  Lending Partners",       desc: "Get offers from a wide network of trusted banks & NBFCs." },
    { icon: "📉", title: "Interest Rates from 7.10%",    desc: "Get affordable and competitive rates tailored to your profile." },
    { icon: "⚡", title: "Fast Approval in 2 Days",    desc: "Our partners offer quicker approvals with minimal delays." },
    { icon: "📄", title: "Minimal Documentation",      desc: "Submit basic documents digitally. Less paperwork, more convenience." },
    { icon: "🔄", title: "Flexible Repayment Options", desc: "Flexible tenure that suits your income and comfort." },
    { icon: "🔒", title: "100% Secure and Private",    desc: "Strong encryption keeps your data safe and confidential." },
  ];

  return (
    <section className="hl-section" style={{ padding: "80px 5%", background: G.heroBg, position: "relative", overflow: "hidden" }}>
      {/* decorative gradient orbs — brand colors */}
      <div style={{ position: "absolute", top: -100, right: -80, width: 380, height: 380, borderRadius: "50%", background: "rgba(21,101,192,0.07)", filter: "blur(50px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(118,200,0,0.07)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Centered heading - Updated */}
        <div ref={headRef} style={{ marginBottom: 52, textAlign: "center" }} className="hl-trust-head">
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 800, color: G.text, lineHeight: 1.2, margin: "0 0 10px" }}>
            Smart Home Loans at{" "}
            <span style={{ background: G.accentGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Competitive Rates
            </span>
          </h2>
          <p style={{ color: G.textLight, fontSize: 15, margin: 0 }}>Designed to make your home buying journey simple, fast and stress-free</p>
        </div>

        {/* 3×2 grid */}
        <div ref={cardsRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="hl-trust-grid">
          {usps.map((u, i) => (
            <div key={i}
              style={{
                background: G.white,
                border: `1px solid ${G.border}`,
                borderRadius: 20, padding: "26px 22px",
                display: "flex", alignItems: "center", gap: 18,
                boxShadow: "0 2px 16px rgba(21,101,192,0.07)",
                transition: "border-color 0.25s, box-shadow 0.25s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = G.secondary;
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(21,101,192,0.14)";
                gsap.to(e.currentTarget, { y: -6, duration: 0.25 });
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = G.border;
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(21,101,192,0.07)";
                gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: "elastic.out(1,0.4)" });
              }}>
              {/* icon bubble */}
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: G.gradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, boxShadow: "0 4px 14px rgba(21,101,192,0.22)",
              }}>
                {u.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: G.primary, margin: "0 0 5px", lineHeight: 1.4 }}>
                  {u.title}
                </h3>
                <p style={{ fontSize: 13, color: G.textLight, margin: 0, lineHeight: 1.5 }}>{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   3. HOME LOAN OVERVIEW
══════════════════════════════════════ */
function OverviewSection() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const boxRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: bodyRef.current, start: "top 83%" } });
    tl.fromTo(bodyRef.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" })
      .fromTo(boxRef.current,  { opacity: 0, scale: 0.95, y: 28 }, { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "back.out(1.3)" }, "-=0.35");
  }, []);

  return (
    <section className="hl-section" style={{ padding: "80px 5%", background: G.white }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHead pre="What is a" highlight="Home Loan?" subtitle="A simple way to finance your dream home" />
        <div ref={bodyRef}>
          <p style={{ fontSize: 16, color: G.textLight, lineHeight: 1.85, marginBottom: 16, textAlign: "center" }}>
            A home loan helps you <strong style={{ color: G.primary }}>purchase</strong>, <strong style={{ color: G.primary }}>construct</strong>, or <strong style={{ color: G.primary }}>renovate</strong> your home without paying the entire cost upfront. You borrow funds from a bank or financial institution and repay it over time through EMIs (Equated Monthly Installments).
          </p>
          <p style={{ fontSize: 16, color: G.textLight, lineHeight: 1.85, marginBottom: 28, textAlign: "center" }}>
            EMIs include both principal and interest components, making repayment structured, predictable, and manageable over the loan tenure.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   4. KEY FEATURES & BENEFITS
══════════════════════════════════════ */
function FeaturesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headRef.current) {
      gsap.fromTo(headRef.current.querySelectorAll(".word-inner"),
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.06, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 88%" } }
      );
    }
    if (!gridRef.current) return;
    gsap.fromTo(Array.from(gridRef.current.children),
      { opacity: 0, x: -40, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, stagger: 0.12, duration: 0.65, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 82%" } }
    );
  }, []);

  const features = [
    { icon: "💰", title: "High Loan Amount Eligibility", desc: "Get funding based on your income and profile",       num: "01" },
    { icon: "📅", title: "Longer Repayment Tenure",      desc: "Repay comfortably over up to 30 years",              num: "02" },
    { icon: "🏦", title: "Tax Benefits",                 desc: "Save on taxes under applicable sections",            num: "03" },
    { icon: "🔄", title: "Balance Transfer Facility",    desc: "Switch your loan to lower interest rates anytime",   num: "04" },
  ];

  return (
    <section className="hl-section" style={{
      padding: "80px 5%",
      background: G.gradient,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: "30%", width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Heading — white on gradient */}
        <div ref={headRef} style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, color: G.white, lineHeight: 1.2, margin: "0 0 12px" }}>
            {splitWords("Features &")}
            {" "}
            <span style={{ 
              position: "relative", 
              display: "inline-block",
              background: "rgba(255,255,255,0.92)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Benefits
            </span>
            {" "}
            {splitWords("of Smart Home Loan Offers", { color: "rgba(255,255,255,0.85)" })}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, margin: 0 }}>Everything you need to make home ownership easier</p>
        </div>

        {/* 4 cards — horizontal layout, white glass */}
        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }} className="hl-features-grid">
          {features.map((f, i) => (
            <div key={i}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: 22, padding: "32px 26px",
                backdropFilter: "blur(12px)",
                position: "relative", overflow: "hidden",
                transition: "background 0.3s, border-color 0.3s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.45)";
                gsap.to(e.currentTarget, { y: -7, duration: 0.25 });
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.22)";
                gsap.to(e.currentTarget, { y: 0, duration: 0.35, ease: "elastic.out(1,0.4)" });
              }}>

              {/* large faint number */}
              <div style={{
                position: "absolute", top: -10, right: 12,
                fontSize: 72, fontWeight: 900,
                color: "rgba(255,255,255,0.08)",
                lineHeight: 1, pointerEvents: "none", userSelect: "none",
              }}>{f.num}</div>

              {/* icon */}
              <div style={{
                width: 54, height: 54, borderRadius: 16,
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, marginBottom: 20,
              }}>
                {f.icon}
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 700, color: G.white, margin: "0 0 8px", lineHeight: 1.4 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.55 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   5. DOCUMENTS REQUIRED
══════════════════════════════════════ */
function DocumentsSection() {
  const lRef = useRef<HTMLDivElement>(null);
  const rRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: lRef.current, start: "top 83%" } });
    tl.fromTo(lRef.current,  { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.75, ease: "power3.out" })
      .fromTo(rRef.current,  { x:  50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.75, ease: "power3.out" }, "-=0.55");

    [lRef, rRef].forEach(ref => {
      if (ref.current) {
        gsap.fromTo(ref.current.querySelectorAll(".doc-item"),
          { opacity: 0, x: 16 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.45, ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: "top 80%" } }
        );
      }
    });
  }, []);

  const cats = [
    { title: "Salaried",      icon: "💼", ref: lRef, docs: ["ID Proof (Aadhaar, PAN, etc.)", "Salary Slips", "Bank Statements"] },
    { title: "Self-Employed", icon: "🏢", ref: rRef, docs: ["Income Tax Returns (ITR)", "Business Proof", "Financial Statements"] },
  ];

  return (
    <section className="hl-section" style={{ padding: "80px 5%", background: G.lightBg, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(0,188,212,0.06)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -40, left: "20%", width: 220, height: 220, borderRadius: "50%", background: "rgba(118,200,0,0.06)", filter: "blur(30px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHead pre="Documents Required for" highlight="Home Loan" subtitle="Simple documentation for faster approval" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }} className="hl-docs-grid">
          {cats.map((cat, i) => (
            <div key={i} ref={cat.ref}
              style={{
                background: G.white, borderRadius: 20,
                border: `1px solid ${G.border}`,
                overflow: "hidden",
                boxShadow: "0 2px 14px rgba(21,101,192,0.07)",
              }}
              onMouseEnter={e => gsap.to(e.currentTarget, { y: -5, duration: 0.25 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { y:  0, duration: 0.35, ease: "elastic.out(1,0.4)" })}>

              {/* header strip */}
              <div style={{
                background: i === 0
                  ? "linear-gradient(90deg, rgba(21,101,192,0.08), rgba(0,188,212,0.05))"
                  : "linear-gradient(90deg, rgba(118,200,0,0.08), rgba(0,188,212,0.05))",
                padding: "18px 24px",
                display: "flex", alignItems: "center", gap: 12,
                borderBottom: `1px solid ${G.border}`,
              }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: G.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 3px 10px rgba(21,101,192,0.2)" }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: G.primary, margin: 0 }}>{cat.title}</h3>
              </div>

              {/* doc chips */}
              <div style={{ padding: "22px 24px", display: "flex", gap: 10, flexWrap: "wrap" }}>
                {cat.docs.map((doc, j) => (
                  <div key={j} className="doc-item" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: G.lightBg, borderRadius: 50,
                    padding: "8px 16px", border: `1px solid ${G.border}`,
                  }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: G.gradient, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: G.white, fontWeight: 800, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: G.text }}>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   6. EMI CALCULATOR
══════════════════════════════════════ */
function EMICalculator() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [loanAmt, setLoanAmt] = useState(5000000);
  const [rate,    setRate]    = useState(8.5);
  const [tenure,  setTenure]  = useState(20);

  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.fromTo(Array.from(wrapRef.current.children),
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: wrapRef.current, start: "top 80%" } }
    );
  }, []);

  const r     = rate / 12 / 100;
  const m     = tenure * 12;
  const emi   = r > 0 ? Math.round((loanAmt * r * Math.pow(1+r,m)) / (Math.pow(1+r,m)-1)) : Math.round(loanAmt/m);
  const total = emi * m;
  const fmt   = (v: number) => "₹" + v.toLocaleString("en-IN");

  return (
    <section id="emi" className="hl-section" style={{ padding: "80px 5%", background: G.lightBg }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHead pre="Calculate Your" highlight="Home Loan EMI" subtitle="Plan your finances before you apply" />
        <div ref={wrapRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }} className="hl-emi-grid">

          {/* Sliders */}
          <div style={{ background: G.white, borderRadius: 20, padding: "36px 32px", border: `1px solid ${G.border}`, boxShadow: "0 4px 20px rgba(21,101,192,0.08)" }}>
            {[
              { label: "Loan Amount",          value: loanAmt, min: 500000,   max: 50000000, step: 100000, display: fmt(loanAmt),       set: setLoanAmt },
              { label: "Interest Rate (p.a.)", value: rate,    min: 6,        max: 20,       step: 0.1,    display: rate.toFixed(1)+"%", set: setRate    },
              { label: "Tenure",               value: tenure,  min: 1,        max: 30,       step: 1,      display: tenure+" Years",     set: setTenure  },
            ].map(({ label, value, min, max, step, display, set }) => (
              <div key={label} style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: G.textLight }}>{label}</label>
                  <span className="grad-text" style={{ fontWeight: 800, fontSize: 14 }}>{display}</span>
                </div>
                <input type="range" min={min} max={max} step={step} value={value}
                  onChange={e => set(Number(e.target.value))}
                  style={{ width: "100%", accentColor: G.primary, cursor: "pointer" }} />
              </div>
            ))}
          </div>

          {/* EMI Output */}
          <div className="on-gradient" style={{ background: G.gradient, borderRadius: 20, padding: "36px 32px", textAlign: "center", color: G.white, boxShadow: "0 14px 44px rgba(21,101,192,0.25)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: 12, opacity: 0.75, letterSpacing: 1.5, marginBottom: 8, fontWeight: 600 }}>MONTHLY EMI</p>
            <div style={{ fontSize: 48, fontWeight: 900, marginBottom: 6, letterSpacing: -1 }}>{fmt(emi)}</div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.2)", margin: "24px 0" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["Total Payment", fmt(total)], ["Total Interest", fmt(total - loanAmt)], ["Principal", fmt(loanAmt)], ["Rate p.a.", rate.toFixed(1)+"%"]].map(([k, v]) => (
                <div key={k} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 12px" }}>
                  <p style={{ fontSize: 11, opacity: 0.7, marginBottom: 4, fontWeight: 500 }}>{k}</p>
                  <p style={{ fontSize: 15, fontWeight: 700 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   8. PROCESS — 5 STEPS (3 in first row, 2 in second row on tablet)
══════════════════════════════════════ */
function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headRef.current) {
      gsap.fromTo(headRef.current.querySelectorAll(".word-inner"),
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.06, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 88%" } }
      );
    }
    if (!stepsRef.current) return;
    gsap.fromTo(stepsRef.current.querySelectorAll(".step-card"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.65, ease: "back.out(1.3)",
        scrollTrigger: { trigger: stepsRef.current, start: "top 82%" } }
    );
  }, []);

  const steps = [
    { icon: "📝", title: "Fill Application Form", desc: "Share your basic details online",          num: "01" },
    { icon: "📄", title: "Submit Documents",       desc: "Upload required documents easily",         num: "02" },
    { icon: "✅", title: "Complete KYC",            desc: "Get done with KYC verification",           num: "03" },
    { icon: "🔍", title: "Loan Approval",           desc: "Get matched with the best lenders",        num: "04" },
    { icon: "💰", title: "Loan Disbursement",       desc: "Receive funds quickly and hassle-free",    num: "05" },
  ];

  return (
    <section ref={sectionRef} className="hl-section" style={{
      padding: "80px 5%",
      background: G.heroBg,
      position: "relative", overflow: "hidden",
    }}>
      {/* orb decorations */}
      <div style={{ position: "absolute", top: -80, left: -80, width: 340, height: 340, borderRadius: "50%", background: "rgba(21,101,192,0.06)", filter: "blur(50px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(118,200,0,0.07)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Heading - removed underline-draw */}
        <div ref={headRef} style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, color: G.text, lineHeight: 1.2, margin: 0 }}>
            {splitWords("Get Smart Home Loan Offers in")}
            {" "}
            <span style={{
              background: G.accentGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              5 Simple Steps
            </span>
          </h2>
        </div>

        {/* Steps - Grid layout for desktop, tablet will override to 3x2 grid */}
        <div ref={stepsRef} style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(5, 1fr)", 
          gap: 20,
          alignItems: "stretch"
        }} className="hl-steps-wrap">
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", width: "100%" }} className="hl-step-item">
              {/* Card */}
              <div className="step-card" style={{
                width: "100%",
                background: G.white,
                borderRadius: 20, padding: "32px 20px",
                textAlign: "center",
                border: `1px solid ${G.border}`,
                boxShadow: "0 4px 20px rgba(21,101,192,0.08)",
                position: "relative", overflow: "hidden",
                cursor: "default",
                transition: "box-shadow 0.25s, border-color 0.25s",
              }}
              onMouseEnter={e => {
                gsap.to(e.currentTarget, { y: -6, duration: 0.25 });
                gsap.to(`.step-orb-${i}`, { scale: 1.15, duration: 0.25 });
                (e.currentTarget as HTMLElement).style.borderColor = G.secondary;
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(21,101,192,0.16)";
              }}
              onMouseLeave={e => {
                gsap.to(e.currentTarget, { y: 0, duration: 0.35, ease: "elastic.out(1,0.4)" });
                gsap.to(`.step-orb-${i}`, { scale: 1, duration: 0.25 });
                (e.currentTarget as HTMLElement).style.borderColor = G.border;
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(21,101,192,0.08)";
              }}>

                {/* faint step number watermark */}
                <div style={{ position: "absolute", top: -8, right: 10, fontSize: 68, fontWeight: 900, color: "rgba(21,101,192,0.05)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
                  {s.num}
                </div>

                {/* gradient step number badge */}
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: G.gradient, borderRadius: 50, padding: "3px 12px", marginBottom: 16, boxShadow: "0 3px 10px rgba(21,101,192,0.25)" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: G.white, letterSpacing: 1.5 }}>STEP {s.num}</span>
                </div>

                {/* icon circle */}
                <div className={`step-orb-${i}`} style={{ width: 60, height: 60, background: "rgba(21,101,192,0.07)", border: `2px solid rgba(21,101,192,0.15)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 18px" }}>
                  {s.icon}
                </div>

                <h3 style={{ fontSize: 15, fontWeight: 700, color: G.primary, margin: "0 0 6px", lineHeight: 1.4 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 12, color: G.textLight, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </div>

              {/* connector arrow - hidden in tablet/mobile */}
              {i < steps.length - 1 && (
                <div className="step-arrow" style={{ flex: "0 0 32px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="url(#ag)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="ag" x1="5" y1="12" x2="19" y2="12" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1565C0"/>
                        <stop offset="0.5" stopColor="#00BCD4"/>
                        <stop offset="1" stopColor="#76C800"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   11. FAQs
══════════════════════════════════════ */
function FAQSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number|null>(null);
  const ansRefs = useRef<(HTMLDivElement|null)[]>([]);

  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(Array.from(listRef.current.children),
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, stagger: 0.09, duration: 0.55, ease: "power2.out",
        scrollTrigger: { trigger: listRef.current, start: "top 83%" } }
    );
  }, []);

  const toggle = (i: number) => {
    const el = ansRefs.current[i]; if (!el) return;
    if (open === i) {
      gsap.to(el, { maxHeight: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      setOpen(null);
    } else {
      if (open !== null && ansRefs.current[open]) gsap.to(ansRefs.current[open]!, { maxHeight: 0, opacity: 0, duration: 0.25 });
      setOpen(i);
      gsap.fromTo(el, { maxHeight: 0, opacity: 0 }, { maxHeight: 350, opacity: 1, duration: 0.42, ease: "power2.out" });
    }
  };

  const faqs = [
    { q: "What is a home loan?",       a: "A home loan is a financial product that helps you purchase, build, or renovate a home by borrowing funds and repaying them in EMIs." },
    { q: "How much loan can I get?",   a: "Your loan amount depends on your income, credit score, age, and repayment capacity." },
    { q: "What is EMI?",               a: "EMI (Equated Monthly Installment) is the fixed amount you pay every month to repay your loan." },
    { q: "What is the eligibility?",   a: "Eligibility depends on factors like income, employment type, age, and credit score." },
    { q: "Can I prepay my loan?",      a: "Yes, most lenders allow prepayment or foreclosure, sometimes with minimal or no charges." },
  ];

  return (
    <section className="hl-section" style={{ padding: "80px 5%", background: G.lightBg }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <SectionHead pre="Home Loan" highlight="FAQs" />
        <div ref={listRef}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: 10, borderRadius: 14, overflow: "hidden", border: `1.5px solid ${open === i ? G.primary : G.border}`, transition: "border-color 0.25s", background: G.white }}>
              <button onClick={() => toggle(i)} style={{ width: "100%", padding: "18px 22px", background: open === i ? "rgba(21,101,192,0.04)" : G.white, border: "none", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: open === i ? G.primary : G.text }}>{faq.q}</span>
                <span style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: open === i ? G.gradient : G.lightBg, color: open === i ? G.white : G.textLight, fontWeight: 700, fontSize: 18, flexShrink: 0, marginLeft: 16 }}>
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <div ref={el => { ansRefs.current[i] = el; }} style={{ maxHeight: 0, overflow: "hidden", opacity: 0 }}>
                <div style={{ padding: "0 22px 20px", color: G.textLight, lineHeight: 1.8, fontSize: 14 }}>{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   12. FINAL CTA
══════════════════════════════════════ */
function FinalCTA() {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current) return;
    const words = innerRef.current.querySelectorAll<HTMLElement>(".word-inner");
    const tl = gsap.timeline({ scrollTrigger: { trigger: innerRef.current, start: "top 85%" } });
    tl.fromTo(words, { y: "115%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.05, duration: 0.65, ease: "power3.out" });
    tl.fromTo(innerRef.current.querySelectorAll(".cta-fade"),
      { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }, "-=0.2");
    gsap.to(".ctab1", { scale: 1.18, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".ctab2", { scale: 1.14, duration: 5.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
  }, []);

  return (
    <section className="on-gradient hl-final-cta" style={{ padding: "96px 5%", background: G.gradient, textAlign: "center", position: "relative", overflow: "hidden", color: G.white }}>
      <div className="ctab1" style={{ position: "absolute", top: -70,  left: -70,  width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
      <div className="ctab2" style={{ position: "absolute", bottom: -90, right: -90, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

      <div ref={innerRef} style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.15 }}>
          {splitWords("Ready to Own Your")} <br />
          {splitWords("Dream Home?")}
        </h2>
        <p className="cta-fade" style={{ fontSize: 16, opacity: 0.88, marginBottom: 32, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.75 }}>
          Get the best home loan offers tailored to your needs—fast, simple, and hassle-free. Check eligibility and apply in minutes.
        </p>
        <MagneticBtn href="#apply" className="cta-fade shimmer-btn" style={{ background: "#2563eb", color: G.white, padding: "16px 46px", borderRadius: 50, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block", boxShadow: "0 8px 28px rgba(37,99,235,0.4)", marginTop: 8 }}>
          Contact Us
        </MagneticBtn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   ROOT
══════════════════════════════════════ */
export default function HomeLoanLandingPage() {
  useEffect(() => {
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <main className="hl-page" style={{ overflowX: "hidden" }}>
      <GlobalStyles />
      <Header />
      <HeroSection />
      <TrustSection />
      <OverviewSection />
      <FeaturesSection />
      <DocumentsSection />
      <EMICalculator />
      <ProcessSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}