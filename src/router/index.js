import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnalyzeView from '../views/AnalyzeView.vue'
import ReportView from '../views/ReportView.vue'

// Configure application routes
const routes = [
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

export default router
