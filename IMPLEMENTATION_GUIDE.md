# FactrAI Implementation Guide

**Version**: 1.0  
**Last Updated**: March 31, 2026  
**Build Approach**: Desktop-first with mobile responsive design

---

## Overview

This guide outlines the implementation strategy for building FactrAI's data-centric dashboard application. We follow a **foundation-first approach**, building reusable layout and UI components before implementing feature-specific content components.

---

## Architecture Principles

1. **Desktop-first, Mobile-responsive**: Optimize for desktop experience, ensure mobile usability
2. **Component Composition**: Build small, reusable components that compose into larger features
3. **Type Safety**: Leverage TypeScript for all data models and props
4. **Mock Data**: Use JSON files for realistic testing during development
5. **Consistent Styling**: Follow the design system defined in README.md

---

## Phase 1: Foundation - Layout & Navigation (Week 1)

### Goal
Establish the authenticated app shell with navigation and core layout components.

### Components to Build

#### 1. Navigation Component
**File**: `components/Navigation.tsx`

**Purpose**: Main navigation for the app

**Desktop Behavior**:
- Fixed sidebar on the left (240-280px wide)
- Always visible
- Vertical list of nav items with icons + labels
- Active state highlighting
- Hover effects

**Mobile Behavior** (< 768px):
- Fixed bottom tab bar
- 5 main nav items with icons only (labels on active)
- Compact spacing

**Nav Items**:
1. Dashboard (Home icon) → `/`
2. Discover (Search/Compass icon) → `/discover`
3. Library (BookOpen icon) → `/library`
4. Analytics (BarChart icon) → `/analytics`
5. Credits (Wallet/CreditCard icon) → `/credits`

**Props**:
```typescript
interface NavigationProps {
  currentPath: string;
}
```

**Features**:
- Active route highlighting
- Next.js Link integration
- Smooth hover/active transitions
- Responsive layout switch at 768px breakpoint

---

#### 2. Header Component
**File**: `components/Header.tsx`

**Purpose**: Top bar across all authenticated pages

**Desktop Layout**:
```
[Logo (optional)] [Page Title]                    [Credit Badge] [User Menu]
```

**Mobile Layout**:
```
[Logo] [Page Title]              [Credit Badge] [User Menu]
```

**Props**:
```typescript
interface HeaderProps {
  title: string;
  showLogo?: boolean; // Default false for desktop (logo in sidebar)
}
```

**Features**:
- Dynamic page title
- Always-visible credit balance
- User menu trigger
- Sticky positioning
- Glass morphism background for depth

---

#### 3. UserMenu Component
**File**: `components/UserMenu.tsx`

**Purpose**: Dropdown menu for user account actions

**Trigger Display**:
- Avatar (initials or image)
- Small credit balance below avatar (desktop only)
- Dropdown chevron

**Menu Items**:
1. User info section (name + email)
2. Credit balance (large, prominent)
3. Divider
4. Settings
5. Help & Support
6. Divider
7. Logout

**Props**:
```typescript
interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    credits: number;
  };
}
```

**Features**:
- Click outside to close
- Smooth dropdown animation
- Mobile-friendly touch targets
- Link to sign-out page on logout

---

#### 4. AppShell Component
**File**: `components/AppShell.tsx`

**Purpose**: Main layout wrapper for authenticated pages

**Desktop Structure**:
```
┌─────────────────────────────────────────┐
│ [Navigation]  [Header            ]      │
│ [Sidebar   ]  [                  ]      │
│ [          ]  [   Main Content   ]      │
│ [          ]  [                  ]      │
│ [          ]  [                  ]      │
└─────────────────────────────────────────┘
```

**Mobile Structure**:
```
┌───────────────────┐
│ [Header        ]  │
│ [              ]  │
│ [Main Content  ]  │
│ [              ]  │
│ [              ]  │
│ [Bottom Nav    ]  │
└───────────────────┘
```

**Props**:
```typescript
interface AppShellProps {
  children: React.ReactNode;
  title: string;
}
```

