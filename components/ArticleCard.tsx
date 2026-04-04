'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, TrendingUp, Lock, CheckCircle, Coins } from 'lucide-react';
import { Article } from '@/types';
import { getPublisherById, isArticleUnlocked } from '@/lib/mockData';
import { useApp } from '@/contexts/AppContext';
import Badge from './Badge';
import Button from './Button';
import Card from './Card';

interface ArticleCardProps {
  article: Article;
  onUnlock?: (articleId: string) => void;
}

export default function ArticleCard({ article, onUnlock }: ArticleCardProps) {
  const { unlockArticle } = useApp();
  const publisher = getPublisherById(article.publisherId);
  const unlocked = isArticleUnlocked(article.id);

  const handleUnlock = () => {
    const success = unlockArticle(article.id, article.creditCost);
    if (success && onUnlock) {
      onUnlock(article.id);
    }
  };

  // Format date
  const publishDate = new Date(article.publishedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card variant="default" className="group hover-lift overflow-hidden h-full flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <Image
          src={article.thumbnailUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Trending Badge */}
        {article.trending && (
          <div className="absolute top-3 left-3">
            <Badge variant="primary" size="sm" className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </Badge>
          </div>
        )}

        {/* Unlocked Badge */}
        {unlocked && (
          <div className="absolute top-3 right-3">
            <Badge variant="success" size="sm" className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Unlocked
            </Badge>
          </div>
        )}

        {/* Publisher Logo Badge */}
        {publisher && (
          <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-sm w-[56px] h-[56px] flex items-center justify-center">
            <Image
              src={publisher.logoUrl}
              alt={publisher.name}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Publisher */}
        {publisher && (
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xs font-semibold text-primary">
              {publisher.name}
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="text-xs text-gray-500">{publishDate}</div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-bunting mb-2 font-newsreader line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
          {article.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readingTime} min
          </span>
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          <span>{article.author}</span>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Action */}
        <div className="flex items-center justify-between gap-6 pt-4 border-t border-gray-100">
          {/* Credit Cost Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
            <Coins className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {article.creditCost}
            </span>
          </div>
          
          {!unlocked ? (
            <Button 
              variant="primary" 
              onClick={handleUnlock}
              className="flex items-center gap-2 text-sm px-4 py-2"
            >
              <Lock className="w-4 h-4" />
              Unlock
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="flex items-center justify-center gap-2 text-sm px-4 py-2"
            >
              Read Now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
