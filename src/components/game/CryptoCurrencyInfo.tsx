
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, Info, RefreshCw } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

interface CryptoInfoProps {
  marketMultiplier: number;
  knowledge: number;
}

interface CryptoCurrency {
  name: string;
  symbol: string;
  price: number;
  basePrice: number;
  volatility: number;
  stakingAPY: number;
  specialBonus: string;
  bonusValue: number;
  color: string;
  description: string;
}

const CryptoCurrencyInfo: React.FC<CryptoInfoProps> = ({ marketMultiplier, knowledge }) => {
  // Состояние для хранения данных о криптовалютах
  const [cryptoCurrencies, setCryptoCurrencies] = useState<CryptoCurrency[]>([
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
  ]);

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для получения актуальных цен криптовалют
  const fetchCryptoPrices = async () => {
    setIsLoading(true);
    try {
      // Используем CoinGecko API для получения цен
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd'
      );
      
      if (!response.ok) {
        throw new Error('Не удалось получить данные о ценах');
      }
      
      const data = await response.json();
      
      // Обновляем данные о криптовалютах
      setCryptoCurrencies(prev => prev.map(crypto => {
        let newPrice = crypto.price;
        let newBasePrice = crypto.basePrice;
        
        if (crypto.symbol === 'BTC' && data.bitcoin?.usd) {
          newPrice = data.bitcoin.usd * marketMultiplier;
          newBasePrice = data.bitcoin.usd;
        } else if (crypto.symbol === 'ETH' && data.ethereum?.usd) {
          newPrice = data.ethereum.usd * marketMultiplier;
          newBasePrice = data.ethereum.usd;
        } else if (crypto.symbol === 'SOL' && data.solana?.usd) {
          newPrice = data.solana.usd * marketMultiplier;
          newBasePrice = data.solana.usd;
        }
        
        return {
          ...crypto,
          price: newPrice,
          basePrice: newBasePrice
        };
      }));
      
      setLastUpdated(new Date());
      toast({
        title: "Цены обновлены",
        description: "Актуальные цены криптовалют загружены",
        duration: 3000
      });
    } catch (error) {
      console.error('Ошибка при получении цен криптовалют:', error);
      toast({
        title: "Ошибка обновления",
        description: "Не удалось получить текущие цены криптовалют",
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Эффект для автоматического обновления цен каждые 30 минут
  useEffect(() => {
    // Загружаем цены при первом рендере
    fetchCryptoPrices();
    
    // Устанавливаем интервал обновления (30 минут = 1800000 мс)
    const intervalId = setInterval(() => {
      fetchCryptoPrices();
    }, 30 * 60 * 1000);
    
    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [marketMultiplier]);

  // Показываем только те валюты, которые доступны игроку в зависимости от его знаний
  const availableCryptos = cryptoCurrencies.slice(0, Math.floor(knowledge / 10) + 1);
  
  // Форматирование времени последнего обновления
  const getLastUpdatedText = () => {
    if (!lastUpdated) return 'Ожидание обновления...';
    
    const hours = lastUpdated.getHours().toString().padStart(2, '0');
    const minutes = lastUpdated.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Информация о криптовалютах</h2>
        <div className="flex items-center gap-2">
          {marketMultiplier > 1 && (
            <Badge variant="success" className="animate-pulse">
              <TrendingUp className="w-3 h-3 mr-1" />
              Бычий рынок (+{((marketMultiplier - 1) * 100).toFixed(0)}%)
            </Badge>
          )}
          <Badge 
            variant="outline" 
            className="flex items-center gap-1 cursor-pointer" 
            onClick={() => fetchCryptoPrices()}
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-xs">Обновлено: {getLastUpdatedText()}</span>
          </Badge>
        </div>
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
