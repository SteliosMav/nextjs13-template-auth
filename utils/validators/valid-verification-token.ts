export default function validVerificationToken(token: unknown): boolean {
  if (typeof token === "string" && token.length > 0) return true;
  return false;
}
