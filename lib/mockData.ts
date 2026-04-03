import { User, Publisher, Article, Transaction, AnalyticsData, AnalyticsPeriodData, TimePeriod } from '@/types';
import userData from '@/data/user.json';
import publishersData from '@/data/publishers.json';
import articlesData from '@/data/articles.json';
import transactionsData from '@/data/transactions.json';
import analyticsData from '@/data/analytics.json';

// Get current user
export function getUser(): User {
  return userData as User;
}

// Get all publishers
export function getPublishers(): Publisher[] {
  return publishersData as Publisher[];
}

// Get publisher by ID
export function getPublisherById(id: string): Publisher | undefined {
  return publishersData.find((p) => p.id === id) as Publisher | undefined;
}

// Get all articles
export function getArticles(): Article[] {
  return articlesData as Article[];
}

// Get article by ID
export function getArticleById(id: string): Article | undefined {
  return articlesData.find((a) => a.id === id) as Article | undefined;
}

// Get trending articles
export function getTrendingArticles(): Article[] {
  return articlesData.filter((a) => a.trending) as Article[];
}

// Get articles by publisher
export function getArticlesByPublisher(publisherId: string): Article[] {
  return articlesData.filter((a) => a.publisherId === publisherId) as Article[];
}

// Get articles by tag
export function getArticlesByTag(tag: string): Article[] {
  return articlesData.filter((a) => a.tags.includes(tag)) as Article[];
}

// Search articles by title or excerpt
export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return articlesData.filter(
    (a) =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.excerpt.toLowerCase().includes(lowerQuery)
  ) as Article[];
}

// Get all transactions
export function getTransactions(): Transaction[] {
  return transactionsData as Transaction[];
}

// Get recent transactions (limit)
export function getRecentTransactions(limit: number = 10): Transaction[] {
  return transactionsData.slice(0, limit) as Transaction[];
}

// Get unlocked article IDs
export function getUnlockedArticleIds(): string[] {
  return transactionsData
    .filter((t) => t.type === 'unlock' && t.articleId)
    .map((t) => t.articleId as string);
}

// Check if article is unlocked
export function isArticleUnlocked(articleId: string): boolean {
  return transactionsData.some(
    (t) => t.type === 'unlock' && t.articleId === articleId
  );
}

// Get unlocked articles with full details
export function getUnlockedArticles(): Article[] {
  const unlockedIds = getUnlockedArticleIds();
  return articlesData.filter((a) => unlockedIds.includes(a.id)) as Article[];
}

// Get all unique tags
export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  articlesData.forEach((article) => {
    article.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

// Calculate total credits spent
export function getTotalCreditsSpent(): number {
  return Math.abs(
    transactionsData
      .filter((t) => t.credits < 0)
      .reduce((sum, t) => sum + t.credits, 0)
  );
}

// Calculate total credits purchased
export function getTotalCreditsPurchased(): number {
  return transactionsData
    .filter((t) => t.type === 'purchase')
    .reduce((sum, t) => sum + t.credits, 0);
}

// Get analytics data for a specific time period
export function getAnalytics(period: TimePeriod = 'thisMonth'): AnalyticsData {
  const data = analyticsData as AnalyticsPeriodData;
  return data[period];
}

// Get all analytics data
export function getAllAnalytics(): AnalyticsPeriodData {
  return analyticsData as AnalyticsPeriodData;
}
