import { useEffect, useState } from 'react';
import { PROMO } from '../../config/promo.js';

/** Tempo restante até o fim da promoção, atualizado a cada segundo. */
export function useCountdown() {
  const end = new Date(PROMO.endsAt).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const left = Math.max(0, end - now);
  return {
    ended: left === 0,
    days: Math.floor(left / 86400000),
    hours: Math.floor(left / 3600000) % 24,
    minutes: Math.floor(left / 60000) % 60,
    seconds: Math.floor(left / 1000) % 60,
  };
}

export const pad = (n) => String(n).padStart(2, '0');
