import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import VisualSchedulerScreen from '../screens/VisualSchedulerScreen';
import ScheduleManagementScreen from '../screens/ScheduleManagementScreen-old';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const { isLoggedIn, userRole } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          // Unauthenticated stack
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // Authenticated stack
          <>
            <Stack.Screen name="VisualScheduler" component={VisualSchedulerScreen} />
            {userRole === 'parent' || userRole === 'teacher' ? (
              <Stack.Screen name="ScheduleManagement" component={ScheduleManagementScreen} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;