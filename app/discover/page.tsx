'use client';

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import PageContainer from '@/components/PageContainer';
import Section from '@/components/Section';
import ArticleList from '@/components/ArticleList';
import { getArticles, getTrendingArticles } from '@/lib/mockData';
import { Search, SlidersHorizontal } from 'lucide-react';
import Badge from '@/components/Badge';

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const allArticles = getArticles();
  const trendingArticles = getTrendingArticles();
  
  // Get unique tags
  const allTags = Array.from(new Set(allArticles.flatMap(a => a.tags))).sort();
  
  // Filter articles
  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = !selectedTag || article.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <AppShell title="Discover">
      <PageContainer>
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            {/* Filter Button (Mobile) */}
            <button className="md:hidden flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === null
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Section */}
        {!searchQuery && !selectedTag && trendingArticles.length > 0 && (
          <Section 
            title="Trending Now" 
            className="mb-12"
          >
            <ArticleList articles={trendingArticles} />
          </Section>
        )}

        {/* All Articles */}
        <Section 
          title={selectedTag ? `${selectedTag} Articles` : 'All Articles'}
        >
          <ArticleList 
            articles={filteredArticles}
            emptyMessage="No articles found"
            emptyDescription="Try adjusting your search or filters"
          />
        </Section>
      </PageContainer>
    </AppShell>
  );
}
