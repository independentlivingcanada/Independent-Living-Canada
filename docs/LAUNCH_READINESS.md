# Launch readiness — Independent Living Canada

Last reviewed: 2026-11-27

## Latest work in this review — 2026-11-27

- [x] Added `docs/REMAINING_LAUNCH_ACTIONS.md`, a detailed provider screening, synthetic browser acceptance, privacy/legal sign-off, human accessibility audit, operating-role, account-security and release checklist.
- [x] Aligned the staff portal's CSS with the site's light-blue visual theme and updated browser theme colours across public, staff, privacy and accessibility pages.
- [ ] The visual changes passed GitHub Actions run 27 (`45946028667`), including JavaScript syntax and public-site safeguard checks, and Pages deployment completed successfully. Live visual/browser and assistive-technology verification are still not claimed.

## Operating position

The public website remains a development pilot only. Do not accept real service bookings or sensitive personal information until all release gates below are closed. The controlled pilot area is Winnipeg, Manitoba. Do not advertise Canada-wide provider coverage until local providers are independently verified.

## Implemented

- Separate GitHub repository, GitHub Pages site and Supabase project in Canada Central.
- Account registration and sign-in UI, requester service form, provider application form, request history and provider application status.
- Request submission uses an authenticated, consent-enforcing, atomic database function. Request and private contact are written together.
- Provider service synchronization uses an authenticated SECURITY INVOKER function. It validates categories, checks ownership, removes deselected categories and creates new categories inactive.
- RLS is enabled on all application tables. Private requester contacts are separate from general request records.
- Public frontend contains only the Supabase publishable key. The service-role key remains server-side.
- Development warning and fictional-data-only notice remain visible on the public site.

## Staff operations

- [x] Restricted staff portal: https://tritchot666.github.io/Independent-Living-Canada/admin.html.
- [x] Owner admin role is provisioned and active; the owner successfully signed in and loaded the review queue in a real browser session.
- [x] Edge Function verifies the caller's JWT and checks the private staff allowlist before returning queue data.
- [x] Staff role and audit tables have RLS enabled and no anon/authenticated table privileges; staff actions are server-side only.
- [x] Provider review and request status RPCs are restricted to service_role and validate an active admin/reviewer allowlist.
- [x] Synthetic database transaction verified provider application creation, inactive initial services, provider self-approval prevention, request creation with consent and private contact, requester ownership isolation, cross-account denial for request/private contact, staff provider approval/suspension, service deactivation on suspension, request status update and three audit events.
- [x] Synthetic test transaction was rolled back. No synthetic provider, request, contact or audit records were retained.
- [ ] Browser-driven provider and requester form submissions using separate synthetic email accounts remain to be completed; SQL tests do not replace a full browser/Auth email-flow test.
- [x] Provider rejection status and its audit event tested in a rollback-only database transaction.
- [ ] Full staff queue rendering with a non-empty synthetic queue in a browser remains outstanding.
- [x] Drafted staff access lifecycle, offboarding, backup-role and operating procedures in `docs/PILOT_OPERATIONS_RUNBOOK.md`. Named backup staff and actual offboarding test remain outstanding.

## Test evidence — 2026-11-27

A transaction created two synthetic Auth users, a provider application, two service categories and a consent-attested service request. Assertions passed:
- Provider service synchronization created two categories inactive.
- The provider account could not change its own onboarding status.
- The requester could read its own request and private contact.
- A different account could not read that request or any private contact.
- Staff approval activated the provider's services; staff suspension deactivated them.
- Staff request-status update succeeded.
- The three staff changes created three audit events.
- The entire transaction was rolled back. Live counts after rollback were confirmed as 0 provider profiles, 0 service requests, 0 private contacts, 1 staff role and 0 audit events.

Function privilege checks confirmed the consent-required request RPC is executable by authenticated users but not anon; the old no-consent signature is not executable by anon or authenticated; staff status RPCs are service_role-only; provider service synchronization is authenticated-only.

A database trigger defect was found and corrected: the old guard blocked staff status changes as well as provider self-approval. The corrected trigger blocks only a provider changing its own review status. Staff RPC approval and suspension were then successfully exercised in the synthetic transaction.

The owner independently confirmed the staff portal now displays “Signed in · admin” and “Queue loaded.” The public GitHub Pages URL could not be independently inspected by the browser retrieval tool in this review; source files and workflow configuration were reviewed instead.

## Outstanding launch gates

### Authentication and account security
- [ ] Verify Supabase Site URL and allowed redirect URL in hosted Auth settings.
- [ ] Complete real browser sign-up, email confirmation, sign-in, sign-out, session persistence and password reset tests with synthetic email accounts.
- [ ] Confirm server-side password minimum and rate limits.
- [ ] Leaked-password protection remains disabled. Supabase Security Advisor reports this warning; the current Free plan does not provide this control. Upgrade only with explicit approval, then enable the feature if desired.

