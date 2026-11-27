-- Cover the two staff-table foreign keys flagged by the Supabase performance advisor.
-- These tables are currently small; ordinary CREATE INDEX is safe and transactional.
create index if not exists il_staff_roles_granted_by_idx
  on public.il_staff_roles (granted_by)
  where granted_by is not null;

create index if not exists il_staff_audit_log_actor_user_id_idx
  on public.il_staff_audit_log (actor_user_id)
  where actor_user_id is not null;
