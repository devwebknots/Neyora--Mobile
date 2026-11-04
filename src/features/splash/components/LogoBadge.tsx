/**
 * LogoBadge Component
 *
 * Implements the Neyora signature squircle brand badge:
 * - Deep navy squircle with ice-blue luminous border stroke and glow shadow
 * - Authentic stylized 'Ni' monogram with white stroke and vivid cyan accent dot
 * - Shimmering 4-point diamond star sparkle glint at top-right corner with twinkle animation
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { splashMonogramAsset, splashSparkleAsset } from '../assets/splashAssets';
import { moderateScale } from '@/utils/responsive';

export interface LogoBadgeProps {
  style?: ViewStyle;
  size?: number;
  testID?: string;
  enableSparkleAnimation?: boolean;
}

declare const process: any;
const isTestEnv = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test';

export const LogoBadge: React.FC<LogoBadgeProps> = ({
  style,
  size = 132,
  testID = 'logo-badge',
  enableSparkleAnimation = true,
}) => {
  const scaledSize = moderateScale(size);
  const cornerRadius = moderateScale(38);
  const monogramSize = Math.round(scaledSize * 0.52);
  const sparkleSize = Math.round(scaledSize * 0.38);

  // Twinkling sparkle animations
  const sparkleScale = useRef(new Animated.Value(1)).current;
  const sparkleOpacity = useRef(new Animated.Value(0.9)).current;
  const sparkleRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTestEnv || !enableSparkleAnimation) {
      return;
    }

    // Breathing pulse for the star glint
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(sparkleScale, {
            toValue: 1.22,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(sparkleOpacity, {
            toValue: 1.0,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(sparkleRotate, {
            toValue: 1,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(sparkleScale, {
            toValue: 0.88,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(sparkleOpacity, {
            toValue: 0.7,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(sparkleRotate, {
            toValue: 0,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulseLoop.start();

    return () => {
      pulseLoop.stop();
    };
  }, [sparkleScale, sparkleOpacity, sparkleRotate, enableSparkleAnimation]);

  const spin = sparkleRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-8deg', '10deg'],
  });

  return (
    <View
      style={[
        styles.outerContainer,
        {
          width: scaledSize,
          height: scaledSize,
        },
        style,
      ]}
      testID={testID}
    >
      {/* Outer ambient glow behind squircle */}
      <View
        style={[
          styles.glowUnderlay,
          {
            width: scaledSize + moderateScale(8),
            height: scaledSize + moderateScale(8),
            borderRadius: cornerRadius + moderateScale(4),
          },
        ]}
      />

      {/* Main squircle badge */}
      <View
        style={[
          styles.badgeCard,
          {
            width: scaledSize,
            height: scaledSize,
            borderRadius: cornerRadius,
          },
        ]}
      >
        {/* Subtle inner highlight rim */}
        <View
          style={[
            styles.innerRim,
            {
              borderRadius: cornerRadius - moderateScale(2),
            },
          ]}
        />

        {/* Authentic 'Ni' monogram */}
        <Image
          source={splashMonogramAsset}
          style={[
            styles.monogram,
            {
              width: monogramSize,
              height: monogramSize,
            },
          ]}
          resizeMode="contain"
          testID="logo-monogram"
        />
      </View>

      {/* Star sparkle flare at top-right corner */}
      <Animated.View
        style={[
          styles.sparkleContainer,
          {
            top: -moderateScale(14),
            right: -moderateScale(14),
            width: sparkleSize,
            height: sparkleSize,
            opacity: sparkleOpacity,
            transform: [{ scale: sparkleScale }, { rotate: spin }],
          },
        ]}
        pointerEvents="none"
        testID="logo-sparkle"
      >
        <Image
          source={splashSparkleAsset}
          style={styles.sparkleImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glowUnderlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 132, 255, 0.16)',
  },
  badgeCard: {
    backgroundColor: '#060E22',
    borderWidth: moderateScale(1.5),
    borderColor: 'rgba(147, 197, 253, 0.42)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#0084FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },
  innerRim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: moderateScale(1),
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  monogram: {
    alignSelf: 'center',
  },
  sparkleContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  sparkleImage: {
    width: '100%',
    height: '100%',
  },
});

export default LogoBadge;
