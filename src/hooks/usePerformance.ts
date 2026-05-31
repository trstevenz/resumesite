import { useState, useEffect } from 'react';

let lowPerformanceMode = false;
const listeners = new Set<(low: boolean) => void>();

export const togglePerformanceGlobal = () => {
  lowPerformanceMode = !lowPerformanceMode;
  listeners.forEach((listener) => listener(lowPerformanceMode));
  return lowPerformanceMode;
};

export const getPerformanceGlobal = () => lowPerformanceMode;

export const subscribePerformance = (listener: (low: boolean) => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export function usePerformance() {
  const [lowPerformance, setLowPerformance] = useState(lowPerformanceMode);

  useEffect(() => {
    setLowPerformance(getPerformanceGlobal());
    const unsubscribe = subscribePerformance((newVal) => {
      setLowPerformance(newVal);
    });
    return unsubscribe;
  }, []);

  return { lowPerformance, togglePerformance: togglePerformanceGlobal };
}
