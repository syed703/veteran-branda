import { z } from "zod";
import { services } from "@/lib/services";
export const quoteSchema=z.object({
  requestId:z.string().uuid(),
  name:z.string().trim().min(2,"Please enter your full name.").max(120),
  phone:z.string().trim().min(7,"Please enter a valid phone number.").max(30).refine(v=>(v.match(/\d/g)||[]).length>=7,"Please enter a valid phone number."),
  email:z.string().trim().email("Please enter a valid email address.").max(180),
  zip:z.string().trim().regex(/^\d{5}(-\d{4})?$/,"Please enter a valid US ZIP code."),
  service:z.string().refine(v=>v==="multiple"||services.some(s=>s.slug===v),"Please choose a listed service."),
  message:z.string().trim().min(10,"Please add a few details about your project.").max(3000),
  company:z.string().max(200).optional().default("")
});
