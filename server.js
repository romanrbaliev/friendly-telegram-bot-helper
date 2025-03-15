
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// Замените этот токен вашим токеном, полученным от BotFather
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';

// URL вашего веб-приложения
const WEBAPP_URL = 'https://your-deployed-app-url.com';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const app = express();
const PORT = process.env.PORT || 3000;

// Парсинг запросов
app.use(bodyParser.json());

// Статические файлы
app.use(express.static(path.join(__dirname, 'dist')));

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 'Привет! Добро пожаловать в Crypto Clicker!', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🎮 Играть', web_app: { url: WEBAPP_URL } }]
      ]
    }
  });
});

// Обработка любых других сообщений
bot.on('message', (msg) => {
  if (msg.web_app_data) {
    // Получить данные из веб-приложения, если они есть
    console.log('Получены данные из веб-приложения:', msg.web_app_data.data);
    bot.sendMessage(msg.chat.id, 'Данные получены!');
  }
});

// Обработка всех маршрутов React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

console.log('Бот запущен...');
