/**
 * @author whis admin@wwhis.com
 * @Created 6/15/17
 */
const Log = require('../lib/logger');

function onLogin(user) {
    Log.info('Bot', `${user.name()} logined`)
}

module.exports = onLogin;