<template>
  <div class="news-carousel">
    <div class="carousel-header">
      <div class="header-content">
        <h3 class="carousel-title">Latest Scam News & Alerts</h3>
        <p class="carousel-subtitle">
          Stay informed about emerging threats and protection strategies
        </p>
      </div>
    </div>

    <div v-if="loading" class="loading-container">
      <div class="loading-grid">
        <div v-for="i in 3" :key="i" class="loading-card">
          <div class="loading-image"></div>
          <div class="loading-content">
            <div class="loading-line short"></div>
            <div class="loading-line"></div>
            <div class="loading-line medium"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="error-container">
      <div class="error-content">
        <i class="fas fa-exclamation-triangle error-icon"></i>
        <h4 class="error-title">Unable to load news</h4>
        <p class="error-message">{{ error }}</p>
        <button class="retry-button" @click="fetchNews">
          <i class="fas fa-redo"></i>
          Try Again
        </button>
      </div>
    </div>

    <div v-else class="carousel-track-container" ref="trackContainer">
      <div class="carousel-track" :style="trackStyle" ref="track">
        <article
          v-for="(article, index) in newsArticles"
          :key="index"
          class="news-card"
          :class="{
            active: index >= currentIndex && index < currentIndex + itemsPerView,
            featured: index === currentIndex,
          }"
          @click="openArticle(article.url)"
          :tabindex="index >= currentIndex && index < currentIndex + itemsPerView ? 0 : -1"
          @keydown.enter="openArticle(article.url)"
          role="button"
          :aria-label="`Read article: ${article.title}`"
        >
          <div class="article-image-container">
            <img
              :src="article.urlToImage || '/api/placeholder/400/240'"
              :alt="article.title"
              class="article-image"
              @error="handleImageError"
              loading="lazy"
            />
            <div class="image-overlay"></div>

            <div class="source-badge">
              <i class="fas fa-newspaper"></i>
              {{ article.source.name }}
            </div>

            <div class="published-date">
              {{ formatDate(article.publishedAt) }}
            </div>
          </div>

          <div class="article-content">
            <div class="content-header">
              <h4 class="article-title">{{ article.title }}</h4>
              <p class="article-description">{{ truncateText(article.description, 120) }}</p>
            </div>

            <div class="content-footer">
              <div class="article-meta">
                <span class="author" v-if="article.author">
                  <i class="fas fa-user"></i>
                  {{ article.author }}
                </span>
              </div>

              <div class="read-more">
                <span class="read-more-text">Read Article</span>
                <i class="fas fa-external-link-alt"></i>
              </div>
            </div>
          </div>

          <div class="hover-overlay">
            <div class="hover-content">
              <i class="fas fa-arrow-right"></i>
              <span>Read Full Article</span>
            </div>
          </div>
        </article>
      </div>

      <div class="pagination-container">
        <div class="pagination-controls">
          <button class="pagination-nav" @click="previousSlide" :disabled="currentIndex === 0">
            <i class="fas fa-chevron-left"></i>
            Previous
          </button>

          <div class="page-numbers">
            <button
              v-for="(page, index) in paginationDots"
              :key="index"
              class="page-number"
              :class="{ active: index === Math.floor(currentIndex / itemsPerView) }"
              @click="goToSlide(index * itemsPerView)"
            >
              {{ index + 1 }}
            </button>
          </div>

          <button
            class="pagination-nav"
            @click="nextSlide"
            :disabled="currentIndex >= newsArticles.length - itemsPerView"
          >
            Next
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

