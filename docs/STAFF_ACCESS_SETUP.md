# Staff access setup — owner action required

The staff portal is deployed at:

https://tritchot666.github.io/Independent-Living-Canada/admin.html

Signing in does not grant staff access. The server checks the authenticated Supabase user ID against public.il_staff_roles. The browser cannot assign itself a role.

## Provision the first owner

1. Create a normal account on the public development site using the owner's intended email address.
2. Confirm the email using the Supabase confirmation message.
3. Sign in successfully once.
4. Have the project owner/authorized database administrator confirm the exact email address to grant admin access.
5. In the Supabase SQL Editor for project zrrmqrmedgfgbejhagcc, run the following after replacing the email placeholder with the exact verified address:

```sql
insert into public.il_staff_roles (user_id, role, granted_by, active)
select id, 'admin', id, true
from auth.users
where lower(email) = lower('OWNER_EMAIL_HERE')
  and email_confirmed_at is not null
on conflict (user_id)
do update set role = 'admin', active = true;
```

6. Confirm exactly one row was inserted/updated, then open the staff portal and sign in again.

Do not send a password, access token, secret key or service-role key in chat. If the email is not found, stop and confirm the account's exact email; do not grant access to a guessed address.

## Revoke access

```sql
update public.il_staff_roles
set active = false
where user_id = (
  select id from auth.users
  where lower(email) = lower('STAFF_EMAIL_HERE')
);
```

Only a trusted project owner should run provisioning/revocation SQL. The private role table has RLS enabled and no grants to anon/authenticated. Only service_role can read it through the server-side Edge Function.

## Test accounts and isolation

Before accepting any real requests, create separate fictional requester and provider accounts (and preferably a second requester). Confirm:
- requester A can only see request A;
- requester B cannot see request A or its private contact;
- a provider cannot approve itself or read another provider's profile;
- unauthenticated calls to the staff Edge Function are rejected;
- a signed-in non-staff account receives 403 and cannot read the staff queue;
- a staff status update changes the provider/request and creates one matching audit record atomically.

Use inboxes you control and synthetic details only. Never use a real older adult's or disabled person's data for testing.
