<template>
  <div class="password-screen">
    <div class="password-box">
      <h2>Enter Password</h2>
      <input
        type="password"
        v-model="password"
        @keyup.enter="checkPassword"
        placeholder="Password"
      />
      <button @click="checkPassword">Submit</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const password = ref('')
const error = ref('')
const router = useRouter()
const PASSWORD = import.meta.env.VITE_PASSWORD // Get password from environment

// Validate password and handle authentication
function checkPassword() {
  if (password.value === PASSWORD) {
    // Set authentication flag and redirect to home
    localStorage.setItem('authenticated', 'true')
    error.value = ''
    router.replace({ name: 'home' })
  } else {
    error.value = 'Incorrect password'
  }
}
</script>

<style scoped>
.password-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e293b;
}
.password-box {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.password-box input {
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  width: 100%;
}
.password-box button {
  padding: 0.5rem 2rem;
  border-radius: 6px;
  border: none;
  background: #3b82f6;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.error {
  color: #dc2626;
  margin-top: 1rem;
}
</style>
