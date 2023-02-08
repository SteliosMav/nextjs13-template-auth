import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  if (!body.email || !body.password) {
    return res.status(400).json({ data: "First or last name not found" });
  }
  res.status(200).json({ ...body });
}
