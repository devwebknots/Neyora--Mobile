/**
 * Alert Banner Component
 * Displays system alerts, maintenance notices, and required actions.
 * Positioned to seamlessly overlap the header gradient.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { shadows, spacing, typography } from '@/config/theme';
import { ChevronDownIcon, WarningTriangleIcon } from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface AlertBannerProps {
  title?: string;
  badgeText?: string;
  subtitle?: string;
  onPress?: () => void;
  onToggleExpand?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  title = 'Elevator Modernization',
  badgeText = 'Day 1 of 2',
  subtitle = 'West Tower Service Lifts • 3 actions required',
  onPress,
  onToggleExpand,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${badgeText}, ${subtitle}`}
    >
      {/* Warning Triangle Icon Box */}
      <View style={styles.iconBox}>
        <WarningTriangleIcon size={moderateScale(20)} color="#D97706" />
      </View>

      {/* Alert Content */}
      <View style={styles.contentColumn}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.dayBadge}>
            <Text style={styles.dayBadgeText}>{badgeText}</Text>
          </View>
        </View>
        <Text style={styles.subtitleText} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>

      {/* Accordion Expand / Chevron Button */}
      <TouchableOpacity
        style={styles.chevronButton}
        onPress={onToggleExpand}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityLabel="Expand alert details"
      >
        <ChevronDownIcon size={moderateScale(14)} color="#B45309" strokeWidth={2} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.screenHorizontal,
    marginTop: -moderateScale(26), // Seamless overlap onto header bottom curve
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: 'rgba(254, 240, 138, 0.65)',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.sm,
    shadowColor: '#78350F',
    shadowOpacity: 0.04,
  },
  iconBox: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(10),
    backgroundColor: 'rgba(254, 243, 199, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  contentColumn: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: moderateScale(8),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  titleText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(14),
    color: '#1E293B',
    fontWeight: typography.fontWeight.semibold,
    marginRight: moderateScale(8),
  },
  dayBadge: {
    backgroundColor: 'rgba(253, 230, 138, 0.6)',
    paddingHorizontal: moderateScale(6.5),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(5),
  },
  dayBadgeText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(10),
    color: '#92400E',
    fontWeight: typography.fontWeight.medium,
  },
  subtitleText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11.5),
    color: '#64748B',
    opacity: 0.85,
    marginTop: moderateScale(2.5),
  },
  chevronButton: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: 'rgba(254, 243, 199, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AlertBanner;
