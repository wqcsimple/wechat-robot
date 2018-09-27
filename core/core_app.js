/**
 * @author whis admin@wwhis.com
 * @Created 5/5/17
 */
const Log = require('../lib/logger');
const QrcodeTerminal  = require('qrcode-terminal')
const Util = require('../lib/util');
const fs = require('fs');
const Config = require('../config');
const rp = require('request-promise');

// let autoReplyUserAlias = ['邱', '黄君坝'];
let autoReplyUserAlias = ['黄君坝', '尤建腾'];

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
        let sender = message.from();
        let content = message.content();
        let messageType = message.type();

        let topic = room ? '[' + room.topic() + ']' : "";
        let logMessage = `${topic} <${sender.name()}> : ${message.toStringDigest()}`;
        Log.info(logMessage);

        saveRawMessage(logMessage, topic || sender.alias() || sender.name());
        // saveRawMessage(message.rawObj, topic || sender.name());

        if (message.self()) {
            // is myself message
            return ;
        }

        let alias = sender.alias();
        if (autoReplyUserAlias.indexOf(alias) >= 0) {
            let options = {
                method: 'POST',
                uri: Config.TU_LINK_ROBOT_URL,
                body: {
                    key: Config.TU_LINK_ROBOT_KEY,
                    info: content
                },
                json: true
            };
            return rp(options)
                .then((res) => {

                    Log.info(res.list);

                    if (res.url) {
                        message.say(`${res.text}: ${res.url}`);
                    }
                    else
                    {
                        message.say(res.text);
                    }
                })
                .catch(err => {
                    message.say(err);
                })
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
        // this.bot.say(exitMsg)
    }
};

function saveRawMessage(message, name) {
    let filename = 'rawObj.log';
    if (name) {
        filename = name + '.log';
    }
    let obj = {};
    obj['time'] = Util.date('Y-m-d H:i:s');
    obj['message'] = message;
    fs.writeFileSync(__dirname + '/../logs/' + filename, JSON.stringify(obj, null, '  ') + '\n\n', {flag: 'a'});
}

module.exports = CoreApp;
