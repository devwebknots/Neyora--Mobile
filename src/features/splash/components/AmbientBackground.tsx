/**
 * AmbientBackground Component
 *
 * Implements a rich, living cinematic background with continuous ambient motion.
 * Renders the authentic clean Neyora electric-blue wave artwork and executes
 * subtle floating pan, breathing scale, and soft light bloom oscillations.
 *
 * Uses locally bundled native image asset for 100% crash-free, high-performance rendering.
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { splashBgAsset } from '../assets/splashAssets';
import { moderateScale } from '@/utils/responsive';

export interface AmbientBackgroundProps {
  style?: ViewStyle;
  testID?: string;
  enableMotion?: boolean;
}

declare const process: any;
const isTestEnv = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BG_WIDTH = Math.round(SCREEN_WIDTH * 1.18);
const BG_HEIGHT = Math.round(SCREEN_HEIGHT * 1.18);
const BG_OFFSET_X = -Math.round((BG_WIDTH - SCREEN_WIDTH) / 2);
const BG_OFFSET_Y = -Math.round((BG_HEIGHT - SCREEN_HEIGHT) / 2);

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  style,
  testID = 'ambient-background',
  enableMotion = true,
}) => {
  // Multi-axis ambient motion animated values
  const panX = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1.03)).current;
  const bloomOpacity = useRef(new Animated.Value(0.94)).current;
  const flarePulse = useRef(new Animated.Value(0.65)).current;

  useEffect(() => {
    if (isTestEnv || !enableMotion) {
      return;
    }

    // 1. Smooth horizontal drift (-14px to +14px)
    const panXAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(panX, {
          toValue: 14,
          duration: 3800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(panX, {
          toValue: -14,
          duration: 3800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(panX, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // 2. Smooth vertical float (-18px to +16px)
    const panYAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(panY, {
          toValue: -18,
          duration: 4400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(panY, {
          toValue: 16,
          duration: 4400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(panY, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    // 3. Subtle breathing scale (1.03 to 1.08)
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.08,
          duration: 4200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.03,
          duration: 4200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // 4. Soft ambient wave luminescence bloom (0.92 to 1.0)
    const bloomAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bloomOpacity, {
          toValue: 1.0,
          duration: 3200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bloomOpacity, {
          toValue: 0.92,
          duration: 3200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // 5. Light burst star glint pulse on the upper wave focal point
    const flareAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(flarePulse, {
          toValue: 0.95,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(flarePulse, {
          toValue: 0.45,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    panXAnimation.start();
    panYAnimation.start();
    scaleAnimation.start();
    bloomAnimation.start();
    flareAnimation.start();

    return () => {
      panXAnimation.stop();
      panYAnimation.stop();
      scaleAnimation.stop();
      bloomAnimation.stop();
      flareAnimation.stop();
    };
  }, [panX, panY, scale, bloomOpacity, flarePulse, enableMotion]);

  return (
    <View style={[styles.container, style]} testID={testID} pointerEvents="none">
      {/* Animated artwork container with drift, breathing zoom, and subtle ambient bloom */}
      <Animated.View
        style={[
          styles.artworkWrapper,
          {
            opacity: bloomOpacity,
            transform: [{ translateX: panX }, { translateY: panY }, { scale }],
          },
        ]}
      >
        <Image
          source={splashBgAsset}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Subtle pulsing accent flare over the upper wave focal burst */}
      <Animated.View
        style={[
          styles.flareBloom,
          {
            opacity: flarePulse,
            transform: [{ scale: flarePulse }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#020A1C',
    overflow: 'hidden',
  },
  artworkWrapper: {
    position: 'absolute',
    top: BG_OFFSET_Y,
    left: BG_OFFSET_X,
    width: BG_WIDTH,
    height: BG_HEIGHT,
  },
  backgroundImage: {
    width: BG_WIDTH,
    height: BG_HEIGHT,
  },
  flareBloom: {
    position: 'absolute',
    top: '32%',
    right: '35%',
    width: moderateScale(54),
    height: moderateScale(54),
    borderRadius: moderateScale(27),
    backgroundColor: 'rgba(56, 189, 248, 0.28)',
  },
});

export default AmbientBackground;
