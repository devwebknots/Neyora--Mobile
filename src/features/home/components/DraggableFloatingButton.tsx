/**
 * Draggable Floating Action Button Component
 * Recreates the Figma "Messages" circular floating button (#16437E).
 * Fully draggable anywhere on the screen with smooth physics and boundary clamping.
 */

import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, typographyPresets } from '@/config/theme';
import { MessageBubbleIcon } from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface DraggableFloatingButtonProps {
  onPress?: () => void;
  initialBottomOffset?: number;
  initialRightOffset?: number;
}

const BUTTON_SIZE = moderateScale(56);

export const DraggableFloatingButton: React.FC<DraggableFloatingButtonProps> = ({
  onPress,
  initialBottomOffset,
  initialRightOffset,
}) => {
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Approximate height of BottomNavBar including safe area padding
  const navBarHeight = moderateScale(54) + Math.max(insets.bottom, moderateScale(10));

  // Boundaries to keep the button within screen and above navigation bar
  const minX = moderateScale(12);
  const maxX = screenWidth - BUTTON_SIZE - moderateScale(12);
  const minY = Math.max(insets.top, 24) + moderateScale(10);
  const maxY = screenHeight - navBarHeight - BUTTON_SIZE - moderateScale(4);

  // Default initial position on right end directly above the MESSAGES tab icon
  const defaultX = initialRightOffset != null
    ? screenWidth - BUTTON_SIZE - initialRightOffset
    : Math.min(maxX, Math.max(minX, (screenWidth * 0.875) - (BUTTON_SIZE / 2)));

  const defaultY = initialBottomOffset != null
    ? screenHeight - initialBottomOffset - BUTTON_SIZE
    : screenHeight - navBarHeight - BUTTON_SIZE - moderateScale(10);

  const pan = useRef(new Animated.ValueXY({ x: defaultX, y: defaultY })).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
        pan.setValue({ x: 0, y: 0 });

        Animated.spring(scale, {
          toValue: 1.08,
          friction: 6,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();

        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: false,
        }).start();

        // Check if movement was minimal (tap gesture)
        if (Math.abs(gestureState.dx) < 6 && Math.abs(gestureState.dy) < 6) {
          onPress?.();
          return;
        }

        // Clamp to screen boundaries with spring animation
        const currentX = (pan.x as any)._value;
        const currentY = (pan.y as any)._value;
        const clampedX = Math.min(Math.max(currentX, minX), maxX);
        const clampedY = Math.min(Math.max(currentY, minY), maxY);

        Animated.spring(pan, {
          toValue: { x: clampedX, y: clampedY },
          friction: 7,
          tension: 40,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderTerminate: () => {
        pan.flattenOffset();
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale },
          ],
        },
      ]}
      {...panResponder.panHandlers}
      accessibilityRole="button"
      accessibilityLabel="Messages Floating Action Button"
    >
      <View style={styles.button}>
        <MessageBubbleIcon size={moderateScale(24)} color={colors.white} />
        <Text style={styles.label}>Messages</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    elevation: 10,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: colors.floatingButton,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 6,
    elevation: 8,
  },
  label: {
    ...typographyPresets.floatingButtonLabel,
    textAlignVertical: 'center',
  },
});

export default DraggableFloatingButton;
