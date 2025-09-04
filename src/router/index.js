import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnalyzeView from '../views/AnalyzeView.vue'
import ReportView from '../views/ReportView.vue'
import LoginView from '../views/LoginView.vue'

// Configure application routes
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/analyse',
    name: 'analyse',
    component: AnalyzeView,
  },
  {
    path: '/report/:reportData',
    name: 'Report',
    component: ReportView,
    // Parse JSON report data from URL parameter
    props: (route) => ({ reportData: JSON.parse(route.params.reportData) }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Global navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true'

  // Redirect to login if not authenticated (except for login page)
  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' })
    // Redirect to home if already authenticated and trying to access login
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
