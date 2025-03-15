
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CryptoInfoProps {
  marketMultiplier: number;
  knowledge: number;
}

const CryptoCurrencyInfo: React.FC<CryptoInfoProps> = ({ marketMultiplier, knowledge }) => {
  // Массив доступных криптовалют
  const cryptoCurrencies = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 60000 * marketMultiplier,
      basePrice: 60000,
      volatility: 0.05,
      stakingAPY: 0.01,
      specialBonus: "Увеличение пассивного дохода",
      bonusValue: 0.05,
      color: "#F7931A",
      description: "Первая и самая известная криптовалюта, создана Сатоши Накамото в 2009 году."
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 3000 * marketMultiplier,
      basePrice: 3000,
      volatility: 0.08,
      stakingAPY: 0.03,
      specialBonus: "Снижение комиссии за транзакции",
      bonusValue: 0.1,
      color: "#627EEA",
      description: "Платформа для создания децентрализованных приложений и смарт-контрактов."
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: 150 * marketMultiplier,
      basePrice: 150,
      volatility: 0.12,
      stakingAPY: 0.05,
      specialBonus: "Ускорение получения опыта",
      bonusValue: 0.15,
      color: "#00FFA3",
      description: "Быстрый блокчейн с высокой пропускной способностью и низкими комиссиями."
    }
  ];

  // Показываем только те валюты, которые доступны игроку в зависимости от его знаний
  const availableCryptos = cryptoCurrencies.slice(0, Math.floor(knowledge / 10) + 1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Информация о криптовалютах</h2>
        {marketMultiplier > 1 && (
          <Badge variant="success" className="animate-pulse">
            <TrendingUp className="w-3 h-3 mr-1" />
            Бычий рынок (+{((marketMultiplier - 1) * 100).toFixed(0)}%)
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableCryptos.map((crypto) => (
          <Card key={crypto.symbol} className="bg-opacity-10 backdrop-blur-sm border-[1px] border-white/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-8 h-8 rounded-full mr-2 flex items-center justify-center text-white font-bold" 
                    style={{ backgroundColor: crypto.color }}
                  >
                    {crypto.symbol.charAt(0)}
                  </div>
                  <CardTitle>{crypto.name}</CardTitle>
                </div>
                <Badge variant={crypto.price > crypto.basePrice ? "success" : "destructive"}>
                  {crypto.symbol}
                </Badge>
              </div>
              <CardDescription className="text-sm text-gray-400">{crypto.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Цена:</span>
                  <div className="flex items-center">
                    <span className="font-mono text-lg">${crypto.price.toLocaleString()}</span>
                    {crypto.price > crypto.basePrice ? (
                      <TrendingUp className="w-4 h-4 ml-1 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 ml-1 text-red-500" />
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Волатильность:</span>
                  <div className="w-32">
                    <Progress value={crypto.volatility * 100} className="h-2" />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Стейкинг APY:</span>
                  <Badge variant="outline" className="font-mono">
                    {(crypto.stakingAPY * 100).toFixed(1)}%
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/10">
                  <div className="flex items-center">
                    <Info className="w-4 h-4 mr-1 text-blue-400" />
                    <span className="text-gray-300 text-sm">Бонус:</span>
                  </div>
                  <span className="text-sm text-blue-300">
                    {crypto.specialBonus} (+{(crypto.bonusValue * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {knowledge < 30 && (
          <Card className="bg-opacity-10 backdrop-blur-sm border-[1px] border-white/10 flex items-center justify-center p-6">
            <div className="text-center">
              <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-2">Недостаточно знаний</h3>
              <p className="text-gray-400 text-sm">
                Изучите больше о криптовалютах, чтобы открыть информацию о новых монетах.
                <br />
                Прогресс: {knowledge}/30
              </p>
              <Progress value={(knowledge / 30) * 100} className="h-2 mt-4" />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CryptoCurrencyInfo;
