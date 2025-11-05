import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'personal-info', name: 'personal_info', component: () => import('pages/PersonalInfo.vue') },
    ],
  },
  {
    path: '/applications',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ApplicationsPage.vue') }],
  },
  {
    path: '/secure',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'account_security', component: () => import('pages/SecurePage.vue') }],
    meta: { authGuard: true },
    // meta: { authGuard: { fallbackUrl: 'unauthorized' } },
    // meta: { authGuard: { validator: () => false } },
    // meta: { authGuard: { validator: hasRole('view-profile') } }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
