<template>
  <main-layout>
    <div class="mentors-container">
      <h1 class="text-h3 font-weight-bold mb-6">Менторы</h1>
      
      <div class="d-flex flex-wrap align-center mb-6">
        <v-btn-toggle
          v-model="selectedGrades"
          color="primary"
          multiple
          class="mr-4 mb-2 rounded-lg"
          variant="outlined"
        >
          <v-btn value="Middle" class="px-4">
            <div class="d-flex align-center">
              <span class="grade-indicator middle-grade mr-2"></span>
              Middle <span class="ml-2 grade-count">{{ getGradeCount('Middle') }}</span>
            </div>
          </v-btn>
          <v-btn value="Senior" class="px-4">
            <div class="d-flex align-center">
              <span class="grade-indicator senior-grade mr-2"></span>
              Senior <span class="ml-2 grade-count">{{ getGradeCount('Senior') }}</span>
            </div>
          </v-btn>
        </v-btn-toggle>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              variant="outlined"
              class="mr-4 mb-2"
              v-bind="props"
              style="height: 40px;"
            >
              <span>Стоимость консультации</span>
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-card min-width="300">
            <v-card-text>
              <v-range-slider
                v-model="priceRange"
                :min="minPrice"
                :max="maxPrice"
                :step="100"
                thumb-label="always"
                class="mt-4"
              >
                <template v-slot:thumb-label="{ modelValue }">
                  {{ modelValue }} ₽
                </template>
              </v-range-slider>
            </v-card-text>
          </v-card>
        </v-menu>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              variant="outlined"
              class="mr-4 mb-2"
              v-bind="props"
              style="height: 40px;"
            >
              <span>Навыки</span>
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-card min-width="300">
            <v-card-text>
              <v-autocomplete
                v-model="selectedSkills"
                :items="allSkills"
                label="Выберите навыки"
                multiple
                chips
                closable-chips
                variant="outlined"
              ></v-autocomplete>
            </v-card-text>
          </v-card>
        </v-menu>

        <v-spacer></v-spacer>

        <v-checkbox
          v-model="freeConsultation"
          label="Бесплатные консультации"
          class="mb-2"
          hide-details
        ></v-checkbox>
      </div>

      <div class="specialization-section mb-6">
        <h2 class="text-subtitle-1 font-weight-medium mb-4 d-flex align-center justify-space-between">
          <span>Специализация менторов</span>
          <span class="all-count">Все <span class="count-badge">{{ mentors.length }}</span></span>
        </h2>
        
        <div class="d-flex flex-wrap">
          <v-chip
            v-for="specialization in specializations"
            :key="specialization.name"
            class="mr-2 mb-2 py-2 px-3"
            :variant="selectedSpecializations.includes(specialization.name) ? 'flat' : 'outlined'"
            :color="selectedSpecializations.includes(specialization.name) ? 'primary' : 'default'"
            @click="toggleSpecialization(specialization.name)"
          >
            <div class="d-flex align-center">
              <span v-if="specialization.icon" class="mr-2">{{ specialization.icon }}</span>
              {{ specialization.name }}
              <span class="ml-2 specialization-count">{{ specialization.count }}</span>
            </div>
          </v-chip>
        </div>
      </div>

      <router-view></router-view>

      <v-btn
        color="primary"
        size="large"
        class="mt-4 rounded-lg"
        block
        variant="flat"
        :to="'/mentorship/profile'"
      >
        Перейти в кабинет ментора
      </v-btn>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../components/layout/MainLayout.vue';
import { mentors } from '../data/mentorship';

export default {
  name: 'Mentorship',
  components: {
    MainLayout
  },
  data() {
    return {
      mentors: [...mentors],
      selectedGrades: [],
      selectedSkills: [],
      selectedSpecializations: [],
      freeConsultation: false,
      minPrice: 1000,
      maxPrice: 5000,
      priceRange: [1000, 5000],
      specializations: [
        { name: 'Python разработчик', icon: '🐍', count: 4 },
        { name: 'Frontend разработчик', icon: '🌐', count: 1 },
        { name: 'DevOps инженер', icon: '🔄', count: 1 },
        { name: 'Data Scientist', icon: '📊', count: 1 },
        { name: 'Java разработчик', icon: '☕', count: 1 }
      ]
    };
  },
  computed: {
    allSkills() {
      const skills = new Set();
      this.mentors.forEach(mentor => {
        mentor.skills.forEach(skill => skills.add(skill));
      });
      return Array.from(skills).sort();
    }
  },
  methods: {
    getGradeCount(grade) {
      return this.mentors.filter(mentor => mentor.grade === grade).length;
    },
    toggleSpecialization(specialization) {
      const index = this.selectedSpecializations.indexOf(specialization);
      if (index === -1) {
        this.selectedSpecializations.push(specialization);
      } else {
        this.selectedSpecializations.splice(index, 1);
      }
    }
  },
  created() {
    // Устанавливаем диапазон цен на основе данных менторов
    const prices = this.mentors.map(mentor => mentor.rateHour);
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
    this.priceRange = [this.minPrice, this.maxPrice];
  }
};
</script>

<style scoped>
.mentors-container {
  max-width: 1200px;
  margin: 0 auto;
}

.grade-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.middle-grade {
  background-color: #FFA500;
}

.senior-grade {
  background-color: #FF5733;
}

.grade-count, .specialization-count {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 0 8px;
  font-size: 0.8rem;
  font-weight: normal;
}

.all-count {
  font-size: 0.9rem;
  color: #666;
}

.count-badge {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 3px 8px;
  margin-left: 4px;
}

.specialization-section {
  background-color: #f5f7fa;
  border-radius: 12px;
  padding: 20px;
}

.v-btn-toggle {
  border: none !important;
}

.v-btn-toggle .v-btn {
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
  margin-right: 2px !important;
}

.v-btn-toggle .v-btn--active {
  background-color: #f0f8ff !important;
  color: #4361ee !important;
  border-color: #4361ee !important;
}
</style> 