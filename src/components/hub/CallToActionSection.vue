<template>
  <!-- Prompt encouraging users to run the scam analysis tool -->
  <section class="cta-section">
    <div class="cta-content">
      <h2 class="cta-title">Think a job might be suspicious?</h2>
      <p class="cta-subtitle">
        Don't risk it. Use our free tool to check the listing for common red flags before you apply.
      </p>
      <BaseButton variant="primary" size="large" @click="goToAnalyse">Analyse it now</BaseButton>
    </div>
  </section>
</template>

<script setup>
// Navigates visitors from the awareness hub to the job analysis workflow
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

const goToAnalyse = () => {
  router.push('/analyse')
}
</script>

<style scoped>
.cta-section {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 4rem 2rem;
  text-align: center;
  margin-top: 4rem;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.cta-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  font-weight: 400;
}

@media (max-width: 768px) {
  .cta-section {
    padding: 3rem 1.5rem;
  }

  .cta-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .cta-section {
    padding: 2.5rem 1rem;
  }

  .cta-title {
    font-size: 1.8rem;
  }
}
</style>
