# ANTIGRAVITY CONTEXT & DESIGN SYSTEM SOURCE OF TRUTH

> **Note for Future AI Sessions**: This document is the single source of truth for the Neyora application architecture, design system, and implemented screens. Whenever a new screen design is requested, **always read this document first**, reuse established components and styles, and update this file with newly added screens.

---

## A. Project Overview

- **Application Purpose**: **Neyora** is an ultra-modern, high-end real estate operations and property management command center. It empowers portfolio directors, dispatchers, and agents to coordinate unit maintenance, property viewings, tenant inspections, calendar capacity, and real-time showing tours.
- **Technology Stack**:
  - **Framework**: React Native `0.88.1` (Fabric/New Architecture compatible)
  - **Runtime**: React `19.3.0`
  - **Language**: TypeScript `6.x`
  - **Navigation**: React Navigation `v6` (`@react-navigation/native`, `@react-navigation/native-stack`)
  - **State Management**: Redux Toolkit `^2.2.0` (`@reduxjs/toolkit`, `react-redux`)
  - **Safe Area Management**: `react-native-safe-area-context`
  - **Testing**: Jest `29.x`, `react-test-renderer`
- **Key Project Structure**:
  ```
  neyora/
  ├── src/
  │   ├── app/                    # Application composition & providers
  │   ├── assets/
  │   │   ├── fonts/              # Inter & Playfair Display TTF font assets
  │   │   ├── icons/              # Test icons / local pngs
  │   │   └── images/             # Property photos (e.g. mercer_residence.png)
  │   ├── components/             # Global reusable UI primitives (Button, Card, LinearGradient, Icons)
  │   ├── config/                 # theme.ts (Design system colors, typography, spacing, shadows)
  │   ├── features/               # Feature-based modular domains
  │   │   ├── auth/               # Authentication screens & state
  │   │   ├── home/               # Home operational dashboard & section components
  │   │   └── calendar/           # Calendar, month view, capacity & showing sheets
  │   ├── navigation/             # RootNavigator.tsx, navigationRef.ts, types.ts
  │   ├── store/                  # Redux root reducer and typed hooks
  │   ├── types/                  # Global TypeScript type definitions
  │   └── utils/                  # responsive.ts, formatters.ts, validators.ts
  └── __tests__/                  # Unit and integration test suites
  ```

---

## B. Design System Specifications

### 1. Color Palette & Hex Codes
Defined in `src/config/theme.ts`:

| Token | Hex Value | Purpose / Usage |
| :--- | :--- | :--- |
| `primary` | `#2563EB` | Primary brand accent blue, selected day circles, active tabs, action links |
| `headerDarkBlue` | `#0B1D3A` | Dark navy top navigation header background, agent avatar circle |
| `headerGradientStart` | `#032B57` | Deep navy start color for linear gradients |
| `headerGradientEnd` | `#518EF9` | Vibrant periwinkle end color for header gradient |
| `buttonGradientStart` | `#03264C` | Start gradient for high-priority CTA buttons |
| `buttonGradientEnd` | `#0659B2` | End gradient for high-priority CTA buttons |
| `secondary` | `#64748B` | Slate gray for secondary subtitles, icons, meta details |
| `accent` / `warning` | `#F59E0B` | Amber/orange for calendar status dots, inspections segment |
| `warningLight` | `#FEF3C7` | Light yellow/gold background for `"82% BOOKED"` badge & awaiting tags |
| `warningDark` | `#B45309` | Text color inside warning/booked badges |
| `success` | `#10B981` | Green status indicators, live operational dot |
| `successDark` | `#15803D` / `#16A34A` | Occupancy text, `"3 Left"` capacity counter |
| `successLight` | `#DCFCE7` | Occupancy badge background |
| `error` | `#EF4444` | Red notification badges, `"Cancel Tour"` border & text |
| `errorLight` | `#FEE2E2` / `#FECDD3` | Light red border for cancellation actions |
| `background` | `#F8FAFC` | Base light neutral app background |
| `surface` | `#FFFFFF` | Card surface and sheet backgrounds |
| `border` | `#E2E8F0` | Default card and button border stroke |
| `borderLight` | `#F1F5F9` | Inner dividers, segmented switcher backgrounds |
| `textPrimary` | `#1E293B` / `#0F172A` | Core dark title and heading text |
| `textSecondary` | `#64748B` | Secondary label text |
| `textMuted` | `#94A3B8` | Subtle dates, day headers, inactive tab colors |
| `subtitlePeriwinkle` | `#C7D2FE` | Muted subtitle text on dark navy headers |

