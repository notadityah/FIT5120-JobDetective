<template>
  <div class="news-carousel-wrapper">
    <!-- External Controls -->
    <button
      class="external-control external-control-prev"
      type="button"
      data-bs-target="#newsCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>

    <div class="news-carousel-container">
      <div v-if="loading" class="text-center py-4">
        <LoadingSpinner message="Loading news articles..." size="large" />
      </div>

      <div v-else-if="error" class="alert alert-danger" role="alert">
        <ErrorDisplay :message="error" />
      </div>

      <div
        v-else-if="news && news.length > 0"
        id="newsCarousel"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
          <button
            v-for="(item, index) in news"
            :key="index"
            type="button"
            data-bs-target="#newsCarousel"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            :aria-current="index === 0 ? 'true' : 'false'"
            :aria-label="`Slide ${index + 1}`"
          ></button>
        </div>

        <!-- Carousel Inner -->
        <div class="carousel-inner">
          <div
            v-for="(article, index) in news"
            :key="index"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <div class="news-slide">
              <img
                :src="article.urlToImage || '/default-news-image.jpg'"
                :alt="article.title"
                class="news-image"
                @error="handleImageError"
              />

              <div class="news-overlay">
                <div class="news-content">
                  <div class="news-source">
                    <span class="badge">{{ article.source.name }}</span>
                    <small class="news-date">{{ formatDate(article.publishedAt) }}</small>
                  </div>

                  <h5 class="news-title">{{ article.title }}</h5>

                  <p class="news-description">{{ article.description }}</p>

                  <div class="news-footer">
                    <small v-if="article.author" class="news-author">By {{ article.author }}</small>
                    <a
                      :href="article.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn-read-more"
                    >
                      Read More
                      <i class="fas fa-external-link-alt ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-4">
        <p class="text-muted">No news articles available at the moment.</p>
      </div>
    </div>

    <button
      class="external-control external-control-next"
      type="button"
      data-bs-target="#newsCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorDisplay from './ErrorDisplay.vue'

export default {
  name: 'NewsCarousel',
  components: {
    LoadingSpinner,
    ErrorDisplay,
  },
  setup() {
    const news = ref([])
    const loading = ref(false)
    const error = ref(null)

    // Cache configuration
    const CACHE_KEY = 'jobdetective_news_cache'
    const CACHE_EXPIRY_KEY = 'jobdetective_news_cache_expiry'
    const CACHE_DURATION = 6 * 60 * 60 * 1000 // 6 hours

    // Cache management functions
    const getCachedData = () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY)
        const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY)

        if (cachedData && cacheExpiry) {
          const now = Date.now()
          const expiryTime = parseInt(cacheExpiry, 10)

          if (now < expiryTime) {
            console.log(
              'Using cached news data, expires in:',
              Math.round((expiryTime - now) / (1000 * 60)),
              'minutes',
            )
            return JSON.parse(cachedData)
          } else {
            console.log('News cache expired, will fetch fresh data')
            clearCache()
          }
        }
        return null
      } catch (error) {
        console.error('Error reading news cache:', error)
        clearCache()
        return null
      }
    }

    const setCacheData = (data) => {
      try {
        const expiryTime = Date.now() + CACHE_DURATION
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
        localStorage.setItem(CACHE_EXPIRY_KEY, expiryTime.toString())
        console.log('News data cached until:', new Date(expiryTime).toLocaleString())
      } catch (error) {
        console.error('Error setting news cache:', error)
      }
    }

    const clearCache = () => {
      try {
        localStorage.removeItem(CACHE_KEY)
        localStorage.removeItem(CACHE_EXPIRY_KEY)
        console.log('News cache cleared')
      } catch (error) {
        console.error('Error clearing news cache:', error)
      }
    }

    const fetchNews = async () => {
      loading.value = true
      error.value = null

      try {
        // Check cache first
        const cachedData = getCachedData()
        if (cachedData) {
          news.value = cachedData
          loading.value = false
          return
        }

        // Fetch fresh data
        console.log('Fetching fresh news data from API...')
        const response = await fetch(import.meta.env.VITE_NEWS_API_GATEWAY_URL)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        news.value = data
        setCacheData(data)
      } catch (err) {
        error.value = 'Failed to load news articles. Please try again later.'
        console.error('Error fetching news:', err)
      } finally {
        loading.value = false
      }
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }

    const handleImageError = (event) => {
      event.target.src = '/default-news-image.jpg'
    }

    onMounted(() => {
      fetchNews()
    })

    return {
      news,
      loading,
      error,
      formatDate,
      handleImageError,
    }
  },
}
</script>

