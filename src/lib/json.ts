/**
 * JSON for inline <script> blocks (JSON-LD, boot data). Escapes the characters
 * that could close the script element or start an HTML comment, so content
 * containing a closing script tag can never break out, even if an editor adds it.
 */
const BS = String.fromCharCode(92); // backslash
const LS = String.fromCharCode(0x2028);
const PS = String.fromCharCode(0x2029);
const esc = (code: string) => `${BS}u${code}`;

export function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .split('<').join(esc('003c'))
    .split('>').join(esc('003e'))
    .split('&').join(esc('0026'))
    .split(LS).join(esc('2028'))
    .split(PS).join(esc('2029'));
}
