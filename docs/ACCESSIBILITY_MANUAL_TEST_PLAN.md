# Manual accessibility test plan — Independent Living Canada

**Target:** WCAG 2.2 Level AA. This checklist is not an audit or conformance claim. A tester using assistive technology must complete it before public launch.

## Test environment

Record browser, operating system, device, viewport, zoom, assistive technology and date. Test public page, authentication, requester form, provider form, privacy notice, accessibility statement and staff portal.

## Keyboard-only checks

- [ ] Navigate every link, button, tab, input, select, checkbox and textarea using Tab / Shift+Tab.
- [ ] Activate controls using Enter and Space as appropriate.
- [ ] Focus is always visible and never obscured by sticky content.
- [ ] Tab order follows the visual and reading order.
- [ ] No keyboard trap exists; dialogs/menus can be exited.
- [ ] Hidden tabs/panels do not leave hidden controls in the tab order.

## Screen-reader checks

Test at least NVDA with Firefox or Chrome and VoiceOver with Safari/iOS.
- [ ] Landmarks, page title and heading hierarchy are meaningful.
- [ ] Every form control has an accessible name and required state.
- [ ] Instructions and character limits are announced where needed.
- [ ] Validation errors are announced and associated with the invalid field.
- [ ] Toast/status updates are announced without moving focus unexpectedly.
- [ ] Tabs expose selected state and associated panels.
- [ ] Decorative images are ignored; informative images have accurate alternative text.
- [ ] Emoji/icons do not create noisy or misleading announcements.
- [ ] Staff queue status and action controls are understandable without visual layout.

## Visual and reflow checks

- [ ] Text resized to 200% without clipping or loss of content.
- [ ] Reflow at 320 CSS px without two-dimensional scrolling except where essential.
- [ ] Contrast measured for text, controls, focus indicators and meaningful graphics.
- [ ] Focus indicators remain visible in light and dark system modes.
- [ ] Controls meet WCAG 2.2 target-size requirements or a valid exception.
- [ ] Content remains usable with increased text spacing.
- [ ] Reduced-motion preference is respected if motion is added.

## Forms and error handling

- [ ] Required fields are identified before submission.
- [ ] Invalid email, missing consent, missing category and overlong input errors are clear.
- [ ] Password errors do not erase entered email.
- [ ] Network/server errors explain the next safe action.
- [ ] No sensitive data appears in URLs, browser console or public error text.
- [ ] Confirmation and status changes are announced and remain visible long enough.

## Mobile and cognitive accessibility

- [ ] Android TalkBack and iOS VoiceOver navigation.
- [ ] Touch targets can be activated without accidental adjacent activation.
- [ ] Portrait and landscape layouts.
- [ ] Plain language, short instructions and predictable navigation.
- [ ] No colour-only status indicators.
- [ ] Users can review before submitting and correct mistakes.

## Evidence and sign-off

For each failure, record page, control, steps, expected result, actual result, assistive technology, severity, screenshot/video where appropriate, owner and retest date. Do not mark a test passed based only on automated scanning. A qualified independent reviewer should assess critical flows and WCAG conformance before any claim is made.
