
/// <reference types="vite/client" />

interface Window {
  Telegram?: {
    WebApp: {
      ready: () => void;
      expand: () => void;
      close: () => void;
      initData: string;
      initDataUnsafe: {
        user?: {
          id: number;
          first_name: string;
          last_name?: string;
          username?: string;
        };
      };
      MainButton: {
        text: string;
        textColor: string;
        color: string;
        isVisible: boolean;
        isActive: boolean;
        setText: (text: string) => void;
        onClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
        enable: () => void;
        disable: () => void;
      };
      BackButton: {
        isVisible: boolean;
        onClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
      };
      showPopup: (params: {
        title?: string;
        message: string;
        buttons?: Array<{
          id?: string;
          type?: string;
          text?: string;
        }>;
      }) => void;
      showAlert: (message: string) => void;
      showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
      sendData: (data: string) => void;
      openLink: (url: string) => void;
      openTelegramLink: (url: string) => void;
      HapticFeedback: {
        impactOccurred: (style: string) => void;
        notificationOccurred: (type: string) => void;
        selectionChanged: () => void;
      };
    };
  };
}
