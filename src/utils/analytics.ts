// src/utils/analytics.ts

// O ID do evento de conversão específico da sua campanha
const CONVERSION_ID = 'AW-16668186053/jwz7CLGf8JIbEMWrgYw-';

/**
 * Dispara o evento de conversão de assinatura para o Google Ads.
 */
export const trackSubscriptionConversion = () => {
  // Verifica se a função gtag está disponível na janela do navegador
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      'send_to': CONVERSION_ID,
    });
    //console.log('Evento de conversão de assinatura enviado!');
  } else {
    //console.warn('Google Tag (gtag.js) não foi encontrado.');
  }
};