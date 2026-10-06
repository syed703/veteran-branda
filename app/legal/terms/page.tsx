import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal-pages";

export const metadata: Metadata = { title: "Terms of Use", description: "Information about website content, quote requests and services from Veteran Solutions and Services LLC." };
export default function Page() { return <LegalDocumentPage kind="terms" />; }
