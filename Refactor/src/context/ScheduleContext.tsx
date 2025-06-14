typescriptreact
import React, { useState, createContext, ReactNode, useEffect } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { ScheduleItem } from '../types/ScheduleTypes';
import { addScheduleItemToDb, getScheduleItemsFromDb, updateScheduleItemInDb, deleteScheduleItemFromDb } from '../database/database';

interface ScheduleContextType {
  schedule: ScheduleItem[];
  addScheduleItem: (item: ScheduleItem) => void;
  editScheduleItem: (item: ScheduleItem) => void;
  deleteScheduleItem: (id: string) => void;
  setSchedule: (schedule: ScheduleItem[]) => void; // Added setSchedule to context type
}

export const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ScheduleProviderProps {
  children: ReactNode;
}

export const ScheduleProvider: React.FC<ScheduleProviderProps> = ({ children }) => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    // Load schedule data from SQLite on mount
    getScheduleItemsFromDb()
      .then((items) => setSchedule(items))
      .catch((error) => console.error("Error loading schedule from DB:", error));
  }, []);

  const addScheduleItem = async (item: ScheduleItem) => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      await addScheduleItemToDb(item); // Add to DB
      setSchedule(prevSchedule => [...prevSchedule, item]); // Update state after DB success
    } catch (error) {
      console.error("Failed to add schedule item:", error);
      // Handle error
    }
  };

  const editScheduleItem = async (item: ScheduleItem) => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      await updateScheduleItemInDb(item); // Update in DB
      setSchedule(prevSchedule => prevSchedule.map(i => i.id === item.id ? item : i)); // Update state
    } catch (error) {
      console.error("Failed to update schedule item:", error);
      // Handle error
    }
  };

  const deleteScheduleItem = async (id: string) => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      await deleteScheduleItemFromDb(id); // Delete from DB
      setSchedule(prevSchedule => prevSchedule.filter(i => i.id !== id)); // Update state
    } catch (error) {
      console.error("Failed to delete schedule item:", error);
      // Handle error
    }
  };
  return (
    <ScheduleContext.Provider value={{ schedule, addScheduleItem, editScheduleItem, deleteScheduleItem, setSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
};