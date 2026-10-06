import { enquiriesDb } from "@/lib/enquiries";
import { quoteSchema } from "@/lib/quote-validation";
export async function POST(request:Request){
  const origin=request.headers.get("origin");
  if(origin&&origin!==new URL(request.url).origin)return Response.json({error:"Please submit your request from this website."},{status:403});
  if(!request.headers.get("content-type")?.includes("application/json"))return Response.json({error:"Invalid request format."},{status:415});
  try{
    const raw=await request.text();
    if(raw.length>12000)return Response.json({error:"Your request is too long."},{status:413});
    let payload:unknown;try{payload=JSON.parse(raw);}catch{return Response.json({error:"Invalid request format."},{status:400});}
    const result=quoteSchema.safeParse(payload);
    if(!result.success)return Response.json({error:result.error.issues[0]?.message??"Please check your details."},{status:400});
    const p=result.data;
    if(p.company)return Response.json({error:"We couldn't process this request. Please call us."},{status:400});
    const db=enquiriesDb();
    const existing=await db.prepare("SELECT reference FROM enquiries WHERE id = ?").bind(p.requestId).first<{reference:string}>();
    if(existing)return Response.json({reference:existing.reference});
    const reference=`VSS-${p.requestId.slice(0,8).toUpperCase()}`;
    await db.prepare("INSERT OR IGNORE INTO enquiries (id, reference, name, phone, email, zip, service, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(p.requestId,reference,p.name,p.phone,p.email.toLowerCase(),p.zip,p.service,p.message,"new",new Date().toISOString()).run();
    const saved=await db.prepare("SELECT reference FROM enquiries WHERE id = ?").bind(p.requestId).first<{reference:string}>();
    if(!saved)throw new Error("Enquiry was not saved.");
    return Response.json({reference:saved.reference},{status:201});
  }catch(error){console.error("Quote submission failed",error instanceof Error?error.message:"unknown");return Response.json({error:"We couldn't save your request. Please try again or call (857) 345-5076."},{status:503});}
}
