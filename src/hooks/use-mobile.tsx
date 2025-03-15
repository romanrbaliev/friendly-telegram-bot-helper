
import * as React from "react"

// Для Telegram mini app оптимальная точка перехода - около 600px
const MOBILE_BREAKPOINT = 600 

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkIsMobile = () => {
      // Проверка для среды Telegram WebApp
      if (window.Telegram && window.Telegram.WebApp) {
        return true; // В Telegram WebApp всегда считаем, что это мобильное устройство
      }
      
      // Традиционная проверка по ширине экрана
      return window.innerWidth < MOBILE_BREAKPOINT;
    };
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(checkIsMobile())
    }
    
    mql.addEventListener("change", onChange)
    setIsMobile(checkIsMobile())
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Для Telegram mini app всегда возвращаем true
  return isMobile !== undefined ? isMobile : true;
}
