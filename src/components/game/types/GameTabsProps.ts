
export interface GameTabsProps {
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
  clicks: number;
}
