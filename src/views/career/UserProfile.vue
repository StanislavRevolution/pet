<template>
  <div>
    <h2 class="text-h4 mb-6">Профиль карьеры</h2>
    
    <v-alert
      v-model="successAlert"
      type="success"
      variant="tonal"
      closable
      class="mb-6"
    >
      Профиль успешно обновлен!
    </v-alert>
    
    <v-card>
      <v-tabs v-model="tab">
        <v-tab value="view">Просмотр профиля</v-tab>
        <v-tab value="edit">Редактирование</v-tab>
      </v-tabs>
      
      <v-window v-model="tab">
        <!-- Просмотр профиля -->
        <v-window-item value="view">
          <v-card-text>
            <div class="d-flex align-center mb-6">
              <v-avatar size="100" class="mr-6">
                <v-img :src="profile.avatar" alt="User Avatar"></v-img>
              </v-avatar>
              
              <div>
                <div class="text-h4">{{ profile.name }}</div>
                <div class="text-subtitle-1">{{ profile.grade }} · {{ profile.experience }} года опыта</div>
                <div class="text-subtitle-2">{{ profile.location }}</div>
              </div>
            </div>
            
            <v-divider class="my-4"></v-divider>
            
            <div class="text-subtitle-1 font-weight-bold mb-2">О себе</div>
            <div class="mb-6">{{ profile.about }}</div>
            
            <div class="text-subtitle-1 font-weight-bold mb-2">Навыки</div>
            <div class="d-flex flex-wrap">
              <v-chip
                v-for="skill in profile.skills"
                :key="skill"
                class="mr-2 mb-2"
                color="primary"
                size="small"
              >
                {{ skill }}
              </v-chip>
            </div>
            
            <v-card class="mt-6" variant="outlined">
              <v-card-title>Статистика профиля</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="4">
                    <div class="text-subtitle-2">Просмотров профиля</div>
                    <div class="text-h5">145</div>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <div class="text-subtitle-2">Подходящих вакансий</div>
                    <div class="text-h5">12</div>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <div class="text-subtitle-2">Полнота профиля</div>
                    <div class="d-flex align-center">
                      <div class="text-h5 mr-2">85%</div>
                      <v-progress-linear
                        model-value="85"
                        color="primary"
                        height="8"
                      ></v-progress-linear>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-window-item>
        
        <!-- Редактирование профиля -->
        <v-window-item value="edit">
          <v-card-text>
            <v-form @submit.prevent="saveProfile">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedProfile.name"
                    label="Имя"
                    variant="outlined"
                    disabled
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-select
                    v-model="editedProfile.grade"
                    :items="grades"
                    label="Уровень"
                    variant="outlined"
                  ></v-select>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedProfile.location"
                    label="Местоположение"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="editedProfile.experience"
                    label="Опыт работы (лет)"
                    variant="outlined"
                    type="number"
                    min="0"
                    max="50"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-textarea
                    v-model="editedProfile.about"
                    label="О себе"
                    variant="outlined"
                    auto-grow
                    rows="4"
                  ></v-textarea>
                </v-col>
                
                <v-col cols="12">
                  <div class="text-subtitle-1 mb-2">Навыки</div>
                  <v-combobox
                    v-model="editedProfile.skills"
                    :items="availableSkills"
                    label="Добавьте навыки"
                    multiple
                    chips
                    closable-chips
                    variant="outlined"
                  ></v-combobox>
                </v-col>
              </v-row>
              
              <div class="d-flex justify-end mt-4">
                <v-btn
                  color="primary"
                  variant="text"
                  class="mr-2"
                  @click="resetForm"
                >
                  Отмена
                </v-btn>
                <v-btn
                  type="submit"
                  color="primary"
                  :loading="saving"
                >
                  Сохранить
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script>
import { userProfile, updateUserProfile } from '../../data/career';
import { tags } from '../../data/tasks';

export default {
  name: 'UserProfile',
  data() {
    return {
      profile: { ...userProfile },
      editedProfile: { ...userProfile },
      tab: 'view',
      grades: ['Junior', 'Middle', 'Senior'],
      availableSkills: [...tags],
      saving: false,
      successAlert: false
    };
  },
  methods: {
    saveProfile() {
      this.saving = true;
      
      // Имитация задержки сохранения на сервере
      setTimeout(() => {
        // Обновляем профиль
        const updatedProfile = updateUserProfile(this.editedProfile);
        
        // Обновляем локальный профиль
        this.profile = { ...updatedProfile };
        
        this.saving = false;
        this.tab = 'view';
        this.successAlert = true;
        
        // Скрываем алерт через 3 секунды
        setTimeout(() => {
          this.successAlert = false;
        }, 3000);
      }, 1000);
    },
    
    resetForm() {
      this.editedProfile = { ...this.profile };
      this.tab = 'view';
    }
  },
  watch: {
    tab(val) {
      if (val === 'edit') {
        // Создаем новую копию профиля для редактирования
        this.editedProfile = { ...this.profile };
      }
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 