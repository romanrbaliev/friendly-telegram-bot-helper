
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
  showBuyUsdt: boolean;
  role: string | null;
  handleLearnBasics: () => void;
  clicks: number;
  handleBuyUsdt?: (amount: number) => void;
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
  showBuyUsdt,
  role,
  handleLearnBasics,
  clicks,
  handleBuyUsdt
}) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl">
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
            showBuyUsdt={showBuyUsdt}
            knowledge={knowledge}
            handleBuyUsdt={handleBuyUsdt}
          />
        </TabsContent>
        
        {showTrading && (
          <TabsContent value="trading" className="mt-4 space-y-6 p-4">
            <div className="glass-morphism p-4 rounded-lg">
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
            </div>
          </TabsContent>
        )}
        
        {showEducation && (
          <TabsContent value="education" className="mt-4 p-4">
            <div className="glass-morphism p-4 rounded-lg">
              <Education
                dollars={dollars}
                onLearn={handleLearn}
                knowledge={knowledge}
              />
            </div>
          </TabsContent>
        )}
        
        {showMining && (
          <TabsContent value="mining" className="mt-4 p-4">
            <div className="glass-morphism p-4 rounded-lg">
              <Mining
                dollars={dollars}
                btc={btc}
                miningPower={miningPower}
                onPurchaseRig={handlePurchaseRig}
                knowledge={knowledge}
                marketMultiplier={marketMultiplier}
              />
            </div>
          </TabsContent>
        )}
        
        {showCareer && (
          <TabsContent value="career" className="mt-4 p-4">
            <div className="glass-morphism p-4 rounded-lg">
              <Career
                dollars={dollars}
                onSelectRole={handleSelectRole}
                selectedRole={role}
                knowledge={knowledge}
              />
            </div>
          </TabsContent>
        )}
        
        {showMarketEvents && (
          <TabsContent value="market" className="mt-4 p-4">
            <div className="glass-morphism p-4 rounded-lg">
              <MarketEvents
                knowledge={knowledge}
                onPrepareForEvent={handlePrepareForEvent}
                onMarketChange={handleMarketChange}
              />
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="achievements" className="mt-4 p-4">
          <div className="glass-morphism p-4 rounded-lg">
            <Achievements
              clickCount={clicks}
              dollars={dollars}
              knowledge={knowledge}
              miningPower={miningPower}
              btc={btc}
            />
          </div>
        </TabsContent>
      </div>
    </div>
  );
};

export default TabsContentComponent;
