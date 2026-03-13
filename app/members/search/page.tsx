import React from 'react';
import { searchCoursesAndLessons } from '@/lib/members/helpers';
import { CourseCard, SectionHeader, EmptyState } from '@/components/members';
import Link from 'next/link';
import { Search, PlayCircle, Clock } from 'lucide-react';
import Image from 'next/image';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : '';
  
  const { courses, lessons } = await searchCoursesAndLessons(query);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <SectionHeader 
        title="Search" 
        subtitle="Find courses, modules, and lessons." 
      />
      
      <div className="mb-12">
        <form action="/members/search" method="GET" className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[var(--color-text-secondary)]" />
          </div>
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search for anything..."
            className="block w-full pl-12 pr-4 py-4 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-soft-pink)] focus:border-transparent transition-all"
          />
          <button type="submit" className="absolute inset-y-2 right-2 px-6 py-2 bg-[var(--color-surface-3)] text-[var(--color-text-primary)] font-medium rounded-xl hover:bg-[var(--color-surface-1)] transition-colors border border-[var(--color-border)]">
            Search
          </button>
        </form>
      </div>
      
      {query && (
        <div className="space-y-12">
          {courses.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Courses ({courses.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}
          
          {lessons.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Lessons ({lessons.length})</h3>
              <div className="space-y-4">
                {lessons.map(({ course, lesson }) => (
                  <Link 
                    key={`${course.id}-${lesson.id}`} 
                    href={`/members/library/${course.slug}/lesson/${lesson.slug}`}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent-soft-pink)]/50 transition-all duration-300 group"
                  >
                    <div className="relative w-full sm:w-48 aspect-video bg-[var(--color-surface-3)] rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={lesson.thumbnail || course.thumbnail} alt={lesson.title} fill className="object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                        <PlayCircle className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-xs font-medium text-[var(--color-accent-soft-pink)] mb-1">{course.title}</div>
                      <h4 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-soft-pink)] transition-colors mb-2">{lesson.title}</h4>
                      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">{lesson.description}</p>
                      <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {Math.round(lesson.duration / 60)}m</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {courses.length === 0 && lessons.length === 0 && (
            <EmptyState 
              title="No results found" 
              description={`We couldn't find anything matching "${query}". Try adjusting your search terms.`}
            />
          )}
        </div>
      )}
      
      {!query && (
        <div className="text-center py-24 text-[var(--color-text-secondary)]">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>Enter a search term to find courses and lessons.</p>
        </div>
      )}
    </div>
  );
}
