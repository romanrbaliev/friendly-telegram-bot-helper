
import * as React from "react"

// Для Telegram mini app оптимальная точка перехода - около 600px
const MOBILE_BREAKPOINT = 600 

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(true) // По умолчанию считаем мобильным

  React.useEffect(() => {
    // Проверка для среды Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      setIsMobile(true)
      return
    }
    
    const checkIsMobile = () => window.innerWidth < MOBILE_BREAKPOINT
    
    const handleResize = () => {
      setIsMobile(checkIsMobile())
    }
    
    // Инициализация
    handleResize()
    
    // Подписка на изменение размера
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Для Telegram mini app всегда возвращаем true
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    return true
  }
  
  return isMobile
}
