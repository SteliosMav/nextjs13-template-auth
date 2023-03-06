import { Role } from "@prisma/client";

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: Role;
}
