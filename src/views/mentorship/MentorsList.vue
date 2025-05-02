<template>
  <div>
    <div class="d-flex align-center mb-6">
      <h2 class="text-h4">Список менторов</h2>
      <v-spacer></v-spacer>
      
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск"
        density="compact"
        variant="outlined"
        style="max-width: 300px"
        hide-details
        class="mr-4"
      ></v-text-field>
      
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
            <v-icon left>mdi-filter</v-icon>
            Фильтры
          </v-btn>
        </template>
        <v-card min-width="300">
          <v-card-text>
            <v-autocomplete
              v-model="selectedSkills"
              :items="uniqueSkills"
              label="Навыки"
              multiple
              chips
              variant="outlined"
              density="compact"
            ></v-autocomplete>
            
            <v-slider
              v-model="minRating"
              label="Мин. рейтинг"
              min="0"
              max="5"
              step="0.1"
              thumb-label
            ></v-slider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              @click="resetFilters"
            >
              Сбросить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
    
    <v-row>
      <v-col
        v-for="mentor in filteredMentors"
        :key="mentor.userId"
        cols="12"
      >
        <v-card class="mentor-card">
          <div class="d-flex flex-column flex-md-row">
            <!-- Фото ментора -->
            <div class="mentor-avatar-container">
              <v-img
                :src="mentor.avatar"
                height="200"
                width="200"
                cover
                class="rounded-lg"
              ></v-img>
            </div>
            
            <!-- Информация о менторе -->
            <div class="flex-grow-1 pa-4">
              <div class="d-flex flex-column flex-md-row justify-space-between mb-3">
                <div>
                  <h3 class="text-h5 font-weight-bold mb-1">{{ mentor.name }}</h3>
                  <div class="d-flex align-center mb-2">
                    <div class="text-subtitle-1 mr-4 primary--text font-weight-medium">{{ getPrimarySkill(mentor) }}</div>
                    
                    <div class="d-flex align-center">
                      <div class="mr-4">
                        <div class="text-caption text-grey">Грейд</div>
                        <div class="d-flex align-center">
                          <span 
                            class="grade-indicator mr-2" 
                            :class="mentor.grade === 'Senior' ? 'senior-grade' : 'middle-grade'"
                          ></span>
                          <span>{{ mentor.grade }}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div class="text-caption text-grey">Опыт</div>
                        <div>{{ mentor.yearsExperience }} лет</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="price-container">
                  <div class="text-caption mb-1">Стоимость: от</div>
                  <div class="text-h6 font-weight-bold">{{ mentor.rateHour }} ₽</div>
                </div>
              </div>
              
              <div class="mentor-bio mb-4">{{ mentor.bio }}</div>
              
              <div v-if="mentor.skills.length > 0">
                <div class="mt-3 mb-2 text-caption text-grey">Технологии</div>
                <div class="d-flex flex-wrap">
                  <v-chip
                    v-for="skill in mentor.skills"
                    :key="skill"
                    class="mr-2 mb-2"
                    size="small"
                    variant="flat"
                    color="grey-lighten-3"
                  >
                    {{ skill }}
                  </v-chip>
                </div>
              </div>
              
              <div class="d-flex align-center mt-4">
                <v-btn
                  color="primary"
                  class="me-4"
                  variant="flat"
                >
                  Написать
                </v-btn>
                
                <v-btn
                  color="primary"
                  variant="outlined"
                  :to="'/mentorship/slots'"
                >
                  Подробнее
                </v-btn>
                
                <v-spacer></v-spacer>
                
                <div v-if="mentor.averageRating > 0" class="d-flex align-center">
                  <v-rating
                    :model-value="mentor.averageRating"
                    color="amber"
                    size="small"
                    readonly
                    half-increments
                  ></v-rating>
                  <span class="ml-1">{{ mentor.averageRating }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    
    <div v-if="filteredMentors.length === 0" class="text-center pa-6">
      <p>Менторы не найдены. Попробуйте изменить параметры поиска.</p>
    </div>
  </div>
</template>

<script>
import { mentors } from '../../data/mentorship';

export default {
  name: 'MentorsList',
  data() {
    return {
      mentors: [...mentors],
      search: '',
      selectedSkills: [],
      minRating: 0
    };
  },
  computed: {
    // Все уникальные навыки менторов
    uniqueSkills() {
      const skills = new Set();
      this.mentors.forEach(mentor => {
        mentor.skills.forEach(skill => skills.add(skill));
      });
      return Array.from(skills);
    },
    
    // Отфильтрованные менторы
    filteredMentors() {
      return this.mentors.filter(mentor => {
        // Фильтр по поиску
        if (this.search) {
          const searchLower = this.search.toLowerCase();
          const nameMatch = mentor.name.toLowerCase().includes(searchLower);
          const bioMatch = mentor.bio.toLowerCase().includes(searchLower);
          const skillsMatch = mentor.skills.some(skill => 
            skill.toLowerCase().includes(searchLower)
          );
          
          if (!nameMatch && !bioMatch && !skillsMatch) {
            return false;
          }
        }
        
        // Фильтр по навыкам
        if (this.selectedSkills.length > 0) {
          const hasSelectedSkills = this.selectedSkills.some(skill => 
            mentor.skills.includes(skill)
          );
          
          if (!hasSelectedSkills) {
            return false;
          }
        }
        
        // Фильтр по рейтингу
        if (mentor.averageRating < this.minRating) {
          return false;
        }
        
        return true;
      });
    }
  },
  methods: {
    resetFilters() {
      this.search = '';
      this.selectedSkills = [];
      this.minRating = 0;
    },
    getPrimarySkill(mentor) {
      return mentor.skills[0] || '';
    }
  }
};
</script>

<style scoped>
.mentor-card {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.2s, box-shadow 0.2s;
}

.mentor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1) !important;
}

.mentor-avatar-container {
  width: 200px;
  min-width: 200px;
  height: 100%;
  overflow: hidden;
}

.mentor-bio {
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.95rem;
  line-height: 1.5;
  max-height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.price-container {
  background-color: #f5f7fa;
  padding: 8px 16px;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;
}

.grade-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.middle-grade {
  background-color: #FFA500;
}

.senior-grade {
  background-color: #FF5733;
}

@media (max-width: 600px) {
  .mentor-avatar-container {
    width: 100%;
    max-height: 200px;
  }
}
</style>