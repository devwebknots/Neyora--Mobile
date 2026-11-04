/**
 * Calendar Screen Top Bar
 * Recreates the dark navy navigation bar (#0B1D3A) with Skyline Properties dropdown,
 * Calendar Operations label, search action, notifications (badge 3), and Elena Vance (EV) profile avatar.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography } from '@/config/theme';
import {
  BellIcon,
  ChevronDownIcon,
  SearchIcon,
} from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface CalendarTopBarProps {
  propertyName?: string;
  subtitle?: string;
  notificationCount?: number;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  onPropertyPress?: () => void;
}

export const CalendarTopBar: React.FC<CalendarTopBarProps> = ({
  propertyName = 'Skyline Properties',
  subtitle = 'Calendar Operations',
  notificationCount = 3,
  onSearchPress,
  onNotificationPress,
  onProfilePress,
  onPropertyPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 12) + moderateScale(8) }]}>
      <View style={styles.contentRow}>
        {/* Left: Brand Monogram & Property Selector */}
        <TouchableOpacity
          style={styles.propertySelector}
          onPress={onPropertyPress}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={`${propertyName}, ${subtitle}`}
        >
          {/* Monogram Box with "N" */}
          <View style={styles.monogramBox}>
            <Text style={styles.monogramText}>N</Text>
          </View>

          {/* Titles column */}
          <View style={styles.textColumn}>
            <View style={styles.titleRow}>
              <Text style={styles.propertyTitle}>{propertyName}</Text>
              <ChevronDownIcon size={moderateScale(12)} color="rgba(255, 255, 255, 0.7)" style={styles.chevron} />
            </View>
            <Text style={styles.propertySubtitle}>{subtitle}</Text>
          </View>
        </TouchableOpacity>

        {/* Right: Actions Row (Search, Notifications, Profile) */}
        <View style={styles.actionsRow}>
          {/* Search Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onSearchPress}
            activeOpacity={0.75}
            accessibilityLabel="Search"
          >
            <SearchIcon size={moderateScale(18)} color={colors.white} />
          </TouchableOpacity>

          {/* Notifications Bell */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onNotificationPress}
            activeOpacity={0.75}
            accessibilityLabel="Notifications"
          >
            <BellIcon size={moderateScale(19)} color={colors.white} />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* User Profile Avatar (EV) */}
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={onProfilePress}
            activeOpacity={0.8}
            accessibilityLabel="User profile Elena Vance"
          >
            <Text style={styles.avatarInitials}>EV</Text>
            <View style={styles.onlineDot} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerDarkBlue,
    paddingHorizontal: 20,
    paddingBottom: moderateScale(14),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  propertySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  monogramBox: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10),
  },
  monogramText: {
    fontFamily: typography.fontFamily.heading.regular,
    fontSize: scaleFont(18),
    color: colors.white,
    fontWeight: typography.fontWeight.regular,
  },
  textColumn: {
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyTitle: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(14.5),
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: -0.2,
  },
  chevron: {
    marginLeft: moderateScale(5),
    marginTop: moderateScale(1),
  },
  propertySubtitle: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11),
    color: colors.subtitlePeriwinkle,
    marginTop: moderateScale(1.5),
    letterSpacing: 0.1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(4),
  },
  actionButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: moderateScale(2),
    right: moderateScale(4),
    backgroundColor: '#D97706',
    minWidth: moderateScale(15),
    height: moderateScale(15),
    borderRadius: moderateScale(7.5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(2),
    borderWidth: 1.5,
    borderColor: colors.headerDarkBlue,
  },
  notificationBadgeText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(8.5),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  avatarButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(4),
    position: 'relative',
  },
  avatarInitials: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(12.5),
    color: colors.black,
    fontWeight: typography.fontWeight.semibold,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: moderateScale(9),
    height: moderateScale(9),
    borderRadius: moderateScale(4.5),
    backgroundColor: '#22C55E',
    borderWidth: 1.5,
    borderColor: colors.headerDarkBlue,
  },
});

export default CalendarTopBar;
