import { isPlainObject } from "lodash";
import validEmail from "@/lib/utils/validators/valid-email";
import validVerificationToken from "@/lib/utils/validators/valid-verification-token";

export interface AccountVerificationCredentials {
  email: string;
  token: string;
}

export default function invalidAccountVerificationCredentials(
  payload: unknown
): false | string {
  if (!isPlainObject(payload)) return "Bad request";
  const objPayload = payload as object;
  if (!("email" in objPayload)) return "Property 'email' is missing";
  if (!("token" in objPayload)) return "Property 'token' is missing";
  const verificationTokenKeys = objPayload as AccountVerificationCredentials;
  if (typeof verificationTokenKeys.email !== "string")
    return "Property 'email' must be type of string";
  if (typeof verificationTokenKeys.token !== "string")
    return "Property 'token' must be type of string";
  const user = objPayload as AccountVerificationCredentials;
  if (!validEmail(user.email)) return "Email must be a valid email";
  if (!validVerificationToken(user.token)) return "Token must be a valid token";
  return false;
}
