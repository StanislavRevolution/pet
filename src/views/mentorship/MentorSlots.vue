<template>
  <div>
    <h2 class="text-h4 mb-6">Доступные слоты</h2>
    
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="selectedMentor"
              :items="mentorItems"
              item-title="name"
              item-value="userId"
              label="Ментор"
              variant="outlined"
              density="compact"
              @update:model-value="filterSlots"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="dateFilter"
              :items="dateFilterOptions"
              label="Период"
              variant="outlined"
              density="compact"
              @update:model-value="filterSlots"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch
              v-model="showAvailableOnly"
              label="Только доступные"
              color="primary"
              hide-details
              @update:model-value="filterSlots"
            ></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <v-timeline v-if="filteredSlots.length > 0" align="start">
      <v-timeline-item
        v-for="slot in filteredSlots"
        :key="slot.id"
        :dot-color="slot.isBooked ? 'error' : 'success'"
        size="small"
      >
        <template v-slot:opposite>
          {{ formatDate(slot.startTime) }}
        </template>
        
        <v-card>
          <v-card-title class="d-flex align-center">
            <div>
              {{ formatTime(slot.startTime) }} - {{ formatTime(slot.endTime) }}
              <v-chip
                size="small"
                :color="slot.isBooked ? 'error' : 'success'"
                class="ml-2"
              >
                {{ slot.isBooked ? 'Занято' : 'Доступно' }}
              </v-chip>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              v-if="!slot.isBooked"
              color="primary"
              variant="text"
              @click="bookSlot(slot)"
            >
              Забронировать
            </v-btn>
          </v-card-title>
          
          <v-card-text>
            <div class="d-flex align-center">
              <v-avatar size="32" class="mr-2">
                <v-img :src="getMentorAvatar(slot.mentorId)" alt="Mentor Avatar"></v-img>
              </v-avatar>
              <div>
                <div class="font-weight-medium">{{ getMentorName(slot.mentorId) }}</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    
    <div v-else class="text-center pa-6">
      <p>Нет доступных слотов для выбранных критериев.</p>
    </div>
    
    <!-- Диалог подтверждения бронирования -->
    <v-dialog v-model="bookingDialog" max-width="500px">
      <v-card>
        <v-card-title>Подтверждение бронирования</v-card-title>
        <v-card-text>
          <p>Вы хотите забронировать слот:</p>
          <p v-if="selectedSlot">
            <strong>Дата:</strong> {{ formatDate(selectedSlot.startTime) }}<br>
            <strong>Время:</strong> {{ formatTime(selectedSlot.startTime) }} - {{ formatTime(selectedSlot.endTime) }}<br>
            <strong>Ментор:</strong> {{ getMentorName(selectedSlot.mentorId) }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="error" 
            variant="text"
            @click="bookingDialog = false"
          >
            Отмена
          </v-btn>
          <v-btn 
            color="primary" 
            @click="confirmBooking"
            :loading="bookingInProgress"
          >
            Подтвердить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Диалог успешного бронирования -->
    <v-dialog v-model="bookingSuccessDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 bg-success text-white">
          Слот успешно забронирован
        </v-card-title>
        <v-card-text class="pt-4">
          <p>Ваш слот был успешно забронирован. Вы можете просмотреть детали в разделе "Сессии".</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="primary" 
            @click="bookingSuccessDialog = false"
          >
            Понятно
          </v-btn>
          <v-btn 
            :to="'/mentorship/sessions'"
            color="primary"
            variant="outlined"
          >
            Перейти к сессиям
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mentors, mentorSlots, bookSlot } from '../../data/mentorship';

export default {
  name: 'MentorSlots',
  data() {
    return {
      slots: [...mentorSlots],
      mentors: [...mentors],
      selectedMentor: null,
      dateFilter: 'all',
      showAvailableOnly: false,
      filteredSlots: [],
      bookingDialog: false,
      bookingSuccessDialog: false,
      bookingInProgress: false,
      selectedSlot: null,
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
    
    // Опции фильтра по дате
    dateFilterOptions() {
      return [
        { title: 'Все даты', value: 'all' },
        { title: 'Сегодня', value: 'today' },
        { title: 'Завтра', value: 'tomorrow' },
        { title: 'Эта неделя', value: 'week' }
      ];
    }
  },
  created() {
    this.filterSlots();
  },
  methods: {
    // Фильтрация слотов
    filterSlots() {
      let filtered = [...this.slots];
      
      // Фильтр по ментору
      if (this.selectedMentor) {
        filtered = filtered.filter(slot => slot.mentorId === this.selectedMentor);
      }
      
      // Фильтр по доступности
      if (this.showAvailableOnly) {
        filtered = filtered.filter(slot => !slot.isBooked);
      }
      
      // Фильтр по дате
      if (this.dateFilter !== 'all') {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        filtered = filtered.filter(slot => {
          const slotDate = new Date(slot.startTime);
          
          if (this.dateFilter === 'today') {
            return slotDate.getDate() === today.getDate() &&
                  slotDate.getMonth() === today.getMonth() &&
                  slotDate.getFullYear() === today.getFullYear();
          } else if (this.dateFilter === 'tomorrow') {
            return slotDate.getDate() === tomorrow.getDate() &&
                  slotDate.getMonth() === tomorrow.getMonth() &&
                  slotDate.getFullYear() === tomorrow.getFullYear();
          } else if (this.dateFilter === 'week') {
            return slotDate >= today && slotDate < nextWeek;
          }
          
          return true;
        });
      }
      
      // Сортировка по дате
      filtered.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
      
      this.filteredSlots = filtered;
    },
    
    // Форматирование даты
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
    },
    
    // Форматирование времени
    formatTime(dateString) {
      const date = new Date(dateString);
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
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
    
    // Начало процесса бронирования слота
    bookSlot(slot) {
      this.selectedSlot = slot;
      this.bookingDialog = true;
    },
    
    // Подтверждение бронирования
    confirmBooking() {
      if (!this.selectedSlot) return;
      
      this.bookingInProgress = true;
      
      // Имитация задержки на сервере
      setTimeout(() => {
        // Бронируем слот
        const success = bookSlot(this.selectedSlot.id, this.currentUserId);
        
        this.bookingInProgress = false;
        this.bookingDialog = false;
        
        if (success) {
          // Обновляем локальный список слотов
          const index = this.slots.findIndex(s => s.id === this.selectedSlot.id);
          if (index !== -1) {
            this.slots[index].isBooked = true;
          }
          
          this.filterSlots(); // Обновляем отфильтрованный список
          this.bookingSuccessDialog = true;
        } else {
          // Обработка ошибки бронирования
          alert('Произошла ошибка при бронировании слота. Возможно, он уже занят.');
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 