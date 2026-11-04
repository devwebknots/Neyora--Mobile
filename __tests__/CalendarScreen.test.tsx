/**
 * Test Suite: Calendar Screen Architecture & Visual Specification
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { CalendarScreen } from '../src/features/calendar';

describe('Calendar Screen Architecture & Specifications', () => {
  test('renders CalendarScreen hierarchy cleanly without crashes', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<CalendarScreen />);
    });
    expect(tree).toBeDefined();
  });

  test('contains core Calendar operational elements in Month view', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<CalendarScreen />);
    });
    const root = tree!.root;

    // Verify key titles and strings from Month view
    expect(root.findByProps({ children: 'Calendar' })).toBeDefined();
    expect(root.findByProps({ children: 'October' })).toBeDefined();
    expect(root.findByProps({ children: "Today's Capacity" })).toBeDefined();
    expect(root.findByProps({ children: 'Marcus Reed' })).toBeDefined();
    expect(root.findByProps({ children: 'Elena Vance' })).toBeDefined();
  });

  test('switches to Week view and renders weekly schedule timeline', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<CalendarScreen />);
    });
    const root = tree!.root;

    // Find the "Week view" tab touchable
    const weekButton = root.findByProps({ accessibilityLabel: 'Week view' });
    expect(weekButton).toBeDefined();

    await ReactTestRenderer.act(() => {
      weekButton.props.onPress();
    });

    // Verify Week view elements are now active
    expect(root.findByProps({ children: 'Oct 20–26, 2024' })).toBeDefined();
    expect(root.findByProps({ children: 'W43' })).toBeDefined();
    expect(root.findByProps({ children: 'Elevator Modernization (All-Day)' })).toBeDefined();
    expect(root.findByProps({ children: 'Unit 402 – Showing Tour' })).toBeDefined();
  });

  test('renders ShowingTourCard with unit 402 image source cleanly', async () => {
    const { ShowingTourCard } = require('../src/features/calendar/components/ShowingTourCard');
    let tree: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<ShowingTourCard />);
    });
    const root = tree!.root;
    const image = root.findByProps({ resizeMode: 'cover' });
    expect(image.props.source).toBeDefined();
    expect(root.findByProps({ children: 'Unit 402 – 2BR Luxury View' })).toBeDefined();
  });

  test('renders CalendarMonthCard with botanical header image and controls', async () => {
    const { CalendarMonthCard } = require('../src/features/calendar/components/CalendarMonthCard');
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const onPicker = jest.fn();
    const onDropdown = jest.fn();

    let tree: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <CalendarMonthCard
          onPrevMonth={onPrev}
          onNextMonth={onNext}
          onCalendarPickerPress={onPicker}
          onMonthDropdownPress={onDropdown}
        />
      );
    });
    const root = tree!.root;

    // Verify header image exists
    const headerImage = root.findByProps({ resizeMode: 'cover' });
    expect(headerImage.props.source).toBeDefined();

    // Verify accessible and interactive controls
    const monthDropdown = root.findByProps({ accessibilityLabel: 'Select Month, October' });
    const prevButton = root.findByProps({ accessibilityLabel: 'Previous Month' });
    const nextButton = root.findByProps({ accessibilityLabel: 'Next Month' });
    const pickerButton = root.findByProps({ accessibilityLabel: 'Calendar Picker' });

    expect(monthDropdown).toBeDefined();
    expect(prevButton).toBeDefined();
    expect(nextButton).toBeDefined();
    expect(pickerButton).toBeDefined();

    monthDropdown.props.onPress();
    prevButton.props.onPress();
    nextButton.props.onPress();
    pickerButton.props.onPress();

    expect(onDropdown).toHaveBeenCalledTimes(1);
    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPicker).toHaveBeenCalledTimes(1);
  });

  test('switches to Day view and renders Day navigation bar, alert banner, and ShowingTourCard', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<CalendarScreen />);
    });
    const root = tree!.root;

    // Find the "Day view" tab touchable
    const dayButton = root.findByProps({ accessibilityLabel: 'Day view' });
    expect(dayButton).toBeDefined();

    await ReactTestRenderer.act(() => {
      dayButton.props.onPress();
    });

    // Verify Day view elements
    expect(root.findByProps({ children: 'Wednesday, Oct 23' })).toBeDefined();
    expect(root.findByProps({ children: 'Today' })).toBeDefined();
    expect(root.findByProps({ children: 'Elevator Modernization (All-Day)' })).toBeDefined();
    expect(root.findByProps({ children: 'Day 1 of 2' })).toBeDefined();
    expect(root.findByProps({ children: 'Unit 402 – 2BR Luxury View' })).toBeDefined();
    expect(root.findByProps({ children: 'Marcus Reed' })).toBeDefined();
    expect(root.findByProps({ children: 'Elena Vance' })).toBeDefined();
    expect(root.findByProps({ children: 'Open Showing Pack' })).toBeDefined();
  });
});
