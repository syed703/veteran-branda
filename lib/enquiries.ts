import { env } from "cloudflare:workers";
export function enquiriesDb(){if(!env.DB)throw new Error("Enquiry storage unavailable.");return env.DB;}
