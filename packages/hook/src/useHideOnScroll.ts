import {useState, useEffect} from 'react';

export const useHideOnScroll = (defaultOpen: boolean, hideFromPixelHeight: number) => {
  const [isVisibleOnScroll, setIsVisibleOnScroll] =
    useState<boolean>(defaultOpen);
  
  useEffect(() => {
    const listenToScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (winScroll > hideFromPixelHeight) {
        setIsVisibleOnScroll(!defaultOpen);
      } else {
        setIsVisibleOnScroll(defaultOpen);
      }
    }
    window.addEventListener('scroll', listenToScroll);
    return window.removeEventListener('scroll', listenToScroll)
  },[]);

  return {isVisibleOnScroll}
}