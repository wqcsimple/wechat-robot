/**
 * @author whis admin@wwhis.com
 * @Created 5/4/17
 */
const {Wechaty} = require('wechaty');
const CoreApp = require('./core/core_app');
const finis = require('finis');

const bot = Wechaty.instance();
CoreApp.init(bot);

bot
    .on('logout', (user) => CoreApp.logout(user))
    .on('login', (user) => CoreApp.login(user))
    .on('scan', (url, code) => CoreApp.scan(url, code))
    .on('error', (error) => CoreApp.error(error))
    .on('message', (message) => CoreApp.message(message))
;


bot.init()
    .catch(err => CoreApp.errorCatch(err));

finis((code, signal, error) => CoreApp.finish(code, signal, error));