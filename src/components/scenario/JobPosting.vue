<template>
  <!-- Job Posting Mock-up -->
  <div class="job-posting">
    <div class="job-header">
      <div class="job-title-section">
        <h4>{{ jobPosting.title }}</h4>
        <p class="company-name">{{ jobPosting.company }}</p>
      </div>
      <span class="remote-badge">{{ jobPosting.location }}</span>
    </div>

    <div class="job-details">
      <div
        class="job-description"
        v-html="processedDescription"
        @click="$emit('highlight-click', $event)"
      ></div>

      <div class="job-requirements" v-if="jobPosting.requirements">
        <h5>Requirements:</h5>
        <ul>
          <li
            v-for="req in jobPosting.requirements"
            :key="req"
            v-html="addClickableHighlights(req)"
            @click="$emit('highlight-click', $event)"
          ></li>
        </ul>
      </div>

      <div class="job-responsibilities" v-if="jobPosting.responsibilities">
        <h5>Responsibilities:</h5>
        <ul>
          <li
            v-for="resp in jobPosting.responsibilities"
            :key="resp"
            v-html="addClickableHighlights(resp)"
            @click="$emit('highlight-click', $event)"
          ></li>
        </ul>
      </div>

      <div class="application-section">
        <h5>How to Apply:</h5>
        <p v-html="processedApplication" @click="$emit('highlight-click', $event)"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobPosting',
  props: {
    jobPosting: {
      type: Object,
      required: true,
    },
    processedDescription: {
      type: String,
      required: true,
    },
    processedApplication: {
      type: String,
      required: true,
    },
    addClickableHighlights: {
      type: Function,
      required: true,
    },
  },
  emits: ['highlight-click'],
}
</script>

<style scoped>
.job-posting {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.job-title-section h4 {
  color: #0f172a;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.company-name {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 400;
}

.remote-badge {
  background: #e2e8f0;
  color: #475569;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
}

.job-details h5 {
  color: #0f172a;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 2rem 0 1rem 0;
  letter-spacing: -0.02em;
}

.job-description {
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1rem;
}

.job-requirements,
.job-responsibilities {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.job-requirements ul,
.job-responsibilities ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
}

.job-requirements li,
.job-responsibilities li {
  margin-bottom: 0.75rem;
  color: #0f172a;
  line-height: 1.6;
  font-weight: 400;
}

.application-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

/* Red flag highlighting styles */
:deep(.red-flag-text) {
  position: relative;
  transition: all 0.3s ease;
}

:deep(.red-flag-text:hover) {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 3px;
  padding: 2px 4px;
  margin: -2px -4px;
  cursor: pointer;
}

:deep(.red-flag-text.revealed) {
  background: linear-gradient(120deg, #ff7675 0%, #d63031 100%);
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
  font-weight: 600;
  animation: pulse 2s infinite;
}

:deep(.red-flag-text.clicked) {
  background: rgba(59, 130, 246, 0.2);
  border-radius: 3px;
  padding: 2px 4px;
  margin: -2px -4px;
  transform: scale(1.02);
}

:deep(.red-flag-text.discovered) {
  background: linear-gradient(120deg, #ef4444 0%, #dc2626 100%);
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
}

:deep(.red-flag-text.discovered:hover) {
  background: linear-gradient(120deg, #dc2626 0%, #b91c1c 100%) !important;
  color: white !important;
}

:deep(.red-flag-text.discovered:focus) {
  background: linear-gradient(120deg, #dc2626 0%, #b91c1c 100%) !important;
  color: white !important;
  outline: 2px solid #fca5a5;
  outline-offset: 2px;
}

:deep(.clickable-red-flag) {
  cursor: pointer !important;
  position: relative;
}

:deep(.clickable-red-flag:hover),
:deep(.clickable-red-flag:focus) {
  background: rgba(59, 130, 246, 0.15) !important;
  border-radius: 3px;
  padding: 2px 4px;
  margin: -2px -4px;
  outline: 2px solid #3b82f6;
  outline-offset: 1px;
}

:deep(.clickable-red-flag:focus-visible) {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  background: rgba(59, 130, 246, 0.2) !important;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 118, 117, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 118, 117, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 118, 117, 0);
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .job-posting {
    padding: 1.5rem;
  }

  .job-header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
