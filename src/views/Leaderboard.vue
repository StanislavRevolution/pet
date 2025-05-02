<template>
  <main-layout>
    <h1 class="page-title mb-6">
      Лидерборд <span class="accent-text">и достижения</span>
    </h1>
    
    <v-card class="mb-6">
      <v-card-title class="text-h5 pt-6 px-6">
        Лидерборд
        <v-spacer></v-spacer>
        <v-select
          v-model="sortBy"
          :items="sortOptions"
          density="compact"
          variant="outlined"
          label="Сортировать по"
          style="max-width: 250px"
          class="rounded-xl"
        ></v-select>
      </v-card-title>
      
      <v-card-text class="px-6 pb-6">
        <v-table class="rounded-xl">
          <thead>
            <tr>
              <th class="text-center">Место</th>
              <th>Пользователь</th>
              <th class="text-center">Очки</th>
              <th class="text-center">Решено задач</th>
              <th class="text-center">Серия дней</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(user, index) in sortedUsers" 
              :key="user.userId"
              :class="{'accent-bg': user.userId === currentUserId}"
            >
              <td class="text-center">
                <v-avatar
                  v-if="index < 3"
                  :color="getPlaceColor(index)"
                  size="36"
                  class="white--text font-weight-bold"
                >
                  {{ index + 1 }}
                </v-avatar>
                <span v-else>{{ index + 1 }}</span>
              </td>
              <td>
                <div class="d-flex align-center">
                  <v-avatar size="36" class="mr-3">
                    <v-img :src="user.avatar" alt="User Avatar"></v-img>
                  </v-avatar>
                  <span class="font-weight-medium">{{ user.name }}</span>
                </div>
              </td>
              <td class="text-center">{{ user.totalPoints }}</td>
              <td class="text-center">{{ user.tasksCompleted }}</td>
              <td class="text-center">{{ user.streak }} дней</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
    
    <!-- Статистика текущего пользователя -->
    <v-card>
      <v-card-title class="text-h5 pt-6 px-6">Ваша статистика</v-card-title>
      <v-card-text class="px-6 pb-6">
        <v-row>
          <v-col cols="12" md="4">
            <v-card variant="outlined" class="text-center pa-4 rounded-xl stat-card">
              <div class="text-h3 font-weight-bold accent-text">{{ currentUserPoints }}</div>
              <div class="text-subtitle-1 mt-2">Общий счет</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card variant="outlined" class="text-center pa-4 rounded-xl stat-card">
              <div class="text-h3 font-weight-bold accent-text">{{ currentUserTasksCompleted }}</div>
              <div class="text-subtitle-1 mt-2">Решено задач</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card variant="outlined" class="text-center pa-4 rounded-xl stat-card">
              <div class="text-h3 font-weight-bold accent-text">{{ currentUserStreak }}</div>
              <div class="text-subtitle-1 mt-2">Серия дней</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </main-layout>
</template>

<script>
import MainLayout from '../components/layout/MainLayout.vue';
import { leaderboardData } from '../data/leaderboard';

export default {
  name: 'Leaderboard',
  components: {
    MainLayout
  },
  data() {
    return {
      users: [...leaderboardData],
      currentUserId: 1, // ID текущего пользователя (предполагаем, что это первый пользователь)
      sortBy: 'totalPoints',
      sortOptions: [
        { title: 'Очки', value: 'totalPoints' },
        { title: 'Решено задач', value: 'tasksCompleted' },
        { title: 'Серия дней', value: 'streak' }
      ]
    };
  },
  computed: {
    sortedUsers() {
      return [...this.users].sort((a, b) => b[this.sortBy] - a[this.sortBy]);
    },
    currentUser() {
      return this.users.find(user => user.userId === this.currentUserId) || {};
    },
    currentUserPoints() {
      return this.currentUser.totalPoints || 0;
    },
    currentUserTasksCompleted() {
      return this.currentUser.tasksCompleted || 0;
    },
    currentUserStreak() {
      return this.currentUser.streak || 0;
    }
  },
  methods: {
    getPlaceColor(index) {
      const colors = ['#fccc42', '#f7f7f5', '#ff5734'];
      return colors[index];
    }
  }
};
</script>

<style scoped>
.page-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.accent-bg {
  background-color: rgba(255, 87, 52, 0.08);
}

.accent-text {
  color: #ff5734;
}

.stat-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 87, 52, 0.2);
}

.stat-card:hover {
  border-color: #ff5734;
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05) !important;
}

.v-table {
  box-shadow: none !important;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
</style> 