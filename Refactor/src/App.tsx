
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import OTActivitiesScreen from './src/screens/OTActivitiesScreen';
import VisualSchedulerScreen from './src/screens/VisualSchedulerScreen';
import CalmCornerScreen from './src/screens/CalmCornerScreen';
import YogaZoneScreen from './src/screens/YogaZoneScreen';
import BreathingExercisesScreen from './src/screens/BreathingExercisesScreen';
import AlliterativeExerciseScreen from './src/screens/AlliterativeExerciseScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
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
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Main" 
              component={TabNavigator} 
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Yoga Zone" component={YogaZoneScreen} />
            <Stack.Screen name="Breathing Exercises" component={BreathingExercisesScreen} />
            <Stack.Screen name="Alliterative Exercise" component={AlliterativeExerciseScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
