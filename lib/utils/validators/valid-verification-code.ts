export default function validVerificationCode(code: unknown): boolean {
  // Should be string and 6 chars long
  if (typeof code === "string" && code.length === 6) return true;
  return false;
}
