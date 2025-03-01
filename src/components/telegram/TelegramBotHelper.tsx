
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import BotCreationStep from './BotCreationStep';
import { Send, Bot, MessageSquare, Settings, Copy, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const TelegramBotHelper = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Форма данных бота
  const [botToken, setBotToken] = useState('');
  const [botName, setBotName] = useState('');
  const [botDescription, setBotDescription] = useState('');
  const [commands, setCommands] = useState([
    { command: '/start', description: 'Начать работу с ботом' },
    { command: '/help', description: 'Получить помощь' }
  ]);
  const [welcomeMessage, setWelcomeMessage] = useState('Привет! Я новый бот. Чем могу помочь?');
  const [enableLogging, setEnableLogging] = useState(true);

  const handleNextStep = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
    setCurrentStep(step + 1);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Код скопирован",
      description: "Код был скопирован в буфер обмена",
    });
  };

  const moveToStep = (step: number) => {
    setCurrentStep(step);
  };

  // Пример кода для каждого шага
  const botCreationCode = `
import telebot

# Инициализация бота с токеном
bot = telebot.TeleBot("${botToken || 'ВАШ_ТОКЕН_БОТА'}")

# Установка описания и команд
bot.set_my_description("${botDescription || 'Описание вашего бота'}")

commands = [
${commands.map(cmd => `    {"command": "${cmd.command}", "description": "${cmd.description}"}`).join(',\n')}
]
bot.set_my_commands(commands)

# Обработчик команды /start
@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "${welcomeMessage}")

# Обработчик команды /help
@bot.message_handler(commands=['help'])
def send_help(message):
    bot.reply_to(message, "Вот список доступных команд:\\n" + 
                 "\\n".join([f"{cmd['command']} - {cmd['description']}" for cmd in commands]))

# Запуск бота
bot.polling()
  `;

  const webhookCode = `
from flask import Flask, request, jsonify
import telebot
import os

app = Flask(__name__)
bot = telebot.TeleBot("${botToken || 'ВАШ_ТОКЕН_БОТА'}")

@app.route('/webhook', methods=['POST'])
def webhook():
    update = request.get_json()
    if update:
        bot.process_new_updates([telebot.types.Update.de_json(update)])
    return jsonify({'status': 'ok'})

# Установка вебхука
@app.route('/set_webhook', methods=['GET'])
def set_webhook():
    url = request.url_root.replace('http://', 'https://') + 'webhook'
    return jsonify(bot.set_webhook(url))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
  `;

  const loggingCode = `
import telebot
import logging

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO,
    filename='bot_logs.log'
)
logger = logging.getLogger(__name__)

# Инициализация бота
bot = telebot.TeleBot("${botToken || 'ВАШ_ТОКЕН_БОТА'}")

# Логирование всех входящих сообщений
@bot.middleware_handler()
def log_messages(bot_instance, message):
    logger.info(f"Получено сообщение от {message.from_user.username}: {message.text}")

# Запуск бота
bot.polling()
  `;

  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="heading-2 mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Telegram Bot Helper
          </h1>
          <p className="subtle-text max-w-xl mx-auto">
            Простой и понятный инструмент для создания вашего Telegram бота без технических знаний
          </p>
        </header>

        <div className="space-y-6">
          {/* Шаг 1: Создание бота */}
          <BotCreationStep
            title="Создание бота"
            description="Получите токен от BotFather и настройте основную информацию"
            step={1}
            currentStep={currentStep}
            isCompleted={completedSteps.includes(1)}
            onSelect={() => handleNextStep(1)}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="botToken">Токен бота</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="botToken"
                    placeholder="Вставьте токен от BotFather"
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    type="password"
                    className="font-mono"
                  />
                  <a 
                    href="https://t.me/botfather" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-primary hover:text-primary/80"
                  >
                    <ArrowUpRight size={20} />
                  </a>
                </div>
                <p className="text-xs text-gray-500">
                  Получите токен у <a href="https://t.me/botfather" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@BotFather</a> в Telegram
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="botName">Имя бота</Label>
                <Input
                  id="botName"
                  placeholder="Например: MyAwesomeBot"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="botDescription">Описание бота</Label>
                <Textarea
                  id="botDescription"
                  placeholder="Опишите, что делает ваш бот..."
                  value={botDescription}
                  onChange={(e) => setBotDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </BotCreationStep>

          {/* Шаг 2: Настройка команд */}
          <BotCreationStep
            title="Настройка команд"
            description="Определите команды, на которые будет реагировать ваш бот"
            step={2}
            currentStep={currentStep}
            isCompleted={completedSteps.includes(2)}
            onSelect={() => handleNextStep(2)}
          >
            <div className="space-y-4">
              <div>
                <Label>Команды бота</Label>
                {commands.map((cmd, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <Input
                      value={cmd.command}
                      onChange={(e) => {
                        const newCommands = [...commands];
                        newCommands[index].command = e.target.value;
                        setCommands(newCommands);
                      }}
                      placeholder="Команда (например: /start)"
                      className="flex-1"
                    />
                    <Input
                      value={cmd.description}
                      onChange={(e) => {
                        const newCommands = [...commands];
                        newCommands[index].description = e.target.value;
                        setCommands(newCommands);
                      }}
                      placeholder="Описание команды"
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Приветственное сообщение (/start)</Label>
                <Textarea
                  id="welcomeMessage"
                  placeholder="Сообщение, которое получит пользователь при запуске бота"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </BotCreationStep>

          {/* Шаг 3: Генерация кода */}
          <BotCreationStep
            title="Код для вашего бота"
            description="Базовый код для создания Telegram бота на Python"
            step={3}
            currentStep={currentStep}
            isCompleted={completedSteps.includes(3)}
            onSelect={() => handleNextStep(3)}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Базовая версия бота</Label>
                  <button 
                    onClick={() => handleCopyCode(botCreationCode)}
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    <Copy size={14} /> Копировать код
                  </button>
                </div>
                <div className="relative">
                  <pre className="bg-gray-950 text-gray-100 rounded-md p-4 overflow-x-auto text-sm font-mono">
                    {botCreationCode}
                  </pre>
                </div>
              </div>
            </div>
          </BotCreationStep>

          {/* Шаг 4: Дополнительные настройки */}
          <BotCreationStep
            title="Дополнительные функции"
            description="Расширьте функциональность вашего бота"
            step={4}
            currentStep={currentStep}
            isCompleted={completedSteps.includes(4)}
            onSelect={() => handleNextStep(4)}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Использовать webhook вместо polling</h3>
                    <p className="text-sm text-gray-500">Для более стабильной работы на хостинге</p>
                  </div>
                  <button 
                    onClick={() => handleCopyCode(webhookCode)}
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    <Copy size={14} /> Код webhook
                  </button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Логирование сообщений</h3>
                    <p className="text-sm text-gray-500">Сохранение всех сообщений в файл для анализа</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="logging" 
                        checked={enableLogging} 
                        onCheckedChange={setEnableLogging} 
                      />
                      <Label htmlFor="logging">Активировать</Label>
                    </div>
                    <button 
                      onClick={() => handleCopyCode(loggingCode)}
                      className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      <Copy size={14} /> Код логирования
                    </button>
                  </div>
                </div>

                <Separator />

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="font-medium flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary" /> Ваш бот готов к запуску!
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Используйте сгенерированный код с выбранными вами настройками.
                    Для запуска бота вам понадобится установить Python и библиотеку pyTelegramBotAPI.
                  </p>
                </div>
              </div>
            </div>
          </BotCreationStep>

          {completedSteps.includes(4) && (
            <div className="text-center py-8 animate-fade-up">
              <h2 className="heading-3 mb-2">Поздравляем!</h2>
              <p className="subtle-text mb-6">
                Вы успешно настроили своего Telegram бота. Используйте сгенерированный код для его запуска.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => moveToStep(1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Bot size={16} className="mr-2" />
                  Настройки бота
                </button>
                <button 
                  onClick={() => moveToStep(2)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <MessageSquare size={16} className="mr-2" />
                  Команды
                </button>
                <button 
                  onClick={() => moveToStep(3)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Send size={16} className="mr-2" />
                  Получить код
                </button>
                <button 
                  onClick={() => moveToStep(4)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Settings size={16} className="mr-2" />
                  Дополнительно
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TelegramBotHelper;
