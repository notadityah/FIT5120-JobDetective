<template>
  <!-- Privacy Consent Modal -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isVisible"
        class="privacy-modal-overlay"
        @click="handleCancel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
        aria-describedby="privacy-modal-description"
      >
        <div class="privacy-modal-container" @click.stop>
          <!-- Modal Header -->
          <div class="privacy-modal-header">
            <h2 id="privacy-modal-title" class="privacy-modal-title">Privacy & Consent Notice</h2>
            <button
              class="privacy-modal-close"
              @click="handleCancel"
              aria-label="Close privacy notice"
              type="button"
            >
              &times;
            </button>
          </div>

          <!-- Modal Content -->
          <div id="privacy-modal-description" class="privacy-modal-content">
            <!-- Privacy Icon -->

            <!-- Privacy Statement - UPDATED FOR COMPLIANCE -->
            <div class="privacy-statement">
              <p class="privacy-text privacy-highlight">
                <strong>How We Handle Your Data:</strong>
              </p>

              <ul class="privacy-list-main">
                <li>
                  <strong>Analysis Data:</strong> Files, URLs, and text you submit are sent to
                  OpenAI for instant analysis and are
                  <strong>deleted immediately after processing</strong>. We do not store this data
                  on our servers.
                </li>
                <li>
                  <strong>Analysis Results:</strong> Your analysis report is saved
                  <strong>locally on your device only</strong> (browser storage) for your
                  convenience. You can clear this at any time.
                </li>
                <li>
                  <strong>Scam Reports:</strong> If you choose to report a scam, the job
                  advertisement text and AI analysis are <strong>stored in our database</strong> to
                  help protect other users and contribute to our community safety efforts.
                </li>
              </ul>

              <p class="privacy-consent-text">By continuing, you consent to:</p>
              <ul class="privacy-consent-list">
                <li>Sending your data to OpenAI for temporary analysis</li>
                <li>Storing analysis results locally on your device</li>
                <li>Understanding that reporting scams will store data in our database</li>
              </ul>

              <p class="privacy-text privacy-compliance">
                We adhere to the
                <strong>Australian Privacy Act 1988</strong> and the
                <strong>Australian Privacy Principles (APPs)</strong>.
              </p>
            </div>

            <!-- APP Compliance Details (Collapsible) -->
            <details class="privacy-details">
              <summary class="privacy-summary">
                <span class="summary-icon" aria-hidden="true">ℹ</span>
                Learn more about our privacy practices
              </summary>
              <div class="privacy-details-content">
                <ul class="privacy-list">
                  <li>
                    <strong>APP 1 - Open and Transparent:</strong> We clearly explain what data we
                    collect, where it's stored, and how it's used.
                  </li>
                  <li>
                    <strong>APP 3 - Collection:</strong> We only collect data you voluntarily submit
                    for analysis or reporting, with your explicit consent.
                  </li>
                  <li>
                    <strong>APP 5 - Notification:</strong> You are informed before any data
                    collection occurs and understand the purpose of collection.
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
                    <strong>APP 13 - Correction:</strong> Reported scams are stored for community
                    safety and cannot be edited after submission to maintain data integrity.
                  </li>
                </ul>

                <div class="faq-link-wrapper">
                  <router-link to="/about-us#faq" class="faq-link">
                    📚 Read our full FAQ for more details
                  </router-link>
                </div>
              </div>
            </details>
          </div>

          <!-- Modal Actions -->
          <div class="privacy-modal-actions">
            <button
              class="privacy-btn privacy-btn-cancel"
              @click="handleCancel"
              type="button"
              aria-label="Cancel and close modal"
            >
              Cancel
            </button>
            <button
              class="privacy-btn privacy-btn-continue"
              @click="handleContinue"
              type="button"
              aria-label="Accept and continue with analysis"
            >
              I Understand, Continue
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
/**
 * PrivacyConsentModal Component
 *
 * UPDATED: Provides accurate privacy disclosure for localStorage and database storage
 *
 * Compliance with Australian Privacy Principles (APPs):
 * - APP 1 (Open and transparent): Honest disclosure of all data storage locations
 * - APP 3 (Collection): Explicit consent before collection
 * - APP 5 (Notification): Clear notice about localStorage and database storage
 * - APP 6 (Use or disclosure): Specific purposes stated (analysis, reporting, community safety)
 * - APP 11 (Security): Explains data handling and deletion practices
 * - APP 12 (Access): Informs users they can access/clear local data
 * - APP 13 (Correction): Explains why reported scams cannot be edited
 */
