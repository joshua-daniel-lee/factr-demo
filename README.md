# FactrAI Demo - Product Requirements Document

**Danyang Wang & Joshua Lee Capstone Project**

## Executive Summary

**Demo Purpose**: Showcase the core FactrAI value proposition - frictionless access to premium journalism through a credit-based "Universal Key" system.

**Target Audience**: Investors, potential publisher partners, and early adopter users during pitch/demo sessions.

**Demo Duration**: 2-3 minutes

**Key Message**: "One Universal Key unlocks all premium journalism - no more subscription juggling."

**Core Concept**: FactrAI is a **control center** for unlocking paywalled content. Users discover, unlock, and are redirected to read on publisher sites. The app focuses on activity tracking, credit management, and unlock history.

---

## About FactrAI

FactrAI is a frictionless, credit-based access layer that utilizes browser-level identity (FedCM) to unlock premium journalism across the web with a single "Universal Key." It restores the economic bridge between publishers and high-intent readers by replacing rigid, high-friction paywalls with a dynamic yield-optimization engine.

### Key Value Propositions

**For Users:**
- **Productivity Reclamation**: Eliminates the 9 hours/week wasted navigating paywalls
- **Financial Efficiency**: One $15-40/mo credit pool replaces 10+ separate subscriptions
- **One Key, All Paywalls**: Single OAuth/JWT identity auto-unlocks partner content

**For Publishers:**
- **Monetization of the Bounce**: Recovers revenue from the 95% who hit paywalls and leave
- **Yield Improvement**: Transforms "zero-click" searches into paying sessions
- **Data Reciprocity**: Shares 1st-party user signals for direct subscription conversion

---

## User Persona

**Name**: Sarah Chen  
**Role**: Strategy Consultant at McKinsey  
**Age**: 32  

**Pain Points**:
- Hits 5-8 paywalls daily across WSJ, NYT, Bloomberg, The Information
- Wastes ~9 hours/week navigating paywalls and subscription walls
- Has 3 active subscriptions but still encounters blocked content
- Frustrated by unpredictable access costs

**FactrAI Solution**: One account, predictable monthly credit pool, instant access across all publishers.

---

## Demo User Story & Flow

**Starting State**: Sarah is already logged into FactrAI (demo skips onboarding)

**Scenario**: "Sarah needs to research AI infrastructure trends for a client presentation due tomorrow"

**Demo Flow:**

```
1. Activity Dashboard Landing (5 seconds)
   - See credit balance, recent unlocks, analytics
   ↓
2. Browse Article Discovery Feed (10 seconds)
   - Filter by publisher, topic, credit cost
   ↓
3. Article Selection & Preview (5 seconds)
   - View quick preview, credit cost, publisher info
   ↓
4. Unlock & Open on Publisher Site (5 seconds)
   - Credit deducted, article opens in new tab/window
   ↓
5. [EXTERNAL] Reading on Publisher Site (30 seconds)
   - User reads on NYT, WSJ, Bloomberg, etc.
   ↓
6. Return to FactrAI Dashboard (10 seconds)
   - Updated credit balance, article added to "My Library"
```

**Key Difference**: Users read content on publisher sites, NOT in the FactrAI app. FactrAI is the unlock mechanism and personal library.

---

## Feature Requirements

### 1. Activity Dashboard (Primary View)

**Must Have:**
- **Hero Credit Balance Card**
  - Large display: "67 / 100 credits"
  - Circular progress visualization
  - Monthly usage trend sparkline
  - Projection: "~12 credits remaining by month-end"
  - Quick "Add Credits" CTA button

- **Recent Activity Feed**
  - Last 8-10 unlocked articles (scrollable)
  - Each item shows:
    - Thumbnail image
    - Article title (2 lines max)
    - Publisher logo + name
    - Unlock date/time ("3 hours ago")
    - Credits spent badge
    - "Read Again" button → reopens on publisher site
    - Link expiration indicator (if applicable)

- **Quick Stats Row**
  - Articles unlocked this month
  - Credits spent this month
  - Most-read publisher
  - Favorite topic

- **User Profile Widget** (top-right)
  - Avatar/initials
  - Current credit balance (small)
  - Dropdown: My Library, Credit History, Settings, Logout

### 2. My Library / Unlocked Content View

**Must Have:**
- **Organization Tabs:**
  - Recent (default)
  - By Publisher
  - By Topic
  - Active vs Expired

- **Search & Filter Bar:**
  - Search unlocked articles
  - Date range filter
  - Publisher multi-select
  - Topic filter

- **Article List:**
  - Same format as Recent Activity Feed
  - Pagination or infinite scroll
  - Bulk actions: Archive, Delete
  - Export reading list option

- **Empty State:**
  - "No unlocked articles yet"
  - CTA to browse article feed

### 3. Analytics & Insights Panel

