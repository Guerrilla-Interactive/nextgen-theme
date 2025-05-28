"use client";

import { useState, useEffect } from 'react';

import type { SessionContext } from './session-context.states'



export const useSessionContext = (): [SessionContext, (status: SessionContext) => void] => {
  const [activeScreen, setActiveScreen] = useState<string>('defaultScreen');
  const [isTopDark, setIsTopDark] = useState<boolean>(false);
  const [sessionStartDateTime] = useState<number>(() => Date.now());
  const [sessionLoaded, setSessionLoaded] = useState<boolean>(false);

  // Make sessionLoaded true 2 seconds after sessionStartDateTime.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSessionLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [sessionStartDateTime]);


  const sessionContext: SessionContext = {
    activeScreen,
    sessionLoaded,  
    setActiveScreen,
    isTopDark,
    setIsTopDark,
    setSessionLoaded,
    sessionStartDateTime,

  };

  const setSessionContext = (newStatus: SessionContext) => {
    setActiveScreen(newStatus.activeScreen);
    setIsTopDark(newStatus.isTopDark);
  };

  return [sessionContext, setSessionContext];
};
