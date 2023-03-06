import { isPlainObject } from "lodash";
import validEmail from "@/utils/validators/valid-email";
import validUserName from "@/utils/validators/valid-user-name";
import validPassword from "@/utils/validators/valid-password";

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export default function invalidSignUpCredentials(
  payload: unknown
): false | string {
  if (!isPlainObject(payload)) return "Bad request";
  const objPayload = payload as object;
  if (!("name" in objPayload)) return "Property 'name' is missing";
  if (!("email" in objPayload)) return "Property 'email' is missing";
  if (!("password" in objPayload)) return "Property 'password' is missing";
  const userKeys = objPayload as {
    name: unknown;
    email: unknown;
    password: unknown;
  };
  if (typeof userKeys.name !== "string")
    return "Property 'name' must be type of string";
  if (typeof userKeys.email !== "string")
    return "Property 'email' must be type of string";
  if (typeof userKeys.password !== "string")
    return "Property 'password' must be type of string";
  const user = objPayload as SignUpCredentials;
  if (!validUserName(user.name)) return "Name must be a valid name";
  if (!validEmail(user.email)) return "Email must be a valid email";
  if (!validPassword(user.password)) return "Password must be a valid password";
  return false;
}