export default {
  name: 'PrivacyConsentModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ['cancel', 'continue'],
  methods: {
    handleCancel() {
      this.$emit('cancel')
    },
    handleContinue() {
      this.$emit('continue')
    },
  },
  data() {
    return {
      handleEscape: null,
    }
  },
  mounted() {
    this.handleEscape = (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.handleCancel()
      }
    }
    document.addEventListener('keydown', this.handleEscape)
  },
  beforeUnmount() {
    if (this.handleEscape) {
      document.removeEventListener('keydown', this.handleEscape)
    }
  },
}
</script>

<style scoped>
/* Modal Overlay */
.privacy-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
  padding: 1rem;
}

/* Modal Container */
.privacy-modal-container {
  background: #ffffff;
  border-radius: 16px;
  max-width: 750px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow:
    0 20px 60px -10px rgba(0, 0, 0, 0.3),
    0 10px 30px -5px rgba(0, 0, 0, 0.2);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Modal Header */
.privacy-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid #e5e7eb;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 16px 16px 0 0;
}

.privacy-modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.01em;
}

.privacy-modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: #ffffff;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  opacity: 0.9;
}

.privacy-modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  opacity: 1;
}

.privacy-modal-close:focus {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

/* Modal Content */
.privacy-modal-content {
  padding: 2rem;
  color: #1f2937;
}

.privacy-icon {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* Privacy Statement */
.privacy-statement {
  margin-bottom: 1.5rem;
}

.privacy-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 1rem;
}

.privacy-text:last-child {
  margin-bottom: 0;
}

.privacy-highlight {
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid #3b82f6;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  font-size: 1.05rem;
}

.privacy-highlight strong {
  color: #1e40af;
}

.privacy-compliance {
  font-size: 0.95rem;
  color: #6b7280;
  padding: 0.75rem 0;
}

.privacy-compliance strong {
  color: #1f2937;
  font-weight: 600;
}

/* Privacy Details (Collapsible) */
.privacy-details {
  margin-top: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.privacy-summary {
  padding: 1rem 1.25rem;
  background: #f9fafb;
  cursor: pointer;
  font-weight: 600;
  color: #374151;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s ease;
  user-select: none;
}

.privacy-summary:hover {
  background: #f3f4f6;
}

.privacy-summary::-webkit-details-marker {
  display: none;
}

.summary-icon {
  font-size: 1.2rem;
}

.privacy-details-content {
  padding: 1.25rem;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
}

.privacy-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.privacy-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #4b5563;
}

.privacy-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.privacy-list li strong {
  color: #1f2937;
  display: block;
  margin-bottom: 0.25rem;
}

/* New styles for updated compliance */
.privacy-list-main {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.25rem;
  border-left: 4px solid #3b82f6;
}

.privacy-list-main li {
  padding: 0.75rem 0;
  color: #374151;
  line-height: 1.6;
  font-size: 0.95rem;
}

.privacy-list-main li:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
}

.privacy-list-main li strong {
  color: #1e40af;
  display: block;
  margin-bottom: 0.25rem;
}

.privacy-consent-text {
  font-weight: 600;
  color: #1f2937;
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1rem;
}

.privacy-consent-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 1rem 0;
}

.privacy-consent-list li {
  padding: 0.5rem 0 0.5rem 1.5rem;
  color: #374151;
  position: relative;
  line-height: 1.6;
  font-size: 0.95rem;
}

.privacy-consent-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #3b82f6;
  font-weight: bold;
}

.faq-link-wrapper {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 2px solid #e5e7eb;
  text-align: center;
}

.faq-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.faq-link:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  color: #ffffff;
}

/* Modal Actions */
.privacy-modal-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 0 0 16px 16px;
}

.privacy-btn {
  flex: 1;
  padding: 0.875rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.privacy-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.privacy-btn-cancel {
  background: #ffffff;
  color: #6b7280;
  border-color: #d1d5db;
}

.privacy-btn-cancel:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  color: #374151;
}

.privacy-btn-continue {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.privacy-btn-continue:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.privacy-btn-continue:active {
  transform: translateY(0);
}

/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 640px) {
  .privacy-modal-container {
    max-width: 95%;
    margin: 0.5rem;
  }

  .privacy-modal-header {
    padding: 1.25rem 1.5rem;
  }

  .privacy-modal-title {
    font-size: 1.25rem;
  }

  .privacy-modal-content {
    padding: 1.5rem;
  }

  .privacy-icon {
    font-size: 2.5rem;
  }

  .privacy-text {
    font-size: 0.95rem;
  }

  .privacy-modal-actions {
    flex-direction: column;
    padding: 1.25rem 1.5rem;
  }

  .privacy-btn {
    width: 100%;
  }
}

/* Accessibility: Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .privacy-modal-container {
    animation: none;
  }

  .privacy-btn,
  .privacy-modal-close,
  .privacy-summary {
    transition: none;
  }
}
</style>