### 2. Linear Gradients
Managed via `src/components/LinearGradient.tsx`:
- **Header Gradient**: `#032B57` → `#518EF9` (Greeting top banner)
- **Button Gradient**: `#03264C` → `#0659B2` (CTA buttons: `"EVENT"`, `"Confirm"`, `"Open Showing Pack"`)
- **Selected Card Gradient**: `#4075E9` → `#94B0EA` (Light blue horizontal gradient for active event card in Calendar Week view)
- **Image Dark Scrim Overlay**: `transparent` → `rgba(0, 0, 0, 0.8)` (Property photo text readability)

### 3. Typography & Fonts
The application strictly uses **2 font families** (Poppins was deprecated and removed):
1. **Playfair Display** (`typography.fontFamily.heading`):
   - `PlayfairDisplay-Regular`: Used for `"NEYORA"` monogram, greeting headline `"Good morning,\nAlex"`.
   - `PlayfairDisplay-Medium` / `SemiBold`: Section titles (`"Calendar"`, `"Needs Your Attention"`, `"Today's Schedule"`, `"Property Activity"`, `"Unit 402 – 2BR Luxury View"`).
2. **Inter** (`typography.fontFamily.body`):
   - `Inter-Regular`: Body text, dates, addresses, subtitles, descriptions.
   - `Inter-Medium`: Links (`"View All"`, `"View Calendar"`), badges (`"LIVE"`, `"82% BOOKED"`), segment tabs, inactive bottom tabs.
   - `Inter-SemiBold` / `Bold`: Card titles, prospect names (`"Marcus Reed"`), button text, price labels, active bottom tabs.

### 4. Spacing Conventions
- **`spacing.screenHorizontal`**: `20dp` standard side padding on all screens.
- **`spacing.section`**: `24dp` (`moderateScale(24)`) standard vertical distance between stacked cards and sections.
- **Card inner padding**: `moderateScale(16)`.
- **Inner elements gap**: `moderateScale(10)` to `moderateScale(12)`.

### 5. Border Radii & Shadows
- **Card border radius**: `moderateScale(16)` to `moderateScale(20)`.
- **Button border radius**: `moderateScale(10)` to `moderateScale(12)`.
- **Badge / Pill radius**: `moderateScale(10)` or `9999` (full pill).
- **Shadows**: Pure platform-friendly shadow definitions in `shadows.sm`, `shadows.md`.

---

## C. Reusable Architecture

### 1. Responsive Scaling Helpers (`src/utils/responsive.ts`)
- `moderateScale(size, factor = 0.5)`: Scale padding, margins, card widths, icon sizes proportionally to device dimensions.
- `scaleFont(fontSize, maxScaleFactor = 1.3)`: Responsive font scaler with accessibility clamping.
- `wp(percentage)` / `hp(percentage)`: Viewport width and height helpers.

### 2. Pure React Native Vector Icons (`src/components/icons/index.tsx`)
Crisp, anti-aliased icon components using pure React Native Views or base64 assets to prevent native binary linking bugs:
- Core icons: `SearchIcon`, `BellIcon`, `CalendarIcon`, `BookmarkIcon`, `ChatTabIcon`, `SettingsIcon`, `ChevronDownIcon`, `ChevronRightIcon`, `ChevronLeftIcon`, `PlusIcon`, `UploadIcon`, `BriefcaseIcon`, `RefreshIcon`, `EditIcon`, `MoreVerticalIcon`, `CloseIcon`, `ClockIcon`, `CheckmarkIcon`, `MapPinIcon`, `MessageBubbleIcon`.

