/**
 * Calendar Day View Component
 * Renders the dedicated single-day view matching the Figma reference:
 * 1. Day Navigation Bar (< • Wednesday, Oct 23  Today >)
 * 2. Elevator Modernization (All-Day) Warning Alert Banner (Day 1 of 2)
 * 3. Showing Tour Detail Card (Unit 402 – 2BR Luxury View)
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, typography } from '@/config/theme';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  WarningTriangleIcon,
} from '@/components/icons';
import { ShowingTourCard, ShowingTourCardProps } from './ShowingTourCard';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface CalendarDayViewProps extends ShowingTourCardProps {
  dayText?: string;
  isToday?: boolean;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  onTodayPress?: () => void;
  onAlertPress?: () => void;
}

export const CalendarDayView: React.FC<CalendarDayViewProps> = ({
  dayText = 'Wednesday, Oct 23',
  isToday = true,
  onPrevDay,
  onNextDay,
  onTodayPress,
  onAlertPress,
  ...tourProps
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Day Navigation Bar (< • Wednesday, Oct 23  Today >) */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.navArrowButton}
          onPress={onPrevDay}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityRole="button"
          accessibilityLabel="Previous Day"
        >
          <ChevronLeftIcon size={moderateScale(15)} color="#64748B" />
        </TouchableOpacity>

        <View style={styles.centerPillsRow}>
          {/* Active Date Capsule Pill */}
          <TouchableOpacity
            style={styles.datePill}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={dayText}
          >
            <View style={styles.dateDot} />
            <Text style={styles.datePillText}>{dayText}</Text>
          </TouchableOpacity>

          {/* Today Button Pill */}
          <TouchableOpacity
            style={styles.todayPill}
            onPress={onTodayPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Jump to Today"
          >
            <Text style={styles.todayPillText}>Today</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.navArrowButton}
          onPress={onNextDay}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityRole="button"
          accessibilityLabel="Next Day"
        >
          <ChevronRightIcon size={moderateScale(15)} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* 2. Elevator Modernization Warning Banner (Day 1 of 2) */}
      <TouchableOpacity
        style={styles.alertBanner}
        onPress={onAlertPress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Elevator Modernization (All-Day), Day 1 of 2"
      >
        <View style={styles.alertLeftRow}>
          <WarningTriangleIcon size={moderateScale(14)} color="#D97706" style={styles.alertIcon} />
          <Text style={styles.alertTitleText}>Elevator Modernization (All-Day)</Text>
        </View>
        <View style={styles.dayPill}>
          <Text style={styles.dayPillText}>Day 1 of 2</Text>
        </View>
      </TouchableOpacity>

      {/* 3. Showing Tour Detail Card (Unit 402 – 2BR Luxury View) */}
      <ShowingTourCard {...tourProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(14),
  },
  navArrowButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    gap: moderateScale(8),
  },
  dateDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: colors.white,
  },
  datePillText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(13),
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
  },
  todayPill: {
    backgroundColor: '#F1F5F9',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(8),
  },
  todayPillText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(13),
    color: '#64748B',
    fontWeight: typography.fontWeight.medium,
  },
  alertBanner: {
    marginHorizontal: 20,
    marginBottom: moderateScale(2),
    backgroundColor: '#FEFCE8',
    borderWidth: 1,
    borderColor: '#FEF08A',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    flex: 1,
  },
  alertIcon: {
    marginRight: moderateScale(2),
  },
  alertTitleText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(13),
    color: '#78350F',
    fontWeight: typography.fontWeight.semibold,
  },
  dayPill: {
    backgroundColor: '#FEF3C7',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
  },
  dayPillText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(11.5),
    color: '#92400E',
    fontWeight: typography.fontWeight.medium,
  },
});
