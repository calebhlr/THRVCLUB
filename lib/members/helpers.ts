import { Course, Lesson, CourseProgressSummary, UserProgress } from '@/types/members';
import { MOCK_COURSES, MOCK_USER_PROGRESS } from '@/data/members/mock';

// In a real app, these would fetch from Neon Postgres via Prisma/Drizzle

export async function getAllCourses(): Promise<Course[]> {
  return MOCK_COURSES.filter(c => c.status === 'published');
}

export async function getCourseBySlug(courseSlug: string): Promise<Course | null> {
  const course = MOCK_COURSES.find(c => c.slug === courseSlug && c.status === 'published');
  return course || null;
}

export async function getLessonBySlug(courseSlug: string, lessonSlug: string): Promise<Lesson | null> {
  const course = await getCourseBySlug(courseSlug);
  if (!course) return null;
  
  for (const courseModule of course.modules) {
    const lesson = courseModule.lessons.find(l => l.slug === lessonSlug);
    if (lesson) return lesson;
  }
  return null;
}

export function getFlattenedLessons(course: Course): Lesson[] {
  return course.modules
    .sort((a, b) => a.order - b.order)
    .flatMap(m => m.lessons.sort((a, b) => a.order - b.order));
}

export async function getNextLesson(course: Course, currentLessonSlug: string): Promise<Lesson | null> {
  const allLessons = getFlattenedLessons(course);
  const currentIndex = allLessons.findIndex(l => l.slug === currentLessonSlug);
  
  if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
    return null;
  }
  return allLessons[currentIndex + 1];
}

export async function getPreviousLesson(course: Course, currentLessonSlug: string): Promise<Lesson | null> {
  const allLessons = getFlattenedLessons(course);
  const currentIndex = allLessons.findIndex(l => l.slug === currentLessonSlug);
  
  if (currentIndex <= 0) {
    return null;
  }
  return allLessons[currentIndex - 1];
}

export async function getFeaturedCourse(): Promise<Course | null> {
  return MOCK_COURSES.find(c => c.isFeatured && c.status === 'published') || null;
}

export async function searchCoursesAndLessons(query: string, filters?: { category?: string, level?: string }) {
  let courses = await getAllCourses();
  
  if (filters?.category) {
    courses = courses.filter(c => c.category === filters.category);
  }
  if (filters?.level) {
    courses = courses.filter(c => c.level === filters.level);
  }
  
  if (!query) return { courses, lessons: [] };
  
  const lowerQuery = query.toLowerCase();
  
  const matchedCourses = courses.filter(c => 
    c.title.toLowerCase().includes(lowerQuery) || 
    c.description.toLowerCase().includes(lowerQuery) ||
    c.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
  
  const matchedLessons: { course: Course, lesson: Lesson }[] = [];
  
  for (const course of courses) {
    const lessons = getFlattenedLessons(course);
    for (const lesson of lessons) {
      if (lesson.title.toLowerCase().includes(lowerQuery) || lesson.description.toLowerCase().includes(lowerQuery)) {
        matchedLessons.push({ course, lesson });
      }
    }
  }
  
  return { courses: matchedCourses, lessons: matchedLessons };
}

export async function getCourseProgress(userId: string, courseSlug: string): Promise<CourseProgressSummary | null> {
  const course = await getCourseBySlug(courseSlug);
  if (!course) return null;
  
  const allLessons = getFlattenedLessons(course);
  const userProgress = MOCK_USER_PROGRESS.filter(p => p.userId === userId && p.courseId === course.id);
  
  const completedLessons = userProgress.filter(p => p.completed).length;
  const totalLessons = allLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  
  // Find last watched lesson
  const sortedProgress = [...userProgress].sort((a, b) => new Date(b.lastWatchedAt).getTime() - new Date(a.lastWatchedAt).getTime());
  
  let lastLessonSlug = allLessons[0]?.slug || '';
  let lastLessonTitle = allLessons[0]?.title || '';
  let lastActivityAt = new Date().toISOString();
  
  if (sortedProgress.length > 0) {
    const lastLesson = allLessons.find(l => l.id === sortedProgress[0].lessonId);
    if (lastLesson) {
      lastLessonSlug = lastLesson.slug;
      lastLessonTitle = lastLesson.title;
      lastActivityAt = sortedProgress[0].lastWatchedAt;
    }
  }
  
  return {
    courseId: course.id,
    userId,
    completedLessons,
    totalLessons,
    progressPercent,
    lastLessonSlug,
    lastLessonTitle,
    lastActivityAt
  };
}

export async function getContinueWatchingLesson(userId: string): Promise<{ course: Course, lesson: Lesson, progress: number } | null> {
  // Find most recently watched lesson across all courses
  const sortedProgress = [...MOCK_USER_PROGRESS]
    .filter(p => p.userId === userId && !p.completed)
    .sort((a, b) => new Date(b.lastWatchedAt).getTime() - new Date(a.lastWatchedAt).getTime());
    
  if (sortedProgress.length === 0) return null;
  
  const recent = sortedProgress[0];
  const course = MOCK_COURSES.find(c => c.id === recent.courseId);
  if (!course) return null;
  
  const allLessons = getFlattenedLessons(course);
  const lesson = allLessons.find(l => l.id === recent.lessonId);
  if (!lesson) return null;
  
  return {
    course,
    lesson,
    progress: recent.progressPercent
  };
}

export async function getUserStartedCourses(userId: string): Promise<Course[]> {
  const startedCourseIds = new Set(MOCK_USER_PROGRESS.filter(p => p.userId === userId).map(p => p.courseId));
  return MOCK_COURSES.filter(c => startedCourseIds.has(c.id));
}

export async function getUserCompletedCourses(userId: string): Promise<Course[]> {
  const startedCourses = await getUserStartedCourses(userId);
  const completedCourses: Course[] = [];
  
  for (const course of startedCourses) {
    const progress = await getCourseProgress(userId, course.slug);
    if (progress && progress.progressPercent === 100) {
      completedCourses.push(course);
    }
  }
  return completedCourses;
}

export async function getProfileSummary(userId: string) {
  const started = await getUserStartedCourses(userId);
  const completed = await getUserCompletedCourses(userId);
  
  let totalWatchTime = 0; // In a real app, calculate from progress
  
  return {
    totalCoursesStarted: started.length,
    totalCoursesCompleted: completed.length,
    totalWatchTimeHours: Math.round(totalWatchTime / 3600)
  };
}
