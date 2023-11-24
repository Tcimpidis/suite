import {useState, useEffect, useRef} from 'react';

export const useActiveDiv = (initialIsActive: boolean) => {
  const [isComponentActive, setIsComponentActive] =
    useState<boolean>(initialIsActive);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: KeyboardEvent) => {
    if(ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentActive(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  },[]);

  return { ref, isComponentActive, setIsComponentActive}
}