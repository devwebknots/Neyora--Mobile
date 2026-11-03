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
import { colors, typographyPresets } from '@/config/theme';
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
      icon: <PlusIcon size={moderateScale(17)} color={colors.white} />,
      boxBg: '#749AED80',
      onPress: onNewEventPress,
    },
    {
      id: 'schedule',
      title: 'Schedule',
      icon: <UsersIcon size={moderateScale(17)} color={colors.white} />,
      boxBg: '#8A4BC280',
      onPress: onSchedulePress,
    },
    {
      id: 'availability',
      title: 'Avaliability',
      icon: <KeyIcon size={moderateScale(17)} color={colors.white} />,
      boxBg: '#3B967780',
      onPress: onAvailabilityPress,
    },
    {
      id: 'shareLink',
      title: 'Share link',
      icon: <ShareIcon size={moderateScale(17)} color={colors.white} />,
      boxBg: '#DA835580',
      onPress: onShareLinkPress,
    },
  ];

  return (
    <LinearGradient
      colors={['#03264C', '#0659B2']}
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
            <View style={[styles.iconContainer, { backgroundColor: action.boxBg }]}>
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
    width: '100%',
    maxWidth: 350,
    alignSelf: 'center',
    minHeight: 75,
    marginTop: moderateScale(16),
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: 'center',
    shadowColor: '#03264C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
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
    marginBottom: 5,
  },
  actionLabel: {
    ...typographyPresets.quickActionLabel,
    textAlign: 'center',
  },
});

export default QuickActionBar;
