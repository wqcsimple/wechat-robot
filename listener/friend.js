/**
 * @author whis admin@wwhis.com
 * @Created 6/16/17
 */
const Log = require('../lib/logger');

async function onFriend(contact, request) {
    if (request) {
        let name = contact.name();
        await request.accept();

        Log.i(`Contact: ${name} send request ${request.hello}`);
    }
}

module.exports = onFriend;