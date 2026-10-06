"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const faqs=[
  {q:"Can I request more than one service?",a:"Yes. Choose ‘More than one service’ in the quote form and tell us which services you need. We can review the work together and discuss an appropriate plan."},
  {q:"How do I get an estimate?",a:"Complete the quote form with your service, property ZIP code and a brief description, or call (857) 345-5076. We’ll review the scope and may need more details or a property assessment before confirming an estimate."},
  {q:"Do you offer urgent service?",a:"You can contact us 24/7. Call to discuss urgent work. Scheduling depends on the service, the location and team availability; a request does not confirm a booking."},
  {q:"Which areas do you serve?",a:"Include your property ZIP code in your request or call the team. We’ll confirm coverage for your location before arranging the work."}
];
export function FAQ(){return <Accordion type="single" collapsible className="faq-list">{faqs.map((f,i)=><AccordionItem value={`faq-${i}`} key={f.q}><AccordionTrigger>{f.q}</AccordionTrigger><AccordionContent>{f.a}</AccordionContent></AccordionItem>)}</Accordion>;}
