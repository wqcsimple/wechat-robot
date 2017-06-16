/**
 * @author whis admin@wwhis.com
 * @Created 6/15/17
 */
const Log = require('../lib/logger');
const fs = require('fs');
const Config = require('../config');
const rp = require('request-promise');
const Util = require('../lib/util');

// let autoReplyUserAlias = ['邱', '黄君坝'];
let autoReplyUserAlias = [];

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

    // let alias = sender.alias();
    // if (autoReplyUserAlias.indexOf(alias) >= 0) {
    //     let options = {
    //         method: 'POST',
    //         uri: Config.TU_LINK_ROBOT_URL,
    //         body: {
    //             key: Config.TU_LINK_ROBOT_KEY,
    //             info: content
    //         },
    //         json: true
    //     };
    //     return rp(options)
    //         .then((res) => {
    //
    //             Log.info(res.list);
    //
    //             if (res.url) {
    //                 message.say(`${res.text}: ${res.url}`);
    //             }
    //             else
    //             {
    //                 message.say(res.text);
    //             }
    //         })
    //         .catch(err => {
    //             message.say(err);
    //         })
    // }

    // Log.info(message.from().name());
    // Log.info(message.from().alias());
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