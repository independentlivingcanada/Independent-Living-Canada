# Privacy impact assessment — working draft

**Status:** Internal working draft. Not a legal opinion, completed PIA, or approval to collect real personal information. The project remains a development pilot and test accounts only.

## 1. Accountable organization and responsibility

- Legal entity/operator: **Not yet determined**.
- Privacy officer/contact: **Not appointed**.
- Data controller/custodian roles: **Require legal review**.
- Service geography for any future pilot: Winnipeg, Manitoba only.
- Intended audience: older adults, people with disabilities and family supporters; provider applicants.
- Intended purpose: facilitate human review of requests for non-emergency practical support and provider applications.

No real personal, financial, health or government-identification information should be entered during development.

## 2. Data inventory

| Data element | Why it exists | Current location | Risk / minimization |
|---|---|---|---|
| Account email and auth identifier | Authentication and ownership | Supabase Auth | Restrict access; no shared accounts |
| Request category, city, area, description, timing | Understand a practical support request | `il_service_requests` | Descriptions can accidentally reveal sensitive details; instruct users not to include diagnoses or records |
| Recipient name | Identify who the requested support is for | Request table | Optional; avoid collecting where unnecessary |
| Contact name, email, phone, contact preference | Respond to requester | `il_request_private_contacts` | Separate from request table; staff-only access |
| Accessibility logistics | Determine practical compatibility | Request table | Collect only operational arrangements, not diagnoses |
| Provider contact and service details | Review a provider application | `il_provider_profiles` and services | Keep applications private until approved |
| Consent attestation and timestamp | Evidence request confirmation | Request table | Record the attestation, not unnecessary personal narratives |
| Staff identity, action and before/after status | Accountability | Staff role and audit tables | Restrict to service role; review access and retention |

Do not collect payment card data, bank details, government ID numbers, health-card numbers, diagnoses, medication lists, clinical records, precise home access codes or unnecessary disability information.

## 3. Data flow and processors

- Static public pages are deployed through GitHub Pages.
- Authentication and database are in a separate Supabase project configured in Canada Central (Toronto).
- Decorative images load from Unsplash.
- The staff portal calls a Supabase Edge Function; its service-role credential remains server-side.
- Confirm the current subprocessors, support-access locations, backups, logs, telemetry and cross-border processing terms directly with each vendor before launch.
- Confirm the legal entity's contracts and data-processing terms.

## 4. Access and safeguards already implemented

- Authenticated user ownership and RLS policies on application tables.
- Private requester contact data separated from the main request table.
- Consent-required atomic request submission.
- Provider service categories start inactive and require staff approval.
- Staff access checked against a private allowlist in the Edge Function.
- Staff status changes are allowlisted, server-side and audit logged.
- Public frontend uses a publishable key; service-role key is not shipped to the browser.
- Development-only notice instructs testers to use fictional details.

These controls have had targeted SQL tests, but full browser/Auth acceptance testing remains outstanding.

## 5. Main privacy risks and mitigations

1. **Sensitive information in free-text fields:** use clear warnings, collect minimum necessary information, train reviewers, and define deletion/redaction handling.
2. **Unauthorized disclosure of contact details:** keep contact records separate, restrict staff access, audit access/actions, and test negative access paths.
3. **Family supporter acting without recipient consent:** require clear recipient agreement and document the supporter's authority where legally relevant.
4. **Unverified providers receiving personal details:** do not share requester details until a suitable provider is verified and the requester agrees to the proposed sharing.
5. **Excessive retention:** define retention periods for abandoned requests, rejected applications, audit records and account data; automate deletion where appropriate.
6. **Vendor or cross-border processing:** verify data residency, subprocessors, support access, backup locations and contractual terms.
7. **Staff account compromise:** individual accounts, strong passwords, MFA if supported, least privilege, prompt deactivation and periodic access reviews.
8. **Privacy breach:** appoint a privacy lead, maintain an incident log, preserve evidence and obtain advice on notification requirements.

## 6. Retention and individual rights — decisions required

No final retention schedule or deletion workflow is approved. Before launch, define:
- Retention by data class and operational purpose.
- Deletion of accounts, provider applications and service requests.
- Treatment of audit logs and legal holds.
- How access/correction requests are verified and fulfilled.
- How a person withdraws consent and what happens to an in-progress request.
- Response times and a monitored privacy contact.

## 7. Privacy breach procedure — draft

1. Contain the incident and revoke compromised access.
2. Preserve relevant logs and facts; avoid altering evidence.
3. Notify the designated privacy lead and accountable operator.
4. Assess information, individuals, likely harm, duration and recipients.
5. Obtain legal advice on applicable Manitoba/federal notification duties and timing.
6. Communicate with affected people and regulators where required.
7. Document containment, decisions, notices, remediation and lessons learned.

## 8. Required approvals before any live pilot

- [ ] Identify legal operator and accountable privacy officer.
- [ ] Obtain Manitoba/federal privacy legal review and complete a formal PIA as advised.
- [ ] Verify vendor terms, subprocessors, data location and cross-border access.
- [ ] Approve collection purposes, consent language and family-supporter authority process.
- [ ] Approve retention/deletion schedule and implement it.
- [ ] Publish final privacy notice, contact channel and complaint process.
- [ ] Test access/correction/deletion and consent withdrawal.
- [ ] Complete browser/Auth and security testing with synthetic accounts.
- [ ] Train staff and document privacy-breach response.
- [ ] Approve launch in writing.

**Current decision:** Do not accept real personal information or launch public bookings.
