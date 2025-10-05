<template>
  <!-- Embedded Tableau dashboard presenting scam statistics -->
  <section class="content-section">
    <div class="section-header">
      <h2 class="section-title">Australian Scam Statistics</h2>
      <p class="section-subtitle">Interactive visualisations showing job scam trends and data</p>
    </div>

    <div class="tableau-container">
      <div class="tableauPlaceholder" id="viz1758451186828" style="position: relative">
        <noscript>
          <a href="#">
            <img
              alt="Dashboard 2"
              src="https://public.tableau.com/static/images/51/5120v1/Dashboard2/1_rss.png"
              style="border: none"
            />
          </a>
        </noscript>
        <object class="tableauViz" style="display: none">
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="5120v1&#47;Dashboard2" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param
            name="static_image"
            value="https://public.tableau.com/static/images/51/5120v1/Dashboard2/1.png"
          />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="en-AU" />
        </object>
      </div>
    </div>
  </section>
</template>

<script setup>
// Loads Tableau visualisation and resizes it responsively on the hub page
import { onBeforeUnmount, onMounted } from 'vue'

const loadTableauChart = () => {
  const divElement = document.getElementById('viz1758451186828')
  if (!divElement) return

  const vizElement = divElement.getElementsByTagName('object')[0]
  if (!vizElement) return

  const existingScripts = document.querySelectorAll('script[src*="viz_v1.js"]')
  existingScripts.forEach((script) => script.remove())

  vizElement.style.display = 'block'

  if (divElement.offsetWidth > 800) {
    vizElement.style.width = '100%'
    vizElement.style.height = `${divElement.offsetWidth * 0.75}px`
  } else if (divElement.offsetWidth > 500) {
    vizElement.style.width = '100%'
    vizElement.style.height = `${divElement.offsetWidth * 0.75}px`
  } else {
    vizElement.style.width = '100%'
    vizElement.style.height = '1027px'
  }

  const scriptElement = document.createElement('script')
  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
  scriptElement.onload = () => {
    // Tableau script loaded
  }
  scriptElement.onerror = (error) => {
    console.error('Failed to load Tableau script:', error)
  }
  vizElement.parentNode.insertBefore(scriptElement, vizElement)
}

const handleResize = () => {
  setTimeout(() => {
    loadTableauChart()
  }, 200)
}

onMounted(() => {
  setTimeout(() => {
    loadTableauChart()
  }, 100)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.tableau-container {
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  background: #f8fafc;
}

@media (max-width: 768px) {
  .content-section {
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .content-section {
    padding: 2rem 1rem;
  }
}
</style>
