
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, GraduationCap, ArrowUpDown, HardDrive, Briefcase, BarChart4 } from 'lucide-react';
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
  handleSaveDollar: () => void;
  handleBuyCrypto: () => void;
  handleStaking: () => void;
  handleTrade: (fromUSDT: boolean, amount: number) => void;
  handleLearn: (cost: number, knowledgeGain: number) => void;
  handlePurchaseRig: (cost: number) => void;
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
  // Вычисляем количество видимых табов
  const visibleTabsCount = 1 + 
    (showTrading ? 1 : 0) + 
    (showEducation ? 1 : 0) + 
    (showMining ? 1 : 0) + 
    (showCareer ? 1 : 0) + 
    (showMarketEvents ? 1 : 0);
    
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="w-full animate-fade-in" style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${visibleTabsCount}, minmax(0, 1fr))` 
      }}>
        <TabsTrigger value="main" className="flex items-center gap-1">
          <DollarSign size={16} />
          Основное
        </TabsTrigger>
        {showTrading && (
          <TabsTrigger value="trading" className="flex items-center gap-1">
            <ArrowUpDown size={16} />
            Трейдинг
          </TabsTrigger>
        )}
        {showEducation && (
          <TabsTrigger value="education" className="flex items-center gap-1">
            <GraduationCap size={16} />
            Образование
          </TabsTrigger>
        )}
        {showMining && (
          <TabsTrigger value="mining" className="flex items-center gap-1">
            <HardDrive size={16} />
            Майнинг
          </TabsTrigger>
        )}
        {showCareer && (
          <TabsTrigger value="career" className="flex items-center gap-1">
            <Briefcase size={16} />
            Карьера
          </TabsTrigger>
        )}
        {showMarketEvents && (
          <TabsTrigger value="market" className="flex items-center gap-1">
            <BarChart4 size={16} />
            Рынок
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
            isTrader={role === 'trader'}
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
