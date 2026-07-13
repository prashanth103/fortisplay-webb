# Frontend Architecture

## Project Summary

FortisPlay Web is a React single page application for a sales officer gaming station workflow. The app currently uses mock data inside feature folders and client-side state for authentication, theme selection, betting, payouts, sales, watch, and wallet screens.

## Technology Stack

| Area | Current Tool |
| --- | --- |
| Framework | React 19 |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 with semantic theme tokens |
| Routing | React Router DOM v7 |
| Icons | lucide-react |
| PWA | vite-plugin-pwa |
| State | React state and Context |
| Auth Storage | sessionStorage |
| Theme Storage | localStorage |
| Data Source | Local mock data |
| Future Server State | TanStack Query |

## High-Level Flow

1. `src/main.tsx` starts the React app.
2. `ThemeProvider` applies the selected theme to the document root using `data-theme`.
3. `App.tsx` wraps the app with `AuthProvider`.
4. `AppRouter` defines browser routes, public auth layout, protected route guard, and main app layout.
5. `MainLayout` renders shared shell UI such as `TopBar`, `Sidebar`, `BottomNav`, and active page content.
6. Feature pages compose shared UI components, hooks, constants, and mock data.

## Runtime Provider Stack

```text
main.tsx
  ThemeProvider
    App
      AuthProvider
        AppRouter
          BrowserRouter
            AppShell
              AuthLayout
                LoginPage
              ProtectedRoute
                MainLayout
                  TopBar
                  Sidebar
                  Feature Page
                  BottomNav
```

## Source Structure

```text
src/
  app/
    router/
      AppRouter.tsx
      ProtectedRoute.tsx
      routes.ts
  assets/
    images/
  components/
    common/
    layout/
    ui/
  constants/
    theme.ts
    navigation.ts
    spacing.ts
    typography.ts
  features/
    auth/
    home/
    payouts/
    sales/
    theme/
    wallet/
    watch/
  hooks/
  layouts/
  styles/
  types/
  utils/
```

## Layers

### 1. App Bootstrap

Files:

- `src/main.tsx`
- `src/App.tsx`

Responsibilities:

- Create the React root.
- Load global CSS.
- Mount global providers.
- Hand off routing to `AppRouter`.

### 2. Providers

Files:

- `src/features/theme/ThemeContext.tsx`
- `src/features/auth/context/AuthContext.tsx`
- `src/features/auth/context/AuthContextBase.ts`
- `src/features/auth/context/useAuth.ts`

Responsibilities:

- Theme provider stores `dark` or `light` in `localStorage`.
- Theme provider applies `data-theme` on `<html>`.
- Auth provider stores demo SO ID in `sessionStorage`.
- Auth provider exposes `login`, `logout`, `user`, and `isAuthenticated`.

Future addition:

- Add `QueryClientProvider` from TanStack Query near the root provider stack.
- Recommended position:

```text
ThemeProvider
  QueryClientProvider
    AuthProvider
      AppRouter
```

### 3. Routing and Layouts

Files:

- `src/app/router/AppRouter.tsx`
- `src/app/router/ProtectedRoute.tsx`
- `src/layouts/AuthLayout.tsx`
- `src/layouts/MainLayout.tsx`
- `src/layouts/EmptyLayout.tsx`
- `src/components/layout/AppShell.tsx`
- `src/components/layout/ScreenContainer.tsx`

Responsibilities:

- Public route: `/login`
- Protected routes: `/`, `/watch`, `/sales`, `/payouts`, `/wallet`
- Shared app shell: top bar, sidebar, bottom nav, page container.

### 4. Feature Modules

Each feature owns its page-level UI and demo data.

