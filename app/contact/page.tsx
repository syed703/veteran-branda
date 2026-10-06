import type { Metadata } from "next";
import { ContactPage } from "@/components/site-pages";
import { getService } from "@/lib/services";
export const metadata:Metadata={title:"Request a Quote",description:"Tell Veteran Solutions and Services about your next property project. Request a quote or call (857) 345-5076."};
export default async function Page({searchParams}:{searchParams:Promise<{service?:string}>}){const requested=(await searchParams).service;return <ContactPage service={requested&&getService(requested)?requested:undefined}/>;}
