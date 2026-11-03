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
}) => {
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Boundaries to keep the button within screen and above navigation bar
  const minX = 12;
  const maxX = screenWidth - BUTTON_SIZE - 12;
  const minY = Math.max(insets.top, 24) + 10;
  const maxY = screenHeight - Math.max(insets.bottom, 16) - 78;

  // Default initial position on right side near Schedule section (matching Figma)
  const defaultX = screenWidth - BUTTON_SIZE - 20;
  const defaultY = Math.min(screenHeight * 0.46, maxY);

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
