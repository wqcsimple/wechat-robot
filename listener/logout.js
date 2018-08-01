/**
 * @author whis admin@wwhis.com
 * @Created 6/15/17
 */
const Log = require('../lib/logger');

function onLogout(user) {
    Log.d('Bot', `${user.name()} logouted`);
}

module.exports = onLogout;

