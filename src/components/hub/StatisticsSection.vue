<template>
  <!-- Embedded Tableau dashboard presenting scam statistics -->
  <section class="content-section">
    <div class="section-header">
      <h2 class="section-title">Australian Scam Statistics</h2>
      <p class="section-subtitle">Interactive visualisations showing job scam trends and data</p>
    </div>

    <div class="intro-text">
      <p class="intro-paragraph">
        Job scams are among the fastest-growing online crimes in Australia, costing victims millions
        of dollars each year. This interactive dashboard lets you explore how and where job scams
        occur, who is most affected, and how scammers reach their victims.
      </p>

      <div class="how-to-use">
        <h3 class="how-to-title">How to Use:</h3>
        <ul class="how-to-list">
          <li>
            Use the selectors above to switch between number of reports and amount lost, or explore
            data by year, quarter, or month.
          </li>
          <li>
            Each chart is interactive - click on states, age groups, or contact methods to reveal
            related trends and insights.
          </li>
        </ul>
        <p class="update-note">
          The dashboard is updated as new Scamwatch reports become available, ensuring that you're
          always viewing the most current data.
        </p>
      </div>
    </div>

    <div class="tableau-container">
      <div class="tableauPlaceholder" id="viz1760409402179" style="position: relative">
        <noscript>
          <a href="#">
            <img
              alt="Dashboard 3"
              src="https://public.tableau.com/static/images/51/5120v4_17604093720250/Dashboard3/1_rss.png"
              style="border: none"
            />
          </a>
        </noscript>
        <object class="tableauViz" style="display: none">
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="5120v4_17604093720250&#47;Dashboard3" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param
            name="static_image"
            value="https://public.tableau.com/static/images/51/5120v4_17604093720250/Dashboard3/1.png"
          />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="en-AU" />
          <param name="filter" value="publish=yes" />
        </object>
      </div>
    </div>

    <div class="key-takeaways">
      <h3 class="takeaways-title">Key Takeaways & Protection Tips</h3>
      <ul class="takeaways-list">
        <li>Job scams are increasing in both frequency and financial impact across Australia.</li>
        <li>
          Younger users tend to lose more per scam, even though older groups are also frequently
          targeted.
        </li>
        <li>Email and text messages remain the most common channels used by scammers.</li>
        <li>
          Always verify job offers through official company websites and avoid upfront payment
          requests.
        </li>
        <li>
          If you suspect a job scam, report it to Scamwatch or your local authorities immediately.
          You can also use our
          <router-link to="/analyse" class="inline-link">job analysis tool</router-link> to check if
          a job posting might be suspicious.
        </li>
      </ul>
      <p class="data-source">📊 Data Source: Scamwatch Australia (2020 – Present)</p>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

function setTableauSize() {
  const divElement = document.getElementById('viz1760409402179')
  if (!divElement) return
  const vizElement = divElement.getElementsByTagName('object')[0]
  if (!vizElement) return

  if (divElement.offsetWidth > 800) {
    vizElement.style.width = '100%'
    vizElement.style.height = divElement.offsetWidth * 0.75 + 'px'
  } else if (divElement.offsetWidth > 500) {
    vizElement.style.width = '100%'
    vizElement.style.height = divElement.offsetWidth * 0.75 + 'px'
  } else {
    vizElement.style.width = '100%'
    vizElement.style.height = '1527px'
  }
}

onMounted(() => {
  const divElement = document.getElementById('viz1760409402179')
  if (!divElement) return

  // Remove any previously loaded Tableau scripts
  const existingScripts = document.querySelectorAll('script[src*="viz_v1.js"]')
  existingScripts.forEach((script) => script.remove())

  const vizElement = divElement.getElementsByTagName('object')[0]
  if (vizElement) vizElement.style.display = 'block'

  setTableauSize()

  // Load Tableau script
  const scriptElement = document.createElement('script')
  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
  vizElement.parentNode.insertBefore(scriptElement, vizElement)

  // Update size on window resize
  window.addEventListener('resize', setTableauSize)
})
</script>

<style scoped>
.content-section {
  max-width: 1600px;
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
  overflow-x: auto;
  overflow-y: hidden;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  background: #f8fafc;
  -webkit-overflow-scrolling: touch;
}

.tableauPlaceholder {
  min-width: min-content;
}

@media (max-width: 1400px) {
  .tableau-container {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .tableau-container {
    padding: 0.5rem;
    border-radius: 8px;
  }
}

.intro-text {
  margin-bottom: 2.5rem;
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.intro-paragraph {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #334155;
  margin: 0 0 1.5rem 0;
}

.how-to-use {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
}

.how-to-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.how-to-list {
  margin: 0 0 1rem 0;
  padding-left: 1.5rem;
  color: #475569;
}

.how-to-list li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.update-note {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  font-style: italic;
}

.key-takeaways {
  margin-top: 2.5rem;
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.takeaways-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 1.5rem 0;
}

.takeaways-list {
  margin: 0 0 1.5rem 0;
  padding-left: 1.5rem;
  color: #334155;
}

.takeaways-list li {
  margin-bottom: 1rem;
  line-height: 1.7;
  font-size: 1.05rem;
}

.data-source {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-weight: 500;
}

.inline-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.inline-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .content-section {
    padding: 2.5rem 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .intro-text,
  .key-takeaways {
    padding: 1.5rem;
  }

  .how-to-use {
    padding: 1.25rem;
  }

  .takeaways-title {
    font-size: 1.3rem;
  }

  .takeaways-list li {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .content-section {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .section-subtitle {
    font-size: 0.95rem;
  }

  .intro-text,
  .key-takeaways {
    padding: 1.25rem;
  }

  .how-to-use {
    padding: 1rem;
  }

  .intro-paragraph,
  .takeaways-list li {
    font-size: 0.95rem;
  }

  .how-to-title,
  .takeaways-title {
    font-size: 1.2rem;
  }
}
</style>