### 3. Bottom Navigation Bar (`src/features/home/components/BottomNavBar.tsx`)
Supports two operational modes:
- **`variant="home"`**: Displays `HOME` (active), `CALENDAR` (with status dot), `BOOKINGS` (badge 4), `MESSAGES` (badge 2).
- **`variant="calendar"`**: Displays `CALENDAR` (active with status dot), `BOOKINGS` (badge 4), `MESSAGES` (badge 2), `SETTINGS`.

---

## D. Implemented Screens

### 1. Home Screen (`src/features/home/screens/HomeScreen.tsx`)
- **Role**: Primary executive operational dashboard.
- **Components**:
  1. `HeaderSection`: Deep navy linear gradient, brand monogram, live operations status, notification counter, Alex profile avatar.
  2. `AlertBanner`: Overlapping warning card (`-26dp` margin) for elevator modernization.
  3. `QuickActionBar`: 4 gradient actions (New event, Schedule, Availability, Share link) with `moderateScale(24)` vertical spacing.
  4. `AttentionSection`: Pending tour inquiry card for Sarah Johnson (Unit 402) with Review and Confirm buttons.
  5. `ScheduleSection`: Horizontal carousel of today's events (Stand-up, Client Walkthrough) with "View Calendar" action link.
  6. `PropertyActivitySection`: The Mercer Residences portfolio card with occupancy badge (94%) and featured apartment photo.
  7. `BottomNavBar`: Persistent bottom navigation.
  8. `DraggableFloatingButton`: Floating message dispatch shortcut.

### 2. Calendar Screen (`src/features/calendar/screens/CalendarScreen.tsx`)
- **Role**: Dedicated property showing schedule and tenant inspection command center.
- **Components**:
  1. `CalendarTopBar`: Dark navy bar (`#0B1D3A`) with Skyline Properties portfolio dropdown, Calendar Operations label, Search button, Notifications (badge 3), and Elena Vance (`EV`) avatar with green status indicator.
  2. `CalendarActionHeader`:
     - Kicker: `PROPERTY SHOWINGS & TENANT INSPECTIONS`
     - Title: `Calendar` (Playfair Display)
     - Action buttons: `↑ ICS` and `+ EVENT`
     - View mode switcher: `Month`, `Week`, `Day`, `Agenda` (dynamically switches between Month grid view and Week timeline format).
  3. `CalendarMonthCard` (rendered when `viewMode === 'Month'`):
     - October 2026 header with year, month dropdown, `< >` arrow navigation pill, and date picker shortcut.
     - 5-week month grid with exact dot indicators per day.
     - Day 23 active selected circle in `#2563EB`.
     - Bottom strip: `Upcoming: Unit 402 →`.
  4. `TodayCapacityCard` (rendered when `viewMode === 'Month'`):
     - `Today's Capacity` title with `82% BOOKED` badge.
     - 4-segment progress bar: Showings (Blue), Inspections (Orange), Maintenance (Slate), Unfilled (Light gray).
     - Slot counts: `7 of 9 Showing slots filled` and `3 Left`.
     - Synchronization footer: `Synced with Google & Outlook 4 mins ago`.
  5. `CalendarWeekView` (rendered when `viewMode === 'Week'`):
     - Separated modular sections matching Figma layout: parent container has **no border and no shadows**.
     - **Section 1 (Header Card, 348 × 48 Hug)**: Dedicated card with `< >` navigation pill, `Oct 20–26, 2024` date range, `W43` week badge, and `Filters (2)` action button.
     - **Section 2 (Days Row, 348 × 48 Hug)**: Clean 7-day row (`Sun 20` – `Sat 26`) with `Wed 23` highlighted in an active blue badge (`#2563EB`).
     - **Section 3 (Alert Banner, 348 × 50 Hug)**: `Elevator Modernization (All-Day)` warning banner card with `Day 1 of 2` pill.
     - **Section 4 (Timeline Grid)**: Time-slotted schedule cards from 09:00 AM to 06:00 PM sitting cleanly on the screen background:
       - `09:00 AM`: Unit 104 Walkthrough (Sarah Li) with straight blue left stripe.
       - `10:00 AM`: Active selected card (`Unit 402 – Showing Tour`) with soft horizontal light gradient (`#4075E9` → `#94B0EA`), `Selected` tag, and `+15m travel buffer`.
       - HVAC Room Unit 3B with `Done` tag and straight green stripe.
       - `01:00 PM`: Virtual Consultation with `Meet` tag and straight purple stripe.
       - `03:00 PM`: Vendor Inspection with `Vendor P...` tag and straight orange stripe.
       - `04:00 PM`: Key Handover with `Key Hand` tag and straight teal stripe.
       - `06:00 PM`: Dashed divider line.
  6. `ShowingTourCard`:
     - Drag handle pill indicator.
     - `• SHOWING TOUR` dark pill badge + Edit, More options, and Close action buttons.
     - Unit title: `Unit 402 – 2BR Luxury View` + `The Mercer Residences • West End Tower`.
     - Featured apartment photo preview (`unit_402.jpg`, curved boucle sofa overlooking skyline) with `Available Nov 1` badge and `Unit 402 • $4,200/mo` dark scrim.
     - Schedule window: `Wednesday, Oct 23, 2024 • 10:00 AM – 10:45 AM (45 mins)` with `15 min travel buffer enforced`.
     - Prospect Details: `Marcus Reed` (`marcus.reed@example.com`, `+1 555-019-2834`) with quick SMS/Chat button.
     - 2 side-by-side columns: Assigned Agent (`Elena Vance`, `EV`) and Unit Specs (`2 Bed • 2 Bath`, `1,180 Sq Ft`).
     - Tour Notes: `Prospect requested key focus on balcony acoustics, parking bay access, and fiber optic pre-wiring.`
     - Primary button: `Open Showing Pack` (Linear gradient with briefcase icon).
     - Secondary buttons: `Reschedule` and `Cancel Tour`.
  6. `BottomNavBar`: Persistent bottom navigation with `variant="calendar"`.

