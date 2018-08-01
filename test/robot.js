/**
 * @author whis admin@wwhis.com
 * @Created 5/24/17
 */
const Config = require('../config');
const rp = require('request-promise');


let options = {
    method: 'POST',
    uri: Config.TU_LINK_ROBOT_URL,
    body: {
        key: Config.TU_LINK_ROBOT_KEY,
        info: "鱼香肉丝怎么做"
    },
    json: true
};

rp(options)
    .then((res) => {
        console.log(res.text);
        switch (res.code) {
            case Config.RESPONSE_CODE_CATEGORY.TEXT:
                console.log(res[Config.RESPONSE_CODE_LIST[res.code]]);
                break;
            case Config.RESPONSE_CODE_CATEGORY.LINK:
                console.log(res[Config.RESPONSE_CODE_LIST[res.code]]);
                break;
            case Config.RESPONSE_CODE_CATEGORY.NEWS:
                let news = res[Config.RESPONSE_CODE_LIST[res.code]][0];
                let replyText = `<a href="${news['detailurl']}">${news['article']}</a>`;

                break;
            case Config.RESPONSE_CODE_CATEGORY.FOODS:
                console.log(res[Config.RESPONSE_CODE_LIST[res.code]][0]);
                break;
            case Config.RESPONSE_CODE_CATEGORY.SONG:
                console.log(res[Config.RESPONSE_CODE_LIST[res.code]]);
                break;

            default:
                message.say(res.text);
                break;
        }

    })
    .catch(err => {
        console.error(err);
    })



