import { Course, UserProgress } from '@/types/members';

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    slug: 'nextjs-masterclass',
    title: 'Next.js App Router Masterclass',
    description: 'Master the Next.js App Router, Server Components, and Server Actions to build modern, scalable web applications. This comprehensive course covers everything from basic routing to advanced data fetching and caching strategies.',
    shortDescription: 'Master the Next.js App Router, Server Components, and Server Actions.',
    category: 'Engineering',
    level: 'Intermediate',
    instructor: {
      name: 'Sarah Drasner',
      avatar: 'https://picsum.photos/seed/sarah/100/100',
      bio: 'VP of Developer Experience at Netlify'
    },
    thumbnail: 'https://picsum.photos/seed/nextjs/600/400',
    banner: 'https://picsum.photos/seed/nextjs-banner/1200/400',
    durationTotal: 12500,
    lessonCount: 12,
    status: 'published',
    isNew: true,
    isFeatured: true,
    tags: ['React', 'Next.js', 'Web Development'],
    modules: [
      {
        id: 'm1',
        title: 'Getting Started',
        description: 'Introduction to the App Router and project setup.',
        order: 1,
        lessons: [
          {
            id: 'l1',
            slug: 'introduction',
            title: 'Introduction to App Router',
            description: 'Learn the core concepts of the new App Router.',
            shortDescription: 'Core concepts of the App Router.',
            duration: 600,
            thumbnail: 'https://picsum.photos/seed/l1/600/400',
            order: 1,
            videoProvider: 'youtube',
            videoId: 'dQw4w9WgXcQ',
            isPreview: true,
          },
          {
            id: 'l2',
            slug: 'routing-fundamentals',
            title: 'Routing Fundamentals',
            description: 'Deep dive into file-system based routing.',
            shortDescription: 'File-system based routing.',
            duration: 900,
            thumbnail: 'https://picsum.photos/seed/l2/600/400',
            order: 2,
            videoProvider: 'youtube',
            videoId: 'dQw4w9WgXcQ',
            isPreview: false,
          }
        ]
      },
      {
        id: 'm2',
        title: 'Data Fetching',
        description: 'Server Components and data fetching strategies.',
        order: 2,
        lessons: [
          {
            id: 'l3',
            slug: 'server-components',
            title: 'React Server Components',
            description: 'Understanding RSCs vs Client Components.',
            shortDescription: 'RSCs vs Client Components.',
            duration: 1200,
            thumbnail: 'https://picsum.photos/seed/l3/600/400',
            order: 1,
            videoProvider: 'vk',
            videoId: 'video-22822305_456239018', // Mock VK video ID
            isPreview: false,
          }
        ]
      }
    ]
  },
  {
    id: 'c2',
    slug: 'advanced-ui-design',
    title: 'Advanced UI Design Systems',
    description: 'Learn how to build scalable, accessible, and beautiful design systems from scratch using Figma and modern CSS techniques.',
    shortDescription: 'Build scalable, accessible design systems.',
    category: 'Design',
    level: 'Advanced',
    instructor: {
      name: 'Gary Simon',
      avatar: 'https://picsum.photos/seed/gary/100/100',
    },
    thumbnail: 'https://picsum.photos/seed/design/600/400',
    banner: 'https://picsum.photos/seed/design-banner/1200/400',
    durationTotal: 8400,
    lessonCount: 8,
    status: 'published',
    isNew: false,
    isFeatured: false,
    tags: ['Design', 'Figma', 'CSS'],
    modules: [
      {
        id: 'm3',
        title: 'Foundations',
        description: 'Color, typography, and spacing.',
        order: 1,
        lessons: [
          {
            id: 'l4',
            slug: 'color-theory',
            title: 'Color Theory in Practice',
            description: 'Creating accessible color palettes.',
            shortDescription: 'Accessible color palettes.',
            duration: 1500,
            thumbnail: 'https://picsum.photos/seed/l4/600/400',
            order: 1,
            videoProvider: 'youtube',
            videoId: 'dQw4w9WgXcQ',
            isPreview: true,
          }
        ]
      }
    ]
  }
];

export const MOCK_USER_PROGRESS: UserProgress[] = [
  {
    userId: 'user1',
    courseId: 'c1',
    lessonId: 'l1',
    completed: true,
    progressPercent: 100,
    lastWatchedAt: new Date().toISOString()
  },
  {
    userId: 'user1',
    courseId: 'c1',
    lessonId: 'l2',
    completed: false,
    progressPercent: 45,
    lastWatchedAt: new Date().toISOString()
  }
];
