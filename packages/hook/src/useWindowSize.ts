import {useState, useEffect} from 'react';

export enum WindowSize {
  SM = 640,
  MD = 768,
  LG = 1024,
  XL = 1280,
  '2Xl' = 1536,
}

export interface WindowDimension {
  width: number;
  height: number;
}

export const useWindowSize = () => {
  const [size, setSize ] = useState<WindowDimension>({
    width: 0,
    height: 0,
  });
  
  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  },[]);

  return { height: size.height, width: size.width} as WindowDimension;
}