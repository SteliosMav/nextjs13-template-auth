import { createUser, getUsers } from "@/lib/prisma/users";
import { APIResponse } from "@/types/api/response";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<User | User[]>>
) => {
  if (req.method === "GET") {
    const dbResponse = await getUsers();
    if ("data" in dbResponse) {
      return res.status(200).json({ ...dbResponse });
    } else {
      return res.status(500).json({ ...dbResponse });
    }
  }

  if (req.method === "POST") {
    const data = req.body;
    const dbResponse = await createUser(data);
    if ("data" in dbResponse) {
      return res.status(200).json({ ...dbResponse });
    } else {
      return res.status(500).json({ ...dbResponse });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end({
    error: "Bad request",
    message: `Method ${req.method} is not allowed.`,
  });
};

export default handler;
