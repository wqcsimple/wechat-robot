/**
 * @author whis admin@wwhis.com
 * @Created 5/4/17
 */
const fs = require('fs');
const path = require('path');
const {Wechaty} = require('wechaty');
const finis = require('finis');
const CoreApp = require('./core/core_app');
const watch = require('node-watch');

const isProd = process.env.NODE_ENV === 'production';

const bot = Wechaty.instance();

const EVENT_LIST = ['scan', 'logout', 'login', 'friend', 'room-join', 'room-leave', 'room-topic', 'message', 'heartbeat', 'error'];

// Load listener

const loadListener = (evt) => {
    let fn;
    try {
        fn = require(`./listener/${evt}`);
        console.log(`binded listener: ${evt}`);
    } catch (e) {
        fn = () => void 0;
        if (e.toString().indexOf('Cannot find module') > -1) {
            console.warn(`listener ${evt} is not defined.`);
        } else {
            console.error(e);
        }
    }
    return fn;
}

// purge require cache
const purgeCache = (moduleName) => {
    var mod = require.resolve(moduleName);
    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        (function traverse(mod) {
            mod.children.forEach(function (child) {
                traverse(child);
            });
            delete require.cache[mod.id];
        }(mod));
    }

    Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
        if (cacheKey.indexOf(moduleName)>0) {
            delete module.constructor._pathCache[cacheKey];
        }
    });
};

let eventHandler = {};

// start a watcher only if it's not production environment.
if (!isProd)
{
    watch('./listener', (e, filename) => {

        let evt = filename.substring(filename.lastIndexOf('/') + 1, filename.length - 3);
        console.log(`${e}: ${filename}`);

        if (EVENT_LIST.indexOf(evt) > -1) {
            if (e === 'update') {
                console.log(`${evt} listener reloaded.`);
                purgeCache(`./listener/${evt}`);
                // It may read an empty file, if not use setTimeout
                setTimeout(() => {
                    bot.removeListener(evt, eventHandler[evt]);
                    //console.log('filecontent: ' + fs.readFileSync(`./listener/${evt}.js`));
                    eventHandler[evt] = loadListener(evt);
                    bot.on(evt, eventHandler[evt]);
                }, 1000);
            } else if (e === 'remove') {
                console.log(`${evt} listener removed.`);
                bot.removeListener(evt, eventHandler[evt]);
                eventHandler[evt] = () => void 0;
                bot.on(evt, eventHandler[evt]);
            }
        }
    });
}


// Bind events
EVENT_LIST.forEach(evt => {
    eventHandler[evt] = loadListener(evt);
    bot.on(evt, eventHandler[evt]);
});

bot.init()
    .catch(err => CoreApp.errorCatch(err));

finis((code, signal, error) => CoreApp.finish(code, signal, error));

