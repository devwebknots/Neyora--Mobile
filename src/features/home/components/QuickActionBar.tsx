/**
 * Quick Action Bar Component
 * Renders the 4 primary quick actions in a linear gradient container (#032B57 → #0659B2)
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from '@/components/LinearGradient';
import { colors, gradients, typography } from '@/config/theme';
import { KeyIcon, PlusIcon, ShareIcon, UsersIcon } from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface QuickActionBarProps {
  onNewEventPress?: () => void;
  onSchedulePress?: () => void;
  onAvailabilityPress?: () => void;
  onShareLinkPress?: () => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({
  onNewEventPress,
  onSchedulePress,
  onAvailabilityPress,
  onShareLinkPress,
}) => {
  const actions = [
    {
      id: 'newEvent',
      title: 'New event',
      icon: <PlusIcon size={moderateScale(18)} color={colors.white} />,
      onPress: onNewEventPress,
    },
    {
      id: 'schedule',
      title: 'Schedule',
      icon: <UsersIcon size={moderateScale(18)} color={colors.white} />,
      onPress: onSchedulePress,
    },
    {
      id: 'availability',
      title: 'Avaliability',
      icon: <KeyIcon size={moderateScale(18)} color={colors.white} />,
      onPress: onAvailabilityPress,
    },
    {
      id: 'shareLink',
      title: 'Share link',
      icon: <ShareIcon size={moderateScale(18)} color={colors.white} />,
      onPress: onShareLinkPress,
    },
  ];

  return (
    <LinearGradient
      colors={gradients.button}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <View style={styles.actionsRow}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionItem}
            onPress={action.onPress}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={action.title}
          >
            <View style={styles.iconContainer}>{action.icon}</View>
            <Text style={styles.actionLabel}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(18),
    marginTop: moderateScale(16),
    borderRadius: moderateScale(22),
    paddingVertical: moderateScale(13),
    paddingHorizontal: moderateScale(8),
    shadowColor: '#032B57',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(11),
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(6),
  },
  actionLabel: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(11.5),
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
  },
});

export default QuickActionBar;
