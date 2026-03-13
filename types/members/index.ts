export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  duration: number; // in seconds
  thumbnail: string;
  order: number;
  completed?: boolean;
  progress?: number;
  videoProvider: 'youtube' | 'vk' | 'vimeo' | 'custom';
  videoUrl?: string;
  embedUrl?: string;
  videoId?: string;
  isPreview: boolean;
  resources?: { title: string; url: string; type: string }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  instructor: {
    name: string;
    avatar: string;
    bio?: string;
  };
  thumbnail: string;
  banner: string;
  durationTotal: number; // in seconds
  lessonCount: number;
  progress?: number;
  status: 'draft' | 'published' | 'archived';
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
  modules: Module[];
}

export interface UserProgress {
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  progressPercent: number;
  lastWatchedAt: string; // ISO date
}

export interface CourseProgressSummary {
  courseId: string;
  userId: string;
  completedLessons: number;
  totalLessons: number;
  progressPercent: number;
  lastLessonSlug: string;
  lastLessonTitle: string;
  lastActivityAt: string; // ISO date
}
