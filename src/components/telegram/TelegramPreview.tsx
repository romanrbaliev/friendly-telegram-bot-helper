
import React from 'react';
import { Bot, MessageCircle, User } from 'lucide-react';

interface TelegramPreviewProps {
  botName: string;
  botCommand: string;
  botResponse: string;
}

const TelegramPreview: React.FC<TelegramPreviewProps> = ({ 
  botName = "CryptoClickerBot", 
  botCommand = "/start", 
  botResponse = "Привет! Я бот для игры в Crypto Clicker. Нажми на кнопку, чтобы начать игру." 
}) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-[#17212b] rounded-xl overflow-hidden border border-gray-700 shadow-lg">
      {/* Заголовок с именем бота */}
      <div className="bg-[#232e3c] p-3 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center">
          <Bot className="text-white" size={20} />
        </div>
        <div>
          <h3 className="font-medium text-white">{botName}</h3>
          <p className="text-xs text-gray-400">бот</p>
        </div>
      </div>
      
      {/* Область чата */}
      <div className="p-3 h-80 flex flex-col">
        {/* Сообщения */}
        <div className="space-y-4 overflow-y-auto flex-1">
          {/* Системное сообщение */}
          <div className="text-center">
            <span className="text-xs text-gray-500 bg-[#232e3c] px-2 py-1 rounded-full">Сегодня</span>
          </div>
          
          {/* Команда пользователя */}
          <div className="flex justify-end">
            <div className="flex items-end gap-2">
              <div className="bg-[#2b5278] text-white px-3 py-2 rounded-lg max-w-[80%]">
                {botCommand}
              </div>
              <div className="h-6 w-6 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center">
                <User className="text-white" size={14} />
              </div>
            </div>
          </div>
          
          {/* Ответ бота */}
          <div className="flex justify-start">
            <div className="flex items-end gap-2">
              <div className="h-6 w-6 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
                <Bot className="text-white" size={14} />
              </div>
              <div className="bg-[#232e3c] text-white px-3 py-2 rounded-lg max-w-[80%]">
                {botResponse}
                <div className="mt-2 inline-flex">
                  <button className="bg-[#2b5278] hover:bg-[#355b82] text-white text-sm py-1.5 px-3 rounded-md transition-colors">
                    Начать игру
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Поле ввода */}
        <div className="mt-3 bg-[#232e3c] rounded-lg p-2 flex items-center">
          <input 
            type="text" 
            className="bg-transparent text-gray-300 w-full focus:outline-none px-2 py-1 text-sm" 
            placeholder="Сообщение..." 
            disabled 
          />
          <button className="p-1.5 text-gray-400 hover:text-gray-300">
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramPreview;
