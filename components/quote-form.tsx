"use client";
import { useEffect, useRef, useState } from "react";
import { Check, CheckCircle2, Loader2, Phone, RotateCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PHONE, PHONE_LINK, services } from "@/lib/services";
type Fields={name:string;phone:string;email:string;zip:string;message:string;company:string};
const blank:Fields={name:"",phone:"",email:"",zip:"",message:"",company:""};
export function QuoteForm({initialService=""}:{initialService?:string}) {
  const [fields,setFields]=useState(blank);
  const [service,setService]=useState(initialService);
  const [status,setStatus]=useState<"idle"|"saving"|"success"|"error">("idle");
  const [error,setError]=useState("");
  const [reference,setReference]=useState("");
  const requestId=useRef("");
  const form=useRef<HTMLFormElement>(null);
  const change=(name:keyof Fields,value:string)=>setFields(f=>({...f,[name]:value}));
  useEffect(()=>{if(!requestId.current)requestId.current=crypto.randomUUID();},[]);
  useEffect(()=>{
    const context=(document as Document & {modelContext?:{registerTool:(tool:unknown,options?:{signal:AbortSignal})=>unknown}}).modelContext;
    if(!context?.registerTool)return;
    const lifecycle=new AbortController();
    const tool={name:"prepare_quote_request",title:"Prepare a property service quote",description:"Fill the visible quote form for the customer to review. This does not submit or book a service.",inputSchema:{type:"object",properties:{service:{type:"string",enum:[...services.map(s=>s.slug),"multiple"]},name:{type:"string"},phone:{type:"string"},email:{type:"string"},zip:{type:"string"},message:{type:"string"}},required:["service"],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input:unknown){
      if(!input||typeof input!=="object")throw new Error("Expected quote fields.");
      const data=input as Record<string,unknown>;
      if(typeof data.service!=="string"||!(data.service==="multiple"||services.some(s=>s.slug===data.service)))throw new Error("Choose a listed service.");
      const draft:Partial<Fields>={};
      for(const key of ["name","phone","email","zip","message"] as const){if(data[key]!==undefined){if(typeof data[key]!=="string"||(data[key] as string).length>(key==="message"?3000:180))throw new Error(`Invalid ${key}.`);draft[key]=data[key] as string;}}
      if(Object.keys(data).some(k=>!["service","name","phone","email","zip","message"].includes(k)))throw new Error("Unexpected field.");
      setStatus("idle");setService(data.service);setFields(f=>({...f,...draft}));form.current?.scrollIntoView({behavior:"smooth",block:"center"});
      return {state:"ready_for_customer_review",service:data.service,submitted:false};
    }};
    try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
    return ()=>lifecycle.abort();
  },[]);
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!service){setError("Please choose a service.");setStatus("error");return;}
    setStatus("saving");setError("");
    try {
      const response=await fetch("/api/enquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...fields,service,requestId:requestId.current})});
      const result=await response.json() as {error?:string;reference?:string};
      if(!response.ok)throw new Error(result?.error||"We couldn't save your request. Please try again or call us.");
      if(typeof result?.reference!=="string")throw new Error("We couldn't confirm your request. Please try again or call us.");
      setReference(result.reference);setStatus("success");
    }catch(err){setError(err instanceof Error?err.message:"We couldn't save your request. Please try again.");setStatus("error");}
  }
  if(status==="success")return <div className="quote-success" role="status"><CheckCircle2 size={48}/><span className="eyebrow">REQUEST RECEIVED</span><h3>Let’s take the<br/><em>next step.</em></h3><p>Your quote request has been saved with reference <strong>{reference}</strong>. Keep this reference handy when you speak with our team.</p><a className="button button-dark" href={PHONE_LINK}><Phone size={17}/> Call {PHONE}</a><button className="text-button" onClick={()=>{setStatus("idle");setFields(blank);setService(initialService);requestId.current=crypto.randomUUID();}}><RotateCcw size={15}/> Send another request</button></div>;
  return <form ref={form} className="quote-form" onSubmit={submit}>
    <div className="form-heading"><span className="eyebrow">LET’S GET STARTED</span><h3>Tell us what you need.</h3><p>A few details help us understand your project.</p></div>
    <div className="form-row"><label>Full name <span>*</span><input name="name" required autoComplete="name" maxLength={120} value={fields.name} onChange={e=>change("name",e.target.value)} placeholder="Your full name"/></label><label>Phone number <span>*</span><input name="phone" type="tel" required autoComplete="tel" maxLength={30} value={fields.phone} onChange={e=>change("phone",e.target.value)} placeholder="(555) 000-0000"/></label></div>
    <div className="form-row"><label>Email address <span>*</span><input name="email" type="email" required autoComplete="email" maxLength={180} value={fields.email} onChange={e=>change("email",e.target.value)} placeholder="you@example.com"/></label><label>Property ZIP code <span>*</span><input name="zip" required autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" maxLength={10} value={fields.zip} onChange={e=>change("zip",e.target.value)} placeholder="ZIP code" title="Enter a 5-digit US ZIP code, optionally followed by a 4-digit extension."/></label></div>
    <label className="service-label" id="service-label">Which service do you need? <span>*</span></label><Select value={service} onValueChange={setService} name="service"><SelectTrigger className="service-select" aria-labelledby="service-label"><SelectValue placeholder="Choose your service"/></SelectTrigger><SelectContent position="popper" className="service-options">{services.map(s=><SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>)}<SelectItem value="multiple">More than one service</SelectItem></SelectContent></Select>
    <label className="message-label">A little about your project <span>*</span><textarea name="message" required minLength={10} maxLength={3000} rows={4} value={fields.message} onChange={e=>change("message",e.target.value)} placeholder="What needs attention? Include the approximate size, current condition and your preferred timing."/></label>
    <div className="honeypot" aria-hidden="true"><label>Company website<input name="company" tabIndex={-1} autoComplete="off" value={fields.company} onChange={e=>change("company",e.target.value)}/></label></div>
    {status==="error"&&<p className="form-error" role="alert">{error}</p>}
    <button className="button button-dark form-submit" type="submit" disabled={status==="saving"}>{status==="saving"?<><Loader2 size={18} className="spin"/> Sending your request…</>:"Request my quote"}</button>
    <p className="form-note"><Check size={14}/><span>We’ll use these details to contact you about your request. <a href="/legal/privacy">Privacy Policy</a></span></p>
  </form>;
}
