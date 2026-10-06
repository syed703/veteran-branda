import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/site-pages";
import { getService, services } from "@/lib/services";
export function generateStaticParams(){return services.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const s=getService((await params).slug);return {title:s?.name??"Service not found",description:s?.short};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const s=getService((await params).slug);if(!s)notFound();return <ServicePage service={s}/>;}
