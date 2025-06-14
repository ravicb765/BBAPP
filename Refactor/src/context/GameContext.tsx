import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GameProgress {
  gameName: string;
  score: number;
  level: number;
  completed: boolean;
}

interface GameProgressData {
  [gameName: string]: GameProgress;
}

interface GameContextValue {
  gameProgress: GameProgressData;
  updateGameProgress: (gameName: string, progress: Omit<GameProgress, 'gameName'>) => void;
}

const GameContext = createContext<GameContextValue>({
  gameProgress: {},
  updateGameProgress: () => {},
});

const GAME_PROGRESS_STORAGE_KEY = '@game_progress_data';

const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameProgress, setGameProgress] = useState<GameProgressData>({});

  useEffect(() => {
    const loadGameProgress = async () => {
      try {
        const storedProgress = await AsyncStorage.getItem(GAME_PROGRESS_STORAGE_KEY);
        if (storedProgress !== null) {
          setGameProgress(JSON.parse(storedProgress));
        }
      } catch (error) {
        console.error('Error loading game progress from AsyncStorage:', error);
      }
    };

    loadGameProgress();
  }, []);

  useEffect(() => {
    const saveGameProgress = async () => {
      try {
        await AsyncStorage.setItem(GAME_PROGRESS_STORAGE_KEY, JSON.stringify(gameProgress));
      } catch (error) {
        console.error('Error saving game progress to AsyncStorage:', error);
      }
    };

    saveGameProgress();
  }, [gameProgress]);

  const updateGameProgress = (gameName: string, progress: Omit<GameProgress, 'gameName'>) => {
    setGameProgress(prevProgress => ({
      // Spread previous progress to maintain other games' data
      ...prevProgress,
      // Update or add the specific game's progress
      // Ensure gameName is explicitly set in the nested object
      // This is important if the input 'progress' is only partial Omit<GameProgress, 'gameName'>
      // and you want the full GameProgress structure stored.
      // If the game already exists, its properties will be merged with 'progress'
      [gameName]: {
        gameName,
        ...progress,
      },
    }));
  };

  return (
    <GameContext.Provider value={{ gameProgress, updateGameProgress }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };