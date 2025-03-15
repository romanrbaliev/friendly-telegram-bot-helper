
/// <reference types="vite/client" />

interface TelegramWebApp {
  WebApp: {
    // Здесь можно добавить дополнительные свойства и методы Telegram WebApp API
    // при необходимости
    [key: string]: any;
  };
}

interface Window {
  Telegram?: TelegramWebApp;
}
