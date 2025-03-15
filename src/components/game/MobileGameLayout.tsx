
import React from 'react';
import ResourceDisplay from './ResourceDisplay';
import GameTabs from './GameTabs';
import MainActions from './MainActions';
import StakingTab from './StakingTab';

interface MobileGameLayoutProps {
  showResources: boolean;
  showTabs: boolean;
  dollars: number;
  usdt: number;
  btc: number;
  stakedUsdt: number;
  knowledge: number;
  showBuyCrypto: boolean;
  showBuyUsdt: boolean;
  showStaking: boolean; 
  showEducation: boolean;
  showTrading: boolean;
  showMining: boolean;
  showCareer: boolean;
  showMarketEvents: boolean;
  miningPower: number;
  marketMultiplier: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: string;
  clicks: number;
  handleSaveDollar: () => void;
  handleBuyCrypto: () => void;
  handleStakingWrapper: () => void;
  handleTrade: (fromUSDT: boolean, amount: number) => void;
  handleLearnMarket: (cost: number, knowledgeGain: number) => boolean;
  handlePurchaseRig: (cost: number, powerIncrease: number) => void;
  handleSelectRole: (role: string) => void;
  handleMarketChange: (multiplier: number) => void;
  handlePrepareForEvent: (cost: number) => void;
  handleLearnBasics: () => void;
  handleBuyUsdtWrapper: () => void;
  handleStake: (amount: number) => void;
  handleWithdraw: (amount: number) => void;
  showHint?: boolean;
  hintInfo?: { title: string, description: string };
  handleCloseHint?: (feature: string) => void;
  currentFeature?: string;
}

const MobileGameLayout: React.FC<MobileGameLayoutProps> = ({
  showResources,
  showTabs,
  dollars,
  usdt,
  btc,
  stakedUsdt,
  knowledge,
  showBuyCrypto,
  showBuyUsdt,
  showStaking,
  showEducation,
  showTrading,
  showMining,
  showCareer,
  showMarketEvents,
  miningPower,
  marketMultiplier,
  activeTab,
  setActiveTab,
  role,
  clicks,
  handleSaveDollar,
  handleBuyCrypto,
  handleStakingWrapper,
  handleTrade,
  handleLearnMarket,
  handlePurchaseRig,
  handleSelectRole,
  handleMarketChange,
  handlePrepareForEvent,
  handleLearnBasics,
  handleBuyUsdtWrapper,
  handleStake,
  handleWithdraw,
  showHint,
  hintInfo = { title: '', description: '' },
  handleCloseHint,
  currentFeature = ''
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Отображаем ресурсы и вкладки рядом друг с другом */}
      <div className="w-full sticky top-0 z-10 bg-[#1A1F2C]">
        <div className="flex flex-row justify-between space-x-1 p-1">
          {showResources && (
            <div className="w-[65%] min-w-0">
              <ResourceDisplay 
                dollars={dollars} 
                usdt={usdt} 
                showUsdt={usdt > 0 || showBuyCrypto || showBuyUsdt}
                stakedUsdt={stakedUsdt}
                showStaking={showStaking || stakedUsdt > 0}
                knowledge={knowledge}
                showKnowledge={showEducation || knowledge > 0}
                btc={btc}
                showBtc={btc > 0 || showBuyCrypto}
                role={role}
              />
            </div>
          )}
          
          {showTabs && (
            <div className="w-[35%] min-w-0">
              <GameTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                showTrading={showTrading}
                showEducation={showEducation}
                showMining={showMining}
                showCareer={showCareer}
                showMarketEvents={showMarketEvents}
                dollars={dollars}
                usdt={usdt}
                btc={btc}
                knowledge={knowledge}
                marketMultiplier={marketMultiplier}
                miningPower={miningPower}
                handleSaveDollar={handleSaveDollar}
                handleBuyCrypto={handleBuyCrypto}
                handleStaking={handleStakingWrapper}
                handleTrade={handleTrade}
                handleLearn={handleLearnMarket}
                handlePurchaseRig={handlePurchaseRig}
                handleSelectRole={handleSelectRole}
                handleMarketChange={handleMarketChange}
                handlePrepareForEvent={handlePrepareForEvent}
                showBuyCrypto={showBuyCrypto}
                showBuyUsdt={showBuyUsdt}
                showStaking={showStaking}
                role={role}
                handleLearnBasics={handleLearnBasics}
                clicks={clicks}
                handleBuyUsdt={handleBuyUsdtWrapper}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 w-full flex justify-center mt-1 px-1">
        {!showTabs ? (
          <MainActions 
            dollars={dollars}
            usdt={usdt}
            showBuyCrypto={showBuyCrypto}
            showBuyUsdt={showBuyUsdt}
            showStaking={showStaking}
            showEducation={showEducation}
            handleSaveDollar={handleSaveDollar}
            handleBuyCrypto={handleBuyCrypto}
            handleStaking={handleStakingWrapper}
            handleLearnBasics={handleLearnBasics}
            handleBuyUsdt={handleBuyUsdtWrapper}
            knowledge={knowledge}
            showHint={showHint}
            hintInfo={hintInfo}
            onCloseHint={handleCloseHint}
            currentFeature={currentFeature}
          />
        ) : (
          activeTab === 'staking' && (
            <StakingTab 
              usdt={usdt}
              stakedUsdt={stakedUsdt}
              onStake={handleStake}
              onWithdraw={handleWithdraw}
              role={role}
            />
          )
        )}
      </div>
    </div>
  );
};

export default MobileGameLayout;
