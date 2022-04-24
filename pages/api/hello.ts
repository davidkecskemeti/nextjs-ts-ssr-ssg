// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidate: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  for (const url in req.body) {
    await res.unstable_revalidate(url);
  }
  res.unstable_revalidate("/pokemon/1");
  res.status(200).json({ revalidate: true });
}
