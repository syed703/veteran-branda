import type { Metadata } from "next";
import { LegalIndexPage } from "@/components/legal-pages";

export const metadata: Metadata = { title: "Legal Pages", description: "Find the Privacy Policy and Terms of Use for Veteran Solutions and Services LLC." };
export default function Page() { return <LegalIndexPage />; }
