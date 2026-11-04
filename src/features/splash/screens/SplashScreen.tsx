/**
 * SplashScreen Component
 *
 * Implements the Neyora signature splash screen experience:
 * - Fluid ambient motion background with luminous electric blue wave artwork
 * - Signature dark navy squircle badge with 'Ni' monogram and cyan accent dot
 * - Twinkling diamond star sparkle glint at top-right corner
 * - Premium serif typography: 'Neyora' (Playfair Display Bold)
 * - Clean tagline: 'Mange your time ,effortlessly' (Inter Regular)
 * - Configurable autoNavigate & enableTapToSkip (defaults to false for testing purpose)
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AmbientBackground } from '../components/AmbientBackground';
import { LogoBadge } from '../components/LogoBadge';
import { typography } from '@/config/theme';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface SplashScreenProps {
  navigation?: {
    replace?: (routeName: string, params?: any) => void;
    navigate?: (routeName: string, params?: any) => void;
  };
  duration?: number;
  autoNavigate?: boolean;
  enableTapToSkip?: boolean;
  onFinish?: () => void;
  testID?: string;
}

declare const process: any;
const isTestEnv = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test';

export const SplashScreen: React.FC<SplashScreenProps> = ({
  navigation,
  duration = 2800,
  autoNavigate = true,
  enableTapToSkip = true,
  onFinish,
  testID = 'splash-screen',
}) => {
  // Staggered entrance animation values
  const logoOpacity = useRef(new Animated.Value(isTestEnv ? 1 : 0)).current;
  const logoScale = useRef(new Animated.Value(isTestEnv ? 1 : 0.92)).current;
  const textOpacity = useRef(new Animated.Value(isTestEnv ? 1 : 0)).current;
  const textTranslateY = useRef(new Animated.Value(isTestEnv ? 0 : 18)).current;

  const hasNavigated = useRef(false);

  const handleFinish = () => {
    if (hasNavigated.current) {
      return;
    }
    hasNavigated.current = true;

    if (onFinish) {
      onFinish();
      return;
    }

    if (navigation?.replace) {
      navigation.replace('Home');
    } else if (navigation?.navigate) {
      navigation.navigate('Home');
    }
  };

  const handlePress = () => {
    if (!enableTapToSkip && !onFinish) {
      return;
    }
    handleFinish();
  };

  useEffect(() => {
    (StatusBar as any).setBackgroundColor?.('transparent');
    (StatusBar as any).setTranslucent?.(true);

    if (!isTestEnv) {
      // Staggered entrance
      Animated.sequence([
        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 650,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(logoScale, {
            toValue: 1,
            duration: 650,
            easing: Easing.out(Easing.back(1.2)),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 550,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(textTranslateY, {
            toValue: 0,
            duration: 550,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      // Auto-navigate only when explicitly enabled (disabled by default for testing)
      if (autoNavigate) {
        const timer = setTimeout(() => {
          handleFinish();
        }, duration);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [duration, autoNavigate]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={1}
      testID={testID ? `${testID}-touchable` : 'splash-touchable'}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Neyora splash screen."
    >
      <StatusBar barStyle="light-content" />

      {/* Cinematic ambient background with continuous motion */}
      <AmbientBackground testID="splash-ambient-bg" />

      {/* Foreground brand container */}
      <View style={styles.contentContainer} pointerEvents="none">
        {/* Animated squircle badge */}
        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          }}
        >
          <LogoBadge size={132} testID="splash-logo-badge" />
        </Animated.View>

        {/* Animated Brand Wordmark and Tagline */}
        <Animated.View
          style={[
            styles.brandTextGroup,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <Text style={styles.brandTitle} testID="splash-title">
            Neyora
          </Text>
          <Text style={styles.tagline} testID="splash-tagline">
            Mange your time ,effortlessly
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020A1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(24),
  },
  brandTextGroup: {
    alignItems: 'center',
    marginTop: moderateScale(28),
  },
  brandTitle: {
    fontFamily: typography.fontFamily.heading.bold,
    fontSize: scaleFont(46),
    color: '#FFFFFF',
    letterSpacing: 0.8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 132, 255, 0.45)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 14,
  },
  tagline: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(16),
    color: 'rgba(255, 255, 255, 0.82)',
    letterSpacing: 0.25,
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
});

export default SplashScreen;
