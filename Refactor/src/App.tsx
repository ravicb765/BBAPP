import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TokenProvider } from './context/TokenContext';

// Import screens
import DashboardScreen from './screens/DashboardScreen';
import OTActivitiesScreen from './screens/OTActivitiesScreen';
import VisualSchedulerScreen from './screens/VisualSchedulerScreen';
import CalmCornerScreen from './screens/CalmCornerScreen';
import YogaZoneScreen from './screens/YogaZoneScreen';
import BreathingExercisesScreen from './screens/BreathingExercisesScreen';
import AlliterativeExerciseScreen from './screens/AlliterativeExerciseScreen';
import MoodScreen from './screens/MoodScreen';
import GamesMenuScreen from './screens/GamesMenuScreen';
import MonsterMemoryMatch from './screens/MonsterMemoryMatch';
import FeedTheShark from './screens/FeedTheShark';
import IceCreamColoring from './screens/IceCreamColoring';
import WinterWonderlandColoring from './screens/WinterWonderlandColoring';
import BirthdayPartyColoring from './screens/BirthdayPartyColoring';
import ShapePuzzle from './screens/ShapePuzzle';
import AnimalJigsaw from './screens/AnimalJigsaw';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    // @ts-ignore
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'OT Activities') {
            iconName = 'psychology';
          } else if (route.name === 'Scheduler') {
            iconName = 'schedule';
          } else if (route.name === 'Calm Corner') {
            iconName = 'spa';
          } else if (route.name === 'Mood') {
            iconName = 'mood';
          } else if (route.name === 'Games') {
            iconName = 'sports-esports';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="OT Activities" component={OTActivitiesScreen} />
      <Tab.Screen name="Scheduler" component={VisualSchedulerScreen} />
      <Tab.Screen name="Calm Corner" component={CalmCornerScreen} />
      <Tab.Screen name="Mood" component={MoodScreen} />
      <Tab.Screen name="Games" component={GamesMenuScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <TokenProvider>
          <NavigationContainer>
            {/* @ts-ignore */}
            <Stack.Navigator>
              <Stack.Screen 
                name="Main" 
                component={TabNavigator} 
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Yoga Zone" component={YogaZoneScreen} />
              <Stack.Screen name="Breathing Exercises" component={BreathingExercisesScreen} />
              <Stack.Screen name="Alliterative Exercise" component={AlliterativeExerciseScreen} />
              <Stack.Screen name="GamesMenu" component={GamesMenuScreen} options={{ title: 'Games' }} />
              <Stack.Screen name="MonsterMemoryMatch" component={MonsterMemoryMatch} options={{ title: 'Monster Memory Match' }} />
              <Stack.Screen name="FeedTheShark" component={FeedTheShark} options={{ title: 'Feed the Shark' }} />
              <Stack.Screen name="IceCreamColoring" component={IceCreamColoring} options={{ title: 'Ice Cream Coloring' }} />
              <Stack.Screen name="WinterWonderlandColoring" component={WinterWonderlandColoring} options={{ title: 'Winter Wonderland Coloring' }} />
              <Stack.Screen name="BirthdayPartyColoring" component={BirthdayPartyColoring} options={{ title: 'Birthday Party Coloring' }} />
              <Stack.Screen name="ShapePuzzle" component={ShapePuzzle} options={{ title: 'Shape Puzzle' }} />
              <Stack.Screen name="AnimalJigsaw" component={AnimalJigsaw} options={{ title: 'Animal Jigsaw' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </TokenProvider>
        <StatusBar style="auto" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
