/**
 * Bottom Navigation Bar Component
 * Recreates the exact persistent navigation bar with HOME (active),
 * CALENDAR (with orange status dot), BOOKINGS (badge count 4),
 * and MESSAGES (badge count 2).
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography } from '@/config/theme';
import {
  BookmarkIcon,
  CalendarIcon,
  ChatTabIcon,
  HomeIcon,
} from '@/components/icons';
import { moderateScale, scaleFont } from '@/utils/responsive';

export type BottomNavTab = 'home' | 'calendar' | 'bookings' | 'messages';

export interface BottomNavBarProps {
  activeTab?: BottomNavTab;
  onSelectTab?: (tab: BottomNavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab = 'home',
  onSelectTab,
}) => {
  const insets = useSafeAreaInsets();
  const inactiveColor = colors.textMuted; // #94A3B8 - softer visual weight

  return (
    <View
      style={[
        styles.navContainer,
        { paddingBottom: Math.max(insets.bottom, moderateScale(10)) },
      ]}
    >
      {/* 1. HOME (Active) */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onSelectTab?.('home')}
        activeOpacity={0.7}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'home' }}
        accessibilityLabel="Home Tab"
      >
        <View style={styles.iconContainer}>
          <HomeIcon
            size={moderateScale(22)}
            color={activeTab === 'home' ? colors.primary : inactiveColor}
          />
        </View>
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'home' ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}
        >
          HOME
        </Text>
      </TouchableOpacity>

      {/* 2. CALENDAR (with orange dot) */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onSelectTab?.('calendar')}
        activeOpacity={0.7}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'calendar' }}
        accessibilityLabel="Calendar Tab"
      >
        <View style={styles.iconContainer}>
          <CalendarIcon
            size={moderateScale(22)}
            color={activeTab === 'calendar' ? colors.primary : inactiveColor}
          />
        </View>
        <View style={styles.labelWithDotWrapper}>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'calendar' ? styles.tabLabelActive : styles.tabLabelInactive,
            ]}
          >
            CALENDAR
          </Text>
          <View style={styles.calendarDot} />
        </View>
      </TouchableOpacity>

      {/* 3. BOOKINGS (with badge count 4) */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onSelectTab?.('bookings')}
        activeOpacity={0.7}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'bookings' }}
        accessibilityLabel="Bookings Tab, 4 notifications"
      >
        <View style={styles.iconContainer}>
          <BookmarkIcon
            size={moderateScale(22)}
            color={activeTab === 'bookings' ? colors.primary : inactiveColor}
          />
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>4</Text>
          </View>
        </View>
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'bookings' ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}
        >
          BOOKINGS
        </Text>
      </TouchableOpacity>

      {/* 4. MESSAGES (with badge count 2) */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onSelectTab?.('messages')}
        activeOpacity={0.7}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'messages' }}
        accessibilityLabel="Messages Tab, 2 notifications"
      >
        <View style={styles.iconContainer}>
          <ChatTabIcon
            size={moderateScale(22)}
            color={activeTab === 'messages' ? colors.primary : inactiveColor}
          />
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>2</Text>
          </View>
        </View>
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'messages' ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}
        >
          MESSAGES
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.7)',
    paddingTop: moderateScale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    height: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  labelWithDotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabLabel: {
    fontFamily: typography.fontFamily.body.medium,
    fontSize: scaleFont(9.5),
    fontWeight: typography.fontWeight.medium,
    marginTop: moderateScale(4),
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.primary,
    fontFamily: typography.fontFamily.body.semiBold,
    fontWeight: typography.fontWeight.semibold,
  },
  tabLabelInactive: {
    color: '#94A3B8',
  },
  calendarDot: {
    position: 'absolute',
    bottom: -moderateScale(7),
    width: moderateScale(4.5),
    height: moderateScale(4.5),
    borderRadius: moderateScale(2.25),
    backgroundColor: '#F59E0B',
  },
  tabBadge: {
    position: 'absolute',
    top: -moderateScale(5),
    right: -moderateScale(8),
    backgroundColor: '#EF4444',
    width: moderateScale(15),
    height: moderateScale(15),
    borderRadius: moderateScale(7.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  tabBadgeText: {
    fontFamily: typography.fontFamily.body.semiBold,
    fontSize: scaleFont(8.5),
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default BottomNavBar;
