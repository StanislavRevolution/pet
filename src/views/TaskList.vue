<template>
  <main-layout>
    <!-- Hero секция с слоганом -->
    <v-card class="mb-8 hero-section" elevation="0" rounded="lg">
      <v-card-text class="text-center py-12">
        <h1 class="text-h2 font-weight-bold mb-4">Решайте настоящие бизнес-задачи</h1>
        <p class="text-subtitle-1 mb-8 max-width-800 mx-auto">
          Мы - сервис, который помогает развивать ваши профессиональные навыки через решение реальных бизнес-кейсов. 
          Выбирайте задачи, делитесь решениями и развивайтесь вместе с нашим сообществом.
        </p>
        <div>
          <v-btn 
            color="primary" 
            size="large" 
            class="mr-4 px-6"
            elevation="2"
          >
            Начать сейчас
          </v-btn>
          <v-btn 
            color="secondary" 
            variant="outlined" 
            size="large"
            class="px-6"
          >
            Подробнее
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
    
    <!-- Фильтры задач -->
    <v-card class="mb-8" elevation="2">
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
        md="6"
      >
        <v-card
          class="task-card h-100"
          :to="`/tasks/${task.id}`"
          elevation="2"
        >
          <div class="d-flex">
            <div class="task-category-indicator" :class="`bg-${getCategoryColor(task.category)}`"></div>
            <div class="flex-grow-1 pa-4">
              <div class="d-flex justify-space-between align-center mb-2">
                <div class="text-h6 font-weight-bold">{{ task.title }}</div>
                <v-chip
                  size="small"
                  :color="getGradeColor(task.grade)"
                  variant="flat"
                  class="font-weight-medium"
                >
                  {{ task.grade }}
                </v-chip>
              </div>
              
              <div class="mb-3 task-description">{{ task.description }}</div>
              
              <v-divider class="mb-3"></v-divider>
              
              <div class="d-flex flex-wrap align-center">
                <div class="task-category">
                  <v-icon size="small" :color="getCategoryColor(task.category)" class="mr-1">mdi-folder-outline</v-icon>
                  {{ task.category }}
                </div>
                
                <v-spacer></v-spacer>
                
                <div class="d-flex flex-wrap">
                  <v-chip
                    v-for="tag in task.tags.slice(0, 3)"
                    :key="tag"
                    class="mr-1 mb-1"
                    size="x-small"
                    color="secondary"
                    variant="flat"
                  >
                    {{ tag }}
                  </v-chip>
                  <v-chip
                    v-if="task.tags.length > 3"
                    size="x-small"
                    class="mb-1"
                    color="grey"
                    variant="flat"
                  >
                    +{{ task.tags.length - 3 }}
                  </v-chip>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Пагинация -->
    <div class="text-center mt-8">
      <v-pagination
        v-model="page"
        :length="pageCount"
        total-visible="7"
        color="primary"
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
      itemsPerPage: 6,
      filteredTasks: [],
      categoryColors: {
        'Backend': 'indigo',
        'Frontend': 'deep-purple',
        'Database': 'blue',
        'DevOps': 'teal',
        'Mobile': 'green',
        'Data Science': 'orange',
        'Tooling': 'amber',
        'Security': 'red'
      },
      gradeColors: {
        'Junior': 'green',
        'Middle': 'blue',
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
    getCategoryColor(category) {
      return this.categoryColors[category] || 'grey';
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
  background: linear-gradient(135deg, #4361ee 0%, #3f37c9 100%);
  color: white;
}

.max-width-800 {
  max-width: 800px;
}

.task-description {
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.7);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 3em;
}

.task-card {
  transition: all 0.25s ease;
  overflow: hidden;
  border: none;
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(67, 97, 238, 0.15) !important;
}

.task-category-indicator {
  width: 8px;
  min-height: 100%;
}

.task-category {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.05);
  margin-right: 8px;
}

.bg-indigo { background-color: #3f51b5; }
.bg-deep-purple { background-color: #673ab7; }
.bg-blue { background-color: #2196f3; }
.bg-teal { background-color: #009688; }
.bg-green { background-color: #4caf50; }
.bg-orange { background-color: #ff9800; }
.bg-amber { background-color: #ffc107; }
.bg-red { background-color: #f44336; }
.bg-grey { background-color: #9e9e9e; }
</style> 