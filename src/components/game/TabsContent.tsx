
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import Trading from './Trading';
import Education from './Education';
import Mining from './Mining';
import Career from './Career';
import MarketEvents from './MarketEvents';
import MainActions from './MainActions';
import Achievements from './Achievements';
import CryptoCurrencyInfo from './CryptoCurrencyInfo';

interface TabsContentComponentProps {
  activeTab: string;
  dollars: number;
  usdt: number;
  btc: number;
  knowledge: number;
  miningPower: number;
  showTrading: boolean;
  showEducation: boolean;
  showMining: boolean;
  showCareer: boolean;
  showMarketEvents: boolean;
  handleSaveDollar: () => void;
  handleBuyCrypto: () => void;
  handleStaking: () => void;
  handleTrade: (fromUSDT: boolean, amount: number) => void;
  handleLearn: (cost: number, knowledgeGain: number) => boolean;
  handlePurchaseRig: (cost: number, powerIncrease?: number) => void;
  handleSelectRole: (selectedRole: string) => void;
  handleMarketChange: (multiplier: number) => void;
  handlePrepareForEvent: (cost: number) => void;
  marketMultiplier: number;
  showBuyCrypto: boolean;
  showStaking: boolean;
  role: string | null;
  handleLearnBasics: () => void;
  clicks: number;
}

const TabsContentComponent: React.FC<TabsContentComponentProps> = ({
  activeTab,
  dollars,
  usdt,
  btc,
  knowledge,
  miningPower,
  showTrading,
  showEducation,
  showMining,
  showCareer,
  showMarketEvents,
  handleSaveDollar,
  handleBuyCrypto,
  handleStaking,
  handleTrade,
  handleLearn,
  handlePurchaseRig,
  handleSelectRole,
  handleMarketChange,
  handlePrepareForEvent,
  marketMultiplier,
  showBuyCrypto,
  showStaking,
  role,
  handleLearnBasics,
  clicks
}) => {
  return (
    <>
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
          showBuyUsdt={false} // Добавляем недостающий пропс
          knowledge={knowledge}
        />
      </TabsContent>
      
      {showTrading && (
        <TabsContent value="trading" className="mt-4 space-y-6">
          <Trading 
            dollars={dollars}
            usdt={usdt}
            btc={btc}
            onTrade={handleTrade}
            knowledge={knowledge}
            role={role}
          />
          
          {/* Добавляем информацию о криптовалютах */}
          {knowledge >= 5 && (
            <CryptoCurrencyInfo 
              marketMultiplier={marketMultiplier} 
              knowledge={knowledge} 
            />
          )}
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
      
      <TabsContent value="achievements" className="mt-4">
        <Achievements
          clickCount={clicks}
          dollars={dollars}
          knowledge={knowledge}
          miningPower={miningPower}
          btc={btc}
        />
      </TabsContent>
    </>
  );
};

export default TabsContentComponent;
