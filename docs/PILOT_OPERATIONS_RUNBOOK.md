# Winnipeg pilot operations runbook — draft

**Status:** Internal operating draft. Do not use to accept real bookings until legal, insurance, privacy and safeguarding review is complete.

## Current operating restrictions

- Development/test mode only. No real customer or provider personal information.
- No public booking, automated matching, payment collection or provider listing.
- Initial geography: Winnipeg, Manitoba only.
- Allowed categories under consideration: non-emergency community rides, companionship/social visits, errands/groceries, light household assistance and home accessibility modifications.
- Excluded: emergency response, ambulance/stretcher/medical transport, nursing/clinical care, medication assistance, personal care, lifting/transfers and regulated health services.

## Roles that must be named before a pilot

| Role | Assigned person | Backup | Required access |
|---|---|---|---|
| Pilot owner / accountable operator | TBD | TBD | Staff admin |
| Safeguarding and incident lead | TBD | TBD | Staff reviewer/admin as needed |
| Privacy contact | TBD | TBD | Minimum necessary |
| Accessibility feedback contact | TBD | TBD | Monitored mailbox/phone |
| Provider verification reviewer | TBD | TBD | Staff reviewer |
| Emergency escalation backup | TBD | TBD | Documented contact route |

Do not publish until every role has a named primary and backup, working contact method and coverage hours.

## Request triage

1. Confirm the request is non-emergency and within the five supported categories.
2. If urgent danger or a medical emergency is described, do not match; direct the person to 911.
3. Decline or redirect requests for clinical, nursing, medication, personal care, transfers, ambulance or stretcher transport.
4. Confirm the recipient understands and agrees to the request and any family supporter involvement.
5. Check that the request contains no diagnoses, medication details, health-card numbers or unnecessary sensitive information. Ask the person to remove such details rather than copying them into notes.
6. Review geography, timing, accessibility logistics and provider capability. Never infer accessibility from marketing language.
7. If no verified provider fits, tell the requester there is no suitable verified match. Do not suggest an unverified prospect as available.
8. Share options only after provider scope, price, availability and relevant limitations are confirmed.
9. Obtain explicit acceptance from both the recipient and provider before any service is considered arranged.
10. Record status changes and material decisions in the staff audit trail.

## Provider approval gate

A provider remains pending until the reviewer has documented and verified:
- Legal identity and authority to represent the business.
- Current liability and, where applicable, commercial auto insurance and policy limits.
- Applicable business, driver, vehicle, trade and permit requirements.
- Role-appropriate screening, references and training.
- Written service boundaries, prices, cancellation terms, service area, hours and capacity.
- Safeguarding, privacy, complaint, incident and emergency procedures.
- Accessibility capabilities with specific limits and evidence.
- Signed provider agreement and evidence review date/renewal dates.

Approve only the exact service categories that passed verification. Reject incomplete or unsuitable applications. Suspend immediately where credible safety or insurance concerns arise. Record reasons and audit every decision.

## Incident response

- Immediate danger: call 911 first.
- Make sure the affected person is safe and ask what support/contact they want.
- Notify the safeguarding lead and backup promptly.
- Preserve factual notes: time, place, people, what was reported, actions taken and outcome. Do not speculate.
- Suspend the relevant provider where credible risk warrants it; preserve the audit record.
- Escalate privacy breaches to the privacy lead and obtain legal advice about notification obligations.
- Do not promise confidentiality beyond legal requirements.
- Record investigation, corrective action, notifications, appeal/review and closure.
- Track missed rides, late arrivals, falls, property damage, complaints, cancellations and repeat patterns.

## Proposed pilot service levels — must be approved

These are planning targets, not existing commitments:
- Acknowledge new request within one business day.
- Complete initial scope/safety triage within two business days.
- Update requester at least every two business days while an open request is being reviewed.
- Escalate urgent safety complaints immediately during published operating hours.
- If no suitable verified provider is available, close the loop clearly rather than leaving a request open indefinitely.

Set published operating hours and after-hours boundaries before the pilot begins.

## Daily and weekly controls

Daily:
- Review new requests and applications.
- Check incidents, complaints and overdue requests.
- Confirm staff portal access and queue status.
- Avoid exporting or copying private contact details unless necessary.

Weekly:
- Review open requests, provider verification expiry dates and service complaints.
- Reconcile provider active status against evidence expiry.
- Review audit events and unusual access.
- Review accessibility feedback and unresolved accommodations.
- Record operational metrics without unnecessary personal details.

## Staff access lifecycle

- Provision staff only after identity and role approval by the accountable operator.
- Use individual accounts; never share credentials.
- Grant the minimum role needed.
- Review active staff access monthly and whenever responsibilities change.
- On departure or role change, deactivate the staff allowlist record immediately, then revoke sessions through Supabase Auth and verify access is denied.
- Keep at least two authorized administrators for continuity, but do not create a backup account until the individual has been identified and approved.
- Review audit events after any staff offboarding or suspected compromise.

## Current blockers

No named safeguarding lead, privacy contact, accessibility contact, backup administrator, verified provider, insurance evidence, signed provider agreement or approved service-level commitment has been supplied. This runbook is a preparation document, not proof those controls are operating.
