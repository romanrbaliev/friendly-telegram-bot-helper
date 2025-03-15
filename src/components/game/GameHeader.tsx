
import React from 'react';

interface GameHeaderProps {
  bullMarketActive: boolean;
}

const GameHeader: React.FC<GameHeaderProps> = ({ bullMarketActive }) => {
  return (
    <header className="mb-6 text-center">
      <h1 className="text-2xl font-bold text-gradient">Crypto Clicker</h1>
      <p className="text-sm text-gray-400">Путь от нуля до миллиона</p>
      {bullMarketActive && (
        <div className="mt-2 px-3 py-1 bg-green-600/20 rounded-full text-green-400 text-xs inline-flex items-center">
          <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-green-400"></span>
          Бычий рынок активен! +50% к доходности
        </div>
      )}
    </header>
  );
};

export default GameHeader;
