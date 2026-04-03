import React from 'react';
import { Article } from '@/types';
import ArticleCard from './ArticleCard';
import { SkeletonCard } from './Skeleton';
import EmptyState from './EmptyState';
import { FileText } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  isLoading?: boolean;
  emptyMessage?: string;
  emptyDescription?: string;
  onArticleUnlock?: (articleId: string) => void;
}

export default function ArticleList({
  articles,
  isLoading = false,
  emptyMessage = 'No articles found',
  emptyDescription = 'Try adjusting your search or filters',
  onArticleUnlock,
}: ArticleListProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!articles || articles.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="w-16 h-16" />}
        title={emptyMessage}
        description={emptyDescription}
      />
    );
  }

  // Articles grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onUnlock={onArticleUnlock}
        />
      ))}
    </div>
  );
}
