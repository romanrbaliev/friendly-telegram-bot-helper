
import React, { useState } from 'react';
import ResourceDisplay from './ResourceDisplay';
import GameTabs from './GameTabs';
import MainActions from './MainActions';
import TabsHeader from './TabsHeader';
import { Badge } from "@/components/ui/badge";
import HintPopup from './HintPopup';

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
  const isBullMarket = marketMultiplier > 1;

  return (
    <div className="game-layout">
      {showResources && (
        <div className="resources-section">
          <div className="mobile-resources-content">
            <div className="resource-item">
              <span className="resource-label">Доллары:</span>
              <span className="resource-value">${dollars.toFixed(2)}</span>
            </div>
            
            {(usdt > 0 || showBuyCrypto || showBuyUsdt) && (
              <div className="resource-item">
                <span className="resource-label">USDT:</span>
                <span className="resource-value">${usdt.toFixed(2)}</span>
              </div>
            )}
            
            {btc > 0 && (
              <div className="resource-item">
                <span className="resource-label">BTC:</span>
                <span className="resource-value">{btc.toFixed(5)} BTC</span>
              </div>
            )}
            
            {stakedUsdt > 0 && (
              <div className="resource-item">
                <span className="resource-label">Стейкинг:</span>
                <span className="resource-value">${stakedUsdt.toFixed(2)}</span>
              </div>
            )}
            
            {knowledge > 0 && (
              <div className="resource-item">
                <span className="resource-label">Знания:</span>
                <span className="resource-value">{knowledge}</span>
              </div>
            )}
            
            {role && role !== 'none' && (
              <div className="resource-item">
                <span className="resource-label">Роль:</span>
                <span className="resource-value">
                  {role === 'investor' ? 'Инвестор' : 'Трейдер'}
                </span>
              </div>
            )}
          </div>
          
          {showTabs && (
            <div className="mobile-tabs-wrapper">
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
            </div>
          )}
        </div>
      )}
      
      <div className="main-container">
        {showTabs ? (
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
        ) : (
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
      </div>
    </div>
  );
};

export default MobileGameLayout;
