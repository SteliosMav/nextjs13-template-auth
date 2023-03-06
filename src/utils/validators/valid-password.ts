export default function validPassword(password: unknown): boolean {
  if (typeof password !== "string") return false;
  if (password.length < 1) return false;
  return true;
}
