// Centralised router configuration powering JobDetective navigation
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnalyzeView from '../views/AnalyzeView.vue'
import ReportView from '../views/ReportView.vue'
import HubView from '../views/HubView.vue'
import AboutView from '../views/AboutView.vue'

// Each route maps to a top-level view and optional props
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
    path: '/report/:reportData?',
    name: 'report',
    component: ReportView,

  // Optional reportData param allows direct linking to saved analyses
  props: (route) => {
      if (route.params.reportData) {
        try {
          return { reportData: JSON.parse(route.params.reportData) }
        } catch (error) {
          console.error('Failed to parse reportData:', error)
          return { reportData: null }
        }
      }
      return { reportData: null }
    },
  },
  {
    path: '/hub',
    name: 'hub',
    component: HubView,
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: AboutView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Custom scroll behavior: restores position or smooth scroll to top
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        resolve(savedPosition)
      } else {
        // Delay ensures DOM is ready before scrolling
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          resolve({ top: 0 })
        }, 100)
      }
    })
  },
})

export default router
