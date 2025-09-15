<template>
  <div class="tab-navigation">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="tab-button"
      :class="{ active: activeTab === tab.id }"
      @click="$emit('tab-change', tab.id)"
    >
      {{ tab.label }}
    </button>
    <div class="tab-underline" :style="underlineStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'TabNavigation',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
  },
  emits: ['tab-change'],
  computed: {
    activeTabIndex() {
      return this.tabs.findIndex((tab) => tab.id === this.activeTab)
    },
    underlineStyle() {
      const tabWidth = 100 / this.tabs.length
      const left = this.activeTabIndex * tabWidth
      return {
        width: `${tabWidth}%`,
        left: `${left}%`,
      }
    },
  },
}
</script>

<style scoped>
.tab-navigation {
  position: relative;
  display: flex;
  width: 100%;
  border-bottom: 2px solid rgba(71, 85, 105, 0.5);
  margin: 2rem 0;
}

.tab-button {
  flex: 1;
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 1rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
}

.tab-button:hover {
  color: #e2e8f0;
}

.tab-button.active {
  color: #60a5fa;
}

.tab-underline {
  position: absolute;
  bottom: -2px;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
  transition: all 0.3s ease;
  border-radius: 1px;
}

@media (max-width: 768px) {
  .tab-button {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .tab-button {
    padding: 0.5rem 0.5rem;
    font-size: 0.8rem;
    letter-spacing: 0.25px;
  }
}
</style>
