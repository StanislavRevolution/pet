<template>
  <main-layout>
    <v-card>
      <v-card-title>
        Лидерборд
        <v-spacer></v-spacer>
        <v-select
          v-model="sortBy"
          :items="sortOptions"
          density="compact"
          variant="outlined"
          label="Сортировать по"
          style="max-width: 250px"
        ></v-select>
      </v-card-title>
      
      <v-card-text>
        <v-table>
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
              :class="{'primary-text': user.userId === currentUserId}"
            >
              <td class="text-center">
                <v-avatar
                  v-if="index < 3"
                  :color="getPlaceColor(index)"
                  size="32"
                  class="white--text font-weight-bold"
                >
                  {{ index + 1 }}
                </v-avatar>
                <span v-else>{{ index + 1 }}</span>
              </td>
              <td>
                <div class="d-flex align-center">
                  <v-avatar size="32" class="mr-2">
                    <v-img :src="user.avatar" alt="User Avatar"></v-img>
                  </v-avatar>
                  {{ user.name }}
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
    <v-card class="mt-6">
      <v-card-title>Ваша статистика</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-card variant="outlined" class="text-center pa-4">
              <div class="text-h4 font-weight-bold">{{ currentUserPoints }}</div>
              <div class="text-subtitle-1">Общий счет</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card variant="outlined" class="text-center pa-4">
              <div class="text-h4 font-weight-bold">{{ currentUserTasksCompleted }}</div>
              <div class="text-subtitle-1">Решено задач</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card variant="outlined" class="text-center pa-4">
              <div class="text-h4 font-weight-bold">{{ currentUserStreak }}</div>
              <div class="text-subtitle-1">Серия дней</div>
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
      const colors = ['amber-darken-2', 'grey-lighten-1', 'amber-darken-4'];
      return colors[index];
    }
  }
};
</script>

<style scoped>
.primary-text {
  background-color: rgba(var(--v-theme-primary), 0.1);
}
</style> 