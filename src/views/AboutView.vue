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

    <section id="faq" class="about-section faq-section">
      <h2 class="section-heading">Frequently Asked Questions</h2>

      <div class="faq-container">
        <!-- Privacy & Data Handling -->
        <details class="faq-item">
          <summary class="faq-question">
            <span>How do you handle my data and ensure privacy?</span>
            <span class="faq-chevron">›</span>
          </summary>
          <div class="faq-answer">
            <p>
              <strong
                >We take your privacy seriously and adhere to the Australian Privacy Act 1988 and
                Australian Privacy Principles (APPs).</strong
              >
            </p>

            <p>
              <strong>Analysis Data:</strong> Files, URLs, and text you submit are sent to OpenAI
              for instant analysis and are <strong>deleted immediately after processing</strong>. We
              do not store this data on our servers.
            </p>

            <p>
              <strong>Analysis Results:</strong> Your analysis report is saved
              <strong>locally on your device only</strong> (browser storage) for your convenience.
              You can clear this at any time from your browser settings.
            </p>

            <p>
              <strong>Scam Reports:</strong> If you choose to report a scam, the job advertisement
              text and AI analysis are <strong>stored in our database</strong> to help protect other
              users and contribute to our community safety efforts.
            </p>

            <p class="privacy-apps-list"><strong>Our APP Compliance:</strong></p>
            <ul>
              <li>
                <strong>APP 1 - Open and Transparent:</strong> We clearly explain what data we
                collect, where it's stored, and how it's used.
              </li>
              <li>
                <strong>APP 3 - Collection:</strong> We only collect data you voluntarily submit for
                analysis or reporting, with your explicit consent.
              </li>
              <li>
                <strong>APP 5 - Notification:</strong> You are informed before any data collection
                occurs and understand the purpose of collection.
              </li>
              <li>
                <strong>APP 6 - Use or Disclosure:</strong> Analysis data is used only for scam
                detection. Reported scams are stored to protect the community.
              </li>
              <li>
                <strong>APP 11 - Security:</strong> Data transmitted to OpenAI is deleted after
                processing. Database storage uses industry-standard security practices.
              </li>
              <li>
                <strong>APP 12 - Access:</strong> You can access your locally stored analysis
                reports at any time and clear them from your browser.
              </li>
              <li>
                <strong>APP 13 - Correction:</strong> Reported scams are stored for community safety
                and cannot be edited after submission to maintain data integrity.
              </li>
            </ul>
          </div>
        </details>

        <!-- AI Model & Technology Stack -->
        <details class="faq-item">
          <summary class="faq-question">
            <span>What technologies do you use for scam detection?</span>
            <span class="faq-chevron">›</span>
          </summary>
          <div class="faq-answer">
            <p>
              We use a combination of specialized tools to analyze job postings from different
              sources:
            </p>

            <p><strong>1. Text Analysis - GPT-4o-mini-2024-07-18</strong></p>
            <ul>
              <li><strong>Purpose:</strong> Analyzes job posting text for scam indicators</li>
              <li>
                <strong>Capabilities:</strong> Advanced language understanding to identify subtle
                scam patterns, urgency tactics, unrealistic promises, and suspicious contact methods
              </li>
              <li>
                <strong>Why this model:</strong> Cost-effective, fast, and optimized for text-based
                analysis while maintaining high accuracy
              </li>
            </ul>

            <p><strong>2. Web Scraping - Jina AI Reader</strong></p>
            <ul>
              <li>
                <strong>Service:</strong>
                <a href="https://jina.ai/" target="_blank" rel="noopener noreferrer">Jina.ai</a>
              </li>
              <li><strong>Purpose:</strong> Extracts clean, readable text from job posting URLs</li>
              <li>
                <strong>Why Jina:</strong> Handles modern websites with JavaScript, removes ads and
                clutter, returns structured content perfect for AI analysis
              </li>
            </ul>

            <p><strong>3. Image/PDF OCR - OCR.space API</strong></p>
            <ul>
              <li>
                <strong>Service:</strong>
                <a href="https://ocr.space/OCRAPI" target="_blank" rel="noopener noreferrer"
                  >OCR.space API</a
                >
              </li>
              <li>
                <strong>Purpose:</strong> Extracts text from screenshots and PDF files of job
                postings
              </li>
              <li><strong>Formats supported:</strong> PNG, JPG, WebP, PDF</li>
              <li>
                <strong>Why OCR.space:</strong> Accurate text recognition, handles various image
                qualities, free tier available for community projects
              </li>
            </ul>

            <p><strong>How it works together:</strong></p>
            <ul>
              <li>
                <strong>URL submissions:</strong> Jina.ai extracts the webpage content → GPT-4o-mini
                analyzes the text
              </li>
              <li>
                <strong>File uploads:</strong> OCR.space extracts text from images/PDFs →
                GPT-4o-mini analyzes the text
              </li>
              <li><strong>Direct text:</strong> GPT-4o-mini analyzes the text immediately</li>
            </ul>

            <p>
              All methods result in the same comprehensive risk assessment (Low, Medium, High) with
              specific red flags detected.
            </p>
          </div>
        </details>

        <!-- Accuracy & Limitations -->
        <details class="faq-item">
          <summary class="faq-question">
            <span>How accurate is the AI scam detection?</span>
            <span class="faq-chevron">›</span>
          </summary>
          <div class="faq-answer">
            <p>
              While GPT-4o-mini is highly sophisticated,
              <strong>no AI model is 100% accurate</strong>. Our tool is designed to assist your
              decision-making, not replace it.
            </p>

            <p><strong>Important considerations:</strong></p>
            <ul>
              <li>
                <strong>False positives:</strong> Legitimate jobs may occasionally be flagged if
                they contain unusual patterns
              </li>
              <li>
                <strong>False negatives:</strong> Sophisticated scams designed to evade detection
                may not always be caught
              </li>
              <li>
                <strong>OCR limitations:</strong> Text extracted from poor-quality images or complex
                PDFs may be incomplete or contain errors
              </li>
              <li>
                <strong>Web scraping challenges:</strong> Some websites may block automated access
                or have dynamic content that's difficult to extract
              </li>
              <li>
                <strong>Context matters:</strong> AI analyzes based on patterns but cannot verify
                actual company legitimacy
              </li>
              <li>
                <strong>Evolving threats:</strong> Scammers constantly adapt their tactics to bypass
                detection systems
              </li>
            </ul>

            <p>
              <strong>Our recommendation:</strong> Always use our analysis as
              <strong>one part of your due diligence</strong>. Check our "Before You Apply
              Checklist" in the Hub for additional verification steps, including researching the
              company, verifying contact details, and never paying money upfront.
            </p>
          </div>
        </details>

        <!-- Data Retention -->
        <details class="faq-item">
          <summary class="faq-question">
            <span>How long do you keep my data?</span>
            <span class="faq-chevron">›</span>
          </summary>
          <div class="faq-answer">
            <p>
              <strong>Analysis submissions to OpenAI:</strong> Deleted immediately after processing
              (within seconds). OpenAI does not retain or use your data for training purposes when
              using our API.
            </p>

            <p>
              <strong>Local browser storage:</strong> Your analysis results remain on your device
              until you clear them. You have full control and can delete this data at any time
              through your browser settings (Clear browsing data → Cookies and site data).
            </p>

            <p>
              <strong>Scam reports in our database:</strong> If you choose to report a scam, that
              data is stored indefinitely to maintain the integrity of our community safety database
              and protect other users. This data cannot be edited or deleted after submission to
              prevent tampering with scam records.
            </p>
          </div>
        </details>

        <!-- Why Third-Party Services -->
        <details class="faq-item">
          <summary class="faq-question">
            <span>Why do you use third-party services instead of building your own?</span>
            <span class="faq-chevron">›</span>
          </summary>
          <div class="faq-answer">
            <p>
              As a student-led project focused on protecting vulnerable job seekers, we leverage
              best-in-class third-party services for several strategic reasons:
            </p>

            <ul>
              <li>
                <strong>Resource constraints:</strong> Building and training a comparable AI model,
                web scraper, and OCR system would require lots of money and years of development
                time that we don't have
              </li>
              <li>
                <strong>Immediate impact:</strong> Using proven technology allows us to help users
                now rather than waiting years for development
              </li>
              <li>
                <strong>Specialized expertise:</strong> Each service (GPT-4o-mini for NLP, Jina.ai
                for web scraping, OCR.space for text extraction) is built by teams of specialists
                with years of experience
              </li>
              <li>
                <strong>Reliability & accuracy:</strong> Established services have been tested and
                refined across millions of use cases, ensuring consistent performance
              </li>
              <li>
                <strong>Cost-effective:</strong> GPT-4o-mini is significantly cheaper than GPT-4o
                while maintaining excellent text analysis capabilities, perfect for our budget
              </li>
              <li>
                <strong>Regular updates:</strong> These services continuously improve their
                technology, ensuring our users benefit from the latest advancements without us
                needing to rebuild anything
              </li>
              <li>
                <strong>Focus on mission:</strong> Using existing infrastructure lets us focus on
                our core mission: protecting young Australians from scams through accessible tools,
                education, and community building
              </li>
            </ul>

            <p>
              Our value lies in <strong>how we integrate these technologies</strong> to address a
              critical social problem, not in reinventing the wheel. We combine Jina.ai's web
              scraping, OCR.space's text extraction, and GPT-4o-mini's analysis into a seamless,
              accessible workflow designed specifically for vulnerable job seekers.
            </p>
          </div>
        </details>

        <!-- How to Clear Data -->
        <details class="faq-item">
          <summary class="faq-question">
            <span>How do I clear my locally stored analysis results?</span>
            <span class="faq-chevron">›</span>
          </summary>
          <div class="faq-answer">
            <p>
              Your analysis results are stored only in your browser's local storage. You can clear
              them at any time:
            </p>

            <p><strong>Easiest Method: Use Our Clear Report Button</strong></p>
            <ul>
              <li>
                Navigate to the <strong>Report View</strong> page (after analyzing a job posting)
              </li>
              <li>Scroll to the bottom and find the <strong>"Clear Report"</strong> button</li>
              <li>
                Click <strong>"Clear Report"</strong> to instantly remove all locally stored
                analysis data
              </li>
              <li>
                This will clear your analysis reports, submission history, and all cached data from
                your browser
              </li>
            </ul>

            <p><strong>Alternative: Browser Settings</strong></p>
            <ul>
              <li>
                <strong>Chrome/Edge:</strong> Settings → Privacy and security → Clear browsing data
                → Cookies and site data
              </li>
              <li>
                <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data →
                Clear Data
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy → Manage Website Data → Remove All
              </li>
            </ul>

            <p class="note">
              <strong>Note:</strong> Clearing local storage will remove your saved analysis results
              and browsing history on our site. This does not affect scam reports you've already
              submitted to our database.
            </p>
          </div>
        </details>

        <!-- Who Can See Reports -->
        <details class="faq-item">
          <summary class="faq-question">
            <span>Who can see the scam reports I submit?</span>
            <span class="faq-chevron">›</span>
          </summary>
          <div class="faq-answer">
            <p>When you submit a scam report:</p>

            <ul>
              <li>
                <strong>Public community view:</strong> Scam reports are displayed on our Hub's
                "Community Scam Reports" section to warn other users. We show the job title, risk
                level, red flags detected, and submission date.
              </li>
              <li>
                <strong>No personal information:</strong> Reports are submitted anonymously. We do
                not collect or display your name, email, or any identifying information.
              </li>
              <li>
                <strong>Job posting content:</strong> The job advertisement text and AI analysis are
                stored to help others identify similar scams.
              </li>
              <li>
                <strong>Database access:</strong> Only our development team can access the full
                database for research and system improvements.
              </li>
            </ul>

            <p>
              <strong>Purpose:</strong> This community-driven approach helps protect other young job
              seekers by making scam patterns visible and building collective awareness.
            </p>
          </div>
        </details>
      </div>
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

