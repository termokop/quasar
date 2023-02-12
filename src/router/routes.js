
const routes = [
  {
    path: '/auth',
    component: () => import('src/layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/auth/AuthPage.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('src/layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/app/vCourse.vue') },
      {
        path: '/study',
        component: () => import('src/pages/app/vCourse.vue'),
        // children: [
        //   {
        //     path: '/lesson',
        //     component: () => import('src/pages/app/vLesson.vue')
        //   },
        // ]
      },
      { path: '/about', component: () => import('src/pages/app/vAbout.vue') },
      { path: '/donate', component: () => import('src/pages/app/vDonate.vue') },
      { path: '/settings', component: () => import('src/pages/app/vSettings.vue') },
      { path: '/learn-words', component: () => import('src/pages/app/vLearnWords.vue') },
      { path: '/practice', component: () => import('src/pages/app/vPractice.vue') },
      {
        path: '/lesson',
        component: () => import('src/pages/app/vLesson.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
