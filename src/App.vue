<script>
export default {
  name: 'App'
}
</script>

<template>
  <router-view />
</template>

<style>
/* Глобальные стили приложения */
@import url('https://fonts.googleapis.com/css2?family=Kodchasan:wght@400;500;600;700&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Kodchasan', sans-serif;
  background-color: #be94f5;
  color: #151313;
}

.v-card {
  border-radius: 24px !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  background-color: #ffffff !important;
}

.v-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.v-btn {
  letter-spacing: 0.5px;
  font-weight: 500;
  text-transform: none;
  border-radius: 16px !important;
}

.v-btn.primary {
  background-color: #ff5734 !important;
  color: white !important;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #151313;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #151313;
}

.accent-text {
  color: #ff5734;
}

.v-application {
  line-height: 1.6;
  font-family: 'Kodchasan', sans-serif !important;
}

.v-input {
  border-radius: 16px !important;
}

.v-tab {
  border-radius: 16px !important;
}
</style>
