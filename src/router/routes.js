
const routes = [
  {
    path: '/auth',
    component: () => import('src/layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/AuthPage.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('src/layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/AuthPage.vue') },
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
