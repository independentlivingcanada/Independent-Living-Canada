import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const required = [
  "index.html", "app.js", "styles.css", "config.js",
  "admin.html", "admin.js", "admin.css",
  "privacy.html", "accessibility.html"
];
for (const file of required) assert.ok(existsSync(file), `Missing public asset: ${file}`);

const read = (file) => readFileSync(file, "utf8");
const html = read("index.html");
const privacy = read("privacy.html");
const accessibility = read("accessibility.html");
const adminHtml = read("admin.html");
const adminJs = read("admin.js");
const appJs = read("app.js");
const config = read("config.js");

for (const asset of ["./styles.css", "./config.js", "./app.js"]) {
  assert.ok(html.includes(asset), `Public page does not reference ${asset}`);
}
assert.ok(html.includes("Development pilot — test accounts only"), "Development-only warning is missing");
assert.ok(html.includes("do not submit real personal, financial or health information"), "Fictional-data warning is missing");
assert.ok(privacy.includes("Development draft") && privacy.includes("not a final legal privacy policy"), "Privacy draft warning is missing");
assert.ok(accessibility.includes("Development draft") && accessibility.includes("do not claim conformance"), "Accessibility draft warning is missing");
assert.ok(adminHtml.includes("Restricted staff area"), "Staff portal restriction notice is missing");
assert.ok(adminJs.includes('functions.invoke("independent-living-admin"'), "Staff actions are not routed through the protected Edge Function");
assert.ok(appJs.includes("p_consent_confirmed:v.consent===\"on\""), "Service request consent is not passed to the database function");

const publicFiles = [...required].map(read).join("\n");
const forbidden = [
  /SUPABASE_SERVICE_ROLE_KEY/i,
  /service_role\s*[:=]/i,
  /sb_secret_[A-Za-z0-9_-]+/i
];
for (const pattern of forbidden) assert.ok(!pattern.test(publicFiles), `Potential privileged key or credential reference found: ${pattern}`);
assert.ok(/sb_publishable_[A-Za-z0-9_-]+/.test(config) || /eyJ[A-Za-z0-9_-]+\./.test(config), "No browser publishable/legacy anon key detected in config.js");

console.log("Public-site static safeguards passed: assets, pilot warnings, draft notices, consent wiring, staff proxy, and credential scan.");
