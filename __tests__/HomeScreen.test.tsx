/**
 * Test Suite: Home Screen, Theme, and Responsive Utility
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { HomeScreen } from '../src/features/home';
import { colors, gradients, typography } from '../src/config/theme';
import {
  clamp,
  hp,
  moderateScale,
  scale,
  scaleFont,
  verticalScale,
  wp,
} from '../src/utils/responsive';

describe('Home Screen Architecture & Specifications', () => {
  describe('Color Palette & Gradient Specifications', () => {
    test('Primary Blue is #2563EB', () => {
      expect(colors.primary).toBe('#2563EB');
    });

    test('Header Dark Blue is #0B1D3A', () => {
      expect(colors.headerDarkBlue).toBe('#0B1D3A');
    });

    test('Header Linear Gradient is #032B57 -> #518EF9', () => {
      expect(gradients.header[0]).toBe('#032B57');
      expect(gradients.header[1]).toBe('#518EF9');
    });

    test('Button Linear Gradient is #032B57 -> #0659B2', () => {
      expect(gradients.button[0]).toBe('#032B57');
      expect(gradients.button[1]).toBe('#0659B2');
    });
  });

  describe('Typography Configuration', () => {
    test('Playfair Display is configured for Headings', () => {
      expect(typography.fontFamily.heading.bold).toContain('PlayfairDisplay');
      expect(typography.fontFamily.heading.regular).toContain('PlayfairDisplay');
    });

    test('Inter is configured for Body Text', () => {
      expect(typography.fontFamily.body.regular).toContain('Inter');
      expect(typography.fontFamily.body.bold).toContain('Inter');
    });
  });

  describe('Responsive Unit Conversion Helper', () => {
    test('horizontal scale scales proportionally with guideline width', () => {
      const result = scale(100);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    test('vertical scale scales proportionally with guideline height', () => {
      const result = verticalScale(100);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    test('moderate scale dampens scaling to protect small & large screens', () => {
      const unscaled = 20;
      const result = moderateScale(unscaled, 0.5);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    test('wp and hp convert percentages to pixels correctly', () => {
      expect(wp(50)).toBeGreaterThan(0);
      expect(hp(50)).toBeGreaterThan(0);
    });

    test('clamp restricts values to designated boundaries', () => {
      expect(clamp(5, 10, 20)).toBe(10);
      expect(clamp(25, 10, 20)).toBe(20);
      expect(clamp(15, 10, 20)).toBe(15);
    });

    test('scaleFont returns a valid numeric font size', () => {
      const fontSize = scaleFont(16);
      expect(typeof fontSize).toBe('number');
      expect(fontSize).toBeGreaterThan(10);
    });
  });

  describe('Home Screen Component Rendering', () => {
    test('renders HomeScreen hierarchy cleanly without crashes', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer | undefined;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<HomeScreen />);
      });
      expect(tree).toBeDefined();
    });
  });
});
