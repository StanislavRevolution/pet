<template>
  <div class="chart-container">
    <Bar 
      :chart-data="chartData" 
      :chart-options="chartOptions"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'ActivityChart',
  components: {
    Bar
  },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              title: function(tooltipItems) {
                return 'Дата: ' + tooltipItems[0].label;
              },
              label: function(context) {
                return 'Активностей: ' + context.raw;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    };
  }
};
</script>

<style scoped>
.chart-container {
  height: 350px;
  position: relative;
}
</style> 