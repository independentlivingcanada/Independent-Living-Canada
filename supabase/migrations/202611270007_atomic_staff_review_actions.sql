create or replace function public.il_staff_update_provider_status(p_actor uuid,p_provider_id uuid,p_next_status text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_before jsonb; v_after jsonb;
begin
 if not exists(select 1 from public.il_staff_roles where user_id=p_actor and active=true and role in ('admin','reviewer')) then raise exception 'Staff access required'; end if;
 if p_next_status not in ('approved','rejected','suspended','under_review') then raise exception 'Invalid provider status'; end if;
 select jsonb_build_object('id',id,'onboarding_status',onboarding_status,'display_name',display_name) into v_before from public.il_provider_profiles where id=p_provider_id for update;
 if v_before is null then raise exception 'Provider application not found'; end if;
 update public.il_provider_profiles set onboarding_status=p_next_status where id=p_provider_id;
 update public.il_provider_services set active=(p_next_status='approved') where provider_id=p_provider_id;
 select jsonb_build_object('id',id,'onboarding_status',onboarding_status,'display_name',display_name) into v_after from public.il_provider_profiles where id=p_provider_id;
 insert into public.il_staff_audit_log(actor_user_id,action,target_type,target_id,before_state,after_state) values(p_actor,'provider_'||p_next_status,'provider',p_provider_id,v_before,v_after);
 return jsonb_build_object('provider',v_after);
end; $$;
revoke all on function public.il_staff_update_provider_status(uuid,uuid,text) from public,anon,authenticated;
grant execute on function public.il_staff_update_provider_status(uuid,uuid,text) to service_role;
create or replace function public.il_staff_update_request_status(p_actor uuid,p_request_id uuid,p_next_status text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_before jsonb; v_after jsonb;
begin
 if not exists(select 1 from public.il_staff_roles where user_id=p_actor and active=true and role in ('admin','reviewer')) then raise exception 'Staff access required'; end if;
 if p_next_status not in ('received','reviewing','matching','options_shared','booked','closed','cancelled') then raise exception 'Invalid request status'; end if;
 select jsonb_build_object('id',id,'status',status) into v_before from public.il_service_requests where id=p_request_id for update;
 if v_before is null then raise exception 'Service request not found'; end if;
 update public.il_service_requests set status=p_next_status where id=p_request_id;
 select jsonb_build_object('id',id,'status',status) into v_after from public.il_service_requests where id=p_request_id;
 insert into public.il_staff_audit_log(actor_user_id,action,target_type,target_id,before_state,after_state) values(p_actor,'request_'||p_next_status,'request',p_request_id,v_before,v_after);
 return jsonb_build_object('request',v_after);
end; $$;
revoke all on function public.il_staff_update_request_status(uuid,uuid,text) from public,anon,authenticated;
grant execute on function public.il_staff_update_request_status(uuid,uuid,text) to service_role;