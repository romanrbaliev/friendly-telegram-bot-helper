
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// Замените этот токен вашим токеном, полученным от BotFather
const BOT_TOKEN = 'ВАШ_ТОКЕН_ЗДЕСЬ';

// URL вашего веб-приложения (замените на URL, куда вы выложите приложение)
const WEBAPP_URL = 'https://ваш-домен.com';

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

// Обработка данных из веб-приложения
bot.on('message', (msg) => {
  if (msg.web_app_data) {
    const data = JSON.parse(msg.web_app_data.data);
    console.log('Получены данные из веб-приложения:', data);
    
    // Отправляем подтверждение пользователю
    bot.sendMessage(msg.chat.id, `Данные сохранены! Ваш баланс: $${data.dollars.toFixed(2)}, USDT: ${data.usdt.toFixed(2)}, BTC: ${data.btc.toFixed(6)}`);
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
