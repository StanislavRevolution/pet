<template>
  <main-layout>
    <div class="career-container">
      <h1 class="page-title">
        Карьера <span class="accent-text">и развитие</span>
      </h1>

      <div class="courses-filter mb-6">
        <v-tabs 
          v-model="tab" 
          background-color="transparent" 
          color="#ff5734" 
          slider-color="transparent" 
          align-tabs="start"
          height="48"
        >
          <v-tab 
            v-for="item in tabs" 
            :key="item.value" 
            :value="item.value" 
            :to="`/career/${item.value}`" 
            class="filter-tab px-4 mr-2"
          >
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </div>

      <v-card class="mb-6 intro-card" color="#f7f7f5">
        <v-card-text class="py-6 px-6">
          <p class="text-body-1">
            Мы создали сеть карьерных консультантов из профессиональных HR-специалистов и рекрутеров, которые помогут вам
            с составлением резюме, подготовкой к собеседованиям и построением карьерной стратегии в IT.
          </p>
        </v-card-text>
      </v-card>

      <router-view></router-view>
    </div>
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
      tab: 'consultants', // Вкладка по умолчанию
      tabs: [
        { title: 'Карьерные консультанты', value: 'consultants' },
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
      const currentTab = path[2];
      if (this.tabs.some(t => t.value === currentTab)) {
        this.tab = currentTab;
      } else {
        this.tab = 'consultants'; // Устанавливаем вкладку по умолчанию, если маршрут не соответствует ни одной вкладке
      }
    }
  },
  created() {
    // Устанавливаем начальную вкладку в зависимости от текущего маршрута
    const path = this.$route.path.split('/');
    const currentTab = path[2];
    if (this.tabs.some(t => t.value === currentTab)) {
      this.tab = currentTab;
    } else {
       this.tab = 'consultants'; // Устанавливаем вкладку по умолчанию при первой загрузке
    }
  }
};
</script>

<style scoped>
.career-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 2rem;
}

.accent-text {
  color: #ff5734;
}

.filter-tab {
  border-radius: 16px !important;
  font-weight: 500;
  font-size: 0.95rem;
}

.filter-tab:hover, .filter-tab--selected {
  background: rgba(255, 87, 52, 0.1);
}

.intro-card {
  border-radius: 24px !important;
  transition: all 0.3s ease;
}

.intro-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05) !important;
}
</style>