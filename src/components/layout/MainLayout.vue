<template>
  <v-app>
    <app-header />
    
    <v-main class="bg-background">
      <v-container fluid class="py-8 px-4 px-md-6" style="max-width: 1440px;">
        <slot></slot>
      </v-container>
    </v-main>
    
    <v-footer app color="primary" class="py-4">
      <v-container>
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="4" class="text-center text-md-left">
            <div class="text-h6 font-weight-bold white--text">Бизнес Платформа</div>
            <div class="text-caption white--text mt-1 opacity-75">Развивайте профессиональные навыки с нами</div>
          </v-col>
          
          <v-col cols="12" md="4" class="text-center d-flex justify-center">
            <v-btn icon variant="text" class="mx-1" color="white">
              <v-icon>mdi-youtube</v-icon>
            </v-btn>
            <v-btn icon variant="text" class="mx-1" color="white">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <v-btn icon variant="text" class="mx-1" color="white">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon variant="text" class="mx-1" color="white">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-col>
          
          <v-col cols="12" md="4" class="text-center text-md-right white--text">
            <div>{{ new Date().getFullYear() }} — <strong>Бизнес Платформа</strong></div>
            <div class="text-caption opacity-75 mt-1">Все права защищены</div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import AppHeader from './AppHeader.vue';

export default {
  name: 'MainLayout',
  components: {
    AppHeader
  }
};
</script>

<style scoped>
.bg-background {
  background-color: #f8f9fa;
}

.v-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.v-container {
  margin: 0 auto;
}
</style> 