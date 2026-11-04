/**
 * Showing Tour Detail Card Component
 * Displays the selected showing tour inspection sheet for Unit 402,
 * including apartment photo preview, schedule window, Marcus Reed prospect details,
 * assigned agent Elena Vance, unit specs, tour notes, and operational actions.
 */

import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from '@/components/LinearGradient';
import { colors, gradients, shadows, typography } from '@/config/theme';
import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  CloseIcon,
  EditIcon,
  MessageBubbleIcon,
  MoreVerticalIcon,
} from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface ShowingTourCardProps {
  imageSource?: ImageSourcePropType;
  unitTitle?: string;
  propertySubtitle?: string;
  pricePerMonth?: string;
  availabilityDate?: string;
  dateText?: string;
  timeRangeText?: string;
  bufferText?: string;
  prospectName?: string;
  prospectEmail?: string;
  prospectPhone?: string;
  assignedAgentName?: string;
  unitSpecs?: string;
  squareFeet?: string;
  tourNotes?: string;
  onEditPress?: () => void;
  onMorePress?: () => void;
  onClosePress?: () => void;
  onChatPress?: () => void;
  onPhonePress?: () => void;
  onOpenPackPress?: () => void;
  onReschedulePress?: () => void;
  onCancelTourPress?: () => void;
}

