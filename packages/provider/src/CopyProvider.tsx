import { createContext, useState, useEffect, FC, ReactNode } from "react";

export interface CopyContextProps {
  copiedText?: string;
  copy: (copiedText: string) => void;
}

export const CopyContext =
  createContext<CopyContextProps | null>(null);

export const CopyProvider: FC<{children: ReactNode}> = ({
  children
}) => {
  const [copiedText, setCopiedText] = useState<string>();
  const copy = (copiedText: string) => {
    navigator.clipboard.writeText(copiedText);
    setCopiedText(copiedText);
  };
  const [copyContext, setCopyContext] = useState<CopyContextProps>({
    copiedText,
    copy
  })

  useEffect(() => {
    setCopyContext({
      copiedText,
      copy})
  },[copiedText]);

  return (
    <CopyContext.Provider value={copyContext}>
      {children}
    </CopyContext.Provider>
  )
}