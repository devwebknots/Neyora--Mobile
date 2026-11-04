/**
 * Calendar Screen Implementation
 * Operational view for property showings, tenant inspections, and calendar capacity.
 * Dynamically switches between Month grid and Week timeline format based on segmented switcher.
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
import { navigate } from '@/navigation/navigationRef';
import { colors } from '@/config/theme';
import { moderateScale } from '@/utils/responsive';
import {
  CalendarActionHeader,
  CalendarDayView,
  CalendarMonthCard,
  CalendarTopBar,
  CalendarViewMode,
  CalendarWeekView,
  ShowingTourCard,
  TodayCapacityCard,
} from '../components';
import { BottomNavBar, BottomNavTab } from '@/features/home/components/BottomNavBar';

export interface CalendarScreenProps {
  navigation?: any;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation: propNavigation }) => {
  const [activeTab, setActiveTab] = useState<BottomNavTab>('calendar');
  const [viewMode, setViewMode] = useState<CalendarViewMode>('Month');
  const [selectedDay, setSelectedDay] = useState<number>(23);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleAction = (title: string, message?: string) => {
    Alert.alert(title, message ?? 'Action triggered from Calendar Screen');
  };

  const handleNavigate = (route: 'Home' | 'Calendar') => {
    if (propNavigation?.navigate) {
      propNavigation.navigate(route);
    } else {
      navigate(route as any);
    }
  };

  const handleBottomTabSelect = (tab: BottomNavTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      handleNavigate('Home');
    } else if (tab === 'calendar') {
      // Already on calendar screen
    } else {
      handleAction(tab.toUpperCase(), `Navigating to ${tab} operational channel.`);
    }
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

      {/* Top Application Bar with Dark Navy Palette */}
      <CalendarTopBar
        propertyName="Skyline Properties"
        subtitle="Calendar Operations"
        notificationCount={3}
        onSearchPress={() => handleAction('Search', 'Search showings, units, or prospects.')}
        onNotificationPress={() => handleAction('Notifications', '3 unread operational alerts.')}
        onProfilePress={() => handleAction('Profile', 'Elena Vance (EV) - Operational Agent')}
        onPropertyPress={() => handleAction('Properties', 'Select active property portfolio.')}
      />

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
        {/* 1. Action Header: Title, ICS & EVENT buttons, Segmented switcher */}
        <CalendarActionHeader
          categoryLabel="PROPERTY SHOWINGS & TENANT INSPECTIONS"
          title="Calendar"
          viewMode={viewMode}
          onChangeViewMode={(mode) => setViewMode(mode)}
          onIcsPress={() => handleAction('ICS Calendar', 'Calendar feed exported in iCalendar format.')}
          onEventPress={() => handleAction('New Event', 'Create new showing or tenant inspection.')}
        />

        {/* 2. Middle Calendar Section (Toggled by viewMode: Month vs Week vs Day) */}
        {viewMode === 'Day' ? (
          <CalendarDayView
            dayText="Wednesday, Oct 23"
            onPrevDay={() => handleAction('Previous Day', 'Navigating to Tuesday, Oct 22, 2024.')}
            onNextDay={() => handleAction('Next Day', 'Navigating to Thursday, Oct 24, 2024.')}
            onTodayPress={() => handleAction('Today', 'Resetting to today: Wednesday, Oct 23, 2024.')}
            onAlertPress={() => handleAction('Elevator Maintenance', 'West Tower Service Lifts Modernization in progress.')}
            unitTitle="Unit 402 – 2BR Luxury View"
            propertySubtitle="The Mercer Residences • West End Tower"
            pricePerMonth="$4,200/mo"
            availabilityDate="Available Nov 1"
            dateText="Wednesday, Oct 23, 2024"
            timeRangeText="10:00 AM – 10:45 AM (45 mins)"
            bufferText="15 min travel buffer enforced"
            prospectName="Marcus Reed"
            prospectEmail="marcus.reed@example.com"
            prospectPhone="+1 555-019-2834"
            assignedAgentName="Elena Vance"
            unitSpecs="2 Bed • 2 Bath"
            squareFeet="1,180 Sq Ft"
            tourNotes="Prospect requested key focus on balcony acoustics, parking bay access, and fiber optic pre-wiring."
            onEditPress={() => handleAction('Edit Tour', 'Editing Unit 402 tour parameters.')}
            onMorePress={() => handleAction('More Actions', 'Tour options: Reassign, Duplicate, Archive.')}
            onClosePress={() => handleAction('Close Tour', 'Dismissing active showing detail.')}
            onPhonePress={() => handleAction('Call Prospect', 'Dialing Marcus Reed (+1 555-019-2834)')}
            onChatPress={() => handleAction('Chat Prospect', 'Opening SMS channel with Marcus Reed.')}
            onOpenPackPress={() => handleAction('Showing Pack', 'Opening Unit 402 Digital Showing Pack.')}
            onReschedulePress={() => handleAction('Reschedule', 'Opening showing reschedule dispatcher.')}
            onCancelTourPress={() => handleAction('Cancel Tour', 'Confirmation: Are you sure you want to cancel this tour?')}
          />
        ) : viewMode === 'Week' ? (
          <>
            <CalendarWeekView
              dateRangeText="Oct 20–26, 2024"
              weekBadgeText="W43"
              filterCount={2}
              selectedDay={selectedDay}
              onSelectDay={(day) => setSelectedDay(day)}
              onPrevWeek={() => handleAction('Previous Week', 'Navigating to Oct 13–19, 2024.')}
              onNextWeek={() => handleAction('Next Week', 'Navigating to Oct 27–Nov 2, 2024.')}
              onFilterPress={() => handleAction('Filters', '2 active showing filters applied.')}
              onEventPress={(eventId) => handleAction('Event Selected', `Opening event: ${eventId}`)}
              onAlertPress={() => handleAction('Elevator Maintenance', 'West Tower Service Lifts Modernization in progress.')}
            />
            <ShowingTourCard
              unitTitle="Unit 402 – 2BR Luxury View"
              propertySubtitle="The Mercer Residences • West End Tower"
              pricePerMonth="$4,200/mo"
              availabilityDate="Available Nov 1"
              dateText="Wednesday, Oct 23, 2024"
              timeRangeText="10:00 AM – 10:45 AM (45 mins)"
              bufferText="15 min travel buffer enforced"
              prospectName="Marcus Reed"
              prospectEmail="marcus.reed@example.com"
              prospectPhone="+1 555-019-2834"
              assignedAgentName="Elena Vance"
              unitSpecs="2 Bed • 2 Bath"
              squareFeet="1,180 Sq Ft"
              tourNotes="Prospect requested key focus on balcony acoustics, parking bay access, and fiber optic pre-wiring."
              onEditPress={() => handleAction('Edit Tour', 'Editing Unit 402 tour parameters.')}
              onMorePress={() => handleAction('More Actions', 'Tour options: Reassign, Duplicate, Archive.')}
              onClosePress={() => handleAction('Close Tour', 'Dismissing active showing detail.')}
              onPhonePress={() => handleAction('Call Prospect', 'Dialing Marcus Reed (+1 555-019-2834)')}
              onChatPress={() => handleAction('Chat Prospect', 'Opening SMS channel with Marcus Reed.')}
              onOpenPackPress={() => handleAction('Showing Pack', 'Opening Unit 402 Digital Showing Pack.')}
              onReschedulePress={() => handleAction('Reschedule', 'Opening showing reschedule dispatcher.')}
              onCancelTourPress={() => handleAction('Cancel Tour', 'Confirmation: Are you sure you want to cancel this tour?')}
            />
          </>
        ) : (
          <>
            {/* Interactive Month Grid Card (October 2026) */}
            <CalendarMonthCard
              selectedDay={selectedDay}
              onSelectDay={(day) => setSelectedDay(day)}
              onMonthDropdownPress={() => handleAction('Month Selector', 'Select month/year to inspect.')}
              onPrevMonth={() => handleAction('Previous Month', 'Navigating to September 2026.')}
              onNextMonth={() => handleAction('Next Month', 'Navigating to November 2026.')}
              onCalendarPickerPress={() => handleAction('Date Picker', 'Open system date range picker.')}
              onUpcomingPress={() => handleAction('Upcoming Event', 'Navigating to Unit 402 inspection details.')}
            />

            {/* Today's Capacity Card */}
            <TodayCapacityCard
              bookedPercent={82}
              filledSlots={7}
              totalSlots={9}
              leftCount={3}
              syncTimeText="Synced with Google & Outlook 4 mins ago"
            />

            {/* 3. Showing Tour Details Sheet (Unit 402 – 2BR Luxury View) */}
            <ShowingTourCard
              unitTitle="Unit 402 – 2BR Luxury View"
              propertySubtitle="The Mercer Residences • West End Tower"
              pricePerMonth="$4,200/mo"
              availabilityDate="Available Nov 1"
              dateText="Wednesday, Oct 23, 2024"
              timeRangeText="10:00 AM – 10:45 AM (45 mins)"
              bufferText="15 min travel buffer enforced"
              prospectName="Marcus Reed"
              prospectEmail="marcus.reed@example.com"
              prospectPhone="+1 555-019-2834"
              assignedAgentName="Elena Vance"
              unitSpecs="2 Bed • 2 Bath"
              squareFeet="1,180 Sq Ft"
              tourNotes="Prospect requested key focus on balcony acoustics, parking bay access, and fiber optic pre-wiring."
              onEditPress={() => handleAction('Edit Tour', 'Editing Unit 402 tour parameters.')}
              onMorePress={() => handleAction('More Actions', 'Tour options: Reassign, Duplicate, Archive.')}
              onClosePress={() => handleAction('Close Tour', 'Dismissing active showing detail.')}
              onPhonePress={() => handleAction('Call Prospect', 'Dialing Marcus Reed (+1 555-019-2834)')}
              onChatPress={() => handleAction('Chat Prospect', 'Opening SMS channel with Marcus Reed.')}
              onOpenPackPress={() => handleAction('Showing Pack', 'Opening Unit 402 Digital Showing Pack.')}
              onReschedulePress={() => handleAction('Reschedule', 'Opening showing reschedule dispatcher.')}
              onCancelTourPress={() => handleAction('Cancel Tour', 'Confirmation: Are you sure you want to cancel this tour?')}
            />
          </>
        )}
      </ScrollView>

      {/* 4. Persistent Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        variant="calendar"
        onSelectTab={handleBottomTabSelect}
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
    paddingBottom: moderateScale(28),
  },
});

export default CalendarScreen;