**Features**:
- Automatic responsive layout switching
- Proper spacing and padding
- Scroll behavior management
- Background styling

---

#### 5. Update Root Layout
**File**: `app/layout.tsx`

**Change**: Conditionally wrap authenticated routes with AppShell

**Approach**:
- Sign-in and sign-out pages remain standalone
- All other routes wrapped in AppShell
- Use pathname detection to determine layout

---

## Phase 2: Supporting UI Components (Week 2)

### Goal
Build reusable UI primitives that will be used throughout the app.

---

#### 6. Badge Component
**File**: `components/Badge.tsx`

**Purpose**: Small labels for credit costs, status, categories

**Variants**:
- `default` - Gray
- `success` - Green (1-2 credits)
- `warning` - Yellow (3-4 credits)
- `danger` - Red (5+ credits)
- `info` - Blue
- `primary` - Primary color

**Sizes**:
- `sm` - Compact
- `md` - Default
- `lg` - Large

**Props**:
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Use Cases**:
- Credit costs on article cards
- Topic tags
- Status indicators
- Publisher labels

---

#### 7. Avatar Component
**File**: `components/Avatar.tsx`

**Purpose**: User profile images with fallback to initials

**Features**:
- Image support with fallback
- Automatic initials generation from name
- Optional status indicator dot
- Multiple sizes

**Sizes**:
- `sm` - 32px
- `md` - 40px (default)
- `lg` - 48px
- `xl` - 64px

**Props**:
```typescript
interface AvatarProps {
  src?: string;
  alt: string;
  name: string; // For initials fallback
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away';
  className?: string;
}
```

---

#### 8. Toast Component
**File**: `components/Toast.tsx` and `components/ToastProvider.tsx`

**Purpose**: Temporary notifications for user actions

**Variants**:
- `success` - Green checkmark (unlock success)
- `error` - Red X (unlock failed, insufficient credits)
- `warning` - Yellow alert
- `info` - Blue info

**Features**:
- Auto-dismiss after 3-5 seconds
- Manual dismiss with X button
- Slide-in animation from top-right
- Stack multiple toasts
- Global provider with hook

**Usage Pattern**:
```typescript
const { showToast } = useToast();
showToast('Article unlocked!', 'success');
```

**Provider Setup**:
- Wrap app in ToastProvider
- Use context + custom hook

---

#### 9. Loading Components
**Files**: 
- `components/Loading.tsx` - Spinner
- `components/Skeleton.tsx` - Content placeholders

**Loading (Spinner)**:
**Sizes**: sm, md, lg
**Variants**: primary, white, dark
**Use**: Button loading states, page loading

**Props**:
```typescript
interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'white' | 'dark';
  className?: string;
}
```

**Skeleton**:
**Types**:
- `text` - Single line text
- `heading` - Heading placeholder
- `card` - Article card skeleton
- `avatar` - Circular avatar
- `rectangle` - Generic box

**Props**:
```typescript
interface SkeletonProps {
  type?: 'text' | 'heading' | 'card' | 'avatar' | 'rectangle';
  width?: string;
  height?: string;
  className?: string;
}
```

---

#### 10. EmptyState Component
**File**: `components/EmptyState.tsx`

**Purpose**: Friendly message when lists/sections are empty

**Layout**:
```
[Icon]
[Heading]
[Description]
[Optional CTA Button]
```

**Props**:
```typescript
interface EmptyStateProps {
  icon: React.ReactNode; // Lucide icon
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}
```

**Use Cases**:
- Empty library: "No unlocked articles yet"
- No search results
- No transactions yet
- Filtered list with no matches

---

#### 11. Modal Component
**File**: `components/Modal.tsx`

**Purpose**: Dialog overlays for confirmations, warnings, forms

**Features**:
- Backdrop with blur
- Centered content
- Close on outside click (optional)
- Close on ESC key
- Smooth fade + scale animation
- Focus trap

**Sections**:
- Header (title + close button)
- Body (content)
- Footer (action buttons)

