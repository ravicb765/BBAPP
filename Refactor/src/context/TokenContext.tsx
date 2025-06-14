import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TokenContextType {
  tokens: number;
  addToken: () => void;
  spendTokens: (amount: number) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);
const TOKEN_KEY = '@reward_tokens';

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tokens, setTokens] = useState(0);

  React.useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY).then((val) => {
      if (val) setTokens(Number(val));
    });
  }, []);

  const addToken = () => {
    setTokens((prev) => {
      const newVal = prev + 1;
      AsyncStorage.setItem(TOKEN_KEY, newVal.toString());
      return newVal;
    });
  };

  const spendTokens = (amount: number) => {
    setTokens((prev) => {
      const newVal = Math.max(0, prev - amount);
      AsyncStorage.setItem(TOKEN_KEY, newVal.toString());
      return newVal;
    });
  };

  return (
    <TokenContext.Provider value={{ tokens, addToken, spendTokens }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => {
  const ctx = useContext(TokenContext);
  if (!ctx) throw new Error('useTokens must be used within TokenProvider');
  return ctx;
};
