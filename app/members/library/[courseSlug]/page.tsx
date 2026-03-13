import React from 'react';
import { getCourseBySlug, getCourseProgress } from '@/lib/members/helpers';
import { CourseHero, CourseCurriculum, Breadcrumbs, EmptyState } from '@/components/members';
import Link from 'next/link';

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>
}) {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);
  const userId = 'user1'; // Mock user ID
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <EmptyState 
          title="Course Not Found" 
          description="The course you are looking for does not exist or has been removed."
          action={
            <Link href="/members/library" className="px-6 py-3 rounded-full bg-[var(--color-surface-3)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-1)] transition-colors border border-[var(--color-border)]">
              Back to Library
            </Link>
          }
        />
      </div>
    );
  }

  const progress = await getCourseProgress(userId, course.slug);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <Breadcrumbs 
        items={[
          { label: 'Library', href: '/members/library' },
          { label: course.title }
        ]} 
      />
      
      <CourseHero course={course} />
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight mb-8">Course Curriculum</h2>
        <CourseCurriculum course={course} />
      </div>
    </div>
  );
}
