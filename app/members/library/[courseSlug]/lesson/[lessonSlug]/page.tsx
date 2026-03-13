import React from 'react';
import { getCourseBySlug, getLessonBySlug, getNextLesson, getPreviousLesson } from '@/lib/members/helpers';
import { LessonPlayerShell, CourseCurriculum, Breadcrumbs, EmptyState } from '@/components/members';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CheckCircle, FileText } from 'lucide-react';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string, lessonSlug: string }>
}) {
  const { courseSlug, lessonSlug } = await params;
  const course = await getCourseBySlug(courseSlug);
  const lesson = await getLessonBySlug(courseSlug, lessonSlug);
  
  if (!course || !lesson) {
    return (
      <div className="container mx-auto px-4 py-12">
        <EmptyState 
          title="Lesson Not Found" 
          description="The lesson you are looking for does not exist or has been removed."
          action={
            <Link href="/members/library" className="px-6 py-3 rounded-full bg-[var(--color-surface-3)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-1)] transition-colors border border-[var(--color-border)]">
              Back to Library
            </Link>
          }
        />
      </div>
    );
  }

  const nextLesson = await getNextLesson(course, lesson.slug);
  const prevLesson = await getPreviousLesson(course, lesson.slug);
  const isCompleted = false; // Mock progress

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <Breadcrumbs 
        items={[
          { label: 'Library', href: '/members/library' },
          { label: course.title, href: `/members/library/${course.slug}` },
          { label: lesson.title }
        ]} 
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-grow lg:w-2/3 xl:w-3/4">
          <LessonPlayerShell lesson={lesson} />
          
          <div className="mt-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)] tracking-tight mb-4">{lesson.title}</h1>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">{lesson.description}</p>
            </div>
            
            <button className={`flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-colors border ${isCompleted ? 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20' : 'bg-[var(--color-surface-2)] text-[var(--color-text-primary)] border-[var(--color-border)] hover:border-[var(--color-accent-soft-pink)]/50 hover:text-[var(--color-accent-soft-pink)]'}`}>
              <CheckCircle className="w-5 h-5" />
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
          
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="mt-12 p-6 bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)]">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Resources</h3>
              <ul className="space-y-3">
                {lesson.resources.map((resource, idx) => (
                  <li key={idx}>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-surface-3)] transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-accent-soft-pink)]">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">{resource.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevLesson ? (
              <Link href={`/members/library/${course.slug}/lesson/${prevLesson.slug}`} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[var(--color-surface-2)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-3)] transition-colors border border-[var(--color-border)]">
                <ChevronLeft className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs text-[var(--color-text-secondary)]">Previous</div>
                  <div className="truncate max-w-[200px]">{prevLesson.title}</div>
                </div>
              </Link>
            ) : (
              <div className="w-full sm:w-auto" />
            )}
            
            {nextLesson ? (
              <Link href={`/members/library/${course.slug}/lesson/${nextLesson.slug}`} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[var(--color-surface-2)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-3)] transition-colors border border-[var(--color-border)]">
                <div className="text-right">
                  <div className="text-xs text-[var(--color-text-secondary)]">Next</div>
                  <div className="truncate max-w-[200px]">{nextLesson.title}</div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link href={`/members/library/${course.slug}`} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[var(--color-accent-soft-pink)] text-[var(--color-background)] font-bold hover:bg-[var(--color-accent-hover)] transition-colors">
                <CheckCircle className="w-5 h-5" />
                Finish Course
              </Link>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-1/3 xl:w-1/4 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">Course Content</h3>
            <CourseCurriculum course={course} currentLessonSlug={lesson.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
