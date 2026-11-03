/**
 * Home Screen Header Section
 * Implements the brand gradient (#032B57 → #518EF9), top app bar,
 * live operations status, user actions, and Playfair Display greeting.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from '@/components/LinearGradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, gradients, spacing, typography } from '@/config/theme';
import { BellIcon, ShieldIcon } from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface HeaderSectionProps {
  userName?: string;
  dateText?: string;
  notificationCount?: number;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  onShieldPress?: () => void;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  userName = 'Alex',
  dateText = 'Wednesday, October 23, 2024',
  notificationCount = 3,
  onNotificationPress,
  onProfilePress,
  onShieldPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={gradients.header}
      start={{ x: 0.05, y: 0 }}
      end={{ x: 0.95, y: 1 }}
      style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 12) + moderateScale(10) }]}
    >
      {/* Top Application Bar */}
      <View style={styles.topBar}>
        {/* Brand Monogram & Live Status */}
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>N</Text>
          </View>
          <View style={styles.brandTextColumn}>
            <View style={styles.brandTitleRow}>
              <Text style={styles.brandTitle}>NEYORA</Text>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>
            <Text style={styles.brandSubtitle}>Command Center Operations</Text>
          </View>
        </View>

        {/* Top Right Action Controls */}
        <View style={styles.actionsRow}>
          {/* Notification Bell */}
          <TouchableOpacity
            style={styles.bellButton}
            onPress={onNotificationPress}
            activeOpacity={0.8}
            accessibilityLabel="Notifications"
          >
            <BellIcon size={moderateScale(19)} color={colors.white} />
            {notificationCount > 0 && (
              <View style={styles.bellBadge}>
                <Text style={styles.bellBadgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* User Profile Avatar */}
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={onProfilePress}
            activeOpacity={0.8}
            accessibilityLabel="User Profile"
          >
            <Text style={styles.avatarInitials}>AL</Text>
            <View style={styles.onlineIndicator} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Greeting Title & Date */}
      <View style={styles.greetingRow}>
        <View style={styles.greetingTextColumn}>
          <Text style={styles.greetingHeading}>Good morning,{'\n'}{userName}</Text>
          <Text style={styles.dateSubtitle}>{dateText}</Text>
        </View>

        {/* Security Shield Icon */}
        <TouchableOpacity
          style={styles.shieldButton}
          onPress={onShieldPress}
          activeOpacity={0.8}
          accessibilityLabel="Security Operations"
        >
          <ShieldIcon size={moderateScale(24)} color={colors.white} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: moderateScale(48), // Padding allowance for overlapping alert card
    borderBottomLeftRadius: moderateScale(28),
    borderBottomRightRadius: moderateScale(28),
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(19),
    backgroundColor: '#3B68FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  logoText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(20),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  brandTextColumn: {
    justifyContent: 'center',
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontFamily: typography.fontFamily.heading.regular,
    fontSize: 16,
    color: colors.white,
    fontWeight: typography.fontWeight.regular,
    letterSpacing: 0.5,
    marginRight: moderateScale(8),
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(7, 36, 75, 0.45)',
    paddingHorizontal: moderateScale(7),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  liveDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#22C55E',
    marginRight: moderateScale(4),
  },
  liveText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(10),
    color: '#34D399',
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.4,
  },
  brandSubtitle: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11.5),
    color: colors.subtitlePeriwinkle,
    marginTop: moderateScale(1),
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10),
  },
  bellBadge: {
    position: 'absolute',
    top: -moderateScale(3),
    right: -moderateScale(3),
    backgroundColor: colors.white,
    minWidth: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  bellBadgeText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(10),
    color: '#032B57',
    fontWeight: typography.fontWeight.bold,
  },
  avatarButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(13),
    color: '#0F172A',
    fontWeight: typography.fontWeight.bold,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: moderateScale(9),
    height: moderateScale(9),
    borderRadius: moderateScale(4.5),
    backgroundColor: '#22C55E',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: moderateScale(26),
  },
  greetingTextColumn: {
    flex: 1,
    paddingRight: moderateScale(12),
  },
  greetingHeading: {
    fontFamily: typography.fontFamily.heading.semiBold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
  },
  dateSubtitle: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(12),
    color: colors.subtitlePeriwinkle,
    marginTop: moderateScale(8),
  },
  shieldButton: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(14),
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(4),
  },
});

export default HeaderSection;
