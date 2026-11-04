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

  test('contains core Calendar operational elements', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer | undefined;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<CalendarScreen />);
    });
    const root = tree!.root;

    // Verify key titles and strings from the visual design specification
    expect(root.findByProps({ children: 'Calendar' })).toBeDefined();
    expect(root.findByProps({ children: 'October' })).toBeDefined();
    expect(root.findByProps({ children: "Today's Capacity" })).toBeDefined();
    expect(root.findByProps({ children: 'Marcus Reed' })).toBeDefined();
    expect(root.findByProps({ children: 'Elena Vance' })).toBeDefined();
  });
});
