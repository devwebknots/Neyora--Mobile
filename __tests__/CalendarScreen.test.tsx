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
});
