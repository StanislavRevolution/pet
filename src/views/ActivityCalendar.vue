<template>
  <main-layout>
    <v-card>
      <v-card-title>Календарь активности</v-card-title>
      
      <v-card-text>
        <div class="d-flex justify-space-between mb-4 flex-wrap">
          <div>
            <h3 class="text-h6">Активность за последние 30 дней</h3>
          </div>
          <div>
            <v-select
              v-model="chartType"
              :items="chartTypes"
              density="compact"
              variant="outlined"
              label="Тип графика"
              style="min-width: 180px"
            ></v-select>
          </div>
        </div>
        
        <!-- Heatmap календарь -->
        <div v-if="chartType === 'heatmap'" class="heatmap-container">
          <div class="month-title">{{ getMonthLabel() }}</div>
          <div class="heatmap-grid">
            <div
              v-for="(day, index) in activityData"
              :key="index"
              class="heatmap-cell"
              :class="getHeatmapColor(day.count)"
              :title="`${day.date}: ${day.count} активностей`"
            >
              <v-tooltip activator="parent" location="top">
                {{ day.date }}: {{ day.count }} активностей
              </v-tooltip>
            </div>
          </div>
          <div class="heatmap-legend d-flex justify-end mt-2">
            <div class="d-flex align-center">
              <span class="mr-2">Меньше</span>
              <div class="heatmap-cell heatmap-color-0 legend-cell"></div>
              <div class="heatmap-cell heatmap-color-1 legend-cell"></div>
              <div class="heatmap-cell heatmap-color-2 legend-cell"></div>
              <div class="heatmap-cell heatmap-color-3 legend-cell"></div>
              <div class="heatmap-cell heatmap-color-4 legend-cell"></div>
              <span class="ml-2">Больше</span>
            </div>
          </div>
        </div>
        
        <!-- График активности -->
        <div v-else-if="chartType === 'chart'">
          <activity-chart :chart-data="chartData"></activity-chart>
        </div>
      </v-card-text>
    </v-card>
    
    <!-- Карточка с общей статистикой -->
    <v-card class="mt-6">
      <v-card-title>Сводка активности</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-card variant="outlined" class="text-center pa-4">
              <div class="text-h4 font-weight-bold">{{ totalActivities }}</div>
              <div class="text-subtitle-1">Всего активностей</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card variant="outlined" class="text-center pa-4">
              <div class="text-h4 font-weight-bold">{{ activeDaysCount }}</div>
              <div class="text-subtitle-1">Активных дней</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card variant="outlined" class="text-center pa-4">
              <div class="text-h4 font-weight-bold">{{ maxActivitiesPerDay }}</div>
              <div class="text-subtitle-1">Максимум в день</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </main-layout>
</template>

<script>
import MainLayout from '../components/layout/MainLayout.vue';
import ActivityChart from '../components/activity/ActivityChart.vue';
import { activityData } from '../data/activity';

export default {
  name: 'ActivityCalendar',
  components: {
    MainLayout,
    ActivityChart
  },
  data() {
    return {
      activityData: [...activityData],
      chartType: 'heatmap',
      chartTypes: [
        { title: 'Тепловая карта', value: 'heatmap' },
        { title: 'График', value: 'chart' }
      ]
    };
  },
  computed: {
    // Общее количество активностей
    totalActivities() {
      return this.activityData.reduce((sum, day) => sum + day.count, 0);
    },
    
    // Количество дней с активностью
    activeDaysCount() {
      return this.activityData.filter(day => day.count > 0).length;
    },
    
    // Максимальное количество активностей в день
    maxActivitiesPerDay() {
      return Math.max(...this.activityData.map(day => day.count));
    },
    
    // Данные для графика
    chartData() {
      return {
        labels: this.activityData.map(day => {
          const date = new Date(day.date);
          return `${date.getDate()}.${date.getMonth() + 1}`;
        }).reverse(),
        datasets: [
          {
            label: 'Активности',
            backgroundColor: 'rgba(71, 183, 132, 0.5)',
            borderColor: '#47b784',
            data: this.activityData.map(day => day.count).reverse()
          }
        ]
      };
    }
  },
  methods: {
    // Получение название месяца для заголовка
    getMonthLabel() {
      const today = new Date();
      const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ];
      return monthNames[today.getMonth()];
    },
    
    // Определение класса цвета для ячейки в зависимости от количества активностей
    getHeatmapColor(count) {
      if (count === 0) return 'heatmap-color-0';
      if (count <= 2) return 'heatmap-color-1';
      if (count <= 5) return 'heatmap-color-2';
      if (count <= 8) return 'heatmap-color-3';
      return 'heatmap-color-4';
    }
  }
};
</script>

<style scoped>
.heatmap-container {
  margin-top: 20px;
}

.month-title {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
}

.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.heatmap-cell {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 2px;
  cursor: pointer;
}

.legend-cell {
  width: 15px;
  height: 15px;
  margin: 0 2px;
}

.heatmap-color-0 {
  background-color: #ebedf0;
}

.heatmap-color-1 {
  background-color: #9be9a8;
}

.heatmap-color-2 {
  background-color: #40c463;
}

.heatmap-color-3 {
  background-color: #30a14e;
}

.heatmap-color-4 {
  background-color: #216e39;
}
</style> 