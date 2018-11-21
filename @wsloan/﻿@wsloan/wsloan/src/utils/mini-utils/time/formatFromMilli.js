/**
 * 
 * @param {*时间毫秒数} milli 
 */
function formatFromMilli(milli) {
    var time = milli / 1000;
    var day = Math.floor(time / 86400);
    time = time - day * 86400;
    var hour = Math.floor(time / 3600);
    time = time - hour * 3600;
    var minute = Math.floor(time / 60);
    var second = time - minute * 60;

    return {
        day: parseInt(day, 10),
        hour: parseInt(hour, 10),
        minute: parseInt(minute, 10),
        second: parseInt(second, 10)
    };
}

module.exports = formatFromMilli