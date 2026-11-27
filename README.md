# Independent Living Canada

A Canada-wide concept for connecting older adults, people with disabilities, and family supporters with practical local help. The first controlled pilot is intended for Winnipeg, Manitoba.

## Development site

- Website: https://tritchot666.github.io/Independent-Living-Canada/
- Source: https://github.com/tritchot666/Independent-Living-Canada

## Current status

**Development pilot only — not open for public service bookings.** Use fictional details for testing. Do not submit real personal, financial, or health information.

The current website supports account registration/sign-in, service-request submission, request history, and provider applications. Provider applications remain pending review; providers are not publicly listed or matched automatically. There are no verified public providers or customer bookings yet.

The database is a separate Supabase project for this initiative. It is not the QuoteBack production database.

## Service boundaries

The concept covers accessible non-emergency rides, companionship, errands/groceries, light household assistance, and home accessibility services. It does not provide emergency response, ambulance or stretcher transport, medical transport, clinical/nursing care, medication administration, or personal care.

## Before a real pilot

- Enable Supabase leaked-password protection and configure the production redirect URL.
- Complete synthetic-account end-to-end tests for requester and provider roles, including negative cross-account access tests.
- Implement and verify a secure staff-only review workflow; never put a service-role key in browser code.
- Verify provider identity, insurance, licensing, references, service boundaries, accessibility capability, and safeguarding requirements.
- Establish consent, privacy, complaint, incident, and escalation procedures.
- Complete accessibility testing against WCAG 2.2 AA and review applicable provincial requirements.
- Only then consider enabling real bookings, initially within the Winnipeg pilot area.

See [docs/LAUNCH_READINESS.md](docs/LAUNCH_READINESS.md) for the operational checklist and current blockers.
