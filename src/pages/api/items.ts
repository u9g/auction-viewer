// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const f = await (await fetch('http://localhost:3005/items?q=' + encodeURIComponent(req.query.q as any))).json()
  res.status(200).json(f)
}
