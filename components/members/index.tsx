import React from 'react';
import Link from 'next/link';
import { Search, Bell, User, ChevronRight, PlayCircle, Clock, BookOpen, CheckCircle, Lock, Menu, X } from 'lucide-react';
import { Course, Lesson, Module } from '@/types/members';
import Image from 'next/image';

export const MembersHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-surface-1)]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/members" className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] uppercase">
            THRV<span className="text-[var(--color-accent-soft-pink)]">CLUB</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--color-text-secondary)]">
            <Link href="/members" className="hover:text-[var(--color-text-primary)] transition-colors">Dashboard</Link>
            <Link href="/members/library" className="hover:text-[var(--color-text-primary)] transition-colors">Library</Link>
            <Link href="/members/search" className="hover:text-[var(--color-text-primary)] transition-colors">Search</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/members/search" className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <button className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export const ProfileMenu = () => {
  return (
    <Link href="/members/profile" className="w-8 h-8 rounded-full bg-[var(--color-surface-3)] flex items-center justify-center border border-[var(--color-border)] overflow-hidden">
      <User className="w-4 h-4 text-[var(--color-text-secondary)]" />
    </Link>
  );
};

export const ProgressBar = ({ progress, className = '' }: { progress: number, className?: string }) => {
  return (
    <div className={`w-full bg-[var(--color-surface-3)] rounded-full h-1.5 overflow-hidden ${className}`}>
      <div 
        className="bg-[var(--color-accent-soft-pink)] h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export const CategoryPill = ({ category }: { category: string }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
      {category}
    </span>
  );
};

