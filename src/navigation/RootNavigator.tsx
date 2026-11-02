/**
 * Root Application Navigator
 * Manages Auth vs Main authenticated stacks based on Redux auth state.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { colors, spacing, typography } from '@/config/theme';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAppSelector } from '@/store';
import { navigationRef } from './navigationRef';

const Stack = createNativeStackNavigator();

/**
 * Dumb View: Main Authenticated Screen (Sample)
 */
const HomeScreen: React.FC = () => {
  const { user, userDisplayName, logout } = useAuth();

  return (
    <View style={styles.homeContainer}>
      <Card style={styles.homeCard}>
        <Text style={styles.homeTitle}>Authenticated Session</Text>
        <Text style={styles.homeSubtitle}>
          Welcome, <Text style={styles.highlight}>{userDisplayName || 'User'}</Text>
        </Text>
        <Text style={styles.homeDetails}>
          Email: {user?.email ?? 'Unknown'}
        </Text>
        <Text style={styles.homeDetails}>
          Role: {user?.role ?? 'User'}
        </Text>

        <Button
          title="Sign Out"
          variant="outline"
          onPress={logout}
          style={styles.signOutButton}
        />
      </Card>
    </View>
  );
};

export const RootNavigator: React.FC = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.status === 'authenticated'
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  homeCard: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  homeTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  homeSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  highlight: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  homeDetails: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  signOutButton: {
    marginTop: spacing.lg,
    width: '100%',
  },
});

export default RootNavigator;