### Functional and security testing
- [x] Consent-required request RPC and atomic request/private-contact write tested in a rollback-only synthetic transaction.
- [x] Requester read isolation and cross-account request/private-contact denial tested.
- [x] Provider self-approval guard and inactive-before-approval behavior tested.
- [x] Staff approval/suspension, service deactivation and audit events tested.
- [x] Anon/authenticated/service_role function grants reviewed.
- [x] Provider response/invite RLS: an authorized account could read its synthetic response and invite; an unrelated account could not. Test transaction rolled back. The test used one synthetic owner identity for requester/provider roles, so separate-account requester-versus-provider visibility still needs its own test.\n- [ ] Browser end-to-end form submission and account email flows still require synthetic accounts in a real browser. A non-empty browser queue render also remains to be verified.
- [x] Provider profile/service cross-account read and update denial plus negative-consent rejection tested in a rollback-only synthetic transaction. Provider response/invite read isolation was also tested with an unrelated account denied.
- [ ] Confirm user-facing error messages and browser network responses do not expose private data or secrets.

### Provider verification and safeguarding
- [ ] Verify legal/business identity and contact details for every provider.
- [ ] Verify insurance, licences, permits, vehicle/driver requirements and trade credentials as applicable.
- [ ] Verify references, role-appropriate screening, training, safeguarding and complaint/incident procedures.
- [ ] Confirm precise service boundaries and accessibility capabilities, especially for rides.
- [ ] No emergency, ambulance, stretcher, medical transport, nursing/clinical, medication, lifting/transfer or personal-care services in this MVP.
- [ ] Confirm the person receiving support has consented; a family supporter cannot silently substitute their consent.

### Privacy, legal and accessibility
- [ ] Complete privacy impact review, retention/deletion schedule and privacy contact. The current privacy notice is a development draft, not a final legal policy: https://tritchot666.github.io/Independent-Living-Canada/privacy.html.
- [ ] Publish legally reviewed privacy, terms, consent, complaints and incident-response materials for applicable Canadian and Manitoba requirements.
- [ ] Complete manual keyboard, screen-reader, zoom/reflow, contrast, focus, labels/errors and mobile testing against WCAG 2.2 AA. A detailed tester checklist is prepared in `docs/ACCESSIBILITY_MANUAL_TEST_PLAN.md`. The accessibility statement is a draft and makes no conformance claim: https://tritchot666.github.io/Independent-Living-Canada/accessibility.html.
- [ ] Establish a monitored accessibility feedback contact and accessible non-web alternative.

### Pilot operations
- [ ] Recruit and verify a small initial Winnipeg provider cohort. No provider has agreed to join or been verified/onboarded.
- [ ] Three exploratory provider/sector outreach emails remain drafts; none has been sent.
- [ ] Establish response-time targets, escalation coverage, cancellation handling and a no-match pathway.
- [ ] Run a supervised manual pilot with explicit confirmation from the recipient and provider.
- [ ] Track incidents, complaints, missed pickups and service quality.
- [ ] Expand beyond Winnipeg only after separate local verification.

## New quality controls and operating preparation\n\n- [x] Added a CI static safeguard script that checks required public assets, development-only warnings, privacy/accessibility draft notices, consent wiring, staff-function proxy usage and scans public assets for privileged key patterns. GitHub Actions run 45945373789 completed successfully, including the static safeguard step and Pages deployment.\n- [x] Added draft Winnipeg pilot operations runbook covering request triage, provider approval gates, incident response, staff lifecycle and proposed service levels. Named operators, contacts and legal approval remain outstanding.
- [x] Added a privacy impact assessment working draft documenting data inventory, processors, risk mitigations, retention questions and approval gates. It is not a completed legal PIA.\n- [x] Added manual accessibility test plan. No human or assistive-technology audit has been performed.\n- [x] Provider rejection and audit event verified in a rollback-only transaction; live tables remain empty apart from the owner staff role.\n\n## Current advisor findings

- Warning: leaked-password protection disabled.
- Informational: RLS is enabled with no policies on the private staff role and audit tables. This is intentional in the current design because anon/authenticated privileges are revoked and only service_role accesses them. Recheck after future permission changes.

## Latest database review — 2026-11-27

- [x] Added and verified indexes for `il_staff_roles.granted_by` and `il_staff_audit_log.actor_user_id`, covering the two staff-table foreign keys flagged by the performance advisor.
- [ ] The security advisor still reports leaked-password protection disabled (plan-limited on the current Free plan). The no-policy notices for the staff role/audit tables are intentional: RLS is enabled and anon/authenticated privileges are revoked.
- [ ] Performance advisor still reports two pairs of permissive SELECT policies on requests and provider responses. They serve distinct requester/provider access paths and must not be removed without replacing both paths and re-running cross-account RLS tests. Unused-index notices are expected while the pilot tables are empty; reassess after real workload exists.

## Outreach compliance

- Three exploratory provider/sector email drafts exist, but remain unsent. The business mailing address and complete sender identification/unsubscribe details have not been confirmed. Do not send until CASL requirements and a valid consent or other lawful basis have been reviewed.
- No provider agreement, customer booking or paid customer is recorded.

## Release rule

Do not remove the development-pilot warning or invite the public to submit real requests until the browser/Auth tests, provider verification, privacy/legal work, accessibility testing, incident-response arrangements and supervised pilot gates are complete.