export const ShowingTourCard: React.FC<ShowingTourCardProps> = ({
  imageSource = require('@/assets/images/unit_402.jpg'),
  unitTitle = 'Unit 402 – 2BR Luxury View',
  propertySubtitle = 'The Mercer Residences • West End Tower',
  pricePerMonth = '$4,200/mo',
  availabilityDate = 'Available Nov 1',
  dateText = 'Wednesday, Oct 23, 2024',
  timeRangeText = '10:00 AM – 10:45 AM (45 mins)',
  bufferText = '15 min travel buffer enforced',
  prospectName = 'Marcus Reed',
  prospectEmail = 'marcus.reed@example.com',
  prospectPhone = '+1 555-019-2834',
  assignedAgentName = 'Elena Vance',
  unitSpecs = '2 Bed • 2 Bath',
  squareFeet = '1,180 Sq Ft',
  tourNotes = 'Prospect requested key focus on balcony acoustics, parking bay access, and fiber optic pre-wiring.',
  onEditPress,
  onMorePress,
  onClosePress,
  onChatPress,
  onPhonePress,
  onOpenPackPress,
  onReschedulePress,
  onCancelTourPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Modal / Sheet Drag Handle Indicator */}
      <View style={styles.dragHandle} />

      {/* Header Row: Badge & Action Controls */}
      <View style={styles.headerRow}>
        {/* Status Pill Badge */}
        <View style={styles.tourBadge}>
          <View style={styles.tourDot} />
          <Text style={styles.tourBadgeText}>SHOWING TOUR</Text>
        </View>

        {/* Action Icons (Edit, More, Close) */}
        <View style={styles.topActionsRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onEditPress}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
            accessibilityLabel="Edit Showing Tour"
          >
            <EditIcon size={moderateScale(15)} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={onMorePress}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
            accessibilityLabel="More Options"
          >
            <MoreVerticalIcon size={moderateScale(15)} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={onClosePress}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
            accessibilityLabel="Close"
          >
            <CloseIcon size={moderateScale(13)} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Unit Title & Location */}
      <Text style={styles.unitTitleText}>{unitTitle}</Text>
      <Text style={styles.propertySubtitleText}>{propertySubtitle}</Text>

      {/* Apartment Photo with Scrim and Availability Tag */}
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.propertyImage}
          resizeMode="cover"
        />

        {/* Availability Badge */}
        <View style={styles.availabilityBadge}>
          <Text style={styles.availabilityBadgeText}>{availabilityDate}</Text>
        </View>

        {/* Bottom Dark Gradient Scrim */}
        <LinearGradient
          colors={gradients.imageDarkOverlay}
          style={styles.imageScrim}
        >
          <Text style={styles.imageOverlayText}>
            Unit 402  •  <Text style={styles.imageOverlayPrice}>{pricePerMonth}</Text>
          </Text>
        </LinearGradient>
      </View>

      {/* Date & Time Schedule Window Banner */}
      <View style={styles.scheduleBanner}>
        <View style={styles.calendarIconSquare}>
          <CalendarIcon size={moderateScale(18)} color={colors.white} />
        </View>

        <View style={styles.scheduleTextColumn}>
          <Text style={styles.scheduleDateText}>{dateText}</Text>
          <Text style={styles.scheduleTimeText}>{timeRangeText}</Text>
          <View style={styles.bufferRow}>
            <ClockIcon size={moderateScale(11)} color="#64748B" />
            <Text style={styles.bufferText}>{bufferText}</Text>
          </View>
        </View>
      </View>

      {/* Prospect Details Section */}
      <View style={styles.prospectSection}>
        <Text style={styles.sectionLabel}>PROSPECT DETAILS</Text>

        <View style={styles.prospectCard}>
          <View style={styles.prospectAvatar}>
            <Text style={styles.prospectAvatarText}>MR</Text>
          </View>

          <View style={styles.prospectInfoColumn}>
            <Text style={styles.prospectNameText}>{prospectName}</Text>
            <Text style={styles.prospectEmailText}>{prospectEmail}</Text>
            <TouchableOpacity onPress={onPhonePress} activeOpacity={0.7}>
              <Text style={styles.prospectPhoneText}>{prospectPhone}</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Chat Shortcut Button */}
          <TouchableOpacity
            style={styles.chatButton}
            onPress={onChatPress}
            activeOpacity={0.75}
            accessibilityLabel={`Chat with ${prospectName}`}
          >
            <MessageBubbleIcon size={moderateScale(16)} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Assigned Agent & Unit Spec (2 Columns) */}
      <View style={styles.specsRow}>
        {/* Column 1: Assigned Agent */}
        <View style={styles.specBox}>
          <Text style={styles.specBoxLabel}>ASSIGNED AGENT</Text>
          <View style={styles.agentRow}>
            <View style={styles.agentAvatar}>
              <Text style={styles.agentAvatarText}>EV</Text>
            </View>
            <Text style={styles.agentNameText}>{assignedAgentName}</Text>
          </View>
        </View>

        {/* Column 2: Unit Spec */}
        <View style={styles.specBox}>
          <Text style={styles.specBoxLabel}>UNIT SPEC</Text>
          <Text style={styles.unitSpecsText}>{unitSpecs}</Text>
          <Text style={styles.squareFeetText}>{squareFeet}</Text>
        </View>
      </View>

      {/* Tour Notes Box */}
      <View style={styles.tourNotesBox}>
        <Text style={styles.specBoxLabel}>TOUR NOTES</Text>
        <Text style={styles.tourNotesText}>{tourNotes}</Text>
      </View>

      {/* Primary Action Button: Open Showing Pack */}
      <TouchableOpacity
        style={styles.openPackTouchable}
        onPress={onOpenPackPress}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Open Showing Pack"
      >
        <LinearGradient
          colors={gradients.button}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.openPackGradient}
        >
          <BriefcaseIcon size={moderateScale(16)} color={colors.white} />
          <Text style={styles.openPackButtonText}>Open Showing Pack</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Secondary Actions: Reschedule & Cancel Tour */}
      <View style={styles.secondaryActionsRow}>
        <TouchableOpacity
          style={styles.rescheduleButton}
          onPress={onReschedulePress}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Reschedule Tour"
        >
          <Text style={styles.rescheduleButtonText}>Reschedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onCancelTourPress}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Cancel Tour"
        >
          <Text style={styles.cancelButtonText}>Cancel Tour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginTop: moderateScale(16),
    marginBottom: moderateScale(24),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    ...shadows.sm,
  },
  dragHandle: {
    width: moderateScale(38),
    height: moderateScale(4),
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: moderateScale(12),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tourBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: moderateScale(9),
    paddingVertical: moderateScale(3.5),
    borderRadius: moderateScale(12),
  },
  tourDot: {
    width: moderateScale(5),
    height: moderateScale(5),
    borderRadius: moderateScale(2.5),
    backgroundColor: '#F59E0B',
    marginRight: moderateScale(5.5),
  },
  tourBadgeText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(10),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  topActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitTitleText: {
    fontFamily: typography.fontFamily.heading.regular,
    fontSize: scaleFont(20),
    lineHeight: scaleFont(26),
    color: '#0F172A',
    fontWeight: typography.fontWeight.regular,
    letterSpacing: -0.3,
    marginTop: moderateScale(10),
  },
  propertySubtitleText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(12),
    color: '#64748B',
    marginTop: moderateScale(2),
  },
  imageContainer: {
    height: moderateScale(165),
    borderRadius: moderateScale(14),
    overflow: 'hidden',
    marginTop: moderateScale(12),
    backgroundColor: '#1E293B',
    position: 'relative',
    justifyContent: 'space-between',
  },
  propertyImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  availabilityBadge: {
    alignSelf: 'flex-end',
    margin: moderateScale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(10),
    ...shadows.sm,
  },
  availabilityBadgeText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(10.5),
    color: '#1E293B',
    fontWeight: typography.fontWeight.medium,
  },
  imageScrim: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
  },
  imageOverlayText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(12.5),
    color: 'rgba(255, 255, 255, 0.9)',
  },
  imageOverlayPrice: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
  },
  scheduleBanner: {
    marginTop: moderateScale(12),
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIconSquare: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(8),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(11),
  },
  scheduleTextColumn: {
    flex: 1,
  },
  scheduleDateText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(13),
    color: '#1E293B',
    fontWeight: typography.fontWeight.bold,
  },
  scheduleTimeText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11.5),
    color: '#475569',
    marginTop: moderateScale(1.5),
  },
  bufferRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(2.5),
  },
  bufferText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(10.5),
    color: '#64748B',
    marginLeft: moderateScale(4),
  },
  prospectSection: {
    marginTop: moderateScale(14),
  },
  sectionLabel: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(10.5),
    color: '#64748B',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  prospectCard: {
    marginTop: moderateScale(6),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prospectAvatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(11),
  },
  prospectAvatarText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(13),
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  prospectInfoColumn: {
    flex: 1,
  },
  prospectNameText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(13.5),
    color: '#1E293B',
    fontWeight: typography.fontWeight.bold,
  },
  prospectEmailText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11),
    color: '#64748B',
    marginTop: moderateScale(1),
  },
  prospectPhoneText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(12.5),
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
    marginTop: moderateScale(2),
  },
  chatButton: {
    width: moderateScale(34),
    height: moderateScale(34),
    borderRadius: moderateScale(17),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  specsRow: {
    flexDirection: 'row',
    gap: moderateScale(10),
    marginTop: moderateScale(10),
  },
  specBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: moderateScale(12),
    padding: moderateScale(11),
    backgroundColor: colors.white,
  },
  specBoxLabel: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(9.5),
    color: '#64748B',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(6),
  },
  agentAvatar: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(11),
    backgroundColor: '#0B1D3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(6),
  },
  agentAvatarText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(8.5),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  agentNameText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(12),
    color: '#1E293B',
    fontWeight: typography.fontWeight.bold,
  },
  unitSpecsText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(12),
    color: '#1E293B',
    fontWeight: typography.fontWeight.bold,
    marginTop: moderateScale(4),
  },
  squareFeetText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(10.5),
    color: '#64748B',
    marginTop: moderateScale(1),
  },
  tourNotesBox: {
    marginTop: moderateScale(10),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: moderateScale(12),
    padding: moderateScale(11),
    backgroundColor: colors.white,
  },
  tourNotesText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11.5),
    lineHeight: scaleFont(16),
    color: '#475569',
    marginTop: moderateScale(4),
  },
  openPackTouchable: {
    height: moderateScale(44),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginTop: moderateScale(14),
    ...shadows.sm,
  },
  openPackGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openPackButtonText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(13.5),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    marginLeft: moderateScale(8),
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    gap: moderateScale(10),
    marginTop: moderateScale(10),
  },
  rescheduleButton: {
    flex: 1,
    height: moderateScale(42),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rescheduleButtonText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(13),
    color: '#1E293B',
    fontWeight: typography.fontWeight.semibold,
  },
  cancelButton: {
    flex: 1,
    height: moderateScale(42),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#FECDD3',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(13),
    color: '#EF4444',
    fontWeight: typography.fontWeight.semibold,
  },
});

export default ShowingTourCard;
