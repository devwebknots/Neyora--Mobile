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
  MessageBubbleIcon,
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
          <ChevronRightIcon size={moderateScale(14)} color={colors.primary} />
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
              <VideoCameraIcon size={moderateScale(14)} color="#64748B" />
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
              <UserIcon size={moderateScale(14)} color="#64748B" />
              <Text style={styles.metaText} numberOfLines={1}>
                With Sarah Li • The Me...
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Floating Messages Button */}
        <TouchableOpacity
          style={styles.fabButton}
          onPress={onMessagesFabPress}
          activeOpacity={0.9}
          accessibilityRole="button"
          accessibilityLabel="Open Messages"
        >
          <MessageBubbleIcon size={moderateScale(20)} color={colors.white} />
          <Text style={styles.fabLabel}>Messages</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: moderateScale(22),
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
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(18),
    color: '#0F172A',
    fontWeight: typography.fontWeight.bold,
    marginRight: moderateScale(6),
  },
  eventCountText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(13),
    color: '#64748B',
  },
  viewCalendarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCalendarLink: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(13),
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    marginRight: moderateScale(3),
  },
  carouselWrapper: {
    position: 'relative',
  },
  scrollContent: {
    paddingLeft: spacing.screenHorizontal,
    paddingRight: moderateScale(70), // Leave room so FAB doesn't permanently obscure last item
    gap: moderateScale(12),
  },
  eventCard: {
    width: moderateScale(218),
    borderRadius: moderateScale(14),
    padding: moderateScale(14),
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
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
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(14),
    fontWeight: typography.fontWeight.bold,
  },
  timeText1: {
    color: '#4F46E5',
  },
  timeText2: {
    color: '#059669',
  },
  tagBadge: {
    paddingHorizontal: moderateScale(7),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(6),
  },
  tagBadge1: {
    backgroundColor: '#E0E7FF',
  },
  tagText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(10.5),
    fontWeight: typography.fontWeight.semibold,
  },
  tagText1: {
    color: '#4F46E5',
  },
  eventTitle: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(13.5),
    lineHeight: scaleFont(18),
    color: '#0F172A',
    fontWeight: typography.fontWeight.bold,
    marginTop: moderateScale(8),
    minHeight: scaleFont(36),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(8),
  },
  metaText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11.5),
    color: '#64748B',
    marginLeft: moderateScale(5),
    flex: 1,
  },
  fabButton: {
    position: 'absolute',
    right: spacing.screenHorizontal,
    top: moderateScale(10),
    width: moderateScale(54),
    height: moderateScale(54),
    borderRadius: moderateScale(27),
    backgroundColor: '#0F2B48',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...shadows.lg,
    shadowColor: '#032B57',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  fabLabel: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(8),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    marginTop: moderateScale(1),
  },
});

export default ScheduleSection;
