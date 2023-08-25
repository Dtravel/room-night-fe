// server.ts
import { createServer } from 'https'
import next from 'next'
import fs from 'fs'
import tls from 'tls'
import { parse } from 'url'
import { Pool } from 'pg'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()
const cert = fs.readFileSync(dev ? 'cert/dataismist.cert' : 'cert/dtravel.cert')
const key = fs.readFileSync(dev ? 'cert/dataismist.key' : 'cert/dtravel.key')

const sniCallback = async (svName: any, callback: any, pool: any) => {
  const serverName = svName.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
  if (
    serverName.includes('dtravel.com') ||
    serverName.includes('dataismist.com') ||
    serverName.includes('dtravel.xyz') ||
    serverName.includes('localhost')
  ) {
    callback(null, tls.createSecureContext({ cert, key }))
  } else {
    try {
      const res: any = await pool?.query(
        `SELECT * FROM acme_certificate WHERE subject = '${serverName}' AND status='success' ORDER BY expires_at DESC LIMIT 1`
      )
      const result = res?.rows?.[0]
      if (result) {
        callback(null, tls.createSecureContext({ cert: result?.cert, key: result?.key }))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
app.prepare().then(() => {
  const databaseURL = process.env.NEXT_PUBLIC_DATABASE_URL
  const pool = new Pool({ connectionString: databaseURL })
  const options = {
    key,
    cert,
    SNICallback: (serverName: any, callback: any) => sniCallback(serverName, callback, pool),
  }

  createServer(options, async (req: any, res) => {
    if (req.url.match('.woff|.ttf|.svg|.jpg|.png|.jpeg')) {
      res.setHeader('Cache-Control', 'public,max-age=31536000,immutable') // 365 days
    }
    res.setHeader('X-Content-Type-Options', 'nosniff')
    try {
      const parsedUrl = parse(req?.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port)
})
