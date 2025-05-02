<template>
  <v-app>
    <div class="layout-container">
      <app-header />
      
      <v-main class="bg-background">
        <v-container fluid class="py-8 px-4 px-md-6" style="max-width: 1440px; min-height: calc(100vh - 165px);">
          <slot></slot>
        </v-container>
      </v-main>
    </div>
    
    <v-footer app color="#fccc42" class="footer-container py-2">
      <v-container class="px-4 d-flex" style="max-width: 1440px">
        <v-row justify="space-between" align="center" style="width: 100%">
          <v-col cols="12" sm="6" class="text-center text-sm-left mb-0">
            <div class="text-body-2 font-weight-medium">Платформа для бизнес-задач</div>
          </v-col>
          
          <v-col cols="12" sm="6" class="text-center text-sm-right mb-0">
            <div class="text-caption">{{ new Date().getFullYear() }} — Все права защищены</div>
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
.layout-container {
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
}

.bg-background {
  background-color: #be94f5;
}

.footer-container {
  width: 100% !important;
}

.v-container {
  margin: 0 auto;
}
</style> 