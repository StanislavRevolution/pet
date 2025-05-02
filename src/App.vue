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
body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

.v-card {
  border-radius: 12px !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.3s, box-shadow 0.3s;
}

.v-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.v-btn {
  letter-spacing: 0.5px;
  font-weight: 500;
  text-transform: none;
  border-radius: 8px;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;
}

.v-application {
  line-height: 1.6;
}
</style>
