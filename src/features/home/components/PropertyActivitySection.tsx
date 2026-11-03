/**
 * Property Activity Section Component
 * Displays real estate portfolio status, property occupancy,
 * featured unit preview with live badge overlays, and next showing banner.
 */

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, shadows, typography } from '@/config/theme';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
} from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export interface PropertyActivitySectionProps {
  propertyName?: string;
  occupancyRate?: string;
  location?: string;
  unitCode?: string;
  pricePerMonth?: string;
  availabilityDate?: string;
  nextShowingText?: string;
  onViewActivity?: () => void;
  onSeeMore?: () => void;
  onManageShowing?: () => void;
}

export const PropertyActivitySection: React.FC<PropertyActivitySectionProps> = ({
  propertyName = 'The Mercer Residences',
  occupancyRate = 'Occupied 94%',
  location = 'West End Tower • Central Hub',
  unitCode = 'Unit 402',
  pricePerMonth = '$4,200/mo',
  availabilityDate = 'Available Nov 1',
  nextShowingText = 'Next: Unit 402 showing tomorrow at 10:00',
  onViewActivity,
  onSeeMore,
  onManageShowing,
}) => {
  return (
    <View style={styles.sectionContainer}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Property Activity</Text>
        <TouchableOpacity
          style={styles.viewActivityRow}
          onPress={onViewActivity}
          activeOpacity={0.7}
        >
          <Text style={styles.viewActivityLink}>View Activity</Text>
          <ChevronRightIcon size={moderateScale(14)} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Main Property Card */}
      <View style={styles.card}>
        {/* Title & Occupancy Pill */}
        <View style={styles.cardHeaderRow}>
          <Text style={styles.propertyName}>{propertyName}</Text>
          <View style={styles.occupancyBadge}>
            <View style={styles.occupancyDot} />
            <Text style={styles.occupancyText}>{occupancyRate}</Text>
          </View>
        </View>

        {/* Location Pin & Tower Subtitle */}
        <View style={styles.locationRow}>
          <MapPinIcon size={moderateScale(13)} color="#64748B" />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        {/* Property Feature Image with Scrim and Overlays */}
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/mercer_townhouses.jpg')}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />

          {/* Top Right Availability Pill Badge */}
          <View style={styles.availabilityBadge}>
            <Text style={styles.availabilityBadgeText}>{availabilityDate}</Text>
          </View>

          {/* Dark Linear Gradient Scrim for crisp text readability */}
          <LinearGradient
            colors={gradients.imageDarkOverlay}
            style={styles.imageScrim}
          >
            <View style={styles.imageOverlayRow}>
              {/* Unit Details & Pricing */}
              <View>
                <Text style={styles.unitOverlayText}>{unitCode} •</Text>
                <Text style={styles.priceOverlayText}>{pricePerMonth}</Text>
              </View>

              {/* Luxury Category */}
              <View style={styles.luxuryCategoryColumn}>
                <Text style={styles.luxuryCategoryText}>Luxury</Text>
                <Text style={styles.luxuryCategoryText}>Penthouse</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* See More Expand Toggle */}
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={onSeeMore}
          activeOpacity={0.7}
        >
          <Text style={styles.seeMoreText}>See more</Text>
          <ChevronDownIcon size={moderateScale(14)} color="#0F172A" strokeWidth={2.2} />
        </TouchableOpacity>

        {/* Next Showing Strip */}
        <LinearGradient
          colors={['#032B57', '#2563EB']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.showingBanner}
        >
          <View style={styles.showingIconCircle}>
            <ClockIcon size={moderateScale(15)} color={colors.white} />
          </View>

          <Text style={styles.showingText} numberOfLines={1}>
            {nextShowingText}
          </Text>

          <TouchableOpacity
            style={styles.manageButton}
            onPress={onManageShowing}
            activeOpacity={0.85}
          >
            <Text style={styles.manageButtonText}>Manage</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: moderateScale(18),
    marginTop: moderateScale(22),
    marginBottom: moderateScale(24),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(12),
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(18),
    color: '#0F172A',
    fontWeight: typography.fontWeight.bold,
  },
  viewActivityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewActivityLink: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(13),
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    marginRight: moderateScale(3),
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
  propertyName: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(16.5),
    color: '#0F172A',
    fontWeight: typography.fontWeight.bold,
  },
  occupancyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(12),
  },
  occupancyDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#16A34A',
    marginRight: moderateScale(5),
  },
  occupancyText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(11.5),
    color: '#15803D',
    fontWeight: typography.fontWeight.semibold,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(4),
  },
  locationText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(12),
    color: '#64748B',
    marginLeft: moderateScale(4),
  },
  imageContainer: {
    height: moderateScale(146),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    marginTop: moderateScale(12),
    backgroundColor: '#1E293B',
    justifyContent: 'space-between',
    position: 'relative',
  },
  availabilityBadge: {
    alignSelf: 'flex-end',
    margin: moderateScale(10),
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(9),
    paddingVertical: moderateScale(3.5),
    borderRadius: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  availabilityBadgeText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(10.5),
    color: '#0F172A',
    fontWeight: typography.fontWeight.semibold,
  },
  imageScrim: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
  },
  imageOverlayRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  unitOverlayText: {
    fontFamily: typography.fontFamily.body.regular,
    fontSize: scaleFont(11.5),
    color: colors.white,
  },
  priceOverlayText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(15.5),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  luxuryCategoryColumn: {
    alignItems: 'flex-end',
  },
  luxuryCategoryText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(11),
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(10),
  },
  seeMoreText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(12.5),
    color: '#0F172A',
    fontWeight: typography.fontWeight.semibold,
    marginRight: moderateScale(5),
  },
  showingBanner: {
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  showingIconCircle: {
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(8),
  },
  showingText: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(11.5),
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
    flex: 1,
    marginRight: moderateScale(8),
  },
  manageButton: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(13),
    paddingVertical: moderateScale(6.5),
    borderRadius: moderateScale(8),
  },
  manageButtonText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(12),
    color: '#0F172A',
    fontWeight: typography.fontWeight.bold,
  },
});

export default PropertyActivitySection;
