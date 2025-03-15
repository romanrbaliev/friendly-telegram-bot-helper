
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceDisplay from './ResourceDisplay';
import MainActions from './MainActions';
import StakingTab from './StakingTab';
import TabsContentComponent from './TabsContent';
import TabsHeader from './TabsHeader';

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
    <div className="game-layout bg-[#1A1F2C]">
      {showResources && (
        <div className="resources-section bg-[#1A1F2C] p-2">
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
      
      <div className="flex flex-row w-full">
        <div className="content-section">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {(!showTabs || !showResources) && (
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
            )}
            
            {showTabs && showResources && (
              <TabsContentComponent 
                activeTab={activeTab}
                dollars={dollars}
                usdt={usdt}
                btc={btc}
                knowledge={knowledge}
                miningPower={miningPower}
                showTrading={showTrading}
                showEducation={showEducation}
                showMining={showMining}
                showCareer={showCareer}
                showMarketEvents={showMarketEvents}
                handleSaveDollar={handleSaveDollar}
                handleBuyCrypto={handleBuyCrypto}
                handleStaking={handleStakingWrapper}
                handleTrade={handleTrade}
                handleLearn={handleLearnMarket}
                handlePurchaseRig={handlePurchaseRig}
                handleSelectRole={handleSelectRole}
                handleMarketChange={handleMarketChange}
                handlePrepareForEvent={handlePrepareForEvent}
                marketMultiplier={marketMultiplier}
                showBuyCrypto={showBuyCrypto}
                showStaking={showStaking}
                showBuyUsdt={showBuyUsdt}
                role={role}
                handleLearnBasics={handleLearnBasics}
                clicks={clicks}
                handleBuyUsdt={handleBuyUsdtWrapper}
              />
            )}
            
            {activeTab === 'staking' && showTabs && (
              <TabsContent value="staking">
                <StakingTab 
                  usdt={usdt}
                  stakedUsdt={stakedUsdt}
                  onStake={handleStake}
                  onWithdraw={handleWithdraw}
                  role={role}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
        
        {showTabs && showResources && (
          <div className="tabs-section">
            <TabsHeader 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              showTrading={showTrading}
              showEducation={showEducation}
              showMining={showMining}
              showCareer={showCareer}
              showMarketEvents={showMarketEvents}
              miningPower={miningPower}
              hasNewMarketEvent={false}
              miningAnimation={false}
              marketMultiplier={marketMultiplier}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileGameLayout;
