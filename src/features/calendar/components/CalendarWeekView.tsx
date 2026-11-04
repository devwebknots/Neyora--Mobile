/**
 * Calendar Week View Component
 * Recreates the detailed weekly schedule view for Oct 20–26, 2024 (W43)
 * with week navigation, active day selector (Wed 23), elevator modernization notice,
 * and time-slotted event cards from 09:00 AM to 06:00 PM with perfectly straight left indicator stripes.
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, shadows, typography } from '@/config/theme';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  UserIcon,
  WarningTriangleIcon,
} from '@/components/icons';
import { LinearGradient } from '@/components';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface WeekDay {
  dayName: string;
  dayNumber: number;
}

export interface CalendarWeekViewProps {
  dateRangeText?: string;
  weekBadgeText?: string;
  filterCount?: number;
  selectedDay?: number;
  onSelectDay?: (day: number) => void;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  onFilterPress?: () => void;
  onEventPress?: (eventId: string) => void;
  onAlertPress?: () => void;
}

export const CalendarWeekView: React.FC<CalendarWeekViewProps> = ({
  dateRangeText = 'Oct 20–26, 2024',
  weekBadgeText = 'W43',
  filterCount = 2,
  selectedDay: initialSelectedDay = 23,
  onSelectDay,
  onPrevWeek,
  onNextWeek,
  onFilterPress,
  onEventPress,
  onAlertPress,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(initialSelectedDay);
  const [selectedEventId, setSelectedEventId] = useState<string>('unit402');

  const weekDays: WeekDay[] = [
    { dayName: 'SUN', dayNumber: 20 },
    { dayName: 'MON', dayNumber: 21 },
    { dayName: 'TUE', dayNumber: 22 },
    { dayName: 'WED', dayNumber: 23 },
    { dayName: 'THU', dayNumber: 24 },
    { dayName: 'FRI', dayNumber: 25 },
    { dayName: 'SAT', dayNumber: 26 },
  ];

  const handleDaySelect = (dayNumber: number) => {
    setSelectedDay(dayNumber);
    onSelectDay?.(dayNumber);
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    onEventPress?.(eventId);
  };

  return (
    <View style={styles.mainContainer}>
      {/* 1. Header Card: < > Nav, Date Range with W43 Badge, Filters Button */}
      <View style={styles.headerCard}>
        {/* Navigation Arrows Pill (< >) */}
        <View style={styles.navPill}>
          <TouchableOpacity
            style={styles.navArrowButton}
            onPress={onPrevWeek}
            activeOpacity={0.7}
            accessibilityLabel="Previous Week"
          >
            <ChevronLeftIcon size={moderateScale(13)} color="#1E293B" />
          </TouchableOpacity>
          <View style={styles.navDivider} />
          <TouchableOpacity
            style={styles.navArrowButton}
            onPress={onNextWeek}
            activeOpacity={0.7}
            accessibilityLabel="Next Week"
          >
            <ChevronRightIcon size={moderateScale(13)} color="#1E293B" />
          </TouchableOpacity>
        </View>

        {/* Date Range & Week Badge */}
        <View style={styles.dateRangeRow}>
          <Text style={styles.dateRangeText}>{dateRangeText}</Text>
          <View style={styles.weekBadge}>
            <Text style={styles.weekBadgeText}>{weekBadgeText}</Text>
          </View>
        </View>

        {/* Filters Button */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={onFilterPress}
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel={`Filters, ${filterCount} active`}
        >
          <FilterIcon size={moderateScale(11)} color="#64748B" />
          <Text style={styles.filterButtonText}>Filters</Text>
          {filterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{filterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* 2. Days of Week Selector (Sun 20 - Sat 26) */}
      <View style={styles.daysRow}>
        {weekDays.map((item) => {
          const isSelected = item.dayNumber === selectedDay;

          if (isSelected) {
            return (
              <TouchableOpacity
                key={item.dayNumber}
                style={styles.daySelectedBadge}
                onPress={() => handleDaySelect(item.dayNumber)}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityState={{ selected: true }}
                accessibilityLabel={`${item.dayName} ${item.dayNumber}, selected`}
              >
                <Text style={styles.daySelectedName}>{item.dayName}</Text>
                <Text style={styles.daySelectedNumber}>{item.dayNumber}</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={item.dayNumber}
              style={styles.dayColumn}
              onPress={() => handleDaySelect(item.dayNumber)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`${item.dayName} ${item.dayNumber}`}
            >
              <Text style={styles.dayNameText}>{item.dayName}</Text>
              <Text style={styles.dayNumberText}>{item.dayNumber}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 3. Elevator Modernization Banner */}
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

      {/* 4. Timeline Schedule Grid */}
      <View style={styles.timelineContainer}>
        {/* Slot: 09:00 AM */}
        <View style={styles.timelineRow}>
          <Text style={styles.timeLabel}>09:00 AM</Text>
          <TouchableOpacity
            style={[styles.eventCard, styles.eventCardWalkthrough]}
            onPress={() => handleEventClick('unit104')}
            activeOpacity={0.8}
          >
            {/* Perfectly straight left stripe */}
            <View style={[styles.cardStripe, { backgroundColor: '#2563EB' }]} />
            <View style={styles.cardContent}>
              <View style={styles.eventCardHeader}>
                <Text style={styles.eventCardTitle}>Unit 104 Walkth...</Text>
                <View style={[styles.eventTag, styles.tagBlue]}>
                  <Text style={[styles.eventTagText, styles.tagTextBlue]}>Walkthrough</Text>
                </View>
              </View>
              <View style={styles.userRow}>
                <UserIcon size={moderateScale(11)} color="#64748B" />
                <Text style={styles.userNameText}>Sarah Li</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Slot: 10:00 AM - Selected Event Card */}
        <View style={styles.timelineRow}>
          <Text style={[styles.timeLabel, styles.timeLabelActive]}>10:00 AM</Text>
          <TouchableOpacity
            style={styles.selectedEventCardTouchable}
            onPress={() => handleEventClick('unit402')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#4075E9', '#94B0EA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.selectedEventCard,
                selectedEventId === 'unit402' && styles.selectedEventCardActive,
              ]}
            >
              <View style={styles.selectedHeaderRow}>
                <View style={styles.selectedTitleGroup}>
                  <View style={styles.liveGreenDot} />
                  <Text style={styles.selectedTitleText}>Unit 402 – Showing Tour</Text>
                </View>
                <View style={styles.selectedPill}>
                  <Text style={styles.selectedPillText}>Selected</Text>
                </View>
              </View>

              <Text style={styles.selectedSubtitleText}>
                The Mercer Residences • Marcus Reed
              </Text>

              <View style={styles.selectedDivider} />

              <View style={styles.selectedBottomRow}>
                <Text style={styles.selectedTimeText}>10:00 – 10:45 AM</Text>
                <View style={styles.bufferPill}>
                  <Text style={styles.bufferPillText}>+15m travel buffer</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Slot: HVAC Room (Between 10:00 AM and 01:00 PM) */}
        <View style={styles.timelineRow}>
          <View style={styles.emptyTimeLabel} />
          <TouchableOpacity
            style={[styles.eventCard, styles.eventCardHvac]}
            onPress={() => handleEventClick('hvac')}
            activeOpacity={0.8}
          >
            {/* Perfectly straight green stripe */}
            <View style={[styles.cardStripe, { backgroundColor: '#10B981' }]} />
            <View style={styles.cardContent}>
              <View style={styles.eventCardHeader}>
                <Text style={styles.eventCardTitle}>HVAC Ro... Unit 3B</Text>
                <View style={[styles.eventTag, styles.tagGreen]}>
                  <Text style={[styles.eventTagText, styles.tagTextGreen]}>Done</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Slot: 01:00 PM */}
        <View style={styles.timelineRow}>
          <Text style={styles.timeLabel}>01:00 PM</Text>
          <TouchableOpacity
            style={[styles.eventCard, styles.eventCardVirtual]}
            onPress={() => handleEventClick('virtual')}
            activeOpacity={0.8}
          >
            {/* Perfectly straight purple stripe */}
            <View style={[styles.cardStripe, { backgroundColor: '#8B5CF6' }]} />
            <View style={styles.cardContent}>
              <View style={styles.eventCardHeader}>
                <Text style={styles.eventCardTitle}>Virtual : Consultation</Text>
                <View style={[styles.eventTag, styles.tagPurple]}>
                  <Text style={[styles.eventTagText, styles.tagTextPurple]}>Meet</Text>
                </View>
              </View>
              <Text style={styles.eventCardSubtitle}>Google Meet Link attached</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Slot: 03:00 PM */}
        <View style={styles.timelineRow}>
          <Text style={styles.timeLabel}>03:00 PM</Text>
          <TouchableOpacity
            style={[styles.eventCard, styles.eventCardVendor]}
            onPress={() => handleEventClick('vendor')}
            activeOpacity={0.8}
          >
            {/* Perfectly straight orange stripe */}
            <View style={[styles.cardStripe, { backgroundColor: '#F59E0B' }]} />
            <View style={styles.cardContent}>
              <View style={styles.eventCardHeader}>
                <Text style={styles.eventCardTitle}>Vendor Inspection</Text>
                <View style={[styles.eventTag, styles.tagOrange]}>
                  <Text style={[styles.eventTagText, styles.tagTextOrange]}>Vendor P...</Text>
                </View>
              </View>
              <Text style={styles.eventCardSubtitle}>Skyline Facilities & Engineering</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Slot: 04:00 PM */}
        <View style={styles.timelineRow}>
          <Text style={styles.timeLabel}>04:00 PM</Text>
          <TouchableOpacity
            style={[styles.eventCard, styles.eventCardKey]}
            onPress={() => handleEventClick('key')}
            activeOpacity={0.8}
          >
            {/* Perfectly straight teal stripe */}
            <View style={[styles.cardStripe, { backgroundColor: '#0D9488' }]} />
            <View style={styles.cardContent}>
              <View style={styles.eventCardHeader}>
                <Text style={styles.eventCardTitle}>Key Handover</Text>
                <View style={[styles.eventTag, styles.tagTeal]}>
                  <Text style={[styles.eventTagText, styles.tagTextTeal]}>Key Hand</Text>
                </View>
              </View>
              <Text style={styles.eventCardSubtitle}>Tenant: Liam Vance</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Slot: 06:00 PM (Dashed Divider) */}
        <View style={styles.timelineRowLast}>
          <Text style={[styles.timeLabel, styles.timeLabelLast]}>06:00 PM</Text>
          <View style={styles.dashedLine} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
    marginTop: moderateScale(16),
  },
  headerCard: {
    minHeight: moderateScale(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
  },
  navPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(3),
    paddingVertical: moderateScale(3),
  },
  navArrowButton: {
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(3),
  },
  navDivider: {
    width: 1,
    height: moderateScale(14),
    backgroundColor: '#E2E8F0',
  },
  dateRangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateRangeText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(13.5),
    color: '#0F172A',
    fontWeight: typography.fontWeight.bold,
  },
  weekBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(6),
    marginLeft: moderateScale(6),
  },
  weekBadgeText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(11),
    color: '#64748B',
    fontWeight: typography.fontWeight.medium,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(5),
  },
  filterButtonText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(11.5),
    color: '#475569',
    fontWeight: typography.fontWeight.semibold,
    marginLeft: moderateScale(4),
  },
  filterBadge: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(5),
  },
  filterBadgeText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(9.5),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(16),
    paddingHorizontal: moderateScale(2),
  },
  dayColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(40),
    paddingVertical: moderateScale(4),
  },
  dayNameText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(10),
    color: '#94A3B8',
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: 0.5,
  },
  dayNumberText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(14.5),
    color: '#1E293B',
    fontWeight: typography.fontWeight.bold,
    marginTop: moderateScale(3),
  },
  daySelectedBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(42),
    height: moderateScale(48),
    borderRadius: moderateScale(12),
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(4),
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  daySelectedName: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(9.5),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  daySelectedNumber: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(15.5),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    marginTop: moderateScale(1),
  },
  alertBanner: {
    minHeight: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEFCE8',
    borderWidth: 1,
    borderColor: '#FEF08A',
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(10),
    marginTop: moderateScale(16),
  },
  alertLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertIcon: {
    marginRight: moderateScale(6),
  },
  alertTitleText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(11.5),
    color: '#92400E',
    fontWeight: typography.fontWeight.semibold,
  },
  dayPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: moderateScale(7),
    paddingVertical: moderateScale(2.5),
    borderRadius: moderateScale(6),
  },
  dayPillText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(10),
    color: '#B45309',
    fontWeight: typography.fontWeight.medium,
  },
  timelineContainer: {
    marginTop: moderateScale(20),
    gap: moderateScale(10),
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(4),
  },
  timeLabel: {
    width: moderateScale(68),
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(11),
    color: '#94A3B8',
    fontWeight: typography.fontWeight.medium,
    paddingTop: moderateScale(10),
  },
  timeLabelActive: {
    fontFamily: typography.fontFamily.body.bold,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  timeLabelLast: {
    paddingTop: 0,
  },
  emptyTimeLabel: {
    width: moderateScale(68),
  },
  eventCard: {
    flex: 1,
    flexDirection: 'row',
    borderTopRightRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    overflow: 'hidden',
  },
  cardStripe: {
    width: moderateScale(3.5),
    alignSelf: 'stretch',
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(9),
    justifyContent: 'center',
  },
  eventCardWalkthrough: {
    backgroundColor: '#F8FAFC',
  },
  eventCardHvac: {
    backgroundColor: '#F0FDF4',
  },
  eventCardVirtual: {
    backgroundColor: '#FAF5FF',
  },
  eventCardVendor: {
    backgroundColor: '#FFFBEB',
  },
  eventCardKey: {
    backgroundColor: '#F0FDFA',
  },
  eventCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventCardTitle: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(12.5),
    color: '#1E293B',
    fontWeight: typography.fontWeight.bold,
    flex: 1,
    marginRight: moderateScale(6),
  },
  eventCardSubtitle: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11),
    color: '#64748B',
    marginTop: moderateScale(2),
  },
  eventTag: {
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(5),
  },
  eventTagText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(10),
    fontWeight: typography.fontWeight.medium,
  },
  tagBlue: {
    backgroundColor: '#EFF6FF',
  },
  tagTextBlue: {
    color: '#2563EB',
  },
  tagGreen: {
    backgroundColor: '#DCFCE7',
  },
  tagTextGreen: {
    color: '#15803D',
  },
  tagPurple: {
    backgroundColor: '#F3E8FF',
  },
  tagTextPurple: {
    color: '#7C3AED',
  },
  tagOrange: {
    backgroundColor: '#FEF3C7',
  },
  tagTextOrange: {
    color: '#B45309',
  },
  tagTeal: {
    backgroundColor: '#CCFBF1',
  },
  tagTextTeal: {
    color: '#0F766E',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(3),
  },
  userNameText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11),
    color: '#64748B',
    marginLeft: moderateScale(4),
  },
  selectedEventCardTouchable: {
    flex: 1,
  },
  selectedEventCard: {
    borderRadius: moderateScale(14),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(11),
    shadowColor: '#4075E9',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 3,
  },
  selectedEventCardActive: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  selectedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  liveGreenDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#22C55E',
    marginRight: moderateScale(6),
  },
  selectedTitleText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(13),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  selectedPill: {
    backgroundColor: '#315EDB',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(6),
  },
  selectedPillText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(10),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  selectedSubtitleText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11),
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: moderateScale(3),
  },
  selectedDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    marginVertical: moderateScale(8),
  },
  selectedBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedTimeText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(11),
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
  },
  bufferPill: {
    backgroundColor: '#436EDE',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(6),
  },
  bufferPillText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(9.5),
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
  },
  dashedLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
});

export default CalendarWeekView;
