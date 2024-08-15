module.exports = {
    contentCourse: {
        reply_markup: JSON.stringify({
          inline_keyboard: [
                [{text: 'Раздел 1', callback_data: '/chap1'}],
                [{text: 'Раздел 2', callback_data: '/chap2'}],
                [{text: 'Итоговый тест',callback_data: '/endTest'}],
              ]
        })
        
    }
}