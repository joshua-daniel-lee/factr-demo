// User Types
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

// Publisher Types
export interface Publisher {
  id: string;
  name: string;
  logoUrl: string;
  domain: string;
}

// Article Types
export interface Article {
  id: string;
  publisherId: string;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string; // ISO 8601 format
  thumbnailUrl: string;
  creditCost: number;
  readingTime: number; // minutes
  tags: string[];
  trending?: boolean;
}

// Transaction Types
export type TransactionType = 'unlock' | 'purchase' | 'refund';

export interface Transaction {
  id: string;
  type: TransactionType;
  articleId?: string; // Only for unlocks
  credits: number; // Negative for deductions, positive for additions
  balanceAfter: number;
  timestamp: string; // ISO 8601 format
}

// Unlocked Article (extends Article with unlock data)
export interface UnlockedArticle extends Article {
  unlockedAt: string;
  expiresAt?: string;
}

// UI State Types
export interface AppState {
  user: User;
  isLoading: boolean;
}

// Analytics Types
export type TimePeriod = 'thisWeek' | 'thisMonth' | 'last3Months' | 'allTime';

export interface StatMetric {
  current: number;
  previous: number;
  percentChange: number;
}

export interface AnalyticsOverview {
  articlesUnlocked: StatMetric;
  creditsSpent: StatMetric;
  avgCostPerArticle: StatMetric;
  readingFrequency: StatMetric;
}

export interface PublisherBreakdown {
  publisherId: string;
  publisherName: string;
  creditsSpent: number;
  articleCount: number;
}

export interface TopicAnalysis {
  topic: string;
  articleCount: number;
  percentage: number;
}

export interface SubscriptionCost {
  publisher: string;
  monthlyCost: number;
}

export interface SavingsData {
  totalSaved: number;
  subscriptionCosts: SubscriptionCost[];
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  publisherBreakdown: PublisherBreakdown[];
  topicAnalysis: TopicAnalysis[];
  savings: SavingsData;
}

export interface AnalyticsPeriodData {
  thisWeek: AnalyticsData;
  thisMonth: AnalyticsData;
  last3Months: AnalyticsData;
  allTime: AnalyticsData;
}
