import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserSettings {
  theme: string;
  notificationsEnabled: boolean;
  // Add other settings properties here
}

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  theme: 'light',
  notificationsEnabled: true,
  // Set default values for other settings
};

const USER_SETTINGS_STORAGE_KEY = '@user_settings_data';

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
});

export const SettingsProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  // Load settings from AsyncStorage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(
          USER_SETTINGS_STORAGE_KEY,
        );
        if (storedSettings !== null) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (error) {
        console.error('Error loading settings from AsyncStorage:', error);
      }
    };
    loadSettings();
  }, []);

  // Save settings to AsyncStorage whenever settings state changes
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem(
          USER_SETTINGS_STORAGE_KEY,
          JSON.stringify(settings),
        );
      } catch (error) {
        console.error('Error saving settings to AsyncStorage:', error);
      }
    };
    saveSettings();
  }, [settings]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};