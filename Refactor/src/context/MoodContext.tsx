typescriptreact
import React, { useState, useEffect, createContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MoodEntry {
  id: string;
  mood: number; // e.g., 1-5 scale
  timestamp: string;
  notes?: string;
}

interface MoodContextValue {
  moodEntries: MoodEntry[];
  addMoodEntry: (moodEntry: MoodEntry) => void;
  editMoodEntry: (moodEntry: MoodEntry) => void;
  deleteMoodEntry: (id: string) => void;
}

const MoodContext = createContext<MoodContextValue | undefined>(undefined);

const MOOD_STORAGE_KEY = '@mood_data';

const MoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const loadMoods = async () => {
      try {
        const storedMoods = await AsyncStorage.getItem(MOOD_STORAGE_KEY);
        if (storedMoods) {
          setMoodEntries(JSON.parse(storedMoods));
        }
      } catch (error) {
        console.error('Error loading moods from AsyncStorage:', error);
      }
    };

    loadMoods();
  }, []);

  useEffect(() => {
    const saveMoods = async () => {
      try {
        await AsyncStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(moodEntries));
      } catch (error) {
        console.error('Error saving moods to AsyncStorage:', error);
      }
    };

    saveMoods();
  }, [moodEntries]);

 const addMoodEntry = (moodEntry: MoodEntry) => {
 setMoodEntries((prevMoods) => [...prevMoods, moodEntry]);
 };

 const editMoodEntry = (updatedMoodEntry: MoodEntry) => {
 setMoodEntries((prevMoods) =>
 prevMoods.map((entry) =>
 entry.id === updatedMoodEntry.id ? updatedMoodEntry : entry
 )
 );
 };

 const deleteMoodEntry = (id: string) => {
 setMoodEntries((prevMoods) => prevMoods.filter((entry) => entry.id !== id));
 };

  return (
    <MoodContext.Provider value={{ moodEntries, addMoodEntry, editMoodEntry, deleteMoodEntry }}>
      {children}
    </MoodContext.Provider>
  );
};

export { MoodContext, MoodProvider };