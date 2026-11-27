# Remaining launch actions — 27 November 2026

This is an execution checklist, not a statement that the pilot is approved. Keep the development-only warning visible and do not accept real service requests until every applicable gate below is signed off.

## 1. Provider recruitment and verification

### Recruitment status
- Three exploratory Gmail drafts were previously prepared for Anchor Senior Services, Gullwing Care Services, and Transportation Options Network for Seniors (TONS).
- No message is recorded as sent. No provider has agreed to participate or been approved.
- Do not represent a prospect as a partner, provider, sponsor, or available service.
- Before sending any commercial electronic message, confirm the sender's legal/business identity, valid mailing address and contact method, and a working unsubscribe mechanism. Record consent or another valid CASL basis and honour unsubscribe requests. Have Canadian counsel review the outreach approach where uncertain.
- TONS is a sector network/referral contact, not presumed to be a service provider.

### Provider screening checklist (complete separately for each provider)
- [ ] Legal operating name, business number (where applicable), physical address, and authorized contact verified
- [ ] Service area, hours, booking process, prices, cancellation/refund terms and capacity confirmed
- [ ] Insurance certificate reviewed for the actual services and vehicles offered
- [ ] Required provincial/municipal licences, permits, driver credentials and vehicle inspections checked
- [ ] Criminal record / vulnerable-sector screening policy reviewed where lawful and relevant; identity and references checked
- [ ] Accessibility capabilities verified directly (vehicle ramp/lift, securement, transfer limitations, service-animal policy, communication supports)
- [ ] Clear written boundaries: no emergency response, ambulance/stretcher/medical transport, clinical care, nursing, medication administration, or personal care
- [ ] Complaints, incident reporting, safeguarding, privacy and data-sharing terms agreed in writing
- [ ] Provider contract and user-facing service description approved
- [ ] Staff member records evidence, date, expiry date and decision; second-person review before activation

**Rule:** An application, website, directory listing, or email response alone is not proof of insurance, credentials, suitability, or service availability.

## 2. Customer and staff browser acceptance tests

Use only dedicated fictional test accounts and invented contact details. Do not use a real person's disability, health, address, phone number, or service needs. Use separate identities for requester, provider, unrelated user, and staff. Never use the owner account as both requester and provider for isolation tests.

### Account and consent
- [ ] Requester can register, receive and complete confirmation, sign in, sign out, and use password reset
- [ ] Incorrect password and unconfirmed-email states are understandable and do not expose private information
- [ ] New password below the configured server-side minimum is rejected; a compliant password is accepted
- [ ] Consent is required before request submission; refusal creates no request or private-contact row
- [ ] Consent text, timestamp and purpose shown to the user match the stored attestation

### Requester privacy and request flow
- [ ] Submit one clearly synthetic request with invented contact details
- [ ] Confirm request appears to its requester and authorized staff only
- [ ] Confirm private contact details do not appear in public pages, provider directory, logs, or an unrelated user's session
- [ ] Confirm requester A cannot read or alter requester B's request or contact record
- [ ] Confirm request status changes are reflected accurately and audit events are recorded

### Provider and cross-account isolation
- [ ] Provider account can submit an application and manage only its own profile/services
- [ ] Provider A cannot read/update Provider B's profile, services, or responses
- [ ] Provider can see only the minimum request summary after an explicit invitation
- [ ] Provider cannot see private requester contact details unless an approved, documented workflow specifically authorizes it
- [ ] Requester can see responses only for their own request
- [ ] Uninvited provider and unrelated authenticated user are denied access

### Staff queue and audit
- [ ] Staff portal rejects an authenticated non-staff account
- [ ] Active staff can load a non-empty queue, open details, and perform allowed status changes
- [ ] Suspended/revoked staff access stops working immediately
- [ ] Invalid status values and unauthorized RPC calls are rejected
- [ ] Every staff decision records actor, target, old/new status, timestamp and reason where applicable
- [ ] Staff can distinguish an unverified application from an approved provider

### Cleanup and evidence
- [ ] Capture test date, browser/device, test account role (not password), expected result, actual result, pass/fail and defect reference
- [ ] Remove test accounts and synthetic rows using the approved cleanup procedure after evidence is retained
- [ ] Re-run row counts and confirm no synthetic data remains
- [ ] Do not use the production owner account for negative tests

**Current evidence:** database rollback tests have covered selected RLS, consent, staff status and audit behaviours. A real browser run with separate requester/provider/outsider accounts and a non-empty staff queue remains outstanding. Do not mark this section complete until a human tester records the results.

## 3. Privacy and legal approval

Draft privacy, safeguarding and privacy-impact documents are working materials only. Before launch:
- [ ] Retain a Canadian privacy lawyer or qualified privacy professional to review PIPEDA and applicable provincial requirements (including Manitoba's private-sector privacy framework, if applicable)
- [ ] Determine controller/processor roles, legal basis/consent, purposes, data minimization and whether a formal privacy impact assessment is required
- [ ] Approve a plain-language privacy notice and terms, including third-party sharing, cross-border processors, cookies/analytics, user access/correction/deletion and contact details
- [ ] Set documented retention and secure deletion periods for accounts, requests, private contacts, consent and audit records
- [ ] Approve breach detection, containment, assessment, notification and recordkeeping procedure with named incident lead and backup
- [ ] Review CASL requirements for provider and customer marketing, sender identity and unsubscribe handling
- [ ] Review consumer protection, accessibility, transportation, insurance, employment/contractor, safeguarding and liability arrangements
- [ ] Confirm the business name and branding are cleared for use; do not imply legal/trademark clearance from this checklist
- [ ] Record reviewer, credentials, date, scope, conditions and signed approval

No draft policy is legal advice or a substitute for professional approval.

## 4. Accessibility assessment

Target WCAG 2.2 AA; no conformance claim is currently made. A qualified human tester should assess the actual deployed site and staff portal:
- [ ] Keyboard-only navigation, visible focus, logical focus order, no traps
- [ ] NVDA with Firefox/Chrome and VoiceOver or TalkBack on a mobile device
- [ ] Screen-reader names, roles, states, headings, landmarks, labels and error announcements
- [ ] Text and non-text contrast, including focus indicators and disabled states
- [ ] 200% zoom and 320 CSS-pixel reflow without loss of content/functionality
- [ ] Text spacing overrides, reduced motion, orientation and touch target size
- [ ] Forms, validation, consent, dialogs, authentication, staff queue and status changes
- [ ] Images have appropriate alternative text; decorative images are ignored
- [ ] Test with older adults and people with varied access needs, with consent and fair compensation where appropriate
- [ ] Log issues, severity, remediation, retest and independent sign-off

Automated checks are useful but do not replace human assistive-technology testing.

## 5. Operating arrangements

Do not launch without named primary and backup people for:
- [ ] Service request triage and customer communications
- [ ] Provider verification and expiry tracking
- [ ] Safeguarding / urgent incident escalation and 911 guidance
- [ ] Privacy officer and breach response
- [ ] Complaints, disputes, refunds and accessibility accommodation
- [ ] Staff account approval, periodic access review and termination
- [ ] Daily queue monitoring, service outage and backup coverage

Approve operating hours, response targets, escalation tree, incident log, complaint timelines, insurance and provider contract. Publish only what the team can actually deliver. Do not imply 24/7 monitoring.

## 6. Account security

- [x] Frontend currently enforces a 12-character signup password minimum.
- [ ] Verify and set the minimum password length in Supabase Auth server-side settings (recommended 12 or more); frontend checks alone are bypassable.
- [ ] Confirm email confirmation, redirect allowlist, rate limits and password reset behaviour.
- [ ] Review staff access and revoke unused accounts/tokens.
- [ ] Enable leaked-password protection if/when the project plan supports it. Supabase documentation states this feature requires Pro or above; it is disabled on the current Free plan. Do not claim it is enabled.
- [ ] Re-run Supabase security advisor and document findings. The staff tables' RLS-without-policy notices are intentional only while anon/authenticated table grants remain revoked; re-check grants if schema or roles change.

Official guidance: https://supabase.com/docs/guides/auth/password-security

## 7. Release decision

The release owner must sign a dated go/no-go decision after reviewing all evidence. Until then:
- Keep development/test warnings visible.
- Do not accept real customer or health-related information.
- Do not promise a ride, caregiver, home service, response time or nationwide coverage.
- Do not collect payments or charge customers.
- Do not activate provider profiles without documented approval.
