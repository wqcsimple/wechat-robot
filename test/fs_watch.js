/**
 * @author whis admin@wwhis.com
 * @Created 6/15/17
 */
const watch = require('node-watch');

// watch(__dirname + '/../listener', { recursive: true }, function (evt, filename) {
//     console.log('type %s, %s', evt, filename);
//
//     if (evt === 'update')
//     {
//         console.log(filename + " updated");
//     }
//
//     if (evt === 'remove')
//     {
//         console.log(filename + " removed");
//     }
// });

let filename = '/Users/whis/Workspace/whis/wechat-robot/listener/message.js';

console.log(filename.lastIndexOf('/'));

let name = filename.substring(filename.lastIndexOf('/') + 1, filename.length - 3);

console.log(name);