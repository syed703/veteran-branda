"use client";

import { useState, type CSSProperties } from "react";
import { MoveHorizontal } from "lucide-react";

type Comparison = {
  number: string;
  service: string;
  title: string;
  description: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

const comparisons: Comparison[] = [
  {
    number: "01", service: "RENOVATING", title: "A room, reimagined",
    description: "See how refreshed finishes can change the feel of a room.",
    before: "/images/comparison-before.webp", after: "/images/renovation-interior.jpg",
    beforeAlt: "Illustrative living room before a refresh",
    afterAlt: "Illustrative refreshed living room with wood floors",
  },
  {
    number: "02", service: "EXTERIOR CARE", title: "A welcome return",
    description: "Explore the difference careful exterior attention can make.",
    before: "/images/comparison-house-before.webp", after: "/images/hero-house.jpg",
    beforeAlt: "Illustrative home exterior before a refresh",
    afterAlt: "Illustrative clean white home and landscaped yard",
  },
  {
    number: "03", service: "POOL CLEANING", title: "Ready to enjoy again",
    description: "Picture an inviting pool and a space ready to use.",
    before: "/images/comparison-pool-before.webp", after: "/images/pool-cleaning.webp",
    beforeAlt: "Illustrative pool before cleaning",
    afterAlt: "Illustrative clear pool and clean deck",
  },
];

function ComparisonCard({ item }: { item: Comparison }) {
  const [split, setSplit] = useState(50);

  return <article className="comparison-card" data-reveal>
    <div className="comparison-stage" style={{ "--split": `${split}%` } as CSSProperties}>
      <img className="comparison-after" src={item.after} alt={item.afterAlt} loading="lazy" />
      <div className="comparison-before" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <img src={item.before} alt={item.beforeAlt} loading="lazy" />
      </div>
      <span className="comparison-tag comparison-tag-before">BEFORE</span>
      <span className="comparison-tag comparison-tag-after">AFTER</span>
      <span className="comparison-divider" aria-hidden="true"><span className="comparison-handle"><MoveHorizontal size={22} strokeWidth={1.7} /></span></span>
      <input type="range" min="0" max="100" step="1" value={split}
        onChange={event => setSplit(Number(event.target.value))}
        className="comparison-range" aria-label={`Compare before and after: ${item.title}`}
        aria-valuetext={`${split}% of the before image visible`} />
    </div>
    <div className="comparison-card-copy">
      <div className="comparison-card-meta"><span>{item.number} / {item.service}</span><span>DRAG TO COMPARE</span></div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  </article>;
}

export function BeforeAfter() {
  return <section className="comparison-section section" aria-labelledby="comparison-heading">
    <div className="container">
      <div className="comparison-heading" data-reveal>
        <div><span className="eyebrow"><span className="label-line" />THE TRANSFORMATION / 01—03</span><h2 id="comparison-heading">See the space.<br/><em>See the possibility.</em></h2></div>
        <div className="comparison-intro"><span>THREE INTERACTIVE VIEWS</span><p>Move each slider to explore the potential of a room, an exterior and a pool.</p></div>
      </div>
      <div className="comparison-grid">{comparisons.map(item => <ComparisonCard key={item.number} item={item} />)}</div>
      <div className="comparison-bottom"><p>These are illustrative concepts, not completed client projects. Actual before and after photos can be added when available.</p><a className="underlined-link" href="/contact">Tell us about your space</a></div>
    </div>
  </section>;
}
