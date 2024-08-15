require('dotenv').config();
const TelegramApi = require ('node-telegram-bot-api');
const bot = new TelegramApi (process.env.NODE_TOKEN, {polling: true});
const {contentCourse} = require ('./contentCourse');
const {questions} = require ('./qwestions');

//код итогового теста
const testCode = async (chatId)=>{
  let currentQuestionIndex = 0;
    await bot.sendMessage (chatId, 'Начинаем итоговый тест');
    const question = questions[currentQuestionIndex];
    await bot.sendMessage(chatId, question.question);
    await  bot.on ('message', async msg =>{
    const text = msg.text;
    const chatId = msg.chat.id;
    const question = questions[currentQuestionIndex];
    if (text.toLowerCase() === question.answer.toLowerCase()) {
        await bot.sendMessage(chatId, 'Правильно!');  
        currentQuestionIndex++;
        const question = questions[currentQuestionIndex];
    (currentQuestionIndex >= questions.length) ? await bot.sendMessage(chatId, 'Игра завершена!') :bot.sendMessage(chatId, question.question);
      } else {
        await bot.sendMessage(chatId, 'Неправильно! Попробуйте снова');
      };
    
  });
}
const start=()=>{
// команды в меню
bot.setMyCommands ([ 
    {command:'/info', description: 'Информация о курсе'},
    {command:'/content', description: 'Содержание'},
]);


//ответы на команды меню


bot.on('message', async msg => { 
    const text = msg.text;
    const chatId = msg.chat.id;

    // содержание
    if (text === '/content') {
        await bot.sendMessage (chatId, 'Содержание курса', contentCourse)
    };
// старт
    if (text === '/start'){
        bot.sendMessage (chatId, 'Приветствую тебя в электронном курсе о том, как правильно пить воду, чтобы быть здоровым. Нажав на кнопку меню рядом со строкой ввода, ты сможешь открыть информацию об управлении курсом, а так же содержание курса. Удачи!')
    };
    // помощь
    if (text === '/info'){
        await bot.sendMessage (chatId, 'Ты находишься в электронном курсе о том, как правильно пить воду, чтобы быть здоровым. Нажав на кнопку меню рядом со строкой ввода, ты сможешь открыть информацию об управлении курсом, а так же содержание курса. Удачи!')
    } 
    
});

// итоговый тест

bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/endTest') {
     await testCode (chatId);         
};
if (data === '/chap1') {
  await bot.sendPhoto(chatId, './izo/circle1.png')
  await bot.sendMessage (chatId, "текст раздела 1. часть 1")
} 
});




};
start();