export default {
  name: 'NewsCarousel',
  setup() {
    const newsArticles = ref([])
    const loading = ref(true)
    const error = ref(null)
    const currentIndex = ref(0)
    const itemsPerView = ref(3)
    const isAutoplayActive = ref(false)
    const autoplayInterval = ref(null)
    const track = ref(null)
    const trackContainer = ref(null)

    // Cache system: 1-hour expiry for news data
    const CACHE_KEY = 'jobdetective_news_cache'
    const CACHE_EXPIRY_KEY = 'jobdetective_news_cache_expiry'
    const CACHE_DURATION = 60 * 60 * 1000

    const totalPages = computed(() => {
      return Math.ceil(newsArticles.value.length / itemsPerView.value)
    })

    const paginationDots = computed(() => {
      return Array.from({ length: totalPages.value }, (_, i) => i)
    })

    // Dynamic carousel positioning with smooth cubic-bezier animation
    const trackStyle = computed(() => {
      const cardWidth = 100 / itemsPerView.value
      const translateX = -(currentIndex.value * cardWidth)
      return {
        transform: `translateX(${translateX}%)`,
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }
    })

    const progressPercentage = computed(() => {
      if (totalPages.value <= 1) return 100
      const currentPage = Math.floor(currentIndex.value / itemsPerView.value)
      return ((currentPage + 1) / totalPages.value) * 100
    })

    const getCachedNews = () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY)
        const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY)

        if (cachedData && cacheExpiry) {
          const now = Date.now()
          const expiryTime = parseInt(cacheExpiry, 10)

          if (now < expiryTime) {
            console.log('Using cached news data')
            return JSON.parse(cachedData)
          } else {
            console.log('News cache expired')
            clearNewsCache()
          }
        }
        return null
      } catch (error) {
        console.error('Error reading news cache:', error)
        clearNewsCache()
        return null
      }
    }

    const setCachedNews = (data) => {
      try {
        const expiryTime = Date.now() + CACHE_DURATION
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
        localStorage.setItem(CACHE_EXPIRY_KEY, expiryTime.toString())
        console.log('News data cached until:', new Date(expiryTime).toLocaleString())
      } catch (error) {
        console.error('Error setting news cache:', error)
      }
    }

    const clearNewsCache = () => {
      try {
        localStorage.removeItem(CACHE_KEY)
        localStorage.removeItem(CACHE_EXPIRY_KEY)
      } catch (error) {
        console.error('Error clearing news cache:', error)
      }
    }

    const fetchNews = async () => {
      try {
        loading.value = true
        error.value = null

        const cachedData = getCachedNews()
        if (cachedData) {
          newsArticles.value = cachedData
          loading.value = false
          return
        }
        const API_ENDPOINT = import.meta.env.VITE_NEWS_API_GATEWAY_URL
        const API_KEY = import.meta.env.VITE_NEWS_API_KEY

        if (!API_ENDPOINT) {
          throw new Error('News API endpoint not configured')
        }

        const fetchOptions = {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }

        if (API_KEY) {
          fetchOptions.headers['X-API-Key'] = API_KEY
        }

        const response = await fetch(API_ENDPOINT, fetchOptions)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        let articles = []

        // Handle different API response formats
        if (data.body) {
          articles = JSON.parse(data.body)
        } else if (Array.isArray(data)) {
          articles = data
        } else {
          throw new Error('Unexpected API response format')
        }

        // Filter articles and ensure data integrity
        const validArticles = articles
          .filter(
            (article) =>
              article &&
              article.title &&
              article.description &&
              article.url &&
              article.source &&
              article.source.name,
          )
          .slice(0, 10)

        if (validArticles.length === 0) {
          throw new Error('No valid articles found')
        }

        newsArticles.value = validArticles
        setCachedNews(validArticles)
      } catch (err) {
        console.error('Error fetching news:', err)
        error.value = err.message || 'Failed to load news articles'

        // Fallback to cached data if available
        const cachedData = getCachedNews()
        if (cachedData) {
          newsArticles.value = cachedData
          error.value = null
        }
      } finally {
        loading.value = false
      }
    }

    // Carousel navigation with infinite loop behavior
    const nextSlide = () => {
      if (currentIndex.value < newsArticles.value.length - itemsPerView.value) {
        currentIndex.value += itemsPerView.value
      } else {
        currentIndex.value = 0
      }
    }

    const previousSlide = () => {
      if (currentIndex.value > 0) {
        currentIndex.value -= itemsPerView.value
      } else {
        currentIndex.value = Math.max(0, newsArticles.value.length - itemsPerView.value)
      }
    }

    const goToSlide = (index) => {
      currentIndex.value = Math.min(index, newsArticles.value.length - itemsPerView.value)
    }

    const startAutoplay = () => {
      if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value)
      }
      autoplayInterval.value = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    const stopAutoplay = () => {
      if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value)
        autoplayInterval.value = null
      }
    }

    const toggleAutoplay = () => {
      isAutoplayActive.value = !isAutoplayActive.value
      if (isAutoplayActive.value) {
        startAutoplay()
      } else {
        stopAutoplay()
      }
    }

    const formatDate = (dateString) => {
      try {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) {
          return 'Today'
        } else if (diffDays === 1) {
          return 'Yesterday'
        } else if (diffDays < 7) {
          return `${diffDays} days ago`
        } else {
          return date.toLocaleDateString('en-AU', {
            day: 'numeric',
            month: 'short',
          })
        }
      } catch (error) {
        console.error('Error formatting date:', error)
      }
    }

    const truncateText = (text, maxLength) => {
      if (!text) return ''
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength).trim() + '...'
    }

    const openArticle = (url) => {
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    }

    const handleImageError = (event) => {
      event.target.src = '/api/placeholder/400/240'
    }

    // Responsive carousel: adjusts items per viewport size
    const updateItemsPerView = () => {
      const width = window.innerWidth
      if (width < 768) {
        itemsPerView.value = 1
      } else if (width < 1024) {
        itemsPerView.value = 2
      } else {
        itemsPerView.value = 3
      }

      // Prevent index overflow after resize
      if (currentIndex.value >= newsArticles.value.length - itemsPerView.value + 1) {
        currentIndex.value = Math.max(0, newsArticles.value.length - itemsPerView.value)
      }
    }

    watch(isAutoplayActive, (newValue) => {
      if (newValue) {
        startAutoplay()
      } else {
        stopAutoplay()
      }
    })

    onMounted(() => {
      fetchNews()
      updateItemsPerView()
      window.addEventListener('resize', updateItemsPerView)
    })

    onUnmounted(() => {
      stopAutoplay()
      window.removeEventListener('resize', updateItemsPerView)
    })

    return {
      newsArticles,
      loading,
      error,
      currentIndex,
      itemsPerView,
      isAutoplayActive,
      track,
      trackContainer,
      totalPages,
      paginationDots,
      trackStyle,
      progressPercentage,
      fetchNews,
      nextSlide,
      previousSlide,
      goToSlide,
      toggleAutoplay,
      formatDate,
      truncateText,
      openArticle,
      handleImageError,
    }
  },
}
</script>

