/**
 * @author whis admin@wwhis.com
 * @Created 5/5/17
 */
const Log = require('../lib/logger');
const QrcodeTerminal  = require('qrcode-terminal')
const Util = require('../lib/util');

let CoreApp = {
    bot: null,
    init: (bot) => {
        this.bot = bot;
    },
    logout: (user) => {
        Log.d('Bot', `${user.name()} logouted`);
    },

    login: (user) => {
        Log.info('Bot', `${user.name()} logined`)

        // this.bot.say('Wechaty login')
    },

    scan: (url, code) => {
        if (!/201|200/.test(String(code))) {
            const loginUrl = url.replace(/\/qrcode\//, '/l/')
            QrcodeTerminal.generate(loginUrl)
        }
        console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
    },

    message: (message) => {
        let room = message.room();
        Log.info((room ? '[' + room.topic() + ']' : '')
            + '<' + message.from().name() + '>'
            + ':' + message.toStringDigest()
        );


        let alias = message.from().alias();
        if (alias === '邱' && !message.self()) {
            message.say('这是我的自动回复 --_-- ---- ' + Util.date('Y-m-d H:i:s'))
        }
        // Log.info(message.from().name());
        // Log.info(message.from().alias());
    },

    error: (error) => {
        Log.error('Bot', 'error: %s', error);
        this.bot.say('Wechaty error: ' + error.message)
    },

    console: function () {
    },

    errorCatch: (err) => {
        Log.e('Bot', 'init() fail: %s', err);
        this.bot.quit();
        process.exit(-1);
    },

    finish: (code, signal, error) => {
        let exitMsg = `Wechaty exit ${code} because of ${signal} `;
        Log.d(exitMsg);
        this.bot.say(exitMsg)
    }
};

module.exports = CoreApp;