### 3. Navigation Flow
- **Home ➔ Calendar**:
  - Tapping **View Calendar** in `ScheduleSection`.
  - Tapping **Schedule** in `QuickActionBar`.
  - Tapping **CALENDAR** in `BottomNavBar`.
- **Calendar ➔ Home**:
  - Tapping **HOME** in `BottomNavBar` or system back gesture.

---

## E. Development Rules for Future Screens

1. **Strict Design System Fidelity**: Never invent custom arbitrary colors or fonts. All colors must come from `colors` in `theme.ts`, all fonts from `typography`.
2. **Spacing Consistency**: Maintain `spacing.section` (`24dp`) between stacked vertical sections and `spacing.screenHorizontal` (`20dp`) for side margins.
3. **No Native Linking Dependencies**: Keep icons and gradients implemented via pure React Native components (`src/components/icons`, `src/components/LinearGradient.tsx`).
4. **Responsive Scaling**: Always use `moderateScale()` for margins, padding, icon dimensions, and `scaleFont()` for typography.
5. **Folder & File Naming Conventions**:
   - Feature folders: `src/features/<feature-name>/`
   - Feature sub-structure: `components/`, `screens/`, `index.ts`
   - Export all public components from feature `index.ts` and root `src/features/index.ts`.
6. **Testing & Quality Assurance**:
   - Run `npx tsc --noEmit` to verify type safety.
   - Run `npm test` to verify all test suites pass.

---

## F. Instructions for Future AI Sessions

When a user requests the next screen:
1. **Read `ANTIGRAVITY_CONTEXT.md` first**.
2. **Inspect the user's reference screenshot** to identify sections, card hierarchies, buttons, and state indicators.
3. **Reuse existing common styles and components** (`BottomNavBar`, `LinearGradient`, `theme.ts`, `responsive.ts`).
4. **Place new feature components** into `src/features/<new-feature>/`.
5. **Connect navigation** via `RootNavigator.tsx` and `types/navigation.ts`.
6. **Update this document (`ANTIGRAVITY_CONTEXT.md`)** with the details of the newly created screen before concluding the session.
