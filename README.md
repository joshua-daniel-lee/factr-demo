# FactrAI Demo - Product Requirements Document

**Danyang Wang & Joshua Lee Capstone Project**

## Executive Summary

**Demo Purpose**: Showcase the core FactrAI value proposition - frictionless access to premium journalism through a credit-based "Universal Key" system.

**Target Audience**: Investors, potential publisher partners, and early adopter users during pitch/demo sessions.

**Demo Duration**: 2-3 minutes

**Key Message**: "One Universal Key unlocks all premium journalism - no more subscription juggling."

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
1. Dashboard Landing (5 seconds)
   ↓
2. Browse Trending Articles (10 seconds)
   ↓
3. Article Selection & Preview (10 seconds)
   ↓
4. Credit-Based Unlock (5 seconds)
   ↓
5. Reading Experience (30 seconds)
   ↓
6. Return to Dashboard (Show updated credits) (10 seconds)
```

---

## Feature Requirements

### 1. Dashboard/Home Screen

**Must Have:**
- **User Profile Widget**
  - Avatar/initials
  - Current credit balance prominently displayed
  - Dropdown menu: Settings, History, Add Credits, Logout

- **Credit Balance Card**
  - Large display: "67 / 100 credits"
  - Progress bar visualization
  - Projection text: "~12 credits remaining by month-end"
  - CTA button: "Add Credits"

- **Article Feed Grid**
  - Display 6-12 article cards
  - Filter/Sort toolbar:
    - Topic dropdown: All, Tech, Finance, Health, Politics
    - Publisher filter: All Publishers, NYT, WSJ, Bloomberg, etc.
    - Sort by: Trending, Newest, Lowest Credit Cost
  - Search bar: "Search articles..."

### 2. Article Card Component

**Each card includes:**
- Publisher logo (small, top-left)
- Article headline (2-3 lines, truncated)
- Thumbnail image
- Credit cost badge (color-coded: Green 1-2, Yellow 3-4, Red 5+ credits)
- Reading time estimate
- Topic tags
- Hover effect: Subtle lift animation

**Interaction**: Click → Opens Article Preview Modal

### 3. Article Preview Modal

**Must Have:**
- Full article headline
- Publisher name + logo
- Author name + publication date
- **Excerpt preview** (first 2-3 paragraphs)
- Blur/fade effect at preview cutoff
- **Unlock CTA**: "Unlock for 3 credits"
- Credit balance reminder
- "Save to Reading List" and Share options

### 4. Article Reader Screen

**Must Have:**
- Full article content (mocked)
- **FactrAI Header Bar** (sticky):
  - Back navigation
  - "Unlocked with FactrAI" badge
  - Current credit balance
  - Save and Share buttons
- Clean reading experience with proper typography
- "Similar articles" suggestions at bottom

### 5. Credit Transaction System

**Must Have:**
- Real-time credit deduction
- Animated credit counter update
- Toast notification on unlock
- Transaction logged to history
- Insufficient credits handling

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
│   ├── page.tsx                 # Dashboard/Home
│   ├── article/[id]/page.tsx    # Article Reader
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── ArticleCard.tsx          # Article card in feed
│   ├── ArticleModal.tsx         # Preview modal
│   ├── CreditBalance.tsx        # Credit display widget
│   ├── ArticleFeed.tsx          # Grid of articles
│   ├── UserMenu.tsx             # Profile dropdown
│   ├── Button.tsx               # Reusable button
│   ├── Card.tsx                 # Reusable card
│   └── Input.tsx                # Reusable input
├── data/
│   ├── articles.json            # Mock article data
│   ├── publishers.json          # Mock publisher data
│   └── user.json                # Mock user data
├── public/
│   └── logo.png                 # FactrAI logo
└── README.md                    # This file
```

---

## Development Phases

### Phase 1: Core Experience (Week 1)
- ✅ Dashboard with article feed
- ✅ Article cards
- ✅ Credit balance display
- ✅ Basic mock data

### Phase 2: Interactions (Week 2)
- 🔄 Article preview modal
- 🔄 Unlock functionality
- 🔄 Credit deduction logic
- 🔄 Article reader page

### Phase 3: Polish (Week 3)
- ⏳ Animations & transitions
- ⏳ Responsive design
- ⏳ Loading states
- ⏳ Error handling
- ⏳ Final mock data integration

---

## Out of Scope (Demo v1)

Not including in this demo:
- User registration/onboarding flow
- Payment processing (add credits)
- Social features (comments, sharing)
- Mobile app
- Browser extension
- Publisher dashboard
- Advanced search/filtering
- User settings/preferences
- Reading history export

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
