const Markup = require ('telegraf/markup.js')

module.exports = function () {
    return Markup.keyboard([
        ['Мои задачи', 'Добавить задачу'],
        ['Смотивируй меня']
    ]).resize().extra()
}
