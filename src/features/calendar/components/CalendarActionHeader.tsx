/**
 * Calendar Screen Action Header Component
 * Renders the category label, main "Calendar" Playfair title,
 * the ICS and EVENT action buttons, and the Month / Week / Day / Agenda switcher.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from '@/components/LinearGradient';
import { colors, gradients, shadows, typography } from '@/config/theme';
import { PlusIcon, UploadIcon } from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export type CalendarViewMode = 'Month' | 'Week' | 'Day' | 'Agenda';

export interface CalendarActionHeaderProps {
  categoryLabel?: string;
  title?: string;
  viewMode?: CalendarViewMode;
  onChangeViewMode?: (mode: CalendarViewMode) => void;
  onIcsPress?: () => void;
  onEventPress?: () => void;
}

export const CalendarActionHeader: React.FC<CalendarActionHeaderProps> = ({
  categoryLabel = 'PROPERTY SHOWINGS & TENANT INSPECTIONS',
  title = 'Calendar',
  viewMode = 'Month',
  onChangeViewMode,
  onIcsPress,
  onEventPress,
}) => {
  const viewModes: CalendarViewMode[] = ['Month', 'Week', 'Day', 'Agenda'];

  return (
    <View style={styles.container}>
      {/* Category Uppercase Kicker */}
      <Text style={styles.kickerText}>{categoryLabel}</Text>

      {/* Main Page Title */}
      <Text style={styles.titleText}>{title}</Text>

      {/* Primary Actions Row: ICS and EVENT */}
      <View style={styles.buttonsRow}>
        {/* ICS Export/Upload Button */}
        <TouchableOpacity
          style={styles.icsButton}
          onPress={onIcsPress}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Export ICS calendar"
        >
          <UploadIcon size={moderateScale(16)} color="#D97706" />
          <Text style={styles.icsButtonText}>ICS</Text>
        </TouchableOpacity>

        {/* New Event Button with Brand Gradient */}
        <TouchableOpacity
          style={styles.eventButtonTouchable}
          onPress={onEventPress}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Create New Event"
        >
          <LinearGradient
            colors={gradients.button}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.eventButtonGradient}
          >
            <PlusIcon size={moderateScale(15)} color="#93C5FD" />
            <Text style={styles.eventButtonText}>EVENT</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Segmented View Switcher (Month / Week / Day / Agenda) */}
      <View style={styles.segmentedContainer}>
        {viewModes.map((mode) => {
          const isActive = viewMode === mode;
          return (
            <TouchableOpacity
              key={mode}
              style={[
                styles.segmentItem,
                isActive && styles.segmentItemActive,
              ]}
              onPress={() => onChangeViewMode?.(mode)}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${mode} view`}
            >
              <Text
                style={[
                  styles.segmentText,
                  isActive ? styles.segmentTextActive : styles.segmentTextInactive,
                ]}
              >
                {mode}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: moderateScale(20),
  },
  kickerText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(10.5),
    color: '#64748B',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  titleText: {
    fontFamily: typography.fontFamily.heading.regular,
    fontSize: scaleFont(32),
    lineHeight: scaleFont(38),
    color: '#0F172A',
    fontWeight: typography.fontWeight.regular,
    letterSpacing: -0.5,
    marginTop: moderateScale(4),
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
    marginTop: moderateScale(14),
  },
  icsButton: {
    flex: 1,
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  icsButtonText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(13),
    color: '#1E293B',
    fontWeight: typography.fontWeight.bold,
    marginLeft: moderateScale(6),
    letterSpacing: 0.5,
  },
  eventButtonTouchable: {
    flex: 1,
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    ...shadows.sm,
  },
  eventButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventButtonText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(13),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    marginLeft: moderateScale(6),
    letterSpacing: 0.8,
  },
  segmentedContainer: {
    marginTop: moderateScale(16),
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: moderateScale(12),
    padding: moderateScale(3.5),
  },
  segmentItem: {
    flex: 1,
    paddingVertical: moderateScale(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(9),
  },
  segmentItemActive: {
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  segmentText: {
    fontSize: scaleFont(13),
    textAlign: 'center',
  },
  segmentTextActive: {
    fontFamily: typography.fontFamily.body.semiBold,
    color: '#0F172A',
    fontWeight: typography.fontWeight.semibold,
  },
  segmentTextInactive: {
    fontFamily: typography.fontFamily.body.medium,
    color: '#64748B',
    fontWeight: typography.fontWeight.medium,
  },
});

export default CalendarActionHeader;
