import { Database } from 'bun:sqlite'
import { Hono } from 'hono'

const app = new Hono()
const db = new Database('./ah.db3')
const stmt = db.query('SELECT * FROM sov1 WHERE name LIKE ? --case-insensitive')
app.get('/items', (c) => {
    return c.json(stmt.all('%' + c.req.query('q')! + '%'))
})

export default {
    port: 3005,
    fetch: app.fetch,
}
