
import React, { useState, useEffect } from 'react';
import GameTabs from './GameTabs';
import MainActions from './MainActions';
import TabsHeader from './TabsHeader';
import HintPopup from './HintPopup';
import { DollarSign, HelpCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";

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
  setActiveTab: (value: string) => void;
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
  showHint: boolean;
  hintInfo: { title: string; description: string };
  handleCloseHint: (feature: string) => void;
  currentFeature: string;
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
  hintInfo,
  handleCloseHint,
  currentFeature
}) => {
  const [hasNewMarketEvent, setHasNewMarketEvent] = useState(false);
  const [miningAnimation, setMiningAnimation] = useState(false);
  
  // Эффект для анимации майнинга
  useEffect(() => {
    if (miningPower > 0) {
      const interval = setInterval(() => {
        setMiningAnimation(true);
        setTimeout(() => setMiningAnimation(false), 1000);
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [miningPower]);
  
  // Эффект для уведомлений о рыночных событиях
  useEffect(() => {
    if (showMarketEvents && !hasNewMarketEvent) {
      const randomChance = Math.random();
      if (randomChance > 0.7) {
        setHasNewMarketEvent(true);
      }
    }
    
    if (marketMultiplier > 1) {
      setHasNewMarketEvent(true);
    }
  }, [showMarketEvents, hasNewMarketEvent, marketMultiplier]);
  
  // Сброс уведомления при переходе на вкладку рынка
  useEffect(() => {
    if (activeTab === 'market') {
      setHasNewMarketEvent(false);
    }
  }, [activeTab]);

  return (
    <div className="game-layout">
      {showResources && (
        <div className="mobile-header">
          <div className="mobile-header-content">
            <div className="resources-section">
              <div className="resources-header">Resourses</div>
            </div>
            
            {showTabs && (
              <TabsHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                showTrading={showTrading}
                showEducation={showEducation}
                showMining={showMining}
                showCareer={showCareer}
                showMarketEvents={showMarketEvents}
                miningPower={miningPower}
                hasNewMarketEvent={hasNewMarketEvent}
                miningAnimation={miningAnimation}
                marketMultiplier={marketMultiplier}
              />
            )}
          </div>
        </div>
      )}
      
      <div className="main-container">
        <Card className="mx-auto w-full max-w-[550px] bg-[#232836] border-none rounded-lg overflow-hidden mb-4">
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
          )}
        </Card>
      </div>
      
      {showHint && (
        <HintPopup
          title={hintInfo.title}
          description={hintInfo.description}
          isOpen={showHint}
          onClose={() => handleCloseHint(currentFeature)}
        />
      )}
    </div>
  );
};

export default MobileGameLayout;
