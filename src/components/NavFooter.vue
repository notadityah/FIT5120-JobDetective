<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-brand">
          <h3 class="brand-title">JobDetective</h3>
          <p class="brand-subtitle">Protecting young job seekers from employment scams</p>
        </div>

        <!-- Footer Sections -->
        <div class="footer-sections">
          <!-- Sitemap -->
          <div class="footer-section">
            <h4 class="section-title">SITEMAP</h4>
            <ul class="section-links">
              <li><router-link to="/" class="footer-link">Home</router-link></li>
              <li><router-link to="/analyse" class="footer-link">Analyse Job</router-link></li>
              <li><router-link to="/report" class="footer-link">My Report</router-link></li>
              <li><router-link to="/hub" class="footer-link">Awareness Hub</router-link></li>
              <li>
                <router-link to="/simulation" class="footer-link">Scam Simulation</router-link>
              </li>
            </ul>
          </div>

          <!-- About Us -->
          <div class="footer-section">
            <h4 class="section-title">ABOUT US</h4>
            <ul class="section-links">
              <li><router-link to="/about-us" class="footer-link">About</router-link></li>
            </ul>
          </div>

          <!-- Data & Image Credits -->
          <div class="footer-section">
            <h4 class="section-title">DATA & IMAGE CREDITS</h4>
            <ul class="section-links">
              <li>
                <a
                  href="https://www.scamwatch.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link external"
                >
                  Scamwatch Australia
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.accc.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link external"
                >
                  ACCC Australia
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link external"
                >
                  Unsplash
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://fontawesome.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link external"
                >
                  Font Awesome
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://ilus.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link external"
                >
                  Ilus AI
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p class="copyright">© 2025 JobDetective. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style scoped>
.app-footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #e2e8f0;
  padding: 3rem 0 1rem 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.brand-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #63b3ed;
  margin: 0;
}

.brand-subtitle {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.footer-sections {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #f8fafc;
  margin: 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.section-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.footer-link:hover {
  color: #63b3ed;
  transform: translateX(2px);
}

.footer-link.external i {
  font-size: 0.75rem;
  opacity: 0.7;
}

.footer-link.disabled {
  color: #64748b;
  cursor: not-allowed;
}

.footer-link.disabled:hover {
  color: #64748b;
  transform: none;
}

.footer-bottom {
  border-top: 1px solid #334155;
  padding-top: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.copyright {
  color: #94a3b8;
  font-size: 0.875rem;
  margin: 0;
}

.disclaimer {
  color: #64748b;
  font-size: 0.8rem;
  margin: 0;
  font-style: italic;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-sections {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-container {
    padding: 0 1rem;
  }

  .app-footer {
    padding: 2rem 0 1rem 0;
  }
}

@media (max-width: 480px) {
  .brand-title {
    font-size: 1.5rem;
  }

  .brand-subtitle {
    font-size: 0.875rem;
  }

  .footer-bottom {
    text-align: left;
  }
}
</style>
