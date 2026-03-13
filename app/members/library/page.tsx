import React from 'react';
import { getAllCourses } from '@/lib/members/helpers';
import { CourseCard, SectionHeader } from '@/components/members';
import Link from 'next/link';

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const level = typeof params.level === 'string' ? params.level : undefined;
  
  let courses = await getAllCourses();
  
  if (category) {
    courses = courses.filter(c => c.category === category);
  }
  if (level) {
    courses = courses.filter(c => c.level === level);
  }

  const categories = Array.from(new Set((await getAllCourses()).map(c => c.category)));
  const levels = Array.from(new Set((await getAllCourses()).map(c => c.level)));

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionHeader 
        title="Course Library" 
        subtitle="Explore our premium collection of courses." 
      />
      
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">Categories</h3>
            <div className="space-y-2">
              <Link 
                href="/members/library" 
                className={`block text-sm ${!category ? 'text-[var(--color-accent-soft-pink)] font-medium' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              >
                All Categories
              </Link>
              {categories.map(cat => (
                <Link 
                  key={cat} 
                  href={`/members/library?category=${encodeURIComponent(cat)}${level ? `&level=${encodeURIComponent(level)}` : ''}`} 
                  className={`block text-sm ${category === cat ? 'text-[var(--color-accent-soft-pink)] font-medium' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">Level</h3>
            <div className="space-y-2">
              <Link 
                href={`/members/library${category ? `?category=${encodeURIComponent(category)}` : ''}`} 
                className={`block text-sm ${!level ? 'text-[var(--color-accent-soft-pink)] font-medium' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              >
                All Levels
              </Link>
              {levels.map(lvl => (
                <Link 
                  key={lvl} 
                  href={`/members/library?level=${encodeURIComponent(lvl)}${category ? `&category=${encodeURIComponent(category)}` : ''}`} 
                  className={`block text-sm ${level === lvl ? 'text-[var(--color-accent-soft-pink)] font-medium' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                >
                  {lvl}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Course Grid */}
        <div className="flex-grow">
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)]">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">No courses found</h3>
              <p className="text-[var(--color-text-secondary)] mb-6">Try adjusting your filters to find what you&apos;re looking for.</p>
              <Link href="/members/library" className="px-6 py-3 rounded-full bg-[var(--color-surface-3)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-1)] transition-colors border border-[var(--color-border)]">
                Clear Filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
