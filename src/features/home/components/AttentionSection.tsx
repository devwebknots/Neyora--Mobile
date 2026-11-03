/**
 * Needs Your Attention Section Component
 * Displays actionable requests (tour inquiries, pending approvals)
 * with review and confirm action buttons and collapsible list toggle.
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
import { CheckmarkIcon, ChevronDownIcon, ClockIcon } from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface AttentionItem {
  id: string;
  senderInitials: string;
  senderName: string;
  inquiryType: string;
  status: string;
  unitTitle: string;
  scheduleTime: string;
  duration: string;
}

export interface AttentionSectionProps {
  itemCount?: number;
  onViewAll?: () => void;
  onReview?: (id: string) => void;
  onConfirm?: (id: string) => void;
  onToggleUnfold?: () => void;
}

export const AttentionSection: React.FC<AttentionSectionProps> = ({
  itemCount = 3,
  onViewAll,
  onReview,
  onConfirm,
  onToggleUnfold,
}) => {
  return (
    <View style={styles.sectionContainer}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleWithBadge}>
          <Text style={styles.sectionTitle}>Needs Your Attention</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{itemCount}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Main Attention Card */}
      <View style={styles.card}>
        {/* User Info & Status */}
        <View style={styles.cardHeaderRow}>
          <View style={styles.userInfoRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>SJ</Text>
            </View>
            <View style={styles.userTextColumn}>
              <Text style={styles.userName}>Sarah Johnson</Text>
              <Text style={styles.inquiryType}>Tour Inquiry</Text>
            </View>
          </View>

          {/* Status Badge */}
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Awaiting</Text>
          </View>
        </View>

        {/* Unit Details */}
        <Text style={styles.unitTitle}>Unit 402 • 2BR Luxury View</Text>

        {/* Time Schedule Banner */}
        <View style={styles.timeBanner}>
          <ClockIcon size={moderateScale(16)} color={colors.primary} />
          <Text style={styles.timeText}>
            Tomorrow, 10:00 AM – 10:45 AM{' '}
            <Text style={styles.durationText}>(45m)</Text>
          </Text>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionsRow}>
          {/* Review Button */}
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={() => onReview?.('1')}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Review inquiry"
          >
            <Text style={styles.reviewButtonText}>Review</Text>
          </TouchableOpacity>

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.confirmButtonTouchable}
            onPress={() => onConfirm?.('1')}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Confirm inquiry"
          >
            <LinearGradient
              colors={gradients.button}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.confirmButtonGradient}
            >
              <CheckmarkIcon size={moderateScale(15)} color={colors.white} strokeWidth={2.5} />
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Unfold More Items Pill Button */}
      <TouchableOpacity
        style={styles.unfoldButton}
        onPress={onToggleUnfold}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Unfold 2 more items"
      >
        <Text style={styles.unfoldText}>Unfold 2 more items</Text>
        <ChevronDownIcon size={moderateScale(15)} color="#0F172A" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: moderateScale(18),
    marginTop: moderateScale(22),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(12),
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(18),
    color: '#0F172A',
    fontWeight: typography.fontWeight.bold,
    marginRight: moderateScale(8),
  },
  countBadge: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(11),
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(12),
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  viewAllLink: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(13),
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: moderateScale(15),
    ...shadows.sm,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(11),
  },
  avatarText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(14),
    color: '#6366F1',
    fontWeight: typography.fontWeight.bold,
  },
  userTextColumn: {
    justifyContent: 'center',
  },
  userName: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(15),
    color: '#0F172A',
    fontWeight: typography.fontWeight.bold,
  },
  inquiryType: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(12),
    color: '#64748B',
    marginTop: moderateScale(1),
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(12),
  },
  statusDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#D97706',
    marginRight: moderateScale(5),
  },
  statusText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(11),
    color: '#D97706',
    fontWeight: typography.fontWeight.semibold,
  },
  unitTitle: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(15.5),
    color: '#0F172A',
    fontWeight: typography.fontWeight.bold,
    marginTop: moderateScale(13),
  },
  timeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(11),
    paddingVertical: moderateScale(9),
    marginTop: moderateScale(10),
  },
  timeText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(12.5),
    color: '#0F172A',
    fontWeight: typography.fontWeight.semibold,
    marginLeft: moderateScale(8),
  },
  durationText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(12),
    color: '#64748B',
    fontWeight: typography.fontWeight.regular,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(14),
    gap: moderateScale(10),
  },
  reviewButton: {
    flex: 1,
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButtonText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(13.5),
    color: '#0F172A',
    fontWeight: typography.fontWeight.semibold,
  },
  confirmButtonTouchable: {
    flex: 1,
  },
  confirmButtonGradient: {
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(13.5),
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    marginLeft: moderateScale(6),
  },
  unfoldButton: {
    marginTop: moderateScale(10),
    height: moderateScale(38),
    borderRadius: moderateScale(12),
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  unfoldText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(12.5),
    color: '#0F172A',
    fontWeight: typography.fontWeight.semibold,
    marginRight: moderateScale(6),
  },
});

export default AttentionSection;
