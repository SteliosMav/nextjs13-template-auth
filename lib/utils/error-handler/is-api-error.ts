export function isAPIError(error: unknown): boolean {
  if (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    typeof error.error === "object" &&
    error.error !== null &&
    "statusCode" in error.error &&
    "message" in error.error &&
    Object.keys(error).length === 1 &&
    Object.keys(error.error).length === 2
  ) {
    return true;
  } else return false;
}
