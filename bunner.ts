import { Database } from 'bun:sqlite'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
const db = new Database('./ah.db3')
const stmt = db.query('SELECT * FROM sov1 WHERE name LIKE ? ORDER BY timestamp LIMIT 10')
app.get('/items', (c) => {
    return c.json(stmt.all(`%${c.req.query('q')!}%`))
}, cors())

export default {
    port: 3005,
    fetch: app.fetch,
}