<style scoped>
.news-carousel {
  width: 100%;
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  position: relative;
}

.carousel-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
}

.header-content h3.carousel-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: white;
  letter-spacing: -0.02em;
}

.header-content p.carousel-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.4;
}

.carousel-controls {
  display: flex;
  gap: 0.5rem;
}

.nav-button {
  width: 44px;
  height: 44px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.nav-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.nav-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.nav-button i {
  font-size: 0.9rem;
}

/* Skeleton loading animation */
.loading-container {
  padding: 2rem;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.loading-card {
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
  animation: pulse 2s ease-in-out infinite;
}

.loading-image {
  height: 200px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
}

.loading-content {
  padding: 1.5rem;
}

.loading-line {
  height: 12px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  animation: shimmer 2s ease-in-out infinite;
}

.loading-line.short {
  width: 60%;
}

.loading-line.medium {
  width: 80%;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.error-container {
  padding: 3rem 2rem;
  text-align: center;
}

.error-content {
  max-width: 400px;
  margin: 0 auto;
}

.error-icon {
  font-size: 3rem;
  color: #dc2626;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.error-message {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.retry-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-button:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.carousel-track-container {
  overflow: hidden;
  padding: 2rem 2rem 0;
}

.carousel-track {
  display: flex;
  gap: 1.5rem;
  width: calc(100% * var(--total-slides, 1));
}

.news-card {
  flex: 0 0 calc((100% - 3rem) / 3);
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
}

.news-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 20px 40px -5px rgba(0, 0, 0, 0.15),
    0 10px 20px -5px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.news-card.featured {
  border-color: #3b82f6;
  box-shadow:
    0 8px 16px -3px rgba(59, 130, 246, 0.2),
    0 4px 8px -2px rgba(59, 130, 246, 0.1);
}

.news-card:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow:
    0 0 0 3px rgba(59, 130, 246, 0.1),
    0 8px 16px -3px rgba(0, 0, 0, 0.1);
}

.article-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #f3f4f6;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.news-card:hover .article-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.6) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.news-card:hover .image-overlay {
  opacity: 1;
}

.source-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(59, 130, 246, 0.9);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.published-date {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.article-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 250px;
}

.content-header {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  margin-bottom: 1rem;
}

.article-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  letter-spacing: -0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  hyphens: auto;
  flex-shrink: 0;
}

.article-description {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  hyphens: auto;
  min-height: 0;
}

