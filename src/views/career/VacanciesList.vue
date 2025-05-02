<template>
  <div>
    <h2 class="text-h4 mb-6">Список вакансий</h2>
    
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Поиск"
              density="compact"
              variant="outlined"
              hide-details
              @update:model-value="filterVacancies"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="selectedGrade"
              :items="grades"
              label="Уровень"
              density="compact"
              variant="outlined"
              hide-details
              @update:model-value="filterVacancies"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-autocomplete
              v-model="selectedSkills"
              :items="allSkills"
              label="Навыки"
              multiple
              chips
              density="compact"
              variant="outlined"
              hide-details
              @update:model-value="filterVacancies"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <v-card v-for="vacancy in paginatedVacancies" :key="vacancy.id" class="mb-4">
      <v-card-title class="d-flex align-center">
        <div>
          <div class="text-h5">{{ vacancy.title }}</div>
          <div class="text-subtitle-1">{{ vacancy.company }}</div>
        </div>
        <v-spacer></v-spacer>
        <v-chip color="primary" size="small">{{ vacancy.grade }}</v-chip>
      </v-card-title>
      
      <v-card-text>
        <div class="mb-3">{{ vacancy.description }}</div>
        
        <v-row class="mt-4">
          <v-col cols="12" sm="4">
            <div class="text-subtitle-2">Локация</div>
            <div>{{ vacancy.location }}</div>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="text-subtitle-2">Зарплата</div>
            <div>{{ vacancy.salaryRange }}</div>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="text-subtitle-2">Опубликовано</div>
            <div>{{ formatDate(vacancy.postedAt) }}</div>
          </v-col>
        </v-row>
        
        <div class="text-subtitle-2 mt-3">Требуемые навыки</div>
        <div class="mt-1">
          <v-chip
            v-for="skill in vacancy.requirements"
            :key="skill"
            class="mr-1 mb-1"
            size="small"
            color="primary"
            variant="outlined"
          >
            {{ skill }}
          </v-chip>
        </div>
        
        <div v-if="vacancy.responsibilities && vacancy.responsibilities.length > 0" class="mt-3">
          <div class="text-subtitle-2">Обязанности</div>
          <ul class="mt-1">
            <li v-for="(responsibility, index) in vacancy.responsibilities" :key="index">
              {{ responsibility }}
            </li>
          </ul>
        </div>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text">
          Откликнуться
        </v-btn>
        <v-btn color="primary" variant="outlined">
          Подробнее
        </v-btn>
      </v-card-actions>
    </v-card>
    
    <div v-if="filteredVacancies.length === 0" class="text-center pa-6">
      <p>Вакансии не найдены. Попробуйте изменить параметры поиска.</p>
    </div>
    
    <!-- Пагинация -->
    <div v-if="filteredVacancies.length > 0" class="text-center mt-6">
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="7"
        @update:model-value="updatePage"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { vacancies } from '../../data/career';

export default {
  name: 'VacanciesList',
  data() {
    return {
      vacancies: [...vacancies],
      filteredVacancies: [],
      search: '',
      selectedGrade: 'All',
      selectedSkills: [],
      page: 1,
      itemsPerPage: 3,
      grades: ['All', 'Junior', 'Middle', 'Senior']
    };
  },
  computed: {
    // Все уникальные навыки из вакансий
    allSkills() {
      const skills = new Set();
      this.vacancies.forEach(vacancy => {
        vacancy.requirements.forEach(skill => skills.add(skill));
      });
      return Array.from(skills).sort();
    },
    
    // Общее количество страниц
    totalPages() {
      return Math.ceil(this.filteredVacancies.length / this.itemsPerPage);
    },
    
    // Вакансии для текущей страницы
    paginatedVacancies() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredVacancies.slice(start, end);
    }
  },
  created() {
    this.filterVacancies();
  },
  methods: {
    // Фильтрация вакансий
    filterVacancies() {
      let filtered = [...this.vacancies];
      
      // Фильтр по поиску
      if (this.search) {
        const searchLower = this.search.toLowerCase();
        filtered = filtered.filter(vacancy => 
          vacancy.title.toLowerCase().includes(searchLower) ||
          vacancy.company.toLowerCase().includes(searchLower) ||
          vacancy.description.toLowerCase().includes(searchLower) ||
          vacancy.requirements.some(skill => skill.toLowerCase().includes(searchLower))
        );
      }
      
      // Фильтр по уровню (grade)
      if (this.selectedGrade !== 'All') {
        filtered = filtered.filter(vacancy => vacancy.grade === this.selectedGrade);
      }
      
      // Фильтр по навыкам
      if (this.selectedSkills.length > 0) {
        filtered = filtered.filter(vacancy => 
          this.selectedSkills.some(skill => vacancy.requirements.includes(skill))
        );
      }
      
      // Сортировка от новых к старым
      filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
      
      this.filteredVacancies = filtered;
      
      // Сбрасываем страницу на первую при изменении фильтров
      this.page = 1;
    },
    
    // Обновление страницы
    updatePage(newPage) {
      this.page = newPage;
    },
    
    // Форматирование даты
    formatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        return 'Сегодня';
      } else if (diffDays <= 2) {
        return 'Вчера';
      } else {
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
      }
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 