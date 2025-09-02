// src/types/global.d.ts

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      action: string,
      config?: { [key: string]: any }
    ) => void;
  }
}

// Export {} é necessário para que o arquivo seja tratado como um módulo.
export {};