/**
 * @author whis admin@wwhis.com
 * @Created 6/15/17
 */
const Log = require('../lib/logger');
const fs = require('fs');
const Config = require('../config');
const rp = require('request-promise');
const Util = require('../lib/util');

let autoReplyUserAlias = ['邱', '黄君坝'];
// let autoReplyUserAlias = ['黄君坝'];
// let autoReplyUserAlias = [];

async function onMessage(message)
{
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
        Log.info('is myself message');
        return null;
    }

    let alias = sender.alias();
    if (autoReplyUserAlias.indexOf(alias) >= 0) {
        let p1 = message.say('胡挺傻逼')
        let p2 = message.say('胡挺傻逼');
        let p3 = message.say('胡挺傻逼');
        let p4 = message.say('胡挺傻逼');
        let p5 = message.say('胡挺傻逼');
        let p6 = message.say('胡挺傻逼');
        let p7 = message.say('胡挺傻逼');
        let p8 = message.say('胡挺傻逼');
        let p9 = message.say('胡挺傻逼');
        let p10 = message.say('胡挺傻逼');

        Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]).then(() => {

        })
    }

    Log.info(message.from().name());
    Log.info(message.from().alias());
}

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


module.exports = onMessage;