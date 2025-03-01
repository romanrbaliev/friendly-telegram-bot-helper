
import React from 'react';
import { Bot, Send } from 'lucide-react';

interface BotPreviewProps {
  botName: string;
  welcomeMessage: string;
}

const BotPreview = ({ botName, welcomeMessage }: BotPreviewProps) => {
  return (
    <div className="w-full max-w-sm mx-auto border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-soft bg-white dark:bg-gray-900">
      {/* Шапка чата */}
      <div className="bg-telegram p-4 text-white">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h3 className="font-medium">{botName || 'Your Bot Name'}</h3>
        </div>
      </div>
      
      {/* Тело чата */}
      <div className="bg-[#e6ebee] dark:bg-gray-800 h-80 p-3 flex flex-col">
        {/* Системное сообщение */}
        <div className="bg-white/70 dark:bg-gray-700/70 py-1 px-3 rounded-full text-xs text-center self-center mb-3 backdrop-blur-xs">
          Сегодня
        </div>
        
        {/* Команда /start */}
        <div className="flex justify-start mb-3">
          <div className="bg-white dark:bg-gray-700 py-2 px-3 rounded-lg max-w-[80%] text-sm">
            /start
          </div>
        </div>
        
        {/* Ответ бота */}
        <div className="flex justify-start mb-3">
          <div className="bg-white dark:bg-gray-700 py-2 px-3 rounded-lg max-w-[80%] text-sm">
            {welcomeMessage || 'Привет! Я новый бот. Чем могу помочь?'}
          </div>
        </div>
        
        {/* Пример ввода */}
        <div className="mt-auto flex items-center gap-2 bg-white dark:bg-gray-700 p-2 rounded-lg">
          <input 
            type="text" 
            placeholder="Напишите сообщение..." 
            className="flex-1 bg-transparent border-none text-sm focus:outline-none"
            disabled
          />
          <Send size={18} className="text-telegram" />
        </div>
      </div>
    </div>
  );
};

export default BotPreview;
