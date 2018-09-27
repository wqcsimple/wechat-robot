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
    let content = message.text();
    let messageType = message.type();

    let topic = room ? '[' + await room.topic() + ']' : "";
    let logMessage = `${topic} <${sender}> : ${content}`;
    Log.info(logMessage);

    saveRawMessage(logMessage, topic || sender.alias() || sender);
    // saveRawMessage(message.rawObj, topic || sender.name());

    if (message.self()) {
        // is myself message
        Log.info('is myself message');
        return null;
    }

    let alias = sender.alias();
    let sendName = sender.name();
    Log.debug("send name -> ", sendName);
    if (sendName.toString().indexOf("峰峰") >= 0) {
        console.log('send ---- ');
        let msgContent = "辣鸡P4";
        await message.say(msgContent);
    }

    Log.info("from name: ", message.from().name());
    Log.info("from alias: ", message.from().alias());
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
