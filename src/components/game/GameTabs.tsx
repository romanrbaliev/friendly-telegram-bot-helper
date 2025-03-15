
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, GraduationCap, ArrowUpDown, HardDrive, Briefcase, BarChart4, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import Trading from './Trading';
import Education from './Education';
import Mining from './Mining';
import Career from './Career';
import MarketEvents from './MarketEvents';
import MainActions from './MainActions';

interface GameTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  showTrading: boolean;
  showEducation: boolean;
  showMining: boolean;
  showCareer: boolean;
  showMarketEvents: boolean;
  dollars: number;
  usdt: number;
  btc: number;
  knowledge: number;
  marketMultiplier: number;
  miningPower: number;
  handleSaveDollar: () => void;
  handleBuyCrypto: () => void;
  handleStaking: () => void;
  handleTrade: (fromUSDT: boolean, amount: number) => void;
  handleLearn: (cost: number, knowledgeGain: number) => boolean;
  handlePurchaseRig: (cost: number, powerIncrease?: number) => void;
  handleSelectRole: (selectedRole: string) => void;
  handleMarketChange: (multiplier: number) => void;
  handlePrepareForEvent: (cost: number) => void;
  showBuyCrypto: boolean;
  showStaking: boolean;
  role: string | null;
  handleLearnBasics: () => void;
}

const GameTabs: React.FC<GameTabsProps> = ({
  activeTab,
  setActiveTab,
  showTrading,
  showEducation,
  showMining,
  showCareer,
  showMarketEvents,
  dollars,
  usdt,
  btc,
  knowledge,
  marketMultiplier,
  miningPower,
  handleSaveDollar,
  handleBuyCrypto,
  handleStaking,
  handleTrade,
  handleLearn,
  handlePurchaseRig,
  handleSelectRole,
  handleMarketChange,
  handlePrepareForEvent,
  showBuyCrypto,
  showStaking,
  role,
  handleLearnBasics
}) => {
  const visibleTabsCount = 1 + 
    (showTrading ? 1 : 0) + 
    (showEducation ? 1 : 0) + 
    (showMining ? 1 : 0) + 
    (showCareer ? 1 : 0) + 
    (showMarketEvents ? 1 : 0);
  
  const [hasNewMarketEvent, setHasNewMarketEvent] = useState(false);
  
  // Генерация случайного события на рынке при первой загрузке вкладки "Рынок"
  useEffect(() => {
    if (showMarketEvents && !hasNewMarketEvent) {
      const randomChance = Math.random();
      if (randomChance > 0.5) {
        setHasNewMarketEvent(true);
      }
    }
  }, [showMarketEvents, hasNewMarketEvent]);
  
  // Сброс индикатора нового события при переходе на вкладку "Рынок"
  useEffect(() => {
    if (activeTab === 'market') {
      setHasNewMarketEvent(false);
    }
  }, [activeTab]);
    
  console.log("GameTabs rendering with:", {
    showTrading,
    showEducation,
    showMining,
    showCareer,
    showMarketEvents,
    dollars,
    knowledge,
    miningPower
  });
    
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="w-full animate-fade-in" style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${visibleTabsCount}, minmax(0, 1fr))` 
      }}>
        <TabsTrigger value="main" className="flex items-center gap-1">
          <DollarSign size={14} className="sm:size-16" />
          <span className="sm:inline">Основное</span>
        </TabsTrigger>
        {showTrading && (
          <TabsTrigger value="trading" className="flex items-center gap-1">
            <ArrowUpDown size={14} className="sm:size-16" />
            <span className="sm:inline">Трейдинг</span>
          </TabsTrigger>
        )}
        {showEducation && (
          <TabsTrigger value="education" className="flex items-center gap-1">
            <GraduationCap size={14} className="sm:size-16" />
            <span className="sm:inline">Обучение</span>
          </TabsTrigger>
        )}
        {showMining && (
          <TabsTrigger value="mining" className="flex items-center gap-1">
            <HardDrive size={14} className="sm:size-16" />
            <span className="sm:inline">Майнинг</span>
            {miningPower > 0 && (
              <Badge variant="outline" className="ml-1 text-xs py-0">
                {miningPower}
              </Badge>
            )}
          </TabsTrigger>
        )}
        {showCareer && (
          <TabsTrigger value="career" className="flex items-center gap-1">
            <Briefcase size={14} className="sm:size-16" />
            <span className="sm:inline">Карьера</span>
          </TabsTrigger>
        )}
        {showMarketEvents && (
          <TabsTrigger value="market" className="flex items-center gap-1 relative">
            <BarChart4 size={14} className="sm:size-16" />
            <span className="sm:inline">Рынок</span>
            {hasNewMarketEvent && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="main" className="space-y-4 mt-4">
        <MainActions 
          dollars={dollars}
          usdt={usdt}
          handleSaveDollar={handleSaveDollar}
          handleBuyCrypto={handleBuyCrypto}
          handleStaking={handleStaking}
          handleLearnBasics={handleLearnBasics}
          showBuyCrypto={showBuyCrypto}
          showStaking={showStaking}
          showEducation={showEducation}
          knowledge={knowledge}
        />
      </TabsContent>
      
      {showTrading && (
        <TabsContent value="trading" className="mt-4">
          <Trading 
            dollars={dollars}
            usdt={usdt}
            btc={btc}
            onTrade={handleTrade}
            knowledge={knowledge}
            role={role}
          />
        </TabsContent>
      )}
      
      {showEducation && (
        <TabsContent value="education" className="mt-4">
          <Education
            dollars={dollars}
            onLearn={handleLearn}
            knowledge={knowledge}
          />
        </TabsContent>
      )}
      
      {showMining && (
        <TabsContent value="mining" className="mt-4">
          <Mining
            dollars={dollars}
            btc={btc}
            miningPower={miningPower}
            onPurchaseRig={handlePurchaseRig}
            knowledge={knowledge}
            marketMultiplier={marketMultiplier}
          />
        </TabsContent>
      )}
      
      {showCareer && (
        <TabsContent value="career" className="mt-4">
          <Career
            dollars={dollars}
            onSelectRole={handleSelectRole}
            selectedRole={role}
            knowledge={knowledge}
          />
        </TabsContent>
      )}
      
      {showMarketEvents && (
        <TabsContent value="market" className="mt-4">
          <MarketEvents
            knowledge={knowledge}
            onPrepareForEvent={handlePrepareForEvent}
            onMarketChange={handleMarketChange}
          />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default GameTabs;
