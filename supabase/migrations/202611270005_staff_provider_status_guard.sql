create or replace function public.il_prevent_self_approval()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  -- Only block the provider account from changing its own review status.
  -- Staff changes are performed by the allowlisted SECURITY DEFINER review RPCs.
  if auth.uid() is not null
     and auth.uid() = old.owner_user_id
     and new.onboarding_status is distinct from old.onboarding_status then
    raise exception 'Provider onboarding status is operator-controlled';
  end if;
  return new;
end;
$function$;

revoke all on function public.il_prevent_self_approval() from public, anon, authenticated;
