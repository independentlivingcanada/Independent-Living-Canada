create or replace function public.il_sync_provider_services(
  p_provider_id uuid,
  p_service_area text,
  p_categories text[]
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if p_service_area is null or length(btrim(p_service_area)) = 0 then
    raise exception 'A service area is required';
  end if;

  if p_categories is null
     or cardinality(p_categories) < 1
     or cardinality(p_categories) > 5
     or exists (
       select 1
       from unnest(p_categories) as requested(category)
       where requested.category not in (
         'non_emergency_transport',
         'companionship',
         'errands_groceries',
         'light_household_help',
         'home_accessibility'
       )
     )
     or cardinality(p_categories) <> (
       select count(distinct category) from unnest(p_categories) as requested(category)
     ) then
    raise exception 'Choose one or more valid service categories';
  end if;

  if not exists (
    select 1
    from public.il_provider_profiles p
    where p.id = p_provider_id
      and p.owner_user_id = auth.uid()
  ) then
    raise exception 'Provider profile not found or not owned by this account';
  end if;

  delete from public.il_provider_services s
  where s.provider_id = p_provider_id
    and not (
      s.category = any(p_categories)
      and lower(btrim(s.service_area)) = lower(btrim(p_service_area))
    );

  insert into public.il_provider_services (provider_id, category, service_area, active)
  select p_provider_id, requested.category, btrim(p_service_area), false
  from unnest(p_categories) as requested(category)
  where not exists (
    select 1
    from public.il_provider_services existing
    where existing.provider_id = p_provider_id
      and existing.category = requested.category
      and lower(btrim(existing.service_area)) = lower(btrim(p_service_area))
  );
end;
$$;

revoke all on function public.il_sync_provider_services(uuid, text, text[]) from public, anon, authenticated;
grant execute on function public.il_sync_provider_services(uuid, text, text[]) to authenticated;
