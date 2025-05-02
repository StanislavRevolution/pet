<template>
  <div>
    <h2 class="text-h4 mb-6">Отзывы о менторах</h2>
    
    <v-card class="mb-6">
      <v-card-title>
        Оставить отзыв
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitReview">
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-model="newReview.mentorId"
                :items="mentorItems"
                item-title="name"
                item-value="userId"
                label="Ментор"
                variant="outlined"
                density="compact"
                :rules="[v => !!v || 'Выберите ментора']"
                required
              ></v-select>
            </v-col>
            
            <v-col cols="12" md="8">
              <div class="d-flex align-center">
                <span class="mr-4">Оценка:</span>
                <v-rating
                  v-model="newReview.rating"
                  color="amber"
                  hover
                  half-increments
                  :rules="[v => v > 0 || 'Поставьте оценку']"
                  required
                ></v-rating>
                <span class="ml-2">{{ newReview.rating }}</span>
              </div>
            </v-col>
          </v-row>
          
          <v-textarea
            v-model="newReview.text"
            label="Ваш отзыв"
            variant="outlined"
            rows="4"
            :rules="[v => !!v || 'Напишите отзыв']"
            required
          ></v-textarea>
          
          <div class="d-flex justify-end mt-2">
            <v-btn
              type="submit"
              color="primary"
              :loading="submitting"
              :disabled="!isFormValid"
            >
              Отправить отзыв
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    
    <!-- Список отзывов -->
    <v-divider class="my-6"></v-divider>
    
    <div class="d-flex align-center mb-4">
      <h3 class="text-h5">Все отзывы</h3>
      <v-spacer></v-spacer>
      <v-select
        v-model="selectedMentorFilter"
        :items="mentorItems"
        item-title="name"
        item-value="userId"
        label="Ментор"
        variant="outlined"
        density="compact"
        style="max-width: 300px"
        @update:model-value="filterReviews"
      ></v-select>
    </div>
    
    <v-card
      v-for="review in filteredReviews"
      :key="review.id"
      class="mb-4"
    >
      <v-card-text>
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center">
            <v-avatar size="40" class="mr-3">
              <v-img :src="getMentorAvatar(review.mentorId)" alt="Mentor Avatar"></v-img>
            </v-avatar>
            <div>
              <div class="font-weight-bold">{{ getMentorName(review.mentorId) }}</div>
              <div class="d-flex align-center">
                <v-rating
                  :model-value="review.rating"
                  color="amber"
                  density="compact"
                  size="small"
                  readonly
                  half-increments
                ></v-rating>
                <span class="ml-1 text-caption">{{ review.rating }}</span>
              </div>
            </div>
          </div>
          <div class="text-caption">
            {{ formatDate(review.createdAt) }}
          </div>
        </div>
        
        <v-divider class="my-3"></v-divider>
        
        <div>{{ review.text }}</div>
        
        <div class="d-flex align-center mt-3">
          <v-avatar size="24" class="mr-2">
            <v-img :src="getUserAvatar(review.userId)" alt="User Avatar"></v-img>
          </v-avatar>
          <span class="text-caption">{{ getUserName(review.userId) }}</span>
        </div>
      </v-card-text>
    </v-card>
    
    <div v-if="filteredReviews.length === 0" class="text-center pa-6">
      <p>Отзывы не найдены. Будьте первым, кто оставит отзыв о менторе!</p>
    </div>
    
    <!-- Снэкбар для успешного добавления отзыва -->
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      color="success"
    >
      Отзыв успешно добавлен!
      
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mentors, mentorReviews, addMentorReview } from '../../data/mentorship';
import { leaderboardData } from '../../data/leaderboard';

export default {
  name: 'MentorReviews',
  data() {
    return {
      reviews: [...mentorReviews],
      mentors: [...mentors],
      users: [...leaderboardData],
      newReview: {
        mentorId: null,
        rating: 0,
        text: ''
      },
      submitting: false,
      snackbar: false,
      selectedMentorFilter: null,
      filteredReviews: [],
      currentUserId: 1 // ID текущего пользователя (предполагаем, что это первый пользователь)
    };
  },
  computed: {
    // Список менторов для выпадающего списка
    mentorItems() {
      return [
        { name: 'Все менторы', userId: null },
        ...this.mentors.map(mentor => ({
          name: mentor.name,
          userId: mentor.userId
        }))
      ];
    },
    
    // Проверка валидности формы
    isFormValid() {
      return this.newReview.mentorId && 
             this.newReview.rating > 0 && 
             this.newReview.text.trim() !== '';
    }
  },
  created() {
    this.filterReviews();
  },
  methods: {
    // Фильтрация отзывов
    filterReviews() {
      let filtered = [...this.reviews];
      
      // Фильтр по ментору
      if (this.selectedMentorFilter) {
        filtered = filtered.filter(review => review.mentorId === this.selectedMentorFilter);
      }
      
      // Сортировка от новых к старым
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      this.filteredReviews = filtered;
    },
    
    // Форматирование даты
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    },
    
    // Получение имени ментора по ID
    getMentorName(mentorId) {
      const mentor = this.mentors.find(m => m.userId === mentorId);
      return mentor ? mentor.name : 'Неизвестный ментор';
    },
    
    // Получение аватара ментора по ID
    getMentorAvatar(mentorId) {
      const mentor = this.mentors.find(m => m.userId === mentorId);
      return mentor ? mentor.avatar : '';
    },
    
    // Получение имени пользователя по ID
    getUserName(userId) {
      const user = this.users.find(u => u.userId === userId);
      return user ? user.name : 'Неизвестный пользователь';
    },
    
    // Получение аватара пользователя по ID
    getUserAvatar(userId) {
      const user = this.users.find(u => u.userId === userId);
      return user ? user.avatar : '';
    },
    
    // Отправка нового отзыва
    submitReview() {
      if (!this.isFormValid) return;
      
      this.submitting = true;
      
      // Имитация запроса на сервер
      setTimeout(() => {
        // Добавляем отзыв
        const newReview = addMentorReview(
          this.newReview.mentorId,
          this.currentUserId,
          this.newReview.rating,
          this.newReview.text
        );
        
        // Добавляем отзыв в локальный массив
        this.reviews.push(newReview);
        
        // Сбрасываем форму
        this.newReview = {
          mentorId: null,
          rating: 0,
          text: ''
        };
        
        this.submitting = false;
        this.snackbar = true;
        this.filterReviews(); // Обновляем отображаемый список
      }, 1000);
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 