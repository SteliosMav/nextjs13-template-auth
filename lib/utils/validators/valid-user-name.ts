export default function validUserName(name: unknown): boolean {
  if (typeof name !== "string") return false;
  if (name.length < 1) return false;
  return true;
}
