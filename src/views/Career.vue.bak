<template>
  <main-layout>
    <v-card>
      <v-card-title>Карьера</v-card-title>
      
      <v-tabs
        v-model="tab"
        color="primary"
        align-tabs="center"
      >
        <v-tab
          v-for="item in tabs"
          :key="item.value"
          :value="item.value"
          :to="`/career/${item.value}`"
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>
      
      <v-window v-model="tab">
        <v-window-item
          v-for="item in tabs"
          :key="item.value"
          :value="item.value"
        >
          <v-card flat>
            <v-card-text>
              <router-view></router-view>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </main-layout>
</template>

<script>
import MainLayout from '../components/layout/MainLayout.vue';

export default {
  name: 'Career',
  components: {
    MainLayout
  },
  data() {
    return {
      tab: 'vacancies',
      tabs: [
        { title: 'Вакансии', value: 'vacancies' },
        { title: 'Мои рекомендации', value: 'recommendations' },
        { title: 'Профиль', value: 'profile' }
      ]
    };
  },
  watch: {
    $route(to) {
      // Обновляем активную вкладку при изменении маршрута
      const path = to.path.split('/');
      if (path.length > 2) {
        this.tab = path[2];
      } else {
        this.tab = 'vacancies';
      }
    }
  },
  created() {
    // Устанавливаем начальную вкладку в зависимости от текущего маршрута
    const path = this.$route.path.split('/');
    if (path.length > 2) {
      this.tab = path[2];
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 