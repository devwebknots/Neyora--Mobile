/**
 * Today's Capacity Card Component
 * Displays showing slot occupancy, segmented capacity progress bar (Showings/Inspections/Maintenance/Sync),
 * slot counters, and Google & Outlook calendar synchronization status.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, shadows, typography } from '@/config/theme';
import { RefreshIcon } from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface TodayCapacityCardProps {
  bookedPercent?: number;
  filledSlots?: number;
  totalSlots?: number;
  leftCount?: number;
  syncTimeText?: string;
}

export const TodayCapacityCard: React.FC<TodayCapacityCardProps> = ({
  bookedPercent = 82,
  filledSlots = 7,
  totalSlots = 9,
  leftCount = 3,
  syncTimeText = 'Synced with Google & Outlook 4 mins ago',
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Header Row: Title & Badge */}
      <View style={styles.headerRow}>
        <Text style={styles.titleText}>Today's Capacity</Text>
        <View style={styles.bookedBadge}>
          <Text style={styles.bookedBadgeText}>{bookedPercent}% BOOKED</Text>
        </View>
      </View>

      {/* Segmented Capacity Progress Bar */}
      <View style={styles.progressBarWrapper}>
        <View style={[styles.progressSegment, styles.segmentShowings]} />
        <View style={styles.segmentGap} />
        <View style={[styles.progressSegment, styles.segmentInspections]} />
        <View style={styles.segmentGap} />
        <View style={[styles.progressSegment, styles.segmentMaintenance]} />
        <View style={styles.segmentGap} />
        <View style={[styles.progressSegment, styles.segmentUnfilled]} />
      </View>

      {/* Slots Summary Subheader */}
      <View style={styles.summaryRow}>
        <Text style={styles.slotsFilledText}>
          {filledSlots} of {totalSlots} Showing slots filled
        </Text>
        <Text style={styles.slotsLeftText}>{leftCount} Left</Text>
      </View>

      {/* Capacity Breakdown Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
          <Text style={styles.legendText}>Showings</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
          <Text style={styles.legendText}>Inspections</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#64748B' }]} />
          <Text style={styles.legendText}>Maintenance</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#0F172A' }]} />
          <Text style={styles.legendText}>Sync</Text>
        </View>
      </View>

      {/* Google & Outlook Sync Notice */}
      <View style={styles.syncFooter}>
        <RefreshIcon size={moderateScale(12)} color="#94A3B8" style={styles.refreshIcon} />
        <Text style={styles.syncText}>{syncTimeText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginTop: moderateScale(16),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    ...shadows.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(17),
    color: '#0F172A',
    fontWeight: typography.fontWeight.bold,
    letterSpacing: -0.3,
  },
  bookedBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: moderateScale(8.5),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(10),
  },
  bookedBadgeText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(10.5),
    color: '#B45309',
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  progressBarWrapper: {
    flexDirection: 'row',
    height: moderateScale(7),
    borderRadius: moderateScale(3.5),
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    marginTop: moderateScale(13),
  },
  progressSegment: {
    height: '100%',
  },
  segmentShowings: {
    flex: 56,
    backgroundColor: '#2563EB',
  },
  segmentInspections: {
    flex: 18,
    backgroundColor: '#F59E0B',
  },
  segmentMaintenance: {
    flex: 12,
    backgroundColor: '#64748B',
  },
  segmentUnfilled: {
    flex: 14,
    backgroundColor: '#E2E8F0',
  },
  segmentGap: {
    width: 2,
    backgroundColor: colors.white,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(11),
  },
  slotsFilledText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(12.5),
    color: '#475569',
  },
  slotsLeftText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(12.5),
    color: '#16A34A',
    fontWeight: typography.fontWeight.bold,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(12),
    paddingTop: moderateScale(2),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    marginRight: moderateScale(5),
  },
  legendText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(11),
    color: '#475569',
    fontWeight: typography.fontWeight.medium,
  },
  syncFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(14),
    paddingTop: moderateScale(11),
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  refreshIcon: {
    marginRight: moderateScale(5),
  },
  syncText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11),
    color: '#94A3B8',
  },
});

export default TodayCapacityCard;
