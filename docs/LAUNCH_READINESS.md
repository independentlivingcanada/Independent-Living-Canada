# Launch readiness — Independent Living Canada

Last reviewed: 2026-11-27

## Operating position

The public website is a development pilot only. Do not accept real service bookings or sensitive personal information until every gate below is closed. The initial controlled service area is Winnipeg, Manitoba; Canada-wide provider coverage must not be advertised until each local provider has been verified.

## Implemented

- Separate GitHub repository and GitHub Pages deployment.
- Separate Supabase project in Canada Central.
- Account registration and sign-in flow.
- Requester service-request form with required consent attestation stored with timestamp.
- Provider application form; new service categories are inactive until approval.
- Request history and provider application status views.
- Row-level security on all seven application tables.
- Request submission is an authenticated, consent-enforcing, atomic database function.
- Provider service category/area synchronization now runs in one authenticated, SECURITY INVOKER database function. It checks ownership and preserves active state for unchanged services.
- Public frontend contains only the Supabase publishable key; never place a service-role/secret key in browser assets.

## Staff operations implemented

- [x] Restricted staff portal at https://tritchot666.github.io/Independent-Living-Canada/admin.html.
- [x] Server-verified Supabase JWT plus private staff allowlist check; the frontend cannot grant staff access.
- [x] Private staff-role table with RLS enabled and no privileges for anon/authenticated.
- [x] Server-only staff action functions; only service_role can execute them. Provider approval/suspension and request status changes are transactionally audited.
- [ ] Provision the owner staff account after confirming the exact email used for the owner login; no account has been granted staff access yet.
- [ ] Complete authenticated functional testing after provisioning.

## Outstanding launch gates

### Authentication and account security
- [ ] Supabase organization is on the Free plan. Supabase documents leaked-password protection as Pro and above; this control cannot be enabled on the current plan. Upgrade only if approved, then enable it under Authentication → Sign In / Providers → Email. The website now requires 12 characters for new passwords, but this is a browser-side mitigation, not a replacement for server-side leaked-password protection.
- [ ] Set Supabase Site URL and allowed redirect URL to https://tritchot666.github.io/Independent-Living-Canada/.
- [ ] Confirm email verification and password reset flows.
- [ ] Confirm reasonable password strength and rate limits.

### Functional and security testing
- [ ] Create synthetic requester and provider accounts; use fictional data only.
- [ ] Verify sign-up, email confirmation, sign-in, sign-out, and session persistence.
- [ ] Submit a request with consent and verify request + private contact are committed together.
- [ ] Verify request submission without consent is rejected by the database.
- [ ] Verify requester A cannot read requester B's request or private contact.
- [ ] Verify provider A cannot read or edit provider B's profile/services/responses.
- [ ] Verify a provider cannot approve itself or activate services before staff approval.
- [ ] Verify il_sync_provider_services preserves active status for unchanged categories, inserts new categories as inactive, removes deselected categories, and rejects another provider's profile ID.
- [ ] Verify anonymous users cannot execute protected RPCs.
- [ ] Verify errors shown to users do not expose private contact data or secrets.

### Staff operations
- [ ] Implement a staff-only review queue using server-enforced authorization (not a hidden frontend route or user-editable metadata).
- [ ] Define the initial staff account and a documented offboarding process.
- [ ] Staff must be able to review provider applications, verify evidence, approve/reject/suspend providers, and record review decisions.
- [ ] Staff must be able to triage requests and update permitted workflow statuses with an audit trail.
- [ ] Private contact details must be visible only to authorized staff and the relevant requester.
- [ ] Do not expose a service-role key in browser JavaScript.

### Provider verification and safeguarding
- [ ] Verify legal identity/business identity and contact details.
- [ ] Verify insurance and any required provincial/municipal licences for each service category.
- [ ] Verify references, screening appropriate to the role, safeguarding practices, and complaint/incident procedures.
- [ ] Confirm precise service boundaries and accessibility capabilities, especially for rides.
- [ ] No emergency, ambulance, stretcher, medical transport, nursing/clinical, medication, or personal-care services in this MVP.
- [ ] Confirm the person receiving support has consented; a family supporter must not silently substitute their own consent.

### Privacy, legal, and accessibility
- [ ] Complete a privacy impact review and data-retention/deletion schedule. The draft privacy notice is at https://tritchot666.github.io/Independent-Living-Canada/privacy.html; it is not a final legal policy.
- [ ] Minimize collection of health and disability information; do not collect unnecessary diagnoses or documents.
- [ ] Publish privacy, terms, consent, complaints, and incident-response materials reviewed for applicable Canadian and Manitoba requirements.
- [ ] Test keyboard navigation, screen readers, zoom/reflow, contrast, form labels/errors, and focus visibility against WCAG 2.2 AA. The draft accessibility statement is at https://tritchot666.github.io/Independent-Living-Canada/accessibility.html; no conformance claim has been made.
- [ ] Confirm accessible alternatives for people who cannot use the website.

### Pilot operations
- [ ] Review the prospect list in docs/WINNIPEG_PROVIDER_PROSPECTS.md. Three exploratory outreach drafts are in Gmail; none has been sent and no provider has agreed to join.
- [ ] Recruit and verify a small initial Winnipeg provider cohort before advertising service availability.
- [ ] Run a manual, supervised pilot with explicit confirmation from the recipient and provider.
- [ ] Establish response-time targets, escalation coverage, cancellation handling, and a no-match pathway.
- [ ] Track incidents, complaints, missed pickups, and service quality.
- [ ] Expand beyond Winnipeg only after a separate local verification process.

## Known current blockers

1. Supabase Security Advisor still flags leaked-password protection as disabled.
2. Auth redirect settings have not been independently verified.
3. Synthetic-account end-to-end and cross-account isolation tests have not yet been run.
4. There is no staff-only review interface or configured staff role yet.
5. No providers or service requests are currently recorded in the application database.
6. The deployed page has not yet been visually inspected in a real browser session after the latest changes.
7. Authenticated requester/provider end-to-end tests still require synthetic accounts and a real browser session.

## Recent technical change

Provider service synchronization was moved from several independent browser-side delete/insert operations into public.il_sync_provider_services(uuid,text,text[]). The function is SECURITY INVOKER, checks auth.uid() against the provider profile owner, validates service categories, and runs its delete/insert work in one transaction. Execute is granted to authenticated and not to anon. The database migration is atomic_provider_service_sync; its source is tracked in supabase/migrations/202611270004_atomic_provider_service_sync.sql.

## Release rule

Do not remove the development-pilot warning or invite the public to submit real requests until all relevant gates above have evidence, the staff workflow is tested, and provider capacity is verified for the advertised area.
