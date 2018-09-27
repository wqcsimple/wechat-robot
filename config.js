/**
 * @author whis admin@wwhis.com
 * @Created 5/24/17
 */

module.exports.TU_LINK_ROBOT_URL = TU_LINK_ROBOT_URL = "http://www.tuling123.com/openapi/api";
module.exports.TU_LINK_ROBOT_KEY = TU_LINK_ROBOT_KEY = "6aa5cc69c0404f0ab9fe3813f19f8894";

module.exports.RESPONSE_CODE_CATEGORY = {
    TEXT: 100000,
    LINK: 200000,
    NEWS: 302000,
    FOODS: 308000,
    SONG: 313000,
};

module.exports.RESPONSE_CODE_LIST = {
    100000: "text",
    200000: "url",
    302000: "list",
    308000: "list",
    313000: "function",
};

module.exports.RESPONSE_ERROR_MESSAGE = {
    40001: "参数 key 错误",
    40002: "请求内容 info 为空",
    40004: "当天请求次数已使用完",
    40007: "数据格式异常",
};