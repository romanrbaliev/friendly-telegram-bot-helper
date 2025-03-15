
import React from 'react';
import GameContainer from './GameContainer';
import { useTelegramGame } from '@/hooks/use-telegram-game';

const CryptoGame: React.FC = () => {
  const { isInTelegram, telegramUser } = useTelegramGame();
  
  return (
    <>
      {isInTelegram && telegramUser && (
        <div className="p-2 mb-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-md">
          <p className="text-xs text-center text-white/70">
            Привет, {telegramUser.firstName}! Твой прогресс сохраняется автоматически 🚀
          </p>
        </div>
      )}
      <GameContainer />
    </>
  );
};

export default CryptoGame;
