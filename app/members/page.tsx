import React from 'react';
import { 
  getFeaturedCourse, 
  getContinueWatchingLesson, 
  getUserStartedCourses, 
  getAllCourses 
} from '@/lib/members/helpers';
import { 
  CourseHero, 
  SectionHeader, 
  ContinueWatchingCard, 
  CourseCard 
} from '@/components/members';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default async function DashboardPage() {
  const userId = 'user1'; // Mock user ID, replace with Firebase Auth
  
  const [featuredCourse, continueWatching, startedCourses, allCourses] = await Promise.all([
    getFeaturedCourse(),
    getContinueWatchingLesson(userId),
    getUserStartedCourses(userId),
    getAllCourses()
  ]);

  const newReleases = [...allCourses].filter(c => c.isNew).slice(0, 4);
  const recommended = [...allCourses].filter(c => !c.isNew).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {featuredCourse && (
        <CourseHero course={featuredCourse} />
      )}
      
      {continueWatching && (
        <div className="mb-16">
          <SectionHeader title="Continue Watching" />
          <ContinueWatchingCard 
            course={continueWatching.course} 
            lesson={continueWatching.lesson} 
            progress={continueWatching.progress} 
          />
        </div>
      )}
      
      {startedCourses.length > 0 && (
        <div className="mb-16">
          <SectionHeader 
            title="My Courses" 
            action={
              <Link href="/members/profile" className="text-sm font-medium text-[var(--color-accent-soft-pink)] hover:text-[var(--color-accent-hover)] flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            } 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {startedCourses.slice(0, 4).map(course => (
              <CourseCard key={course.id} course={course} progress={45} /> // Mock progress
            ))}
          </div>
        </div>
      )}
      
      {newReleases.length > 0 && (
        <div className="mb-16">
          <SectionHeader 
            title="New Releases" 
            action={
              <Link href="/members/library" className="text-sm font-medium text-[var(--color-accent-soft-pink)] hover:text-[var(--color-accent-hover)] flex items-center gap-1">
                Browse Library <ChevronRight className="w-4 h-4" />
              </Link>
            } 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newReleases.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
      
      {recommended.length > 0 && (
        <div className="mb-16">
          <SectionHeader title="Recommended for You" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommended.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
