/**
 * @author whis admin@wwhis.com
 * @Created 6/15/17
 */
const Log = require('../lib/logger');
const QrcodeTerminal  = require('qrcode-terminal')


function onScan(url, code) {
    if (!/201|200/.test(String(code))) {
        const loginUrl = url.replace(/\/qrcode\//, '/l/')
        QrcodeTerminal.generate(loginUrl)
    }
    console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
}


module.exports = onScan;