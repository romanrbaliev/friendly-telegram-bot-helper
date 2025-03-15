
import React, { useState, useEffect } from 'react';
import GameTabs from './GameTabs';
import MainActions from './MainActions';
import TabsHeader from './TabsHeader';
import HintPopup from './HintPopup';
import { DollarSign, HelpCircle } from 'lucide-react';

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
          <div className="resources-section">
            <div className="resources-header">Ресурсы</div>
            <div className="resources-divider"></div>
            
            <div className="resource-item">
              <div className="resource-left">
                <div className="resource-icon">
                  <DollarSign size={16} color="#4ADE80" />
                </div>
                <div className="resource-label">Наличные:</div>
              </div>
              <div className="resource-value">
                ${dollars.toFixed(2)}
                <HelpCircle size={14} className="help-icon" />
              </div>
            </div>
            
            {(usdt > 0 || showBuyCrypto || showBuyUsdt) && (
              <div className="resource-item">
                <div className="resource-left">
                  <div className="coin-icon usdt-icon">₮</div>
                  <div className="resource-label">USDT:</div>
                </div>
                <div className="resource-value">
                  {usdt.toFixed(8)}
                  <HelpCircle size={14} className="help-icon" />
                </div>
              </div>
            )}
            
            {btc > 0 && (
              <div className="resource-item">
                <div className="resource-left">
                  <div className="coin-icon btc-icon">₿</div>
                  <div className="resource-label">Bitcoin:</div>
                </div>
                <div className="resource-value">
                  {btc.toFixed(8)}
                  <HelpCircle size={14} className="help-icon" />
                </div>
              </div>
            )}
            
            {stakedUsdt > 0 && (
              <div className="resource-item">
                <div className="resource-left">
                  <div className="coin-icon usdt-icon">₮</div>
                  <div className="resource-label">Стейкинг:</div>
                </div>
                <div className="resource-value">
                  {stakedUsdt.toFixed(8)}
                  <HelpCircle size={14} className="help-icon" />
                </div>
              </div>
            )}
            
            {knowledge > 0 && (
              <div className="resource-item">
                <div className="resource-left">
                  <div className="resource-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 13V22M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13ZM17 5L20 2M17 11L20 14M7 5L4 2M7 11L4 14" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="resource-label">Знания:</div>
                </div>
                <div className="resource-value">
                  {knowledge}%
                  <HelpCircle size={14} className="help-icon" />
                </div>
              </div>
            )}
            
            {role && role !== 'none' && (
              <div className="resource-item">
                <div className="resource-left">
                  <div className="resource-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="resource-label">Карьера:</div>
                </div>
                <div className="resource-value">
                  {role === 'investor' ? 'Инвестор' : 'Трейдер'}
                  <HelpCircle size={14} className="help-icon" />
                </div>
              </div>
            )}
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