/* FAQ Section Styles */
.faq-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(241, 245, 249, 0.9) 100%);
  border: 2px solid rgba(59, 130, 246, 0.2);
}

.faq-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.faq-item[open] {
  border-color: #3b82f6;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
}

.faq-question {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  list-style: none;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1f2937;
  background: #f9fafb;
  transition: all 0.2s ease;
  user-select: none;
}

.faq-question:hover {
  background: #f3f4f6;
  color: #3b82f6;
}

.faq-item[open] .faq-question {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.faq-item[open] .faq-icon {
  animation: iconBounce 0.4s ease;
}

@keyframes iconBounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.faq-chevron {
  margin-left: auto;
  font-size: 1.5rem;
  font-weight: 400;
  transition: transform 0.3s ease;
  color: #9ca3af;
}

.faq-item[open] .faq-chevron {
  transform: rotate(90deg);
  color: #ffffff;
}

.faq-answer {
  padding: 1.5rem 1.5rem 1.5rem 4rem;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-answer p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 1rem;
}

.faq-answer p:last-child {
  margin-bottom: 0;
}

.faq-answer strong {
  color: #1e40af;
  font-weight: 700;
}

.faq-answer ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.faq-answer ul li {
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 0.5rem;
}

.faq-answer ul li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3b82f6;
  font-weight: bold;
  font-size: 1.3rem;
}

.faq-answer ul li strong {
  color: #1e40af;
}

.faq-answer a {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.faq-answer a:hover {
  color: #1d4ed8;
}

.faq-answer code {
  background: #f3f4f6;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  color: #1e40af;
  border: 1px solid #e5e7eb;
}

.faq-answer .note {
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid #3b82f6;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.95rem;
}

.privacy-apps-list {
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
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

  .faq-question {
    font-size: 1rem;
    padding: 1rem 1.25rem;
  }

  .faq-answer {
    padding: 1.25rem 1.25rem 1.25rem 3rem;
  }

  .faq-answer p,
  .faq-answer ul li {
    font-size: 0.95rem;
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

  .faq-question {
    font-size: 0.95rem;
    padding: 0.875rem 1rem;
    gap: 0.75rem;
  }

  .faq-icon {
    font-size: 1.25rem;
  }

  .faq-answer {
    padding: 1rem 1rem 1rem 2.5rem;
  }

  .faq-answer p,
  .faq-answer ul li {
    font-size: 0.9rem;
  }
}
</style>
