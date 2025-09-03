<template>
  <div class="tab-navigation">
    <BaseButton
      v-for="tab in tabs"
      :key="tab.id"
      variant="tab"
      :active="activeTab === tab.id"
      @click="handleTabClick(tab)"
      :disabled="!tab.disabled ? false : undefined"
      :class="{ 'disabled-clickable': tab.disabled }"
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
  // Always emit click event (needed for disabled tab notifications)
  emit('tab-click', tab)

  // Only change active tab if not disabled
  if (!tab.disabled) {
    emit('update:activeTab', tab.id)
  }
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

/* Make disabled tabs still clickable for notifications */
.tab-navigation :deep(.disabled-clickable.base-btn) {
  pointer-events: auto !important;
  cursor: pointer !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tab-navigation {
    margin-bottom: 1.5rem;
  }
}
</style>
