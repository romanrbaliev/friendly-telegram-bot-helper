
import { useState } from 'react';

export interface GameState {
  // Основные ресурсы
  dollars: number;
  usdt: number;
  btc: number;
  stakedUsdt: number;
  knowledge: number;
  miningPower: number;
  role: string | null;
  marketMultiplier: number;
  
  // Флаги открытия функций
  showResources: boolean;
  showBuyCrypto: boolean;
  showBuyUsdt: boolean;
  showStaking: boolean;
  showTrading: boolean;
  showEducation: boolean;
  showMining: boolean;
  showCareer: boolean;
  showMarketEvents: boolean;
  
  // Статистика
  clicks: number;
}

export const useGameState = (initialState: Partial<GameState> = {}) => {
  // Основные ресурсы
  const [dollars, setDollars] = useState(initialState.dollars || 0);
  const [usdt, setUsdt] = useState(initialState.usdt || 0);
  const [btc, setBtc] = useState(initialState.btc || 0);
  const [stakedUsdt, setStakedUsdt] = useState(initialState.stakedUsdt || 0);
  const [knowledge, setKnowledge] = useState(initialState.knowledge || 0);
  const [miningPower, setMiningPower] = useState(initialState.miningPower || 0);
  const [role, setRole] = useState<string | null>(initialState.role || null);
  const [marketMultiplier, setMarketMultiplier] = useState(initialState.marketMultiplier || 1);
  
  // Флаги открытия функций
  const [showResources, setShowResources] = useState(initialState.showResources || false);
  const [showBuyCrypto, setShowBuyCrypto] = useState(initialState.showBuyCrypto || false);
  const [showBuyUsdt, setShowBuyUsdt] = useState(initialState.showBuyUsdt || false);
  const [showStaking, setShowStaking] = useState(initialState.showStaking || false);
  const [showTrading, setShowTrading] = useState(initialState.showTrading || false);
  const [showEducation, setShowEducation] = useState(initialState.showEducation || false);
  const [showMining, setShowMining] = useState(initialState.showMining || false);
  const [showCareer, setShowCareer] = useState(initialState.showCareer || false);
  const [showMarketEvents, setShowMarketEvents] = useState(initialState.showMarketEvents || false);
  
  // Статистика
  const [clicks, setClicks] = useState(initialState.clicks || 0);
  
  // Вспомогательный флаг для управления интерфейсом
  const [activeTab, setActiveTab] = useState('main');

  const getFullState = (): GameState => ({
    dollars,
    usdt,
    btc, 
    stakedUsdt,
    knowledge,
    miningPower,
    role,
    marketMultiplier,
    showResources,
    showBuyCrypto,
    showBuyUsdt,
    showStaking,
    showTrading,
    showEducation,
    showMining,
    showCareer,
    showMarketEvents,
    clicks
  });

  return {
    // Состояния
    dollars,
    usdt,
    btc,
    stakedUsdt,
    knowledge,
    miningPower,
    role,
    marketMultiplier,
    showResources,
    showBuyCrypto,
    showBuyUsdt,
    showStaking,
    showTrading,
    showEducation,
    showMining,
    showCareer,
    showMarketEvents,
    clicks,
    activeTab,
    
    // Сеттеры
    setDollars,
    setUsdt,
    setBtc,
    setStakedUsdt,
    setKnowledge,
    setMiningPower,
    setRole,
    setMarketMultiplier,
    setShowResources,
    setShowBuyCrypto,
    setShowBuyUsdt,
    setShowStaking,
    setShowTrading,
    setShowEducation,
    setShowMining,
    setShowCareer,
    setShowMarketEvents,
    setClicks,
    setActiveTab,
    
    // Вспомогательные методы
    getFullState
  };
};
