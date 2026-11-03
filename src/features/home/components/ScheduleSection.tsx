/**
 * Today's Schedule Section Component
 * Displays horizontal scrolling schedule cards and quick floating message shortcut.
 */

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, shadows, spacing, typography } from '@/config/theme';
import {
  ChevronRightIcon,
  UserIcon,
  VideoCameraIcon,
} from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface ScheduleEvent {
  id: string;
  time: string;
  tag?: string;
  title: string;
  meta: string;
  type: 'video' | 'person';
  backgroundColor: string;
  timeColor: string;
  tagBg?: string;
  tagColor?: string;
}

export interface ScheduleSectionProps {
  eventsCount?: number;
  onViewCalendar?: () => void;
  onEventPress?: (id: string) => void;
  onMessagesFabPress?: () => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  eventsCount = 3,
  onViewCalendar,
  onEventPress,
  onMessagesFabPress,
}) => {
  return (
    <View style={styles.sectionContainer}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <Text style={styles.eventCountText}>{eventsCount} events</Text>
        </View>

        <TouchableOpacity
          style={styles.viewCalendarRow}
          onPress={onViewCalendar}
          activeOpacity={0.7}
        >
          <Text style={styles.viewCalendarLink}>View Calendar</Text>
          <ChevronRightIcon size={moderateScale(13)} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Events Container with Floating Action Shortcut */}
      <View style={styles.carouselWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Card 1: 09:00 Daily Team Stand-up */}
          <TouchableOpacity
            style={[styles.eventCard, styles.eventCard1]}
            onPress={() => onEventPress?.('1')}
            activeOpacity={0.85}
          >
            <View style={styles.cardTopRow}>
              <Text style={[styles.timeText, styles.timeText1]}>09:00</Text>
              <View style={[styles.tagBadge, styles.tagBadge1]}>
                <Text style={[styles.tagText, styles.tagText1]}>Daily</Text>
              </View>
            </View>

            <Text style={styles.eventTitle} numberOfLines={2}>
              Team Stand-up & Daily Dispatch
            </Text>

            <View style={styles.metaRow}>
              <VideoCameraIcon size={moderateScale(13)} color="#64748B" />
              <Text style={styles.metaText} numberOfLines={1}>
                Virtual Meet • 8 participants
              </Text>
            </View>
          </TouchableOpacity>

          {/* Card 2: 11:30 Client Walkthrough */}
          <TouchableOpacity
            style={[styles.eventCard, styles.eventCard2]}
            onPress={() => onEventPress?.('2')}
            activeOpacity={0.85}
          >
            <View style={styles.cardTopRow}>
              <Text style={[styles.timeText, styles.timeText2]}>11:30</Text>
            </View>

            <Text style={styles.eventTitle} numberOfLines={2}>
              Client Walkthrough
            </Text>

            <View style={styles.metaRow}>
              <UserIcon size={moderateScale(13)} color="#64748B" />
              <Text style={styles.metaText} numberOfLines={1}>
                With Sarah Li • The Me...
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: moderateScale(24),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenHorizontal,
    marginBottom: moderateScale(12),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.heading.medium,
    fontSize: scaleFont(17),
    lineHeight: scaleFont(24),
    letterSpacing: -0.3,
    color: '#1E293B',
    fontWeight: '500',
    marginRight: moderateScale(6),
  },
  eventCountText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(12),
    color: '#94A3B8',
  },
  viewCalendarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCalendarLink: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(12.5),
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    marginRight: moderateScale(3),
  },
  carouselWrapper: {
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: spacing.screenHorizontal,
    gap: moderateScale(12),
  },
  eventCard: {
    width: moderateScale(218),
    borderRadius: moderateScale(14),
    padding: moderateScale(15),
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.03)',
    ...shadows.sm,
  },
  eventCard1: {
    backgroundColor: '#F0F4FA',
  },
  eventCard2: {
    backgroundColor: '#ECFDF5',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(13.5),
    fontWeight: typography.fontWeight.semibold,
  },
  timeText1: {
    color: '#4338CA',
  },
  timeText2: {
    color: '#047857',
  },
  tagBadge: {
    paddingHorizontal: moderateScale(6.5),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(5),
  },
  tagBadge1: {
    backgroundColor: '#E0E7FF',
  },
  tagText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(10),
    fontWeight: typography.fontWeight.medium,
  },
  tagText1: {
    color: '#4338CA',
  },
  eventTitle: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(13),
    lineHeight: scaleFont(18),
    color: '#1E293B',
    fontWeight: typography.fontWeight.semibold,
    marginTop: moderateScale(8),
    minHeight: scaleFont(36),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  metaText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11),
    color: '#64748B',
    opacity: 0.85,
    marginLeft: moderateScale(5),
    flex: 1,
  },
});

export default ScheduleSection;
