// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if (!req.url) return res.status(404)
	const url = "http://localhost:3005" + req.url.replace("/api", "")
	const f = await (await fetch(url.toString())).json()
	// console.log(`fetch("${url}") = ${JSON.stringify(f)}`)
	res.status(200).json(f)
}