**Must Have:**
- **This Month Overview:**
  - Total articles unlocked (with % change vs last month)
  - Total credits spent (with budget comparison)
  - Cost per article average
  - Reading frequency chart (daily/weekly)

- **Publisher Breakdown:**
  - Horizontal bar chart of credits spent per publisher
  - Article count per publisher
  - "View all publishers" link

- **Topic Analysis:**
  - Pie chart or tag cloud of reading topics
  - Most-read categories

- **Savings Calculator:**
  - "You saved $127 this month vs individual subscriptions"
  - Comparison to theoretical subscription costs

- **Time Period Selector:**
  - This week, This month, Last 3 months, All time

### 4. Article Discovery Feed (Secondary View)

**Must Have:**
- **Filter/Sort Toolbar:**
  - Topic dropdown: All, Tech, Finance, Health, Politics
  - Publisher filter: All Publishers, NYT, WSJ, Bloomberg
  - Sort by: Trending, Newest, Lowest Credit Cost
  - Search bar: "Search available articles..."

- **Article Grid** (6-12 cards):
  - Publisher logo (top-left)
  - Article headline (2-3 lines)
  - Thumbnail image
  - Credit cost badge (color-coded: Green 1-2, Yellow 3-4, Red 5+)
  - Reading time estimate
  - Topic tags
  - Hover: Subtle lift + quick preview tooltip

**Interaction**: Click → Inline Preview Expands

### 5. Article Preview (Inline Expansion)

**Must Have:**
- Expanded card shows:
  - Full headline
  - Publisher name + logo
  - Author + publication date
  - Brief excerpt (3-4 sentences)
  - **Primary CTA**: "Unlock & Open on [Publisher]" (large button)
  - Credit cost display
  - Current balance reminder
  - Badge: "Opens in new tab"
  - Secondary actions: Save to wishlist, Share

**Post-Unlock Behavior:**
- Credit deducted
- Toast notification: "Article unlocked! Opening on [Publisher]..."
- Opens publisher site in new tab/window
- Article auto-added to "My Library"
- Dashboard credit balance updates

### 6. Credit Management Center

**Must Have:**
- **Current Balance Overview:**
  - Large credit display
  - Recharge date (if on recurring plan)
  - Plan details (Lite vs Pro)

- **Transaction History:**
  - Scrollable list of all transactions
  - Filters: All, Unlocks, Purchases, Refunds
  - Each entry shows:
    - Date/time
    - Transaction type
    - Credits +/- amount
    - Article details (for unlocks)
    - Balance after transaction

- **Purchase Credits Section:**
  - Credit package options ($10 = 20 credits, $25 = 55 credits, etc.)
  - Payment method on file
  - Purchase button

- **Referral Credits:**
  - Referral link + share buttons
  - Credits earned from referrals
  - "Invite friends, earn 10 credits each"

### 7. Credit Transaction System

**Must Have:**
- Real-time credit deduction
- Animated credit counter update
- Toast notification on unlock
- Transaction immediately logged to history
- Insufficient credits handling:
  - Warning modal if balance < article cost
  - Direct link to purchase credits
- Optimistic UI updates (instant feedback)

---

## Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  credits: {
    remaining: number;
    total: number;
    used: number;
  };
  plan: 'lite' | 'pro';
}
```

### Article
```typescript
interface Article {
  id: string;
  publisherId: string;
  title: string;
  excerpt: string;
  fullContent: string;
  author: string;
  publishedDate: string;
  thumbnailUrl: string;
  creditCost: number;
  readingTime: number; // minutes
  tags: string[];
  trending?: boolean;
}
```

### Publisher
```typescript
interface Publisher {
  id: string;
  name: string;
  logoUrl: string;
  domain: string;
}
```

---

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Typography**: Newsreader (serif) + Roboto (sans-serif)
- **Icons**: Lucide React
- **State Management**: React useState/useReducer
- **Mock Data**: JSON files

---

## Design System

### Colors
- **Primary**: #06c0d7 (Robin's Egg Blue)
- **Accent**: #f77024 (Ecstasy Orange)
- **Dark**: #1b2356 (Bunting Navy)
- **Text**: #1d1617
- **Background**: White with subtle gray (#f9fafb)

### Components
- Reusable Button component (primary, accent, outline variants)
- Card component (default, glass variants)
- Input component with icon support

### Animations
- Credit counter animations
- Card hover lift effects
- Modal transitions
- Toast notifications
- Smooth page transitions

---

## Mock Data Requirements

**Articles**: 12-15 diverse articles

**Publishers**:
1. The New York Times
2. The Wall Street Journal
3. Bloomberg
4. The Information
5. TechCrunch (Premium)
6. The Atlantic

**Credit Cost Distribution**:
- 3-4 articles @ 1-2 credits (evergreen)
- 5-6 articles @ 3-4 credits (standard)
- 2-3 articles @ 5 credits (breaking/premium)

**Topics**:
- AI/Technology (4-5 articles)
- Finance/Markets (3-4 articles)
- Health/Science (2-3 articles)
- Business Strategy (2-3 articles)

---

## File Structure

```
factr-demo/
├── app/
│   ├── page.tsx                      # Activity Dashboard (primary view)
│   ├── library/page.tsx              # My Library / Unlocked Content
│   ├── discover/page.tsx             # Article Discovery Feed
│   ├── analytics/page.tsx            # Analytics & Insights Panel
│   ├── credits/page.tsx              # Credit Management Center
│   ├── sign-in/page.tsx              # Authentication
│   ├── sign-out/page.tsx             # Sign out confirmation
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles
├── components/
│   ├── ActivityDashboard.tsx         # Main dashboard view
│   ├── CreditBalanceCard.tsx         # Hero credit display
│   ├── RecentActivityFeed.tsx        # Recent unlocks list
│   ├── QuickStats.tsx                # Stats row component
│   ├── UnlockedArticleList.tsx       # Library list view
│   ├── AnalyticsPanel.tsx            # Analytics charts
│   ├── ArticleDiscoveryFeed.tsx      # Article grid for discovery
│   ├── ArticleCard.tsx               # Article card with "Unlock & Open"
│   ├── ArticlePreview.tsx            # Inline preview expansion
│   ├── CreditTransaction.tsx         # Transaction history item
│   ├── UserMenu.tsx                  # Profile dropdown
│   ├── Navigation.tsx                # Bottom nav or sidebar
│   ├── Button.tsx                    # Reusable button
│   ├── Card.tsx                      # Reusable card
│   └── Input.tsx                     # Reusable input
├── data/
│   ├── articles.json                 # Mock article data
│   ├── publishers.json               # Mock publisher data
│   ├── user.json                     # Mock user data
│   └── transactions.json             # Mock transaction history
├── hooks/
│   ├── useCredits.ts                 # Credit management hook
│   └── useArticleUnlock.ts           # Unlock logic hook
├── lib/
│   ├── utils.ts                      # Utility functions
│   └── mockData.ts                   # Mock data helpers
├── public/
│   └── logo.png                      # FactrAI logo
└── README.md                         # This file
```

---

## Development Phases

### Phase 1: Core Experience (Week 1)
- ✅ Dashboard with article feed
- ✅ Article cards
- ✅ Credit balance display
- ✅ Basic mock data

### Phase 2: Core Interactions (Week 2)
- 🔄 Activity Dashboard with recent unlocks
- 🔄 Article Discovery Feed with filters
- 🔄 Inline article preview expansion
- 🔄 Unlock & redirect functionality
- 🔄 Credit deduction logic
- 🔄 My Library view

### Phase 3: Analytics & Polish (Week 3)
- 🔄 Analytics panel with charts (In Progress)
  - Overview stats grid (Articles, Credits, Avg Cost, Reading Frequency)
  - Publisher breakdown chart (horizontal bars)
  - Topic analysis chart (pie/donut visualization)
  - Savings calculator comparison
  - Time period selector (This Week, This Month, Last 3 Months, All Time)
- ✅ Credit Management Center
- ✅ Transaction history
- ✅ Animations & transitions
- ✅ Responsive design
- ✅ Loading states & error handling
- ✅ Final mock data integration

---

## Out of Scope (Demo v1)

Not including in this demo:
- User registration/onboarding flow
- Payment processing (add credits) - mocked with UI only
- Actual integration with publisher sites - simulated redirects
- Browser extension for inline paywall detection
- Publisher dashboard/analytics
- Social features (comments, community)
- Advanced search/filtering (semantic search)
- User settings/preferences (reading goals, notifications)
- Reading history export
- Mobile native app
- **In-app reading experience** - Users read on publisher sites, NOT in FactrAI

**Intentional Design Decision**: FactrAI is a control center and unlock mechanism, not a reading platform. Articles open on their native publisher sites to preserve:
- Publisher brand experience
- Native article layouts and multimedia
- Publisher analytics/engagement data
- User familiarity with trusted news sources

---

## Success Metrics

**Viewer Understanding**:
- Can explain "Universal Key" concept after demo
- Understands credit-based model
- Sees value vs. traditional subscriptions

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the demo.

---

## Technology References

**ClassPass Model**: Credit-based economy for perishable inventory  
**FedCM API**: Privacy-preserving browser-level identity  
**SmartRate Algorithm**: Dynamic pricing based on demand

---

## Contact

**Project Team**: Danyang Wang & Joshua Lee  
**Repository**: [github.com/joshua-daniel-lee/factr-demo](https://github.com/joshua-daniel-lee/factr-demo)

---

## License

This is a capstone project demo. All rights reserved.