<style scoped>
.news-carousel-wrapper {
  margin: 2rem 0;
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.news-carousel-container {
  flex: 1;
  position: relative;
}

.carousel {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.carousel-item {
  height: 450px;
}

.news-slide {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.news-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
  filter: brightness(0.8);
}

.news-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 30%,
    rgba(0, 0, 0, 0.8) 100%
  );
  color: white;
  padding: 3rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1;
  backdrop-filter: blur(5px);
}

.news-source {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.news-source .badge {
  background: linear-gradient(45deg, #667eea, #764ba2) !important;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  color: white;
}

.news-source small {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
}

.news-title {
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.3;
  font-size: 1.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.news-description {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 0.95rem;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.news-footer small {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
}

.news-footer .btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  text-decoration: none;
}

.news-footer .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  background: linear-gradient(45deg, #5a6fd8, #6a4190);
  color: white;
}

/* External Controls */
.external-control {
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  z-index: 10;
  flex-shrink: 0;
}

.external-control:hover {
  opacity: 1;
  background: linear-gradient(45deg, #5a6fd8, #6a4190);
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
}

.external-control:focus {
  opacity: 1;
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}

.external-control .carousel-control-prev-icon,
.external-control .carousel-control-next-icon {
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
  filter: brightness(0) invert(1);
}

/* Hide default carousel controls */
.carousel-control-prev,
.carousel-control-next {
  display: none !important;
}

/* Custom Indicators */
.carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.carousel-indicators [data-bs-target] {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid transparent;
  margin: 0 3px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-indent: -999px;
  overflow: hidden;
}

.carousel-indicators [data-bs-target].active {
  background-color: white;
  border-color: rgba(102, 126, 234, 0.8);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  transform: scale(1.2);
}

.carousel-indicators [data-bs-target]:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

/* Loading and Error States */
.alert-danger {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  border: none;
  color: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.text-muted {
  color: #6c757d !important;
  font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .carousel-item {
    height: 500px;
  }

  .news-image {
    height: 500px;
  }

  .news-overlay {
    padding: 2rem 1.5rem 1.5rem;
  }

  .news-title {
    font-size: 1.2rem;
  }

  .external-control {
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 768px) {
  .news-carousel-wrapper {
    gap: 1rem;
  }

  .carousel-item {
    height: 400px;
  }

  .news-image {
    height: 400px;
  }

  .news-overlay {
    padding: 1.5rem 1rem 1rem;
  }

  .news-title {
    font-size: 1.1rem;
    -webkit-line-clamp: 2;
  }

  .news-description {
    -webkit-line-clamp: 2;
    font-size: 0.9rem;
  }

  .news-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .external-control {
    width: 40px;
    height: 40px;
  }

  .external-control .carousel-control-prev-icon,
  .external-control .carousel-control-next-icon {
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
  }
}

@media (max-width: 576px) {
  .news-carousel-wrapper {
    flex-direction: column;
    gap: 1rem;
  }

  .external-control {
    align-self: center;
  }

  .external-control-prev {
    order: 2;
  }

  .news-carousel-container {
    order: 1;
  }

  .external-control-next {
    order: 3;
  }

  .carousel {
    border-radius: 10px;
  }

  .carousel-item {
    height: 350px;
  }

  .news-image {
    height: 350px;
  }

  .news-overlay {
    padding: 1rem;
  }

  .news-title {
    font-size: 1rem;
  }

  .news-description {
    font-size: 0.85rem;
  }

  .external-control {
    width: 35px;
    height: 35px;
  }

  .external-control .carousel-control-prev-icon,
  .external-control .carousel-control-next-icon {
    width: 14px;
    height: 14px;
    background-size: 14px 14px;
  }
}
</style>
