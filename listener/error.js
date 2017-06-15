/**
 * @author whis admin@wwhis.com
 * @Created 6/15/17
 */
const Log = require('../lib/logger');


function onError(error) {
    Log.error('Bot', 'error: %s', error);
    this.bot.say('Wechaty error: ' + error.message)
}

module.exports = onError;