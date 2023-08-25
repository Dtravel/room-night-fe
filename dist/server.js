"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const https_1 = require("https");
const next_1 = __importDefault(require("next"));
const fs_1 = __importDefault(require("fs"));
const tls_1 = __importDefault(require("tls"));
const url_1 = require("url");
const pg_1 = require("pg");
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const cert = fs_1.default.readFileSync(dev ? 'cert/dataismist.cert' : 'cert/dtravel.cert');
const key = fs_1.default.readFileSync(dev ? 'cert/dataismist.key' : 'cert/dtravel.key');
const sniCallback = async (svName, callback, pool) => {
    var _a;
    const serverName = svName.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
    if (serverName.includes('dtravel.com') ||
        serverName.includes('dataismist.com') ||
        serverName.includes('dtravel.xyz') ||
        serverName.includes('localhost')) {
        callback(null, tls_1.default.createSecureContext({ cert, key }));
    }
    else {
        try {
            const res = await (pool === null || pool === void 0 ? void 0 : pool.query(`SELECT * FROM acme_certificate WHERE subject = '${serverName}' AND status='success' ORDER BY expires_at DESC LIMIT 1`));
            const result = (_a = res === null || res === void 0 ? void 0 : res.rows) === null || _a === void 0 ? void 0 : _a[0];
            if (result) {
                callback(null, tls_1.default.createSecureContext({ cert: result === null || result === void 0 ? void 0 : result.cert, key: result === null || result === void 0 ? void 0 : result.key }));
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
app.prepare().then(() => {
    const databaseURL = process.env.NEXT_PUBLIC_DATABASE_URL;
    const pool = new pg_1.Pool({ connectionString: databaseURL });
    const options = {
        key,
        cert,
        SNICallback: (serverName, callback) => sniCallback(serverName, callback, pool),
    };
    (0, https_1.createServer)(options, async (req, res) => {
        if (req.url.match('.woff|.ttf|.svg|.jpg|.png|.jpeg')) {
            res.setHeader('Cache-Control', 'public,max-age=31536000,immutable'); // 365 days
        }
        // if (req.url.match('.html')) {
        //   console.log('--html---')
        //   res.setHeader('Cache-Control', 'no-cache') // no cache with html file
        // }
        res.setHeader('X-Content-Type-Options', 'nosniff');
        try {
            const parsedUrl = (0, url_1.parse)(req === null || req === void 0 ? void 0 : req.url, true);
            await handle(req, res, parsedUrl);
        }
        catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    }).listen(port);
});
