import type { Metadata } from "next";
import { ServicesPage } from "@/components/site-pages";
export const metadata:Metadata={title:"Our Services",description:"Explore all nine property services, including demolition, with clear descriptions and quote requests."};
export default function Page(){return <ServicesPage/>;}
