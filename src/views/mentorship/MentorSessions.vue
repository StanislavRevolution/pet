<template>
  <div>
    <h2 class="text-h4 mb-6">Мои сессии с менторами</h2>
    
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="statusFilter"
              :items="statusFilterOptions"
              label="Статус"
              variant="outlined"
              density="compact"
              @update:model-value="filterSessions"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="periodFilter"
              :items="periodFilterOptions"
              label="Период"
              variant="outlined"
              density="compact"
              @update:model-value="filterSessions"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <v-card v-for="session in filteredSessions" :key="session.id" class="mb-4">
      <v-card-title class="d-flex align-center">
        <div class="d-flex align-center">
          <v-avatar size="32" class="mr-2">
            <v-img :src="getMentorAvatar(session.mentorId)" alt="Mentor Avatar"></v-img>
          </v-avatar>
          <span>{{ getMentorName(session.mentorId) }}</span>
        </div>
        
        <v-spacer></v-spacer>
        
        <v-chip
          :color="getStatusColor(session.status)"
          size="small"
          class="ml-2"
        >
          {{ getStatusText(session.status) }}
        </v-chip>
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="text-subtitle-2">Дата и время</div>
            <div>{{ formatDate(session.startTime) }}</div>
            <div>{{ formatTime(session.startTime) }} - {{ formatTime(session.endTime) }}</div>
          </v-col>
          
          <v-col cols="12" sm="6">
            <div class="text-subtitle-2">Тема</div>
            <div>{{ session.topic }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        
        <v-btn
          v-if="session.status === 'completed'"
          color="primary"
          variant="text"
          :to="'/mentorship/reviews'"
        >
          Оставить отзыв
        </v-btn>
        
        <v-btn
          v-if="session.status === 'scheduled'"
          color="error"
          variant="text"
          @click="showCancelDialog(session)"
        >
          Отменить
        </v-btn>
      </v-card-actions>
    </v-card>
    
    <div v-if="filteredSessions.length === 0" class="text-center pa-6">
      <p>Сессии не найдены. Попробуйте изменить параметры фильтрации или забронируйте сессию с ментором.</p>
      <v-btn 
        color="primary" 
        class="mt-4" 
        :to="'/mentorship/slots'"
      >
        Забронировать сессию
      </v-btn>
    </div>
    
    <!-- Диалог отмены сессии -->
    <v-dialog v-model="cancelDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Отменить сессию</v-card-title>
        <v-card-text>
          <p>Вы уверены, что хотите отменить сессию с {{ getMentorName(selectedSession?.mentorId) }}?</p>
          <p v-if="selectedSession">
            <strong>Дата:</strong> {{ formatDate(selectedSession.startTime) }}<br>
            <strong>Время:</strong> {{ formatTime(selectedSession.startTime) }} - {{ formatTime(selectedSession.endTime) }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="cancelDialog = false">
            Нет
          </v-btn>
          <v-btn 
            color="error" 
            @click="cancelSession"
            :loading="cancelling"
          >
            Да, отменить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mentors, mentorSessions } from '../../data/mentorship';

export default {
  name: 'MentorSessions',
  data() {
    return {
      sessions: [...mentorSessions],
      mentors: [...mentors],
      statusFilter: 'all',
      periodFilter: 'all',
      filteredSessions: [],
      cancelDialog: false,
      selectedSession: null,
      cancelling: false,
      currentUserId: 1 // ID текущего пользователя (предполагаем, что это первый пользователь)
    };
  },
  computed: {
    statusFilterOptions() {
      return [
        { title: 'Все статусы', value: 'all' },
        { title: 'Запланированные', value: 'scheduled' },
        { title: 'Завершенные', value: 'completed' },
        { title: 'Отмененные', value: 'cancelled' }
      ];
    },
    periodFilterOptions() {
      return [
        { title: 'Все время', value: 'all' },
        { title: 'Предстоящие', value: 'upcoming' },
        { title: 'Прошедшие', value: 'past' }
      ];
    }
  },
  created() {
    this.filterSessions();
  },
  methods: {
    filterSessions() {
      // Фильтрация и сортировка сессий пользователя
      let filtered = this.sessions.filter(session => session.userId === this.currentUserId);
      
      // Фильтр по статусу
      if (this.statusFilter !== 'all') {
        filtered = filtered.filter(session => session.status === this.statusFilter);
      }
      
      // Фильтр по периоду
      if (this.periodFilter !== 'all') {
        const now = new Date();
        const sessionTime = session => new Date(session.startTime);
        
        if (this.periodFilter === 'upcoming') {
          filtered = filtered.filter(session => sessionTime(session) > now);
        } else if (this.periodFilter === 'past') {
          filtered = filtered.filter(session => sessionTime(session) < now);
        }
      }
      
      // Сортировка: предстоящие сессии вверху, затем по дате (от новых к старым)
      filtered.sort((a, b) => {
        const timeA = new Date(a.startTime);
        const timeB = new Date(b.startTime);
        const now = new Date();
        
        // Если одна сессия предстоящая, а другая прошедшая
        const aIsFuture = timeA > now;
        const bIsFuture = timeB > now;
        
        if (aIsFuture && !bIsFuture) return -1;
        if (!aIsFuture && bIsFuture) return 1;
        
        // Обе сессии либо в будущем, либо в прошлом, сортируем по дате
        return timeB - timeA;
      });
      
      this.filteredSessions = filtered;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    },
    formatTime(dateString) {
      const date = new Date(dateString);
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    },
    getMentorName(mentorId) {
      const mentor = this.mentors.find(m => m.userId === mentorId);
      return mentor ? mentor.name : 'Неизвестный ментор';
    },
    getMentorAvatar(mentorId) {
      const mentor = this.mentors.find(m => m.userId === mentorId);
      return mentor ? mentor.avatar : '';
    },
    getStatusText(status) {
      switch (status) {
        case 'scheduled': return 'Запланирована';
        case 'completed': return 'Завершена';
        case 'cancelled': return 'Отменена';
        default: return status;
      }
    },
    getStatusColor(status) {
      switch (status) {
        case 'scheduled': return 'info';
        case 'completed': return 'success';
        case 'cancelled': return 'error';
        default: return 'grey';
      }
    },
    showCancelDialog(session) {
      this.selectedSession = session;
      this.cancelDialog = true;
    },
    cancelSession() {
      if (!this.selectedSession) return;
      
      this.cancelling = true;
      
      // Имитация запроса на сервер
      setTimeout(() => {
        // Меняем статус сессии на "отменена"
        const index = this.sessions.findIndex(s => s.id === this.selectedSession.id);
        if (index !== -1) {
          this.sessions[index].status = 'cancelled';
        }
        
        this.cancelling = false;
        this.cancelDialog = false;
        this.filterSessions(); // Обновляем отображаемый список
      }, 1000);
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 