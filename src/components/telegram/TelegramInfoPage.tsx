
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bot, Code, ExternalLink, Server, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TelegramInfoPage = () => {
  return (
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
          Crypto Clicker для Telegram
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Запустите игру Crypto Clicker в своем Telegram боте и начните собирать криптовалюту прямо в мессенджере!
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="text-primary" /> Что такое Telegram-бот Crypto Clicker?
          </CardTitle>
          <CardDescription>
            Все возможности игры теперь доступны в Telegram
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Telegram-бот Crypto Clicker позволяет играть в игру прямо в Telegram без необходимости переходить на внешние сайты. 
            Все ваши достижения и прогресс сохраняются, и вы можете продолжать игру в любое время.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h3 className="font-medium mb-2">Все функции игры</h3>
              <p className="text-sm text-gray-500">Полный функционал игры, включая майнинг, стейкинг и трейдинг</p>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h3 className="font-medium mb-2">Уведомления</h3>
              <p className="text-sm text-gray-500">Получайте уведомления о важных событиях игры прямо в Telegram</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="text-primary" /> Как подключить игру к Telegram
          </CardTitle>
          <CardDescription>
            Пошаговая инструкция для подключения
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium text-primary flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">1</span>
              Создайте бота в Telegram
            </h3>
            <p className="text-sm text-gray-400 ml-8">
              Напишите <a href="https://t.me/BotFather" className="text-primary hover:underline" target="_blank" rel="noreferrer">@BotFather</a> в Telegram и следуйте инструкциям для создания нового бота.
              Получите API токен вашего бота, он будет нужен на следующем шаге.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-primary flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">2</span>
              Настройте своего бота
            </h3>
            <p className="text-sm text-gray-400 ml-8">
              Используйте наш инструмент для настройки Telegram бота. Вы можете установить команды, описание и другие параметры.
            </p>
            <div className="ml-8 mt-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/telegram-bot-helper">
                  <Bot className="mr-2 h-4 w-4" />
                  Открыть инструмент настройки бота
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-primary flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">3</span>
              Разместите бота на сервере
            </h3>
            <p className="text-sm text-gray-400 ml-8">
              Для работы бота вам понадобится сервер. Вы можете использовать бесплатные платформы 
              как Glitch, Replit или Heroku для размещения вашего бота.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-primary flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">4</span>
              Подключите WebApp к боту
            </h3>
            <p className="text-sm text-gray-400 ml-8">
              В настройках бота через BotFather добавьте WebApp URL, чтобы открывать игру прямо в Telegram.
              Это позволит пользователям играть в Crypto Clicker не выходя из мессенджера.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="text-primary" /> Технические детали
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-500 flex-shrink-0 mt-1" size={18} />
              <p className="text-sm text-gray-400">
                Для полноценной работы Telegram бота требуется настройка серверной части с использованием языка программирования (например, Python, Node.js) 
                и размещение на сервере с поддержкой HTTPS. Если у вас нет технических навыков, рекомендуем обратиться к разработчику.
              </p>
            </div>
            <Separator />
            <p className="text-sm text-gray-400">
              Подробную техническую документацию по интеграции с Telegram Bot API вы можете найти в 
              <a href="https://core.telegram.org/bots/api" className="text-primary hover:underline ml-1" target="_blank" rel="noreferrer">
                официальной документации <ExternalLink size={12} className="inline" />
              </a>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link to="/telegram-bot-helper">
              Начать создание Telegram бота
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TelegramInfoPage;
