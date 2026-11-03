/**
 * Home Screen Implementation
 * Primary operational dashboard for Neyora Command Center.
 * Faithful recreation of the reference design specification.
 */

import React, { useState } from 'react';
import {
  Alert,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { colors } from '@/config/theme';
import {
  AlertBanner,
  AttentionSection,
  BottomNavBar,
  BottomNavTab,
  HeaderSection,
  PropertyActivitySection,
  QuickActionBar,
  ScheduleSection,
} from '../components';

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BottomNavTab>('home');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  const handleAction = (title: string, message?: string) => {
    Alert.alert(title, message ?? 'Action triggered from Home Screen');
  };

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      (StatusBar as any).setBackgroundColor?.('transparent');
      (StatusBar as any).setTranslucent?.(true);
    }
  }, []);

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* 1. Header with Gradient and Greeting */}
        <HeaderSection
          userName="Alex"
          dateText="Wednesday, October 23, 2024"
          notificationCount={3}
          onNotificationPress={() => handleAction('Notifications', '3 unread operational alerts.')}
          onProfilePress={() => handleAction('Profile', 'Alex (Commander)')}
          onShieldPress={() => handleAction('Security Operations', 'All security protocols are active.')}
        />

        {/* 2. Floating Alert Banner */}
        <AlertBanner
          title="Elevator Modernization"
          badgeText="Day 1 of 2"
          subtitle="West Tower Service Lifts • 3 actions required"
          onPress={() => handleAction('Elevator Maintenance', 'West Tower Service Lifts Modernization in progress.')}
          onToggleExpand={() => handleAction('Maintenance Details', 'Action items: Safety inspection, Cable testing, Motor calibration.')}
        />

        {/* 3. Quick Action Bar */}
        <QuickActionBar
          onNewEventPress={() => handleAction('New Event', 'Create operational event or booking.')}
          onSchedulePress={() => handleAction('Schedule', 'View operational schedule.')}
          onAvailabilityPress={() => handleAction('Avaliability', 'Check unit and team availability.')}
          onShareLinkPress={() => handleAction('Share Link', 'Operational dispatch link copied.')}
        />

        {/* 4. Needs Your Attention Section */}
        <AttentionSection
          itemCount={3}
          onViewAll={() => handleAction('Attention Items', 'Opening all 3 pending requests.')}
          onReview={(_id) => handleAction('Review Inquiry', `Reviewing inquiry for Sarah Johnson (Unit 402, ID: ${_id})`)}
          onConfirm={(_id) => handleAction('Confirmed', `Inquiry for Unit 402 (ID: ${_id}) confirmed successfully.`)}
          onToggleUnfold={() => handleAction('Unfold Items', 'Revealing 2 additional pending operational tasks.')}
        />

        {/* 5. Today's Schedule Section */}
        <ScheduleSection
          eventsCount={3}
          onViewCalendar={() => handleAction('Calendar', 'Navigating to full operational calendar.')}
          onEventPress={(_id) => handleAction('Event Selected', `Opening details for event #${_id}`)}
          onMessagesFabPress={() => handleAction('Messages', 'Opening instant communication channel.')}
        />

        {/* 6. Property Activity Section */}
        <PropertyActivitySection
          propertyName="The Mercer Residences"
          occupancyRate="Occupied 94%"
          location="West End Tower • Central Hub"
          unitCode="Unit 402"
          pricePerMonth="$4,200/mo"
          availabilityDate="Available Nov 1"
          nextShowingText="Next: Unit 402 showing tomorrow at 10:00"
          onViewActivity={() => handleAction('Property Activity', 'Showing historical activity logs for The Mercer.')}
          onSeeMore={() => handleAction('See More', 'Expanded details for The Mercer Residences.')}
          onManageShowing={() => handleAction('Manage Showing', 'Unit 402 showing manager opened.')}
        />
      </ScrollView>

      {/* 7. Persistent Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});

export default HomeScreen;
