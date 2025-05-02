<template>
  <div>
    <h2 class="text-h4 mb-6">Рекомендованные вакансии</h2>
    
    <v-alert
      type="info"
      variant="tonal"
      class="mb-6"
    >
      На основе вашего профиля и навыков мы подобрали для вас следующие вакансии.
    </v-alert>
    
    <v-card v-for="recommendation in recommendations" :key="recommendation.vacancyId" class="mb-6">
      <v-card-title class="d-flex align-center">
        <div>
          <div class="text-h5">{{ getVacancyTitle(recommendation.vacancyId) }}</div>
          <div class="text-subtitle-1">{{ getVacancyCompany(recommendation.vacancyId) }}</div>
        </div>
        <v-spacer></v-spacer>
        <v-chip 
          :color="getMatchColor(recommendation.matchingScore)" 
          size="small"
        >
          {{ recommendation.matchingScore }}% совпадение
        </v-chip>
      </v-card-title>
      
      <v-card-text>
        <div class="mb-3">{{ getVacancyDescription(recommendation.vacancyId) }}</div>
        
        <v-row class="mt-4">
          <v-col cols="12" sm="6" md="4">
            <div class="text-subtitle-2">Локация</div>
            <div>{{ getVacancyLocation(recommendation.vacancyId) }}</div>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <div class="text-subtitle-2">Зарплата</div>
            <div>{{ getVacancySalaryRange(recommendation.vacancyId) }}</div>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <div class="text-subtitle-2">Уровень</div>
            <div>{{ getVacancyGrade(recommendation.vacancyId) }}</div>
          </v-col>
        </v-row>
        
        <v-divider class="my-4"></v-divider>
        
        <div class="d-flex flex-wrap">
          <div class="mr-6 mb-4" style="min-width: 200px;">
            <div class="text-subtitle-2 mb-2">Совпадающие навыки</div>
            <v-chip
              v-for="skill in recommendation.matchedSkills"
              :key="skill"
              class="mr-1 mb-1"
              size="small"
              color="success"
              variant="outlined"
            >
              {{ skill }}
            </v-chip>
          </div>
          
          <div style="min-width: 200px;">
            <div class="text-subtitle-2 mb-2">Недостающие навыки</div>
            <v-chip
              v-for="skill in recommendation.mismatchedSkills"
              :key="skill"
              class="mr-1 mb-1"
              size="small"
              color="error"
              variant="outlined"
            >
              {{ skill }}
            </v-chip>
          </div>
        </div>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary">
          Откликнуться
        </v-btn>
      </v-card-actions>
    </v-card>
    
    <div v-if="recommendations.length === 0" class="text-center pa-6">
      <p>У вас пока нет рекомендаций. Заполните профиль, чтобы получать персонализированные предложения.</p>
      <v-btn 
        color="primary" 
        class="mt-4" 
        :to="'/career/profile'"
      >
        Заполнить профиль
      </v-btn>
    </div>
  </div>
</template>

<script>
import { recommendations, vacancies } from '../../data/career';

export default {
  name: 'UserRecommendations',
  data() {
    return {
      recommendations: [...recommendations],
      vacancies: [...vacancies],
      currentUserId: 1 // ID текущего пользователя (предполагаем, что это первый пользователь)
    };
  },
  created() {
    // Фильтруем рекомендации только для текущего пользователя
    this.recommendations = this.recommendations.filter(rec => rec.userId === this.currentUserId);
    
    // Сортируем по проценту совпадения (от большего к меньшему)
    this.recommendations.sort((a, b) => b.matchingScore - a.matchingScore);
  },
  methods: {
    // Получение информации о вакансии по ID
    getVacancy(vacancyId) {
      return this.vacancies.find(vacancy => vacancy.id === vacancyId) || {};
    },
    
    // Методы для получения различных свойств вакансии
    getVacancyTitle(vacancyId) {
      return this.getVacancy(vacancyId).title || 'Неизвестная вакансия';
    },
    
    getVacancyCompany(vacancyId) {
      return this.getVacancy(vacancyId).company || 'Неизвестная компания';
    },
    
    getVacancyDescription(vacancyId) {
      return this.getVacancy(vacancyId).description || 'Нет описания';
    },
    
    getVacancyLocation(vacancyId) {
      return this.getVacancy(vacancyId).location || 'Не указано';
    },
    
    getVacancySalaryRange(vacancyId) {
      return this.getVacancy(vacancyId).salaryRange || 'Не указано';
    },
    
    getVacancyGrade(vacancyId) {
      return this.getVacancy(vacancyId).grade || 'Не указано';
    },
    
    // Определение цвета для чипа процента совпадения
    getMatchColor(score) {
      if (score >= 90) return 'success';
      if (score >= 70) return 'info';
      if (score >= 50) return 'warning';
      return 'error';
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 