.content-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  flex-shrink: 0;
  margin-top: auto;
}

.article-meta .author {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: #6b7280;
  font-size: 0.8rem;
  font-weight: 500;
}

.read-more {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: #3b82f6;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.news-card:hover .read-more {
  color: #1d4ed8;
  transform: translateX(4px);
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(59, 130, 246, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.news-card:hover .hover-overlay {
  opacity: 1;
}

.hover-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.news-card:hover .hover-content {
  transform: translateY(0);
}

/* Centered pagination controls */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0 1rem;
  margin-top: 1rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pagination-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  color: #6b7280;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.pagination-nav:hover:not(:disabled) {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.pagination-nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.pagination-nav i {
  font-size: 0.8rem;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.page-number {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #f8fafc;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
}

.page-number:hover:not(.active) {
  background: #e2e8f0;
  color: #3b82f6;
}

.page-number.active {
  background: #3b82f6;
  color: white;
  border: 1px solid #3b82f6;
  box-shadow:
    0 0 0 3px rgba(59, 130, 246, 0.2),
    0 2px 4px rgba(59, 130, 246, 0.3);
}

.progress-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-text {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
}

.progress-bar {
  width: 100px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-footer {
  padding: 0 0 2rem;
  display: flex;
  justify-content: center;
}

.autoplay-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  color: #6b7280;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.autoplay-toggle:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.autoplay-toggle.active {
  background: #dbeafe;
  border-color: #3b82f6;
  color: #1d4ed8;
}

.autoplay-toggle.active:hover {
  background: #bfdbfe;
}

/* Responsive breakpoints for different screen sizes */
@media (max-width: 1024px) {
  .news-card {
    flex: 0 0 calc((100% - 1.5rem) / 2);
  }

  .carousel-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .carousel-controls {
    align-self: flex-end;
  }

  .article-content {
    height: 240px;
  }

  .article-description {
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }
}

@media (max-width: 768px) {
  .news-card {
    flex: 0 0 100%;
  }

  .carousel-track-container {
    padding: 1rem;
  }

  .carousel-track {
    gap: 1rem;
  }

  .carousel-header {
    padding: 1.5rem 1rem 1rem;
  }

  .pagination-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
  }

  .pagination-controls {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }

  .page-numbers {
    justify-content: center;
  }

  .page-number {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }

  .article-content {
    height: auto;
    min-height: 220px;
  }

  .article-title {
    font-size: 1rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    margin-bottom: 0.75rem;
  }

  .article-description {
    font-size: 0.85rem;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    line-height: 1.4;
  }

  .content-footer {
    margin-top: 1rem;
    padding-top: 0.75rem;
  }
}

@media (max-width: 480px) {
  .carousel-header {
    padding: 1rem;
  }

  .header-content h3.carousel-title {
    font-size: 1.25rem;
  }

  .header-content p.carousel-subtitle {
    font-size: 0.875rem;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }

  .article-image-container {
    height: 160px;
  }

  .article-content {
    padding: 1rem;
    min-height: 200px;
    height: auto;
  }

  .article-title {
    font-size: 0.95rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .article-description {
    font-size: 0.8rem;
    line-height: 1.3;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }

  .content-footer {
    margin-top: 0.75rem;
    padding-top: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .read-more {
    align-self: flex-end;
  }
}

/* Text truncation fallback for older browsers */
@supports not (-webkit-line-clamp: 2) {
  .article-title {
    max-height: calc(1.4em * 2);
    overflow: hidden;
  }

  .article-description {
    max-height: calc(1.5em * 4);
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    .article-description {
      max-height: calc(1.5em * 3);
    }
  }

  @media (max-width: 768px) {
    .article-description {
      max-height: calc(1.4em * 3);
    }
  }
}

/* Accessibility: reduced motion and high contrast support */
@media (prefers-reduced-motion: reduce) {
  .news-card,
  .nav-button,
  .pagination-dot,
  .progress-fill,
  .article-image,
  .hover-overlay,
  .hover-content {
    transition: none !important;
  }

  .news-card:hover {
    transform: none !important;
  }

  .news-card:hover .article-image {
    transform: none !important;
  }
}

@media (prefers-contrast: high) {
  .news-card {
    border-width: 3px;
  }

  .source-badge,
  .published-date {
    border: 2px solid white;
  }
}
</style>