**Props**:
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOutsideClick?: boolean;
}
```

**Use Cases**:
- Insufficient credits warning
- Confirm logout
- Add credits flow
- Article preview (alternative to inline expansion)

---

#### 12. Layout Utilities
**Files**:
- `components/PageContainer.tsx`
- `components/Section.tsx`

**PageContainer**:
**Purpose**: Consistent page spacing and max-width

**Props**:
```typescript
interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}
```

**Section**:
**Purpose**: Organize dashboard sections with optional headers

**Props**:
```typescript
interface SectionProps {
  title?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  children: React.ReactNode;
  variant?: 'card' | 'flat';
  className?: string;
}
```

---

## Phase 3: Data & State Setup

### Mock Data Files

Create `data/` directory with:

#### `data/user.json`
```json
{
  "id": "user_001",
  "name": "Sarah Chen",
  "email": "sarah.chen@example.com",
  "avatar": null,
  "credits": {
    "remaining": 67,
    "total": 100,
    "used": 33
  },
  "plan": "pro"
}
```

#### `data/publishers.json`
```json
[
  {
    "id": "nyt",
    "name": "The New York Times",
    "logoUrl": "/publishers/nyt-logo.png",
    "domain": "nytimes.com"
  },
  // ... more publishers
]
```

#### `data/articles.json`
```json
[
  {
    "id": "article_001",
    "publisherId": "nyt",
    "title": "The Future of AI Infrastructure",
    "excerpt": "As artificial intelligence continues to reshape...",
    "author": "Jane Smith",
    "publishedDate": "2026-03-30T10:00:00Z",
    "thumbnailUrl": "/articles/ai-infrastructure.jpg",
    "creditCost": 3,
    "readingTime": 8,
    "tags": ["AI", "Technology", "Infrastructure"],
    "trending": true
  },
  // ... 12-15 articles
]
```

#### `data/transactions.json`
```json
[
  {
    "id": "txn_001",
    "type": "unlock",
    "articleId": "article_001",
    "credits": -3,
    "balanceAfter": 67,
    "timestamp": "2026-03-31T09:30:00Z"
  },
  // ... more transactions
]
```

---

### TypeScript Types

**File**: `types/index.ts`

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  credits: {
    remaining: number;
    total: number;
    used: number;
  };
  plan: 'lite' | 'pro';
}

export interface Publisher {
  id: string;
  name: string;
  logoUrl: string;
  domain: string;
}

export interface Article {
  id: string;
  publisherId: string;
  title: string;
  excerpt: string;
  fullContent?: string; // Optional, not displayed in app
  author: string;
  publishedDate: string;
  thumbnailUrl: string;
  creditCost: number;
  readingTime: number;
  tags: string[];
  trending?: boolean;
}

export interface Transaction {
  id: string;
  type: 'unlock' | 'purchase' | 'refund';
  articleId?: string; // Only for unlocks
  credits: number; // Negative for deductions, positive for additions
  balanceAfter: number;
  timestamp: string;
}

export interface UnlockedArticle extends Article {
  unlockedAt: string;
  expiresAt?: string;
}
```

---

### Context Provider

**File**: `contexts/AppContext.tsx`

**Purpose**: Global state for user, credits, and app-wide functionality

**State**:
- Current user
- Credit balance
- Toast notifications
- Loading states

**Actions**:
- `updateCredits(amount: number)`
- `unlockArticle(articleId: string)`
- `showToast(message, variant)`

**Setup**:
```typescript
'use client';

import { createContext, useContext, useState } from 'react';
import { User } from '@/types';

interface AppContextType {
  user: User;
  updateCredits: (amount: number) => void;
  // ... more actions
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Implementation
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
```

---

## Phase 4: Content Components (Week 3+)

After foundation is complete, build feature-specific components:

1. **CreditBalanceCard** - Hero display on dashboard
2. **RecentActivityFeed** - List of unlocked articles
3. **QuickStats** - Dashboard statistics row
4. **ArticleCard** - Card in discovery feed
5. **ArticlePreview** - Inline expansion or modal
6. **UnlockedArticleList** - Library view
7. **AnalyticsPanel** - Charts and insights
8. **CreditTransaction** - Transaction history item

