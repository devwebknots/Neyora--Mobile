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
  const scale = useRef(new Animated.Value(1.02)).current;
  const bloomOpacity = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (isTestEnv || !enableMotion) {
      return;
    }

    // 1. Smooth horizontal drift (-12px to +12px)
    const panXAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(panX, {
          toValue: 12,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(panX, {
          toValue: -12,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(panX, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // 2. Smooth vertical float (-14px to +14px)
    const panYAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(panY, {
          toValue: -14,
          duration: 4600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(panY, {
          toValue: 14,
          duration: 4600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(panY, {
          toValue: 0,
          duration: 2400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    // 3. Subtle breathing scale (1.02 to 1.06)
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.06,
          duration: 4400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.02,
          duration: 4400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // 4. Soft ambient wave luminescence bloom (0.93 to 1.0)
    const bloomAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bloomOpacity, {
          toValue: 1.0,
          duration: 3400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bloomOpacity, {
          toValue: 0.93,
          duration: 3400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    panXAnimation.start();
    panYAnimation.start();
    scaleAnimation.start();
    bloomAnimation.start();

    return () => {
      panXAnimation.stop();
      panYAnimation.stop();
      scaleAnimation.stop();
      bloomAnimation.stop();
    };
  }, [panX, panY, scale, bloomOpacity, enableMotion]);

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
});

export default AmbientBackground;
