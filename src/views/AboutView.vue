<template>
  <!-- Static about page detailing JobDetective's mission and team -->
  <div class="about-container">
    <div class="about-hero">
      <h1 class="about-title">About JobDetective</h1>
      <p class="about-subtitle">Fostering digital citizenship for safer job seeking</p>
    </div>

    <section class="about-section">
      <h2 class="section-heading">About the Project</h2>
      <div class="section-icon-wrapper">
        <img :src="sdgLogo" alt="UN SDG 16 Logo" class="sdg-logo" />
      </div>
      <p>
        JobDetective is committed to advancing <strong>UN Sustainable Development Goal 16</strong>:
        Peace, Justice, and Strong Institutions. We believe that protecting young Australians from
        employment scams is essential to promoting peaceful and inclusive societies, providing
        access to justice for all, and building effective, accountable institutions.
      </p>

      <p>
        By <strong>fostering digital citizenship</strong>, we empower young job seekers to make
        informed decisions, protect their rights, and navigate the digital economy safely. Our
        platform promotes transparency, accountability, and access to justice by:
      </p>

      <ul class="feature-list">
        <li>
          <strong>Reducing exploitation:</strong> Helping vulnerable young Australians avoid scams
          that lead to financial loss and identity theft
        </li>
        <li>
          <strong>Promoting digital rights:</strong> Educating users about their rights in the
          digital workspace and how to protect themselves
        </li>
        <li>
          <strong>Building trust in institutions:</strong> Creating transparent, accessible tools
          that build confidence in digital platforms
        </li>
        <li>
          <strong>Ensuring inclusive access:</strong> Designing for users from all backgrounds,
          including those with limited digital literacy
        </li>
      </ul>

      <p>
        Through education, awareness, and AI-powered protection, JobDetective contributes to a safer
        digital future where all young Australians can pursue employment opportunities without fear
        of exploitation.
      </p>

      <div class="sdg-button-wrapper">
        <a
          href="https://www.un.org/sustainabledevelopment/peace-justice/"
          target="_blank"
          rel="noopener noreferrer"
          class="sdg-learn-more-btn"
        >
          Learn More About SDG 16
        </a>
      </div>
    </section>

    <section class="about-section">
      <h2 class="section-heading">Our Mission</h2>
      <p>
        Our mission is to protect young job seekers aged 18-24 from employment scams by providing
        accessible, AI-powered tools that help identify suspicious job postings. We focus
        particularly on supporting those from disadvantaged backgrounds who face digital barriers
        and are most vulnerable to exploitation.
      </p>

      <p>
        Young job seekers from social housing and low-income households often rely on costly mobile
        data, outdated devices, and have limited digital literacy. With Australian Digital Inclusion
        Index scores 11.6 points below the national average, they are especially vulnerable to
        sophisticated scams that use AI-generated content, fake company details, and stolen logos.
      </p>

      <p>
        In 2024, over 3,000 job scam cases caused $13.7 million in losses, leaving disadvantaged
        students at high risk of financial loss, identity theft, and exploitation.
      </p>
    </section>

    <section class="about-section">
      <h2 class="section-heading">Our Team</h2>
      <p>
        We are a diverse team of university students from IT, Data Science, Cybersecurity, and
        Business Information Systems backgrounds. Despite our different academic specializations, we
        share a common goal: using technology to solve real-world challenges faced by vulnerable
        communities.
      </p>

      <p>
        Through research, user-centered design, and cutting-edge AI technology, we aim to bridge the
        digital divide and protect young Australians from employment scams. Our multidisciplinary
        approach combines technical expertise with deep understanding of social issues.
      </p>
    </section>
  </div>
</template>

<script setup>
// Identifies the about view for routing and layout integration
import sdgLogo from '@/assets/images/E_WEB_16.png'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Fredoka+One&family=Nunito:wght@400;500;700;800&display=swap');

.about-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fefefe 0%, #f1f5f9 100%);
  padding: 4rem 2rem;
}

.about-hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
}

.about-title {
  font-size: 4rem;
  font-family: 'Bangers', 'Fredoka One', 'Arial Black', sans-serif;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: #2d3748;
  line-height: 1.05;
  text-shadow:
    2px 2px 0 #fff,
    4px 4px 0 #3b82f6,
    0 0 12px rgba(59, 130, 246, 0.3);
  margin: 0 0 1rem 0;
}

.about-subtitle {
  font-size: 1.5rem;
  color: #4a5568;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  margin: 0;
}

.about-section {
  max-width: 1200px;
  margin: 0 auto 3rem auto;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem 3rem;
  box-shadow:
    0 4px 20px rgba(59, 130, 246, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.section-icon {
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.section-icon-wrapper {
  text-align: center;
  margin-bottom: 1.5rem;
}

.sdg-logo {
  width: 200px;
  height: auto;
  display: inline-block;
  filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.2));
}

.section-heading {
  font-size: 2.5rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
  text-align: center;
  letter-spacing: 0.01em;
}

.about-section p {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #4b5563;
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  margin-bottom: 1.5rem;
  text-align: left;
}

.about-section p:last-child {
  margin-bottom: 0;
}

.about-section strong {
  color: #1e40af;
  font-weight: 700;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.feature-list li {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #4b5563;
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  margin-bottom: 1rem;
  padding-left: 2rem;
  position: relative;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #3b82f6;
  font-weight: 900;
  font-size: 1.3rem;
}

.feature-list li strong {
  color: #1e40af;
  font-weight: 700;
}

.sdg-button-wrapper {
  text-align: center;
  margin-top: 2rem;
}

.sdg-learn-more-btn {
  display: inline-block;
  font-size: 1.1rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  padding: 1rem 2.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  text-decoration: none;
  box-shadow:
    0 4px 15px rgba(59, 130, 246, 0.3),
    0 2px 8px rgba(59, 130, 246, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: none;
  letter-spacing: 0.01em;
  border: 2px solid transparent;
}

.sdg-learn-more-btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow:
    0 6px 20px rgba(59, 130, 246, 0.4),
    0 4px 12px rgba(59, 130, 246, 0.3);
  color: #ffffff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-container {
    padding: 2rem 1rem;
  }

  .about-title {
    font-size: 2.5rem;
  }

  .about-subtitle {
    font-size: 1.2rem;
  }

  .about-section {
    padding: 2rem 1.5rem;
    margin-bottom: 2rem;
  }

  .section-heading {
    font-size: 2rem;
  }

  .section-icon {
    font-size: 3rem;
  }

  .sdg-logo {
    width: 150px;
  }

  .about-section p,
  .feature-list li {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .about-title {
    font-size: 2rem;
  }

  .about-subtitle {
    font-size: 1rem;
  }

  .section-heading {
    font-size: 1.7rem;
  }

  .about-section {
    padding: 1.5rem 1rem;
  }
}
</style>
