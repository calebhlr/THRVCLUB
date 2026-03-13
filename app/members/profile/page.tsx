import React from 'react';
import { getProfileSummary, getUserStartedCourses, getUserCompletedCourses } from '@/lib/members/helpers';
import { CourseCard, SectionHeader, EmptyState } from '@/components/members';
import { User, BookOpen, CheckCircle, Clock } from 'lucide-react';

export default async function ProfilePage() {
  const userId = 'user1'; // Mock user ID
  
  const [summary, startedCourses, completedCourses] = await Promise.all([
    getProfileSummary(userId),
    getUserStartedCourses(userId),
    getUserCompletedCourses(userId)
  ]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <SectionHeader 
        title="My Profile" 
        subtitle="Manage your account and view your progress." 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)] p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-surface-3)] flex items-center justify-center border border-[var(--color-border)]">
            <BookOpen className="w-6 h-6 text-[var(--color-accent-soft-pink)]" />
          </div>
          <div>
            <div className="text-sm font-medium text-[var(--color-text-secondary)]">Courses Started</div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{summary.totalCoursesStarted}</div>
          </div>
        </div>
        
        <div className="bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)] p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-surface-3)] flex items-center justify-center border border-[var(--color-border)]">
            <CheckCircle className="w-6 h-6 text-[var(--color-success)]" />
          </div>
          <div>
            <div className="text-sm font-medium text-[var(--color-text-secondary)]">Courses Completed</div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{summary.totalCoursesCompleted}</div>
          </div>
        </div>
        
        <div className="bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)] p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-surface-3)] flex items-center justify-center border border-[var(--color-border)]">
            <Clock className="w-6 h-6 text-[var(--color-text-secondary)]" />
          </div>
          <div>
            <div className="text-sm font-medium text-[var(--color-text-secondary)]">Watch Time</div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{summary.totalWatchTimeHours}h</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">In Progress</h3>
          {startedCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {startedCourses.map(course => (
                <CourseCard key={course.id} course={course} progress={45} /> // Mock progress
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No courses in progress" 
              description="You haven't started any courses yet."
            />
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Completed</h3>
          {completedCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map(course => (
                <CourseCard key={course.id} course={course} progress={100} />
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No completed courses" 
              description="You haven't completed any courses yet."
            />
          )}
        </div>
      </div>
    </div>
  );
}
