/**
 * Root Application Navigator
 * Configured with SplashScreen as the initial screen,
 * transitioning smoothly to HomeScreen and CalendarScreen.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '@/features/splash';
import { HomeScreen } from '@/features/home';
import { CalendarScreen } from '@/features/calendar';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { navigationRef } from './navigationRef';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
