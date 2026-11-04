/**
 * Test Suite: Splash Screen, Ambient Motion Background, and Logo Badge
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {
  AmbientBackground,
  LogoBadge,
  SplashScreen,
  splashBgAsset,
  splashMonogramAsset,
  splashSparkleAsset,
} from '../src/features/splash';

describe('Splash Screen Feature Suite', () => {
  describe('Assets Integrity', () => {
    test('splashBgAsset is defined and required correctly', () => {
      expect(splashBgAsset).toBeDefined();
    });

    test('splashMonogramAsset is defined and required correctly', () => {
      expect(splashMonogramAsset).toBeDefined();
    });

    test('splashSparkleAsset is defined and required correctly', () => {
      expect(splashSparkleAsset).toBeDefined();
    });
  });

  describe('AmbientBackground Component', () => {
    test('renders AmbientBackground without crashes', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer | undefined;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<AmbientBackground testID="ambient-bg" />);
      });
      expect(tree).toBeDefined();
      const root = tree!.root;
      expect(root.findByProps({ testID: 'ambient-bg' })).toBeDefined();
    });
  });

  describe('LogoBadge Component', () => {
    test('renders LogoBadge with squircle, monogram and sparkle glint', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer | undefined;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<LogoBadge testID="logo-badge" />);
      });
      expect(tree).toBeDefined();
      const root = tree!.root;
      expect(root.findByProps({ testID: 'logo-badge' })).toBeDefined();
      expect(root.findByProps({ testID: 'logo-monogram' })).toBeDefined();
      expect(root.findByProps({ testID: 'logo-sparkle' })).toBeDefined();
    });

    test('accepts custom size parameter', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer | undefined;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<LogoBadge size={160} testID="custom-size-badge" />);
      });
      expect(tree).toBeDefined();
      const root = tree!.root;
      expect(root.findByProps({ testID: 'custom-size-badge' })).toBeDefined();
    });
  });

  describe('SplashScreen Screen Component', () => {
    test('renders SplashScreen with brand wordmark and tagline', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer | undefined;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<SplashScreen testID="splash-screen" />);
      });
      expect(tree).toBeDefined();
      const root = tree!.root;

      // Check title 'Neyora'
      const titleElem = root.findByProps({ testID: 'splash-title' });
      expect(titleElem.props.children).toBe('Neyora');

      // Check tagline 'Mange your time ,effortlessly'
      const taglineElem = root.findByProps({ testID: 'splash-tagline' });
      expect(taglineElem.props.children).toBe('Mange your time ,effortlessly');

      // Check subcomponents
      expect(root.findByProps({ testID: 'splash-ambient-bg' })).toBeDefined();
      expect(root.findByProps({ testID: 'splash-logo-badge' })).toBeDefined();
    });

    test('keeps screen without navigating when enableTapToSkip is false', async () => {
      const mockReplace = jest.fn();
      let tree: ReactTestRenderer.ReactTestRenderer | undefined;

      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(
          <SplashScreen
            navigation={{ replace: mockReplace }}
            enableTapToSkip={false}
            autoNavigate={false}
            testID="splash-screen-static"
          />
        );
      });

      const touchable = tree!.root.findByProps({ testID: 'splash-screen-static-touchable' });
      await ReactTestRenderer.act(() => {
        touchable.props.onPress();
      });

      // Does not navigate when disabled for testing
      expect(mockReplace).not.toHaveBeenCalled();
    });

    test('tapping on splash screen triggers navigation when enableTapToSkip is true', async () => {
      const mockReplace = jest.fn();
      let tree: ReactTestRenderer.ReactTestRenderer | undefined;

      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(
          <SplashScreen
            navigation={{ replace: mockReplace }}
            enableTapToSkip={true}
            testID="splash-screen-press"
          />
        );
      });

      const touchable = tree!.root.findByProps({ testID: 'splash-screen-press-touchable' });
      await ReactTestRenderer.act(() => {
        touchable.props.onPress();
      });

      expect(mockReplace).toHaveBeenCalledWith('Home');
    });

    test('invokes onFinish callback when provided on tap', async () => {
      const mockOnFinish = jest.fn();
      let tree: ReactTestRenderer.ReactTestRenderer | undefined;

      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(
          <SplashScreen
            onFinish={mockOnFinish}
            enableTapToSkip={true}
            testID="splash-screen-finish"
          />
        );
      });

      const touchable = tree!.root.findByProps({ testID: 'splash-screen-finish-touchable' });
      await ReactTestRenderer.act(() => {
        touchable.props.onPress();
      });

      expect(mockOnFinish).toHaveBeenCalledTimes(1);
    });
  });
});
