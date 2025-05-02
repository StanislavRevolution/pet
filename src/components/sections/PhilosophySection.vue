<template>
  <v-card class="philosophy-card mb-6">
    <v-card-text class="pa-6">
      <div class="d-flex flex-wrap align-center">
        <div class="philosophy-content">
          <h3 class="text-h5 font-weight-bold mb-3">Наша философия</h3>
          <p class="philosophy-text">
            Мы создаем среду, где каждый специалист может расти профессионально, 
            решая реальные бизнес-задачи и получая обратную связь от экспертов. 
            Наша платформа соединяет теорию с практикой и помогает развивать 
            навыки, которые действительно востребованы на рынке.
          </p>
        </div>
        
        <div class="philosophy-illustration ml-auto text-right d-none d-md-block">
          <v-img
            src="/assets/solution.svg"
            alt="Философия платформы"
            max-width="200"
            class="ml-auto"
          ></v-img>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PhilosophySection'
}
</script>

<style scoped>
.philosophy-card {
  border-radius: 24px !important;
  background-color: #f7f7f5 !important;
  transition: all 0.3s ease;
  border-left: 4px solid #ff5734;
}

.philosophy-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05) !important;
}

.philosophy-content {
  max-width: 70%;
}

.philosophy-text {
  line-height: 1.6;
  font-size: 1.05rem;
}

@media (max-width: 960px) {
  .philosophy-content {
    max-width: 100%;
  }
}
</style> 