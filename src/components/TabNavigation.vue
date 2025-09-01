<template>
  <div class="tab-navigation">
    <BaseButton
      v-for="tab in tabs"
      :key="tab.id"
      variant="tab"
      :active="activeTab === tab.id"
      @click="handleTabClick(tab)"
      :disabled="tab.disabled"
    >
      {{ tab.label }}
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  tabs: {
    type: Array,
    required: true,
    validator: (tabs) => tabs.every((tab) => tab.id && tab.label),
  },
  activeTab: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['tab-click', 'update:activeTab'])

const handleTabClick = (tab) => {
  if (tab.disabled) return

  emit('update:activeTab', tab.id)
  emit('tab-click', tab)
}
</script>

<style scoped>
.tab-navigation {
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid #4a5568;
  width: 100%;
}

/* Override BaseButton styles for tab layout */
.tab-navigation :deep(.base-btn) {
  border-radius: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tab-navigation {
    margin-bottom: 1.5rem;
  }
}
</style>
