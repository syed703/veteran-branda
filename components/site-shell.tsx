"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Clock3, Menu, Phone, ShieldCheck } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PHONE, PHONE_LINK, services } from "@/lib/services";
import { SmoothScroll } from "@/components/smooth-scroll";

const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
  { href: "/legal", label: "Legal Pages" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <div className="utility-bar"><div className="container utility-inner"><span><ShieldCheck size={14} /> Proudly veteran owned & operated</span><span className="utility-right"><Clock3 size={14} /> Available 24/7 <i /> <a href={PHONE_LINK}>{PHONE}</a></span></div></div>
    <header className="site-header"><div className="container header-inner">
      <a className="brand" href="/" aria-label="Veteran Solutions and Services home"><img src="/images/brand-mark.webp" width="80" height="44" alt="Veteran eagle and property emblem" /><span><b>VETERAN</b><small>SOLUTIONS & SERVICES LLC</small></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{mainNav.map(n=><a key={n.href} href={n.href} className={(n.href==="/"?pathname==="/":pathname.startsWith(n.href))?"active":""}>{n.label}</a>)}</nav>
      <a className="button button-dark header-quote" href="/contact">Start a project</a>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}><SheetTrigger className="mobile-menu" aria-label="Open navigation"><Menu size={26} /></SheetTrigger><SheetContent className="menu-sheet"><SheetHeader><SheetTitle>Veteran Solutions</SheetTitle></SheetHeader><nav className="mobile-nav" aria-label="Mobile navigation">{mainNav.map(n=><a key={n.href} href={n.href} onClick={()=>setMenuOpen(false)}>{n.label}</a>)}<a className="button button-dark" href="/contact" onClick={()=>setMenuOpen(false)}>Request a quote</a><a className="mobile-phone" href={PHONE_LINK}><Phone size={18} />{PHONE}</a></nav></SheetContent></Sheet>
    </div></header>
  </>;
}
export function SiteFooter() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><div className="footer-brand"><span className="eyebrow light">VETERAN SOLUTIONS & SERVICES LLC</span><h2>Your needs.<br/><em>Our mission.</em></h2><p>Property care with purpose.<br/>One team. Nine ways to make a difference.</p><a className="footer-phone" href={PHONE_LINK}><Phone size={21} />{PHONE}</a><span className="footer-hours"><Clock3 size={15} /> Available 24/7</span></div>
      <div className="footer-links"><h3>Explore</h3>{mainNav.map(n=><a key={n.href} href={n.href}>{n.label}</a>)}</div>
      <div className="footer-links footer-services"><h3>Our services</h3>{services.map(s=><a key={s.slug} href={`/services/${s.slug}`}>{s.name}</a>)}</div>
    </div><div className="footer-wordmark" aria-hidden="true">VETERAN<span>★</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Veteran Solutions and Services LLC</span><span className="footer-policy-links"><a href="/legal/privacy">Privacy Policy</a><a href="/legal/terms">Terms of Use</a></span></div>
  </div></footer>;
}
export function Reveal() {
  const pathname=usePathname();
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("revealed");observer.unobserve(entry.target);}}),{threshold:0.08});
    document.querySelectorAll("[data-reveal]").forEach(el=>{el.classList.add("reveal-ready");observer.observe(el);});
    return ()=>observer.disconnect();
  },[pathname]);
  return null;
}
export function Shell({children}:{children:React.ReactNode}) { return <><a className="skip-link" href="#main">Skip to content</a><SiteHeader/><main id="main">{children}</main><SiteFooter/><Reveal/><SmoothScroll/></>; }
