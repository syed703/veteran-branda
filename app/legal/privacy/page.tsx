import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal-pages";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Veteran Solutions and Services LLC handles quote requests submitted through this website." };
export default function Page() { return <LegalDocumentPage kind="privacy" />; }