---

## Implementation Checklist

### Week 1: Foundation
- [ ] Create Navigation component (sidebar + bottom bar)
- [ ] Create Header component
- [ ] Create UserMenu dropdown
- [ ] Create AppShell wrapper
- [ ] Update layout.tsx to use AppShell conditionally
- [ ] Test responsive behavior (desktop ↔ mobile)

### Week 2: UI Primitives
- [ ] Create Badge component with all variants
- [ ] Create Avatar component
- [ ] Create Toast component + ToastProvider
- [ ] Create Loading spinner component
- [ ] Create Skeleton component
- [ ] Create EmptyState component
- [ ] Create Modal component
- [ ] Create PageContainer component
- [ ] Create Section component

### Week 2-3: Data & State
- [ ] Create `types/index.ts` with all interfaces
- [ ] Create `data/` folder with mock JSON files
- [ ] Create `lib/mockData.ts` helper functions
- [ ] Create `contexts/AppContext.tsx`
- [ ] Create custom hooks (`useCredits`, `useArticleUnlock`)
- [ ] Wrap app in AppProvider

### Week 3+: Content Components
- [ ] Build dashboard-specific components
- [ ] Build discovery feed components
- [ ] Build library components
- [ ] Build analytics components
- [ ] Build credit management components

---

## Design Tokens Reference

### Breakpoints
```css
sm: 640px
md: 768px  /* Switch point for sidebar ↔ bottom nav */
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Spacing
- Navigation width (desktop): 280px
- Header height: 64px
- Bottom nav height (mobile): 72px
- Page padding: 24px (mobile), 32px (desktop)
- Card spacing: 16px gap
- Section spacing: 32px gap

### Colors (from design system)
- Primary: #06c0d7
- Accent: #f77024
- Dark: #1b2356
- Text: #1d1617
- Background: #ffffff

### Typography
- Headings: Newsreader (serif)
- Body: Roboto (sans-serif)

---

## Testing Strategy

### Manual Testing Checklist
- [ ] Test all components on desktop (1920x1080, 1440x900)
- [ ] Test responsive behavior at 768px breakpoint
- [ ] Test mobile layout on iPhone (390px)
- [ ] Test navigation on all routes
- [ ] Test all button states (default, hover, active, disabled)
- [ ] Test toast notifications (multiple stacks)
- [ ] Test modal close behaviors
- [ ] Test user menu dropdown
- [ ] Test keyboard navigation
- [ ] Test accessibility (screen reader)

---

## Next Steps After Foundation

1. **Build Dashboard** (`app/page.tsx`)
   - Import and compose: CreditBalanceCard, RecentActivityFeed, QuickStats
   - Use AppShell with title "Dashboard"
   - Add empty states where needed

2. **Build Discovery** (`app/discover/page.tsx`)
   - Article grid with filters
   - Search functionality
   - Inline preview expansion

3. **Build Library** (`app/library/page.tsx`)
   - Tabs for organization
   - Search and filters
   - List view of unlocked articles

4. **Build Analytics** (`app/analytics/page.tsx`)
   - Charts using Recharts or similar
   - Stats cards
   - Time period selector

5. **Build Credits** (`app/credits/page.tsx`)
   - Balance overview
   - Transaction history
   - Purchase options (mocked)

---

## Resources

- **Lucide Icons**: https://lucide.dev/
- **Tailwind CSS v4 Docs**: https://tailwindcss.com/docs
- **Next.js 16 App Router**: https://nextjs.org/docs/app
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## Notes

- **Desktop-first approach**: Start with desktop layout, ensure it works well on large screens
- **Mobile responsive**: Use Tailwind breakpoints (`md:`, `lg:`) to adapt for smaller screens
- **Component isolation**: Build and test each component individually before integration
- **Mock data**: Always use realistic mock data to catch UI issues early
- **Accessibility**: Ensure keyboard navigation and screen reader support from the start

---

**End of Implementation Guide**
