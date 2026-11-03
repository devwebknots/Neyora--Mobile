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
        <HomeIcon
          size={moderateScale(22)}
          color={activeTab === 'home' ? colors.primary : colors.textSecondary}
        />
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
        <CalendarIcon
          size={moderateScale(22)}
          color={activeTab === 'calendar' ? colors.primary : colors.textSecondary}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'calendar' ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}
        >
          CALENDAR
        </Text>
        <View style={styles.calendarDot} />
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
        <View style={styles.iconWithBadgeWrapper}>
          <BookmarkIcon
            size={moderateScale(22)}
            color={activeTab === 'bookings' ? colors.primary : colors.textSecondary}
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
        <View style={styles.iconWithBadgeWrapper}>
          <ChatTabIcon
            size={moderateScale(22)}
            color={activeTab === 'messages' ? colors.primary : colors.textSecondary}
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
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: moderateScale(9),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(10),
    fontWeight: typography.fontWeight.bold,
    marginTop: moderateScale(4),
    letterSpacing: 0.4,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  tabLabelInactive: {
    color: '#64748B',
  },
  calendarDot: {
    width: moderateScale(5),
    height: moderateScale(5),
    borderRadius: moderateScale(2.5),
    backgroundColor: '#F59E0B',
    marginTop: moderateScale(3),
  },
  iconWithBadgeWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadge: {
    position: 'absolute',
    top: -moderateScale(5),
    right: -moderateScale(8),
    backgroundColor: '#EF4444',
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  tabBadgeText: {
    fontFamily: typography.fontFamily.body.bold,
    fontSize: scaleFont(9),
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
});

export default BottomNavBar;
