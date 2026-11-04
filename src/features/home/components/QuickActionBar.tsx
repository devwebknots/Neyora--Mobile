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
import { colors, gradients, spacing, typographyPresets } from '@/config/theme';
import { KeyIcon, PlusIcon, ShareIcon, UsersIcon } from '@/components/icons';
import { moderateScale } from '@/utils/responsive';

export interface QuickActionBarProps {
  onNewEventPress?: () => void;
  onSchedulePress?: () => void;
  onAvailabilityPress?: () => void;
  onShareLinkPress?: () => void;
}
//test
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
      icon: <PlusIcon size={moderateScale(17)} color={colors.white} />,
      boxStyle: styles.newEventBox,
      onPress: onNewEventPress,
    },
    {
      id: 'schedule',
      title: 'Schedule',
      icon: <UsersIcon size={moderateScale(17)} color={colors.white} />,
      boxStyle: styles.scheduleBox,
      onPress: onSchedulePress,
    },
    {
      id: 'availability',
      title: 'Avaliability',
      icon: <KeyIcon size={moderateScale(17)} color={colors.white} />,
      boxStyle: styles.availabilityBox,
      onPress: onAvailabilityPress,
    },
    {
      id: 'shareLink',
      title: 'Share link',
      icon: <ShareIcon size={moderateScale(17)} color={colors.white} />,
      boxStyle: styles.shareLinkBox,
      onPress: onShareLinkPress,
    },
  ];

  return (
    <LinearGradient
      colors={gradients.quickActions}
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
            <View style={[styles.iconContainer, action.boxStyle]}>
              {action.icon}
            </View>
            <Text style={styles.actionLabel}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.screenHorizontal,
    minHeight: 74,
    marginTop: moderateScale(24),
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    shadowColor: '#03264C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  newEventBox: {
    backgroundColor: colors.quickActionColors.newEvent,
  },
  scheduleBox: {
    backgroundColor: colors.quickActionColors.schedule,
  },
  availabilityBox: {
    backgroundColor: colors.quickActionColors.availability,
  },
  shareLinkBox: {
    backgroundColor: colors.quickActionColors.shareLink,
  },
  actionLabel: {
    ...typographyPresets.quickActionLabel,
    textAlign: 'center',
  },
});

export default QuickActionBar;
