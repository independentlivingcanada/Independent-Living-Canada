import { withSupabase } from "npm:@supabase/server@^1";
const allowedOrigin="https://tritchot666.github.io";
const cors={"Access-Control-Allow-Origin":allowedOrigin,"Access-Control-Allow-Headers":"authorization, apikey, content-type, x-client-info","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Vary":"Origin"};
const reply=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...cors,"Content-Type":"application/json","Cache-Control":"no-store"}});
const states=new Set(["received","reviewing","matching","options_shared","booked","closed","cancelled"]);
Deno.serve((req:Request)=>{
 if(req.method==="OPTIONS"){const origin=req.headers.get("Origin");if(origin&&origin!==allowedOrigin)return new Response("Forbidden",{status:403});return new Response("ok",{headers:cors})}
 return withSupabase({auth:"user"},async(request,ctx)=>{
  const origin=request.headers.get("Origin");if(origin&&origin!==allowedOrigin)return reply({error:"Origin not allowed"},403);
  const actor=ctx.userClaims?.sub;if(!actor)return reply({error:"Sign-in required"},401);
  const admin=ctx.supabaseAdmin;
  const {data:staff,error:staffError}=await admin.schema("il_private").from("staff_roles").select("role").eq("user_id",actor).eq("active",true).maybeSingle();
  if(staffError||!staff)return reply({error:"Staff access required"},403);
  if(request.method==="GET"){
   const [p,s,r]=await Promise.all([
    admin.from("il_provider_profiles").select("id,display_name,business_name,contact_email,contact_phone,service_description,onboarding_status,created_at").order("created_at",{ascending:false}).limit(100),
    admin.from("il_provider_services").select("id,provider_id,category,service_area,active").order("category"),
    admin.from("il_service_requests").select("id,requester_user_id,recipient_name,category,city,service_area,description,preferred_date,preferred_time_window,accessibility_logistics,status,consent_attested,created_at").order("created_at",{ascending:false}).limit(100)
   ]);
   if(p.error||s.error||r.error)return reply({error:"Could not load the review queue"},500);
   const ids=(r.data||[]).map((x:{id:string})=>x.id);let contacts:unknown[]=[];
   if(ids.length){const c=await admin.from("il_request_private_contacts").select("request_id,contact_name,contact_email,contact_phone,preferred_contact_method").in("request_id",ids);if(c.error)return reply({error:"Could not load private contact details"},500);contacts=c.data||[]}
   return reply({role:staff.role,providers:p.data||[],services:s.data||[],requests:r.data||[],contacts});
  }
  if(request.method!=="POST")return reply({error:"Method not allowed"},405);
  let body:{action?:string;target_id?:string;status?:string};try{body=await request.json()}catch{return reply({error:"Invalid JSON"},400)}
  const id=body.target_id;if(!id||!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))return reply({error:"Valid target_id required"},400);
  if(body.action==="provider_status"){
   const next=body.status;if(!["approved","rejected","suspended","under_review"].includes(next||""))return reply({error:"Invalid provider status"},400);
   const old=await admin.from("il_provider_profiles").select("id,onboarding_status,display_name").eq("id",id).maybeSingle();if(old.error||!old.data)return reply({error:"Provider not found"},404);
   const upd=await admin.from("il_provider_profiles").update({onboarding_status:next}).eq("id",id).select("id,onboarding_status,display_name").single();if(upd.error)return reply({error:"Provider status update failed"},500);
   const svc=await admin.from("il_provider_services").update({active:next==="approved"}).eq("provider_id",id);
   if(svc.error){await admin.from("il_provider_profiles").update({onboarding_status:old.data.onboarding_status}).eq("id",id);return reply({error:"Service activation failed; provider status rolled back"},500)}
   const log=await admin.schema("il_private").from("staff_audit_log").insert({actor_user_id:actor,action:"provider_"+next,target_type:"provider",target_id:id,before_state:old.data,after_state:upd.data});
   if(log.error)return reply({error:"Change saved but audit logging failed; contact technical support"},500);
   return reply({ok:true,provider:upd.data});
  }
  if(body.action==="request_status"){
   const next=body.status;if(!states.has(next||""))return reply({error:"Invalid request status"},400);
   const old=await admin.from("il_service_requests").select("id,status").eq("id",id).maybeSingle();if(old.error||!old.data)return reply({error:"Request not found"},404);
   const upd=await admin.from("il_service_requests").update({status:next}).eq("id",id).select("id,status").single();if(upd.error)return reply({error:"Request status update failed"},500);
   const log=await admin.schema("il_private").from("staff_audit_log").insert({actor_user_id:actor,action:"request_"+next,target_type:"request",target_id:id,before_state:old.data,after_state:upd.data});
   if(log.error)return reply({error:"Change saved but audit logging failed; contact technical support"},500);
   return reply({ok:true,request:upd.data});
  }
  return reply({error:"Unsupported action"},400);
 })(req);
});