export const CourseCard = ({ course, progress }: { course: Course, progress?: number }) => {
  return (
    <Link href={`/members/library/${course.slug}`} className="group flex flex-col bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent-soft-pink)]/50 transition-all duration-300">
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-surface-3)]">
        <Image src={course.thumbnail} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-2)] to-transparent opacity-60" />
        {course.isNew && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-[var(--color-accent-soft-pink)] text-[var(--color-background)] text-xs font-bold rounded-md uppercase tracking-wider">
            New
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <CategoryPill category={course.category} />
          <span className="text-xs text-[var(--color-text-secondary)]">{course.level}</span>
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--color-accent-soft-pink)] transition-colors">{course.title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4 flex-grow">{course.shortDescription}</p>
        
        {progress !== undefined ? (
          <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
            <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-2">
              <span>{progress}% Complete</span>
            </div>
            <ProgressBar progress={progress} />
          </div>
        ) : (
          <div className="mt-auto pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{course.lessonCount} lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{Math.round(course.durationTotal / 3600)}h {Math.round((course.durationTotal % 3600) / 60)}m</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export const SectionHeader = ({ title, subtitle, action }: { title: string, subtitle?: string, action?: React.ReactNode }) => {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">{title}</h2>
        {subtitle && <p className="text-[var(--color-text-secondary)] mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const ContinueWatchingCard = ({ course, lesson, progress }: { course: Course, lesson: Lesson, progress: number }) => {
  return (
    <Link href={`/members/library/${course.slug}/lesson/${lesson.slug}`} className="group relative flex flex-col md:flex-row bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent-soft-pink)]/50 transition-all duration-300">
      <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto bg-[var(--color-surface-3)]">
        <Image src={lesson.thumbnail || course.thumbnail} alt={lesson.title} fill className="object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
          <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
        </div>
      </div>
      <div className="p-6 flex flex-col justify-center flex-grow">
        <div className="text-xs font-medium text-[var(--color-accent-soft-pink)] mb-2 uppercase tracking-wider">Continue Watching</div>
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">{course.title}</h3>
        <p className="text-[var(--color-text-secondary)] mb-6">Up next: {lesson.title}</p>
        
        <div className="mt-auto">
          <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-2">
            <span>{progress}% Complete</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>
    </Link>
  );
};

export const CourseHero = ({ course }: { course: Course }) => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[var(--color-surface-2)] border border-[var(--color-border)] mb-12">
      <div className="absolute inset-0">
        <Image src={course.banner} alt={course.title} fill className="object-cover opacity-40" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
      </div>
      
      <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <CategoryPill category={course.category} />
          <span className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {Math.round(course.durationTotal / 3600)}h {Math.round((course.durationTotal % 3600) / 60)}m
          </span>
          <span className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {course.lessonCount} lessons
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] tracking-tight mb-6 leading-tight">
          {course.title}
        </h1>
        
        <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-2xl leading-relaxed">
          {course.description}
        </p>
        
        <div className="flex items-center gap-6">
          {course.modules[0]?.lessons[0]?.slug && (
            <Link href={`/members/library/${course.slug}/lesson/${course.modules[0]?.lessons[0]?.slug}`} className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--color-accent-soft-pink)] text-[var(--color-background)] font-bold hover:bg-[var(--color-accent-hover)] transition-colors">
              <PlayCircle className="w-5 h-5 mr-2" />
              Start Course
            </Link>
          )}
          
          <div className="flex items-center gap-3">
            <Image src={course.instructor.avatar} alt={course.instructor.name} width={40} height={40} className="rounded-full border border-[var(--color-border)]" referrerPolicy="no-referrer" />
            <div>
              <div className="text-sm font-medium text-[var(--color-text-primary)]">{course.instructor.name}</div>
              <div className="text-xs text-[var(--color-text-secondary)]">Instructor</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CourseCurriculum = ({ course, currentLessonSlug }: { course: Course, currentLessonSlug?: string }) => {
  return (
    <div className="space-y-6">
      {course.modules.sort((a, b) => a.order - b.order).map((module, index) => (
        <div key={module.id} className="bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
          <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface-3)]/50">
            <div className="text-sm font-medium text-[var(--color-accent-soft-pink)] mb-1">Module {index + 1}</div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{module.title}</h3>
            {module.description && <p className="text-sm text-[var(--color-text-secondary)] mt-2">{module.description}</p>}
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {module.lessons.sort((a, b) => a.order - b.order).map((lesson, lessonIndex) => {
              const isActive = currentLessonSlug === lesson.slug;
              const isLocked = !lesson.isPreview && false; // In a real app, check if user has access
              
              return (
                <Link 
                  key={lesson.id} 
                  href={`/members/library/${course.slug}/lesson/${lesson.slug}`}
                  className={`flex items-center gap-4 p-4 transition-colors ${isActive ? 'bg-[var(--color-surface-3)] border-l-2 border-l-[var(--color-accent-soft-pink)]' : 'hover:bg-[var(--color-surface-3)]/50 border-l-2 border-l-transparent'}`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-surface-1)] border border-[var(--color-border)] flex items-center justify-center text-xs font-medium text-[var(--color-text-secondary)]">
                    {lessonIndex + 1}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className={`text-sm font-medium truncate ${isActive ? 'text-[var(--color-accent-soft-pink)]' : 'text-[var(--color-text-primary)]'}`}>
                      {lesson.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-text-secondary)]">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {Math.round(lesson.duration / 60)}m</span>
                      {lesson.isPreview && <span className="text-[var(--color-success)]">Preview</span>}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-[var(--color-text-secondary)]">
                    {isLocked ? <Lock className="w-4 h-4" /> : <PlayCircle className={`w-5 h-5 ${isActive ? 'text-[var(--color-accent-soft-pink)]' : ''}`} />}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export const LessonPlayerShell = ({ lesson }: { lesson: Lesson }) => {
  console.log('[VideoLibrary] Rendering player for lesson:', lesson.id, lesson.videoProvider);
  
  if (!lesson.videoId && !lesson.videoUrl && !lesson.embedUrl) {
    return (
      <div className="w-full aspect-video bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl flex flex-col items-center justify-center text-[var(--color-text-secondary)]">
        <PlayCircle className="w-12 h-12 mb-4 opacity-50" />
        <p>Video content is not available for this lesson.</p>
      </div>
    );
  }

  let embedUrl = lesson.embedUrl;

  if (!embedUrl) {
    if (lesson.videoProvider === 'youtube' && lesson.videoId) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${lesson.videoId}?rel=0&modestbranding=1`;
    } else if (lesson.videoProvider === 'vk' && lesson.videoId) {
      // VK video ID format: video-oid_vid
      const parts = lesson.videoId.replace('video', '').split('_');
      if (parts.length === 2) {
        embedUrl = `https://vk.com/video_ext.php?oid=${parts[0]}&id=${parts[1]}&hd=2`;
      }
    }
  }

  if (!embedUrl) {
    return (
      <div className="w-full aspect-video bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl flex flex-col items-center justify-center text-[var(--color-text-secondary)]">
        <p>Unsupported video provider: {lesson.videoProvider}</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden border border-[var(--color-border)] relative">
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export const Breadcrumbs = ({ items }: { items: { label: string, href?: string }[] }) => {
  return (
    <nav className="flex text-sm text-[var(--color-text-secondary)] mb-6 overflow-x-auto whitespace-nowrap pb-2">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-[var(--color-text-primary)] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--color-text-primary)] font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const EmptyState = ({ title, description, action }: { title: string, description: string, action?: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)]">
      <div className="w-16 h-16 bg-[var(--color-surface-3)] rounded-full flex items-center justify-center mb-6">
        <Search className="w-8 h-8 text-[var(--color-text-secondary)]" />
      </div>
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{title}</h3>
      <p className="text-[var(--color-text-secondary)] max-w-md mb-8">{description}</p>
      {action}
    </div>
  );
};
