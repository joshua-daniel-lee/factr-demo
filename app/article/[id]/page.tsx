'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, Clock, Share2, Bookmark } from 'lucide-react';
import { getArticleById, getPublisherById, isArticleUnlocked } from '@/lib/mockData';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/components/Toast';
import ArticlePaywall from '@/components/ArticlePaywall';
import Button from '@/components/Button';

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const { unlockArticle } = useApp();
  const { showToast } = useToast();
  const articleId = params.id as string;
  
  const [showPaywall, setShowPaywall] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const article = getArticleById(articleId);
  const publisher = article ? getPublisherById(article.publisherId) : null;

  useEffect(() => {
    if (article) {
      const isUnlocked = isArticleUnlocked(article.id);
      setUnlocked(isUnlocked);
      // Show paywall after a brief delay to simulate page load
      if (!isUnlocked) {
        setTimeout(() => setShowPaywall(true), 800);
      }
    }
  }, [article]);

  if (!article || !publisher) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-bunting mb-2">Article not found</h1>
          <Button variant="primary" onClick={() => router.push('/discover')}>
            Back to Discover
          </Button>
        </div>
      </div>
    );
  }

  const handleUnlock = async () => {
    setIsUnlocking(true);
    const success = unlockArticle(article.id, article.creditCost);
    
    // Simulate processing delay with smooth animation
    setTimeout(() => {
      setIsUnlocking(false);
      if (success) {
        // Start fade out animation
        setShowPaywall(false);
        
        // Show success toast
        showToast(`Article unlocked! ${article.creditCost} credits used`, 'success');
        
        // Reveal content after paywall fades
        setTimeout(() => {
          setUnlocked(true);
          // Smooth scroll to continue reading
          window.scrollTo({ 
            top: window.scrollY + 100, 
            behavior: 'smooth' 
          });
        }, 300);
      }
    }, 800);
  };

  const publishDate = new Date(article.publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Generate mock article content
  const mockContent = [
    `The space industry is experiencing a renaissance unlike anything seen since the Apollo era. Private companies, unburdened by the political constraints and budget limitations that often hamper government agencies, are pushing the boundaries of what's possible beyond Earth's atmosphere.`,
    
    `SpaceX, Blue Origin, and a host of smaller startups are not just launching satellites—they're fundamentally reimagining humanity's relationship with space. Reusable rockets, once the stuff of science fiction, are now routine. Launch costs have plummeted by orders of magnitude, making space more accessible than ever before.`,
    
    `"We're witnessing the democratization of space," says Dr. Sarah Chen, an aerospace engineer at MIT. "What once required the resources of entire nations can now be accomplished by well-funded private ventures. This shift is accelerating innovation at an unprecedented pace."`,
    
    `The competition extends far beyond Earth orbit. Multiple companies are racing to establish the first permanent lunar base, with some setting their sights on Mars. These aren't just ambitious dreams—they're backed by billions in investment and detailed engineering plans.`,
    
    `The economic implications are staggering. The space economy, currently valued at around $400 billion annually, is projected to exceed $1 trillion within the next decade. This growth is being driven not just by satellite launches and space tourism, but by emerging industries like asteroid mining and space-based manufacturing.`,
    
    `However, this new space race isn't without its challenges. Questions about space debris, orbital traffic management, and the militarization of space loom large. International cooperation, which has been a hallmark of space exploration since the International Space Station, is being tested by this new era of commercial competition.`,
    
    `Environmental concerns are also coming to the forefront. While rocket launches currently represent a tiny fraction of global emissions, the planned exponential increase in launch frequency has environmentalists worried. Companies are responding by developing cleaner propulsion technologies and carbon offset programs.`,
    
    `The regulatory landscape is struggling to keep pace. Current space law, largely based on treaties from the 1960s and 1970s, wasn't designed for an era of routine commercial spaceflight. Governments worldwide are racing to update frameworks for everything from launch licensing to property rights on celestial bodies.`,
    
    `Despite these challenges, the momentum seems unstoppable. Jeff Bezos has stated that Blue Origin's ultimate goal is to enable millions of people to live and work in space. Elon Musk envisions a self-sustaining city on Mars. While these visions might seem grandiose, the rapid pace of progress suggests they're not as far-fetched as they once seemed.`,
    
    `The next generation of space entrepreneurs is already emerging. University labs are incubating startups focused on everything from in-space manufacturing to lunar resource extraction. Venture capital is flowing into the sector at record levels, with investors betting that today's moonshots will become tomorrow's profitable enterprises.`,
    
    `As we stand on the brink of becoming a truly spacefaring civilization, one thing is clear: the future of space exploration will be written not just in government agencies, but in corporate boardrooms and startup garages around the world. The new space race is here, and this time, it's being led by private enterprise.`,
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Paywall Modal */}
      {showPaywall && !unlocked && (
        <ArticlePaywall
          creditCost={article.creditCost}
          onUnlock={handleUnlock}
          isUnlocking={isUnlocking}
        />
      )}

      {/* Header Navigation */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-bunting transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          {/* Publisher Logo */}
          <div className="flex items-center gap-3">
            <Image
              src={publisher.logoUrl}
              alt={publisher.name}
              width={120}
              height={30}
              className="object-contain"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bookmark className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Category */}
        <div className="mb-6">
          <span className="text-xs font-bold tracking-wider text-red-600 uppercase">
            {article.tags[0] || 'TECHNOLOGY'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-bunting mb-6 font-newsreader leading-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author & Meta */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-gray-200">
          <div>
            <div className="font-semibold text-bunting mb-1">By {article.author}</div>
            <div className="text-sm text-gray-500">{publishDate}</div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{article.readingTime} min read</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.thumbnailUrl}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className={`prose prose-lg max-w-none ${!unlocked ? 'relative' : ''}`}>
          {mockContent.slice(0, unlocked ? mockContent.length : 3).map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-800 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Blur Effect for Locked Content */}
          {!unlocked && (
            <>
              {mockContent.slice(3, 5).map((paragraph, index) => (
                <p key={`blur-${index}`} className="mb-6 text-gray-800 leading-relaxed blur-sm select-none transition-all duration-500">
                  {paragraph}
                </p>
              ))}
              
              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/80 to-transparent transition-opacity duration-500" />
              
              {/* Unlock CTA */}
              <div className="relative mt-8 text-center">
                <Button
                  variant="dark"
                  onClick={() => setShowPaywall(true)}
                  className="shadow-lg"
                >
                  Continue Reading · {article.creditCost} Credits
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Tags */}
        {unlocked && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
