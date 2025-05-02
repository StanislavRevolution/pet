<template>
  <main-layout>
    <!-- Hero Section -->
    <div class="hero-section text-center py-8 px-4 rounded-xl mb-6">
      <div class="max-width-800 mx-auto">
        <h1 class="text-h3 font-weight-bold mb-3">Бизнес-задачи</h1>
        <p class="text-body-1 mb-6">
          Решайте реальные задачи от компаний, развивайте навыки и получайте доступ к карьерным возможностям
        </p>
        <v-btn
          color="#ff5734"
          size="large"
          class="px-6"
          elevation="0"
          :to="'/tasks/featured'"
        >
          Выбрать задачу
        </v-btn>
      </div>
    </div>
    
    <!-- Фильтры задач -->
    <v-card class="mb-8 filter-card" elevation="0">
      <v-card-title class="d-flex align-center py-4">
        <h2 class="text-h5 font-weight-bold">Актуальные задачи</h2>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск задач"
          single-line
          hide-details
          density="compact"
          class="mr-4"
          variant="solo-filled"
          bg-color="grey-lighten-4"
          style="max-width: 300px"
        ></v-text-field>
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedCategory"
              :items="categories"
              label="Категория"
              variant="outlined"
              density="comfortable"
              @update:model-value="applyFilters"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedGrade"
              :items="grades"
              label="Уровень"
              variant="outlined"
              density="comfortable"
              @update:model-value="applyFilters"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="selectedTags"
              :items="tags"
              label="Теги"
              multiple
              chips
              variant="outlined"
              density="comfortable"
              @update:model-value="applyFilters"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <!-- Список задач -->
    <v-row>
      <v-col
        v-for="task in paginatedTasks"
        :key="task.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="task-card"
          :to="`/tasks/${task.id}`"
          elevation="0"
        >
          <div class="task-category-chip">
            <v-chip 
              size="small" 
              :color="getCategoryColorHex(task.category)"
              class="category-label"
            >
              {{ task.category }}
            </v-chip>
          </div>
          
          <div class="task-icon" :style="`background-color: ${getCategoryColorBg(task.category)}`">
            <v-icon size="36" color="white">{{ getCategoryIcon(task.category) }}</v-icon>
          </div>
          
          <v-card-title class="pt-4 pb-0 px-4 task-title text-truncate">
            {{ task.title }}
          </v-card-title>
          
          <v-card-text class="px-4 task-description">
            {{ task.description }}
          </v-card-text>
          
          <v-card-actions class="px-4 pb-4 pt-0 d-flex flex-wrap">
            <div class="d-flex align-center mb-2">
              <v-chip
                size="small"
                :color="getGradeColor(task.grade)"
                variant="flat"
                class="font-weight-medium mr-2"
              >
                {{ task.grade }}
              </v-chip>
              
              <div class="tag-list">
                <v-chip
                  v-for="tag in task.tags.slice(0, 2)"
                  :key="tag"
                  class="mr-1"
                  size="x-small"
                  color="grey-lighten-3"
                  variant="flat"
                >
                  {{ tag }}
                </v-chip>
              </div>
            </div>
            
            <v-btn 
              block 
              color="#ff5734" 
              variant="flat" 
              class="mt-2 details-btn"
            >
              Подробнее
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Пагинация -->
    <div class="text-center mt-8">
      <v-pagination
        v-model="page"
        :length="pageCount"
        total-visible="7"
        color="#ff5734"
        rounded
      ></v-pagination>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../components/layout/MainLayout.vue';
import { tasks, categories, grades, tags } from '../data/tasks';

export default {
  name: 'TaskList',
  components: {
    MainLayout
  },
  data() {
    return {
      tasks: [...tasks],
      categories,
      grades,
      tags,
      search: '',
      selectedCategory: 'All',
      selectedGrade: 'All',
      selectedTags: [],
      page: 1,
      itemsPerPage: 8,
      filteredTasks: [],
      categoryColors: {
        'Backend': '#673ab7',
        'Frontend': '#9c27b0',
        'Database': '#be94f5',
        'DevOps': '#009688',
        'Mobile': '#4caf50',
        'Data Science': '#ff9800',
        'Tooling': '#ffc107',
        'Security': '#ff5734'
      },
      categoryIcons: {
        'Backend': 'mdi-server',
        'Frontend': 'mdi-monitor-dashboard',
        'Database': 'mdi-database',
        'DevOps': 'mdi-cloud-sync',
        'Mobile': 'mdi-cellphone',
        'Data Science': 'mdi-chart-bar',
        'Tooling': 'mdi-tools',
        'Security': 'mdi-shield-check'
      },
      gradeColors: {
        'Junior': 'green',
        'Middle': '#be94f5',
        'Senior': 'purple'
      }
    };
  },
  computed: {
    // Отфильтрованные задачи
    displayedTasks() {
      let filtered = [...this.tasks];
      
      // Фильтр по поиску
      if (this.search) {
        const searchLower = this.search.toLowerCase();
        filtered = filtered.filter(task => 
          task.title.toLowerCase().includes(searchLower) || 
          task.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Фильтр по категории
      if (this.selectedCategory !== 'All') {
        filtered = filtered.filter(task => task.category === this.selectedCategory);
      }
      
      // Фильтр по уровню
      if (this.selectedGrade !== 'All') {
        filtered = filtered.filter(task => task.grade === this.selectedGrade);
      }
      
      // Фильтр по тегам
      if (this.selectedTags.length > 0) {
        filtered = filtered.filter(task => 
          this.selectedTags.some(tag => task.tags.includes(tag))
        );
      }
      
      return filtered;
    },
    // Пагинация
    pageCount() {
      return Math.ceil(this.displayedTasks.length / this.itemsPerPage);
    },
    // Задачи на текущей странице
    paginatedTasks() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.displayedTasks.slice(start, end);
    }
  },
  methods: {
    applyFilters() {
      // Метод для обновления фильтров
      // В реальном API здесь был бы запрос на сервер
      this.page = 1; // Сбрасываем страницу при изменении фильтров
    },
    getCategoryColorHex(category) {
      return this.categoryColors[category] || 'grey';
    },
    getCategoryColorBg(category) {
      return this.categoryColors[category] || 'grey';
    },
    getCategoryIcon(category) {
      return this.categoryIcons[category] || 'mdi-help-circle';
    },
    getGradeColor(grade) {
      return this.gradeColors[grade] || 'grey';
    }
  },
  created() {
    // Инициализация отфильтрованных задач
    this.filteredTasks = [...this.tasks];
  }
};
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #ff5734 0%, #be94f5 100%);
  color: white;
  border-radius: 24px !important;
}

.max-width-800 {
  max-width: 800px;
}

.filter-card {
  border-radius: 24px !important;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
}

.task-card {
  border-radius: 24px !important;
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
  height: 100%;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1) !important;
}

.task-category-chip {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
}

.category-label {
  color: white !important;
  font-weight: 500;
}

.task-icon {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px 24px 0 0;
}

.task-title {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;
}

.task-description {
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.7);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 3em;
}

.tag-list {
  display: flex;
  overflow: hidden;
}

.details-btn {
  border-radius: 12px !important;
  font-weight: 500;
  color: white !important;
}
</style> 