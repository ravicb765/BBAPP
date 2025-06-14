import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ScheduleProvider } from '/home/user/BBAPP/Refactor/src/context/ScheduleContext';
import { AuthProvider } from '/home/user/BBAPP/Refactor/src/context/AuthContext';
import { MoodProvider } from '/home/user/BBAPP/Refactor/src/context/MoodContext';
import { SettingsProvider } from '/home/user/BBAPP/Refactor/src/context/SettingsContext';
import AppNavigator from './src/navigation/AppNavigator';
import { GameProvider } from '/home/user/BBAPP/Refactor/src/context/GameContext';
import { openDatabase } from '/home/user/BBAPP/Refactor/src/database/database';
function App() {
  // In your Refactor/index.js (or wherever you call openDatabase)

useEffect(() => {
  openDatabase()
    .then((db) => {
      console.log("Database opened, creating tables...");
      return createTables(db); // Call createTables after opening
    })
    .then(() => {
      console.log("Tables created, app is ready.");
      // Now you can proceed with loading data from the database
    })
    .catch((error) => {
      console.error("Database or table creation error:", error);
      // Handle error (e.g., show an error message to the user)
    });
}, []);


  return (
 <AuthProvider>
 <SettingsProvider>
 <MoodProvider>
 <GameProvider>
 <ScheduleProvider>
 <AppNavigator />
 </ScheduleProvider>
 </GameProvider>
 </MoodProvider>
 </AuthProvider>
  );
}

export default App;