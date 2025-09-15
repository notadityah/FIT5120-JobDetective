<template>
  <div class="filter-tabs">
    <button
      v-for="filter in filters"
      :key="filter.id"
      class="filter-button"
      :class="{ active: activeFilter === filter.id }"
      @click="$emit('filter-change', filter.id)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterTabs',
  props: {
    filters: {
      type: Array,
      required: true,
    },
    activeFilter: {
      type: String,
      required: true,
    },
  },
  emits: ['filter-change'],
}
</script>

<style scoped>
.filter-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-button {
  background: transparent;
  border: 1px solid #475569;
  color: #cbd5e1;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.filter-button:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.filter-button.active {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
}
</style>
