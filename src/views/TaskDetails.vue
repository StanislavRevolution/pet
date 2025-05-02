<template>
  <main-layout>
    <v-card v-if="task">
      <v-card-title class="d-flex align-center">
        <div>
          <h1>{{ task.title }}</h1>
          <v-chip color="primary" class="mt-2" size="small">{{ task.grade }}</v-chip>
          <v-chip color="secondary" class="mt-2 ml-2" size="small">{{ task.category }}</v-chip>
        </div>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="tonal" :to="'/tasks'">
          Назад к списку
        </v-btn>
      </v-card-title>
      
      <v-card-text>
        <h3 class="mb-4">Описание задачи</h3>
        <p>{{ task.description }}</p>
        
        <div class="mt-6">
          <v-chip
            v-for="tag in task.tags"
            :key="tag"
            class="mr-2 mb-2"
            size="small"
          >
            {{ tag }}
          </v-chip>
        </div>
      </v-card-text>
      
      <v-divider></v-divider>
      
      <v-card-actions>
        <v-row>
          <v-col cols="12" sm="6">
            <v-btn
              block
              color="primary"
              @click="openSolutionDialog"
            >
              Отправить решение
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn
              block
              :to="`/solutions/${task.id}`"
              color="secondary"
              variant="outlined"
            >
              Посмотреть решение
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    
    <v-card class="mt-6" v-if="task">
      <v-tabs v-model="activeTab">
        <v-tab value="solutions">Мои решения</v-tab>
        <v-tab value="comments" :to="`/tasks/${task.id}/comments`">Комментарии</v-tab>
      </v-tabs>
      
      <v-card-text>
        <v-window v-model="activeTab">
          <v-window-item value="solutions">
            <div v-if="submissions.length === 0" class="text-center pa-4">
              <p>Вы еще не отправляли решений для этой задачи</p>
            </div>
            <v-list v-else>
              <v-list-item
                v-for="(submission, index) in submissions"
                :key="index"
              >
                <v-list-item-title>
                  Решение #{{ index + 1 }}
                  <v-chip
                    :color="submission.result === 'accepted' ? 'success' : submission.result === 'pending' ? 'warning' : 'error'"
                    size="small"
                    class="ml-2"
                  >
                    {{ 
                      submission.result === 'accepted' ? 'Принято' : 
                      submission.result === 'pending' ? 'На проверке' : 'Отклонено' 
                    }}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>
                  Отправлено: {{ new Date(submission.timestamp).toLocaleString() }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
    
    <!-- Диалог для отправки решения -->
    <v-dialog v-model="solutionDialog" max-width="800px">
      <v-card>
        <v-card-title>
          Отправить решение
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="solutionCode"
            label="Введите ваше решение"
            rows="10"
            auto-grow
            variant="outlined"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="error" 
            @click="solutionDialog = false"
            variant="text"
          >
            Отмена
          </v-btn>
          <v-btn 
            color="primary" 
            @click="submitSolution"
            :loading="submitting"
          >
            Отправить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main-layout>
</template>

<script>
import MainLayout from '../components/layout/MainLayout.vue';
import { tasks } from '../data/tasks';

export default {
  name: 'TaskDetails',
  components: {
    MainLayout
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      task: null,
      activeTab: 'solutions',
      submissions: [],
      solutionDialog: false,
      solutionCode: '',
      submitting: false
    };
  },
  created() {
    // Находим задачу по ID
    this.task = tasks.find(task => task.id === parseInt(this.id));
    
    // Если задача не найдена, перенаправляем на список задач
    if (!this.task) {
      this.$router.push('/tasks');
    }
    
    // Инициализируем пустой массив для отправок решений
    this.submissions = [];
  },
  methods: {
    openSolutionDialog() {
      this.solutionDialog = true;
      this.solutionCode = '';
    },
    submitSolution() {
      // Имитация отправки решения
      this.submitting = true;
      
      // Создаем новое решение
      const submission = {
        id: this.submissions.length + 1,
        taskId: this.task.id,
        code: this.solutionCode,
        result: 'pending',
        timestamp: new Date().toISOString()
      };
      
      // Добавляем решение в массив
      this.submissions.push(submission);
      
      // Имитация проверки решения (через 2 секунды)
      setTimeout(() => {
        const index = this.submissions.findIndex(s => s.id === submission.id);
        if (index !== -1) {
          // Случайный результат: принято или отклонено
          this.submissions[index].result = Math.random() > 0.5 ? 'accepted' : 'rejected';
        }
        this.submitting = false;
        this.solutionDialog = false;
      }, 2000);
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 