| Feature | Main Files | Purpose |
| --- | --- | --- |
| Auth | `features/auth/pages/LoginPage.tsx` | Login screen and auth context |
| Home | `features/home/pages/HomePage.tsx`, `features/home/mock.ts` | Race selection, betting flow, ticket modals |
| Watch | `features/watch/pages/WatchPage.tsx` | Race video/watch UI |
| Sales | `features/sales/pages/SalesPage.tsx`, `features/sales/mock.ts` | Sales history and transaction UI |
| Payouts | `features/payouts/pages/PayoutsPage.tsx`, `features/payouts/mock.ts` | Ticket verification and payout status |
| Wallet | `features/wallet/pages/WalletPage.tsx`, `features/wallet/mock.ts` | Wallet summary and transactions |
| Theme | `features/theme/ThemeContext.tsx` | Light/dark theme state |

### 5. Shared UI

Files:

- `src/components/ui/*`
- `src/components/common/*`

Responsibilities:

- Reusable primitives: `Button`, `Input`, `Card`, `Modal`, `Sheet`, `Tabs`, `Loader`.
- Domain shared components: `TopBar`, `BottomNav`, `Sidebar`, `RaceTabs`, `BetSlip`, `ColorBadge`, `TicketQR`, `TransactionRow`.

### 6. Theme System

Files:

- `src/index.css`
- `src/constants/theme.ts`

Responsibilities:

- Tailwind semantic color names are defined through CSS variables.
- Dark theme is the default.
- Light theme overrides values when `html[data-theme="light"]` is active.
- Components should prefer semantic tokens:
  - `bg-background`
  - `bg-surface`
  - `bg-surfaceAlt`
  - `text-textPrimary`
  - `text-textSecondary`
  - `text-textMuted`
  - `border-border`

Guideline:

- Avoid hardcoding `text-white`, `text-black`, `bg-black`, or `bg-white` unless the UI is intentionally fixed, such as QR tickets, video overlays, or badges.

## Current Data Flow

```text
Feature Page
  local React state
  feature mock.ts
  shared constants
  shared UI components
```

Examples:

- Home page reads races and entries from `features/home/mock.ts`.
- Payouts page verifies ticket numbers using `features/payouts/mock.ts`.
- Wallet page reads wallet summary and history from `features/wallet/mock.ts`.

## Future Data Flow With TanStack Query

TanStack Query is not installed or used yet, but it should become the server-state layer when backend APIs are added.

Recommended future structure:

```text
src/
  lib/
    apiClient.ts
    queryClient.ts
  features/
    payouts/
      api.ts
      queries.ts
    sales/
      api.ts
      queries.ts
    wallet/
      api.ts
      queries.ts
```

Recommended provider:

```tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

<ThemeProvider>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </QueryClientProvider>
</ThemeProvider>
```

Recommended query pattern:

```tsx
function usePayoutTicket(ticketNo: string) {
  return useQuery({
    queryKey: ['payout-ticket', ticketNo],
    queryFn: () => getPayoutTicket(ticketNo),
    enabled: ticketNo.length > 0,
  });
}
```

## Future TanStack Query Responsibilities

| Responsibility | TanStack Query Role |
| --- | --- |
| Fetch ticket details | `useQuery(['payout-ticket', ticketNo])` |
| Fetch sales transactions | `useQuery(['sales', filters])` |
| Fetch wallet summary | `useQuery(['wallet-summary'])` |
| Submit bets | `useMutation(placeBet)` |
| Print ticket status | `useMutation(printTicket)` |
| Invalidate stale data | `queryClient.invalidateQueries(...)` |
| Handle loading/error states | Query result state |
| Cache server responses | Query cache |

## Architecture Diagram

The draw.io XML diagram is available here:

- `docs/frontend-architecture.drawio`

Open it with diagrams.net / draw.io.

## Implementation Notes

- Keep feature-specific logic inside the feature folder.
- Keep generic UI in `components/ui`.
- Keep domain reusable UI in `components/common`.
- Keep app-wide providers near the root.
- Keep route definitions centralized in `app/router`.
- Keep mock data only until API endpoints exist.
- When TanStack Query is added, move server calls out of page components and into feature-level `api.ts` and `queries.ts` files.
