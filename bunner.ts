import { Database } from "bun:sqlite"
import { Hono } from "hono"

const app = new Hono()
const db = new Database("./sov.db3")

const LIMIT = 30

const allStmt = db.query(
	`SELECT * FROM sov WHERE name LIKE ? ORDER BY timestamp LIMIT ${LIMIT}`
)

const slot = {
	heroic: db.query(
		`SELECT * FROM sov WHERE name LIKE ? AND json_extract(nbt, "$.__type") == 1 ORDER BY timestamp LIMIT ${LIMIT}`
	),
	normal: db.query(
		`SELECT * FROM sov WHERE name LIKE ? AND json_extract(nbt, "$.__type") IS NULL ORDER BY timestamp LIMIT ${LIMIT}`
	),
}

app.get("/items", (c) => {
	const q = c.req.query()
	switch (q.slotType) {
		case "heroic":
			return c.json(slot.heroic.all(`%${c.req.query("q")!}%`))
		case "normal":
			return c.json(slot.normal.all(`%${c.req.query("q")!}%`))
	}
	return c.json(allStmt.all(c.req.query("q") ? `%${c.req.query("q")!}%` : "%"))
})

export default {
	port: 3005,
	fetch: app.fetch,
}
