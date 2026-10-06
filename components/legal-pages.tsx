import { FileText, ShieldCheck } from "lucide-react";
import { Shell } from "@/components/site-shell";
import { PHONE, PHONE_LINK } from "@/lib/services";

type LegalSection = { id: string; title: string; paragraphs: string[] };

const privacySections: LegalSection[] = [
  {
    id: "information",
    title: "Information you send us",
    paragraphs: [
      "When you submit a quote request, we receive your name, phone number, email address, property ZIP code, selected service and the project details you provide. The website also records a submission time and a reference number so we can identify your request.",
      "Please avoid sending payment card numbers, government identification or other sensitive information in the project description. The quote form does not ask for those details.",
    ],
  },
  {
    id: "use",
    title: "How the information is used",
    paragraphs: [
      "We use your enquiry details to respond to you, understand the work you have in mind, discuss an estimate or schedule and keep a record of the conversation. A quote request does not automatically book a service.",
    ],
  },
  {
    id: "storage",
    title: "Storage and website providers",
    paragraphs: [
      "Quote requests are stored in the website’s enquiry database. The hosting and database providers process information needed to run the site and deliver your request. Basic technical information, such as a browser or network address, may be processed by the hosting infrastructure for site operation and security.",
      "Information may be made available to people helping us respond to your request or provide the service, and may be disclosed when required by law.",
    ],
  },
  {
    id: "retention",
    title: "Records and your questions",
    paragraphs: [
      "Enquiry records may be kept as needed to answer requests, manage service discussions and meet recordkeeping obligations. If you have a question about information you submitted or want to request a correction or deletion, contact us using the number below.",
    ],
  },
  {
    id: "updates",
    title: "Changes to this notice",
    paragraphs: [
      "If the way this website handles enquiries changes, this page may be updated. The date shown above tells you when this notice was last revised.",
    ],
  },
];

const termsSections: LegalSection[] = [
  {
    id: "website",
    title: "About this website",
    paragraphs: [
      "This website introduces Veteran Solutions and Services LLC and its property services. The descriptions are general information to help you decide what to ask about; they do not promise that a particular service or result is available for every property.",
    ],
  },
  {
    id: "quotes",
    title: "Requests, estimates and work",
    paragraphs: [
      "Sending a quote request is an invitation to discuss your project. It does not reserve a date, create a service agreement or establish a final price. Scope, materials, site conditions, access, scheduling and any required approvals are reviewed before work is agreed.",
      "Any estimate or service arrangement is governed by the details agreed directly with you for that project.",
    ],
  },
  {
    id: "images",
    title: "Photography and examples",
    paragraphs: [
      "The website includes stock imagery and illustrative before-and-after concepts to help explain services and possibilities. Those concepts are not photographs of completed client projects and do not guarantee a specific result.",
    ],
  },
  {
    id: "use",
    title: "Using the site",
    paragraphs: [
      "Please use the website and quote form for genuine service enquiries. Do not try to disrupt the site, submit misleading requests or access information that is not intended for you.",
    ],
  },
  {
    id: "updates",
    title: "Changes and contact",
    paragraphs: [
      "Site content and these terms may be updated. For a question about a service, quote or this website, call us using the number below.",
    ],
  },
];

export function LegalIndexPage() {
  return <Shell>
    <section className="page-intro legal-intro"><div className="container">
      <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>Legal Pages</span></div>
      <span className="eyebrow"><span className="label-line"/>THE IMPORTANT DETAILS</span>
      <h1>Clear information.<br/><em>Easy to find.</em></h1>
      <p>How this website handles your enquiry and what to know before requesting a service.</p>
    </div></section>
    <section className="legal-directory section"><div className="container">
      <div className="legal-directory-heading" data-reveal><span>LEGAL PAGES / 01—02</span><p>Choose a page below for the details.</p></div>
      <div className="legal-cards">
        <a className="legal-card" href="/legal/privacy" data-reveal><span className="legal-card-icon"><ShieldCheck size={30}/></span><span className="legal-card-number">01 / YOUR INFORMATION</span><h2>Privacy Policy</h2><p>What the quote form collects, how enquiries are used and who to contact with a question.</p><span className="underlined-link">Read privacy policy</span></a>
        <a className="legal-card" href="/legal/terms" data-reveal><span className="legal-card-icon"><FileText size={30}/></span><span className="legal-card-number">02 / USING THE SITE</span><h2>Terms of Use</h2><p>How service enquiries, estimates, site content and illustrative images should be understood.</p><span className="underlined-link">Read terms of use</span></a>
      </div>
    </div></section>
  </Shell>;
}

export function LegalDocumentPage({kind}:{kind:"privacy"|"terms"}) {
  const privacy=kind==="privacy";
  const title=privacy?"Privacy Policy":"Terms of Use";
  const sections=privacy?privacySections:termsSections;
  return <Shell>
    <section className="page-intro legal-intro legal-document-intro"><div className="container">
      <div className="breadcrumb"><a href="/">Home</a><span>/</span><a href="/legal">Legal Pages</a><span>/</span><span>{title}</span></div>
      <span className="eyebrow"><span className="label-line"/>{privacy?"YOUR INFORMATION":"USING THE WEBSITE"}</span>
      <h1>{title}</h1>
      <p>Veteran Solutions and Services LLC · Last updated October 6, 2026</p>
    </div></section>
    <section className="legal-document section"><div className="container legal-document-grid">
      <aside className="legal-sidebar"><span>ON THIS PAGE</span><nav aria-label={`${title} sections`}>{sections.map(s=><a href={`#${s.id}`} key={s.id}>{s.title}</a>)}</nav><a className="legal-back" href="/legal">View all legal pages</a></aside>
      <div className="legal-article"><p className="legal-lead">{privacy?"We want you to know what happens to the details you share when you contact us through this website.":"These terms explain how to use this website and what happens when you request a quote."}</p>
        {sections.map((s,i)=><section className="legal-article-section" id={s.id} key={s.id}><span>{String(i+1).padStart(2,"0")}</span><div><h2>{s.title}</h2>{s.paragraphs.map(p=><p key={p}>{p}</p>)}</div></section>)}
        <div className="legal-contact"><span>NEED TO SPEAK WITH US?</span><h2>Let’s talk it through.</h2><p>Call Veteran Solutions and Services LLC with any question about this page or your enquiry.</p><a href={PHONE_LINK}>{PHONE}</a></div>
      </div>
    </div></section>
  </Shell>